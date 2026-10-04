import { loadIndex, matches, selectedTags, withTags } from './tags.js';

function link(kind, rel, label, post, tags) {
  const anchor = document.createElement('a');
  anchor.className = `post-pager__link post-pager__link--${kind}`;
  anchor.rel = rel;
  anchor.href = withTags(post.url, tags);
  const labelEl = document.createElement('span');
  labelEl.className = 'post-pager__label';
  labelEl.textContent = kind === 'prev' ? `\u2190 ${label}` : `${label} \u2192`;
  const title = document.createElement('span');
  title.className = 'post-pager__title';
  title.textContent = post.title;
  anchor.append(labelEl, title);
  return anchor;
}

/**
 * With a ?tags= filter, previous and next follow the filtered posts so the
 * reader stays on the topic. Without one, the server-rendered links are used.
 */
export async function initPostPager(nav) {
  const tags = selectedTags();
  if (tags.length === 0) {
    return;
  }
  try {
    const current = nav.dataset.current;
    const posts = (await loadIndex()).filter((post) => matches(post, tags) || post.url === current);
    const at = posts.findIndex((post) => post.url === current);
    if (at < 0) {
      return;
    }
    const entries = [];
    if (at > 0) {
      entries.push(link('prev', 'prev', nav.dataset.prevLabel, posts[at - 1], tags));
    }
    if (at < posts.length - 1) {
      entries.push(link('next', 'next', nav.dataset.nextLabel, posts[at + 1], tags));
    }
    nav.replaceChildren(...entries);
  } catch (error) {
    // Keep the unfiltered server-rendered links.
    console.error(error);
  }
}
