import { delayedFetchComments } from '$lib/server/utils';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ fetch }) => {
	return {
		streamed: {
			comments: delayedFetchComments({ fetch, milliseconds: 2000 })
		}
	};
};
