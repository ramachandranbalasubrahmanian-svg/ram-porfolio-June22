/**
 * Canonical host: ram-bala.com → www.ram-bala.com (301, path and query kept).
 * Cloudflare Pages `_redirects` cannot match on hostname, so this tiny
 * Pages Function does it; everything else passes straight through to the
 * static asset.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "ram-bala.com") {
    url.hostname = "www.ram-bala.com";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
