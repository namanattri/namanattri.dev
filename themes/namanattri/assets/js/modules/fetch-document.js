/** Fetches a URL and parses the response into an HTML document. */
export async function fetchDocument(url) {
  const response = await fetch(url, { headers: { Accept: 'text/html' } });
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  return new DOMParser().parseFromString(await response.text(), 'text/html');
}
