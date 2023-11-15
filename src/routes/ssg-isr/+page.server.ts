import { fetchUserComments } from '$lib/server/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const comments = await fetchUserComments();

	return {
		comments
	};
};

export const prerender = true;

export const config = {
	isr: {
		expiration: 15 // regenerate every 15 seconds
	}
};
