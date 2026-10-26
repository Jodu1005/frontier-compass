/**
 * Return whether a Markdown link should leave the current origin in a new tab.
 * Only HTTP(S) destinations qualify; hashes, relative URLs, same-origin absolute
 * URLs, unsupported protocols, and malformed URLs stay in the current context.
 */
export function isExternalHttpLink(href, currentUrl) {
  if (typeof href !== 'string' || !href || typeof currentUrl !== 'string' || !currentUrl) {
    return false;
  }

  try {
    const base = new URL(currentUrl);
    const destination = new URL(href, base);
    return (
      (destination.protocol === 'http:' || destination.protocol === 'https:')
      && destination.origin !== base.origin
    );
  } catch {
    return false;
  }
}
