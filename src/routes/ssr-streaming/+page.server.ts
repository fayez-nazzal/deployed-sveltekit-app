import { delayedFetchComments } from '$lib/server/utils';
import type { ServerLoad } from '@sveltejs/kit';

export const ssr = true;
export const csr = true; // required for streaming

export const load: ServerLoad = async ({ fetch }) => {
	return {
		streamed: {
			comments: delayedFetchComments({ fetch, milliseconds: 2000 })
		}
	};
};
