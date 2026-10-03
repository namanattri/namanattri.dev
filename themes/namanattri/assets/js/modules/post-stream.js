import { fetchDocument, resolveRelativeUrls } from './fetch-document.js';
import { typeset } from './typeset.js';

/** Moves the page without animation, whatever scroll-behavior the site sets. */
function scrollByInstant(delta) {
  window.scrollTo({ top: window.scrollY + delta, behavior: 'instant' });
}

const USER_INPUT_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'];

/**
 * Turns a single post page into an endless stream. Scrolling past the end
 * loads the next older post, scrolling up past the start loads the next newer
 * post, and the address bar follows whichever post is in view. Every post
 * stays a real, crawlable URL that renders on its own.
 */
export function initPostStream(stream) {
  const posts = () => stream.querySelectorAll('[data-post]');
  let activePost = posts()[0];

  const directions = {
    older: { sentinel: stream.querySelector('[data-sentinel="older"]'), loading: false },
    newer: { sentinel: stream.querySelector('[data-sentinel="newer"]'), loading: false },
  };

  function edgePost(direction) {
    const all = posts();
    return direction === 'older' ? all[all.length - 1] : all[0];
  }

  async function load(direction) {
    const state = directions[direction];
    const url = edgePost(direction).dataset[direction];
    if (!url || state.loading) {
      return;
    }
    state.loading = true;
    const loader = state.sentinel.querySelector('.loader');
    loader.hidden = false;

    try {
      const doc = await fetchDocument(url);
      const post = doc.querySelector('[data-post]');
      if (!post) {
        throw new Error(`No post found at ${url}`);
      }
      resolveRelativeUrls(post, url);
      post.classList.add('post--enter');
      insert(direction, post);
      typeset(post);
    } catch (error) {
      console.error(error);
      // Stop retrying this direction; the plain pager links remain available.
      stream.querySelector('[data-pager]')?.classList.add('is-error');
      edgePost(direction).dataset[direction] = '';
    } finally {
      state.loading = false;
      loader.hidden = true;
    }

    // Re-observe so a sentinel that is still in view loads the following post.
    observers[direction].unobserve(state.sentinel);
    observers[direction].observe(state.sentinel);
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

  function insert(direction, post) {
    if (direction === 'older') {
      directions.older.sentinel.before(post);
      return;
    }
    // Keep the post that was in view at the same screen position.
    const anchor = posts()[0];
    const before = anchor.getBoundingClientRect().top;
    directions.newer.sentinel.after(post);
    directions.newer.sentinel.querySelector('.loader').hidden = true;
    scrollByInstant(anchor.getBoundingClientRect().top - before);
  }

  const observers = {};
  for (const direction of Object.keys(directions)) {
    const { sentinel } = directions[direction];
    observers[direction] = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load(direction);
        }
      },
      {
        rootMargin: direction === 'older' ? '0px 0px 400px 0px' : '0px',
      },
    );
  }

  observers.older.observe(directions.older.sentinel);

  // The newer sentinel sits at the very top, so it is visible on arrival.
  // Only start watching it once the reader scrolls, to keep the opened post in place.
  const arm = () => {
    USER_INPUT_EVENTS.forEach((type) => window.removeEventListener(type, arm));
    window.removeEventListener('scroll', arm);
    observers.newer.observe(directions.newer.sentinel);
  };
  USER_INPUT_EVENTS.forEach((type) =>
    window.addEventListener(type, arm, { passive: true }),
  );
  window.addEventListener('scroll', arm, { passive: true });

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
}
