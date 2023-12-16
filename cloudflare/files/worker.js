import { Server } from 'SERVER';
import { manifest, prerendered, isr } from 'MANIFEST';
import * as Cache from 'worktop/cfw.cache';

const server = new Server(manifest);

const worker = {
	async fetch(req, env, context) {
		await server.init({ env }); // Initialize server with the environment

		// Check cache unless "no-cache" is requested
		if (req.headers.get('cache-control') !== 'no-cache') {
			const res = await Cache.lookup(req);
			if (res) return res;
		}

		// Obtain pathname from the request URL
		const { pathname: rawPathname } = new URL(req.url);
		const pathname = decodeURIComponent(rawPathname) || rawPathname;
		const key = `key_${pathname}`;

		// Attempt to serve from KV cache
		try {
			const cachedResponse = await env.kv.get(key);
			if (cachedResponse) {
				const cachedHeaders = new Headers({
					'Content-Type': 'text/html',
					'CF-Cache-Status': 'HIT'
				});
				return new Response(cachedResponse, { headers: cachedHeaders });
			}
		} catch (err) {
			// Skip if page is not in cache (we'll render and return the response below)
		}

		// Determine if the request is for a static asset or prerendered page
		const strippedPathname = pathname.replace(/\/$/, '');
		const isStaticAsset =
			manifest.assets.has(strippedPathname) ||
			manifest.assets.has(`${strippedPathname}/index.html`);
		const location = pathname.endsWith('/') ? strippedPathname : `${pathname}/`;

		// Serve assets, prerendered pages, or process dynamic requests
		let res;
		if (isStaticAsset || prerendered.has(pathname)) {
			res = await env.ASSETS.fetch(req);
		} else if (location && prerendered.has(location)) {
			res = new Response('', { status: 308, headers: { location } });
		} else {
			res = await server.respond(req, {
				platform: { env, context, caches, cf: req.cf },
				getClientAddress: () => req.headers.get('cf-connecting-ip')
			});

			// If it's an isr page, Store in KV cache if the response is successful
			const isrPage = isr.find((page) => page.pathname === pathname || page.pathname === location);
			if (isrPage && res.ok) {
				const bodyText = await res.clone().text();
				await env.kv.put(key, bodyText, { expirationTtl: isrPage.expiration });
			}
		}

		// Utilize Cache API for eligible responses
		if (res.status < 400) {
			const cacheControl = res.headers.get('cache-control');
			if (cacheControl) {
				return Cache.save(req, res, context);
			}
		}

		return res;
	}
};

export default worker;