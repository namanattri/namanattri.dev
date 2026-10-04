import { blogLink, decorateTags, loadIndex, matches, selectedTags, toggleTag, withTags } from './tags.js';

const CHUNK = 10;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text) {
    node.textContent = text;
  }
  return node;
}

/**
 * The blog's tag filter. Tags toggle in place and live in the URL (?tags=a,b),
 * so a filtered view can be shared and the posts opened from it keep the topic.
 * Filtered results come from the post index and load ten at a time on scroll.
 */
export function initTagFilter(bar) {
  const list = document.querySelector('[data-infinite-list]');
  const items = list.querySelector('[data-list-items]');
  const status = document.querySelector('[data-tag-status]');
  const clear = bar.querySelector('[data-tag-clear]');
  const loaderTemplate = bar.querySelector('[data-loader-template]');
  let tags = selectedTags();
  let observer;

  clear.href = blogLink([]);
  decorateTags(document, tags);
  clear.hidden = tags.length === 0;

  function card(post) {
    const item = element('li', 'post-card');
    const article = element('article');
    const title = element('h2', 'post-card__title');
    const link = element('a', '', post.title);
    link.href = withTags(post.url, tags);
    title.append(link);

    const meta = element('p', 'post-card__meta');
    const time = element('time', '', post.dateLabel);
    time.dateTime = post.date;
    const dot = element('span', '', '·');
    dot.setAttribute('aria-hidden', 'true');
    meta.append(time, ' ', dot, ' ', element('span', '', post.readingTime));

    article.append(title, meta, element('p', 'post-card__summary', post.summary));
    if (post.tags.length) {
      const tagList = element('ul', 'tags');
      tagList.setAttribute('aria-label', bar.dataset.tagsLabel);
      for (const tag of post.tags) {
        const entry = element('li');
        const tagLink = element('a', 'tag', tag);
        tagLink.dataset.tag = tag;
        tagLink.rel = 'tag';
        entry.append(tagLink);
        tagList.append(entry);
      }
      article.append(tagList);
    }
    item.append(article);
    return item;
  }

  function statusText(count) {
    if (count === 0) {
      return status.dataset.empty;
    }
    return count === 1 ? status.dataset.one : status.dataset.many.replace('%count%', count);
  }

  async function render() {
    observer?.disconnect();
    list.querySelector('[data-sentinel]')?.remove();
    list.querySelector('[data-pager]')?.remove();

    const posts = (await loadIndex()).filter((post) => matches(post, tags));
    items.replaceChildren();
    status.textContent = statusText(posts.length);
    status.hidden = false;

    let shown = 0;
    const showMore = () => {
      const next = posts.slice(shown, shown + CHUNK).map(card);
      items.append(...next);
      shown += next.length;
      decorateTags(items, tags);
    };
    showMore();
    if (shown >= posts.length) {
      return;
    }

    const sentinel = element('div', 'post-list__sentinel');
    sentinel.dataset.sentinel = '';
    sentinel.append(loaderTemplate.content.cloneNode(true));
    items.after(sentinel);
    const loader = sentinel.querySelector('.loader');
    let loading = false;

    observer = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || loading) {
          return;
        }
        loading = true;
        loader.hidden = false;
        await sleep(300);
        showMore();
        loader.hidden = true;
        loading = false;
        if (shown >= posts.length) {
          observer.disconnect();
          sentinel.remove();
        } else {
          observer.unobserve(sentinel);
          observer.observe(sentinel);
        }
      },
      { rootMargin: '0px 0px 200px 0px' },
    );
    observer.observe(sentinel);
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('.tag[data-tag]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || !link.closest('.page')) {
      return;
    }
    event.preventDefault();
    const next = toggleTag(tags, link.dataset.tag);
    // Moving between "no filter" and a filter swaps the server-rendered list, so reload.
    if (tags.length === 0 || next.length === 0) {
      window.location.assign(blogLink(next));
      return;
    }
    tags = next;
    history.replaceState(history.state, '', blogLink(tags));
    decorateTags(document, tags);
    render().catch(console.error);
  });

  if (tags.length) {
    render().catch(console.error);
  }
}
