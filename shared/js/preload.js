/** Asset loading is shared; individual systems provide their own asset URLs. */
export async function preloadAssets(urls) {
  await Promise.all(urls.map((url) => fetch(url, { cache: 'force-cache' })));
}
