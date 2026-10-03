import { fetchDocument } from './fetch-document.js';

/**
 * Loads the next paginated page of a post list when the sentinel at the end of
 * the list scrolls into view. Each page is a real URL, so the list works
 * without JavaScript through the plain pagination links.
 */
export function initInfiniteList(list, scroller) {
  const items = list.querySelector('[data-list-items]');
  const sentinel = list.querySelector('[data-sentinel]');
  if (!items || !sentinel) {
    return;
  }

  const loader = sentinel.querySelector('.loader');
  let nextUrl = list.dataset.nextUrl;
  let loading = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadNextPage();
      }
    },
    { root: scroller, rootMargin: '0px 0px 200px 0px' },
  );

  async function loadNextPage() {
    if (loading || !nextUrl) {
      return;
    }
    loading = true;
    loader.hidden = false;

    try {
      const doc = await fetchDocument(nextUrl);
      const page = doc.querySelector('[data-infinite-list]');
      items.append(...page.querySelectorAll('[data-list-items] > *'));
      nextUrl = page.dataset.nextUrl;
    } catch (error) {
      console.error(error);
      nextUrl = '';
      list.querySelector('[data-pager]')?.classList.add('is-error');
    } finally {
      loading = false;
      loader.hidden = true;
    }

    if (nextUrl) {
      // Re-observe so a sentinel that is still in view loads the following page.
      observer.unobserve(sentinel);
      observer.observe(sentinel);
    } else {
      observer.disconnect();
      sentinel.remove();
      if (!list.querySelector('[data-pager]')?.classList.contains('is-error')) {
        list.querySelector('[data-pager]')?.remove();
      }
    }
  }

  observer.observe(sentinel);
}
