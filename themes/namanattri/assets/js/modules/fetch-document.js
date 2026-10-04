/** Fetches a URL and parses the response into an HTML document. */
export async function fetchDocument(url) {
  const response = await fetch(url, { headers: { Accept: 'text/html' } });
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  return new DOMParser().parseFromString(await response.text(), 'text/html');
}

const URL_ATTRIBUTES = ['src', 'href', 'poster'];

/**
 * Rewrites relative URLs inside content fetched from `pageUrl` so they keep
 * pointing at that page's own resources (for example page bundle images) once
 * the content is inserted into a page served from a different URL.
 */
export function resolveRelativeUrls(root, pageUrl) {
  const base = new URL(pageUrl, window.location.href);
  for (const attribute of URL_ATTRIBUTES) {
    for (const element of root.querySelectorAll(`[${attribute}]`)) {
      const value = element.getAttribute(attribute);
      if (value && !value.startsWith('#')) {
        element.setAttribute(attribute, new URL(value, base).href);
      }
    }
  }
}
