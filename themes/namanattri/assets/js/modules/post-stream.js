import { fetchDocument, resolveRelativeUrls } from './fetch-document.js';
import { typeset } from './typeset.js';

/** Quiet period with no scrolling before a post is inserted above the reader. */
const IDLE_MS = 150;
const ACTIVITY_EVENTS = ['scroll', 'wheel', 'touchmove', 'keydown'];

/** Moves the page without animation, whatever scroll-behavior the site sets. */
function scrollByInstant(delta) {
  window.scrollTo({ top: window.scrollY + delta, behavior: 'instant' });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Turns a single post page into an endless stream. Scrolling past the end
 * loads the next older post. The next newer post is fetched ahead of time and
 * slipped in above the reader while scrolling is idle, so content never moves
 * under the reader's eyes. The address bar follows whichever post is in view.
 * Every post stays a real, crawlable URL that renders on its own.
 */
export function initPostStream(stream) {
  const posts = () => stream.querySelectorAll('[data-post]');
  const olderSentinel = stream.querySelector('[data-sentinel="older"]');
  const newerSentinel = stream.querySelector('[data-sentinel="newer"]');
  const olderLoader = olderSentinel.querySelector('.loader');
  // Browsers with scroll anchoring keep the view still when content above grows.
  const nativeAnchoring = CSS.supports('overflow-anchor', 'auto');

  let activePost = posts()[0];
  let loadingOlder = false;
  let loadingNewer = false;
  let lastActivity = 0;

  const edgePost = (direction) => {
    const all = posts();
    return direction === 'older' ? all[all.length - 1] : all[0];
  };

  async function fetchPost(url) {
    const doc = await fetchDocument(url);
    const post = doc.querySelector('[data-post]');
    if (!post) {
      throw new Error(`No post found at ${url}`);
    }
    resolveRelativeUrls(post, url);
    return post;
  }

  function fail(direction, error) {
    console.error(error);
    // Stop retrying this direction; the plain pager links remain available.
    stream.querySelector('[data-pager]')?.classList.add('is-error');
    edgePost(direction).dataset[direction] = '';
  }

  async function loadOlder() {
    const url = edgePost('older').dataset.older;
    if (!url || loadingOlder) {
      return;
    }
    loadingOlder = true;
    olderLoader.hidden = false;
    try {
      const post = await fetchPost(url);
      post.classList.add('post--enter');
      olderSentinel.before(post);
      typeset(post);
    } catch (error) {
      fail('older', error);
    } finally {
      loadingOlder = false;
      olderLoader.hidden = true;
    }
    // Re-observe so a sentinel that is still in view loads the following post.
    olderObserver.unobserve(olderSentinel);
    olderObserver.observe(olderSentinel);
  }

  /** Waits until the reader has stopped scrolling. */
  async function untilIdle() {
    while (performance.now() - lastActivity < IDLE_MS) {
      await sleep(50);
    }
  }

  /** Keeps a newer post loaded above the active one, ready before it is needed. */
  async function ensureNewer() {
    const first = posts()[0];
    const url = first.dataset.newer;
    if (!url || first !== activePost || loadingNewer) {
      return;
    }
    loadingNewer = true;
    try {
      const post = await fetchPost(url);
      await untilIdle();
      prepend(post);
      typeset(post);
    } catch (error) {
      fail('newer', error);
    } finally {
      loadingNewer = false;
    }
  }

  function prepend(post) {
    // Keep the post that was in view at the same screen position.
    const anchor = posts()[0];
    const before = anchor.getBoundingClientRect().top;
    newerSentinel.after(post);
    scrollByInstant(anchor.getBoundingClientRect().top - before);
    if (!nativeAnchoring) {
      keepStillWhileGrowing(post);
    }
  }

  /** Fallback for browsers without scroll anchoring: images loading in a post above the reader. */
  function keepStillWhileGrowing(post) {
    let height = post.offsetHeight;
    const observer = new ResizeObserver(() => {
      const delta = post.offsetHeight - height;
      height = post.offsetHeight;
      const isAbove = post.compareDocumentPosition(activePost) & Node.DOCUMENT_POSITION_FOLLOWING;
      if (delta && isAbove) {
        scrollByInstant(delta);
      }
    });
    observer.observe(post);
  }

  /**
   * Keeps the page light: only the active post and its immediate neighbours
   * stay in the DOM. Removed posts are fetched again if the reader returns.
   */
  function prune() {
    const all = [...posts()];
    const index = all.indexOf(activePost);
    const stale = all.filter((_, i) => Math.abs(i - index) > 1);
    if (stale.length === 0) {
      return;
    }
    const before = activePost.getBoundingClientRect().top;
    stale.forEach((post) => post.remove());
    scrollByInstant(activePost.getBoundingClientRect().top - before);
  }

  const olderObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadOlder();
      }
    },
    { rootMargin: '0px 0px 400px 0px' },
  );
  olderObserver.observe(olderSentinel);

  // Keep the address bar and title in sync with the post being read.
  let framePending = false;
  function syncLocation() {
    framePending = false;
    const probe = window.innerHeight * 0.3;
    for (const post of posts()) {
      const rect = post.getBoundingClientRect();
      if (rect.top <= probe && rect.bottom > probe) {
        if (post !== activePost) {
          activePost = post;
          history.replaceState(history.state, '', post.dataset.url);
          document.title = post.dataset.title;
          prune();
          ensureNewer();
        }
        return;
      }
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!framePending) {
        framePending = true;
        requestAnimationFrame(syncLocation);
      }
    },
    { passive: true },
  );
  ACTIVITY_EVENTS.forEach((type) =>
    window.addEventListener(type, () => (lastActivity = performance.now()), { passive: true }),
  );

  ensureNewer();
}
