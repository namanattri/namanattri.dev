/** Shared helpers for the ?tags=a,b filter that carries across lists and posts. */

const normalise = (value) => value.trim().toLowerCase();

export function selectedTags() {
  const raw = new URLSearchParams(window.location.search).get('tags') || '';
  return [...new Set(raw.split(',').map(normalise).filter(Boolean))];
}

/** Adds the tag filter to a same-site URL. */
export function withTags(url, tags = selectedTags()) {
  const target = new URL(url, window.location.href);
  if (tags.length) {
    target.searchParams.set('tags', tags.join(','));
  } else {
    target.searchParams.delete('tags');
  }
  // Keep commas readable in the address bar.
  return target.pathname + target.search.replaceAll('%2C', ',') + target.hash;
}

export function toggleTag(tags, tag) {
  return tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag];
}

/** The blog list URL for a set of tags. */
export function blogLink(tags) {
  return withTags(document.body.dataset.blogUrl || '/', tags);
}

/** A post matches when it has any of the selected tags. No selection matches everything. */
export function matches(post, tags) {
  return tags.length === 0 || post.tags.some((tag) => tags.includes(tag));
}

let indexRequest;

/** All posts, newest first, with their tags. Fetched once. */
export function loadIndex() {
  indexRequest ??= fetch(document.body.dataset.postsIndex).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load the post index: ${response.status}`);
    }
    return response.json();
  });
  return indexRequest;
}

/**
 * Highlights the tags in the filter and points every tag at the blog list with
 * that tag toggled, so clicking one narrows or widens the filter.
 */
export function decorateTags(root, tags = selectedTags()) {
  root.querySelectorAll('.tag[data-tag]').forEach((link) => {
    const active = tags.includes(link.dataset.tag);
    link.classList.toggle('is-active', active);
    if (active) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
    link.href = blogLink(toggleTag(tags, link.dataset.tag));
  });
}
