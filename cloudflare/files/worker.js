import { Server } from 'SERVER';
import { manifest, prerendered } from 'MANIFEST';
import * as Cache from 'worktop/cfw.cache';

const server = new Server(manifest);

/** @type {import('worktop/cfw').Module.Worker<{ ASSETS: import('worktop/cfw.durable').Durable.Object }>} */
const worker = {
	async fetch(req, env, context) {
		// @ts-ignore
		await server.init({ env });
        
		// skip cache if "cache-control: no-cache" in request
		let pragma = req.headers.get('cache-control') || '';
		let res = !pragma.includes('no-cache') && (await Cache.lookup(req));
		if (res) return res;
        
		const url = new URL(req.url);
        let { pathname } = url;

        try {
            const cachedPageBody = await env.kv.get(pathname)
            if (cachedPageBody) {
                return new Response(cachedPageBody)
            }
        } catch (err) {
            // Page wasn't found in cache, ignore the error
        }

		try {
			pathname = decodeURIComponent(pathname);
		} catch {
			// ignore invalid URI
		}

		const stripped_pathname = pathname.replace(/\/$/, '');

		// prerendered pages and /static files
		let is_static_asset = false;
		const filename = stripped_pathname.substring(1);
		if (filename) {
			is_static_asset =
				manifest.assets.has(filename) || manifest.assets.has(filename + '/index.html');
		}

		const location = pathname.at(-1) === '/' ? stripped_pathname : pathname + '/';

		if (is_static_asset || prerendered.has(pathname)) {
			res = await env.ASSETS.fetch(req);
		} else if (location && prerendered.has(location)) {
			res = new Response('', {
				status: 308,
				headers: {
					location
				}
			});
		} else {
			// dynamically-generated pages
			res = await server.respond(req, {
				// @ts-ignore
				platform: { env, context, caches, cf: req.cf },
				getClientAddress() {
					return req.headers.get('cf-connecting-ip');
				}
			});

            console.log(JSON.stringify(res))

            // expire after 1 minute
            await env.kv.put(pathname, 'test', {expirationTtl: 60})
		}

		// write to `Cache` only if response is not an error,
		// let `Cache.save` handle the Cache-Control and Vary headers
		pragma = res.headers.get('cache-control') || '';
		return pragma && res.status < 400 ? Cache.save(req, res, context) : res;
	}
};

export default worker;
