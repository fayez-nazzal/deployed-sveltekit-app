import { fetchUserComments } from '$lib/server/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const comments = await fetchUserComments();

	return {
		comments
	};
};

export const prerender = true;
