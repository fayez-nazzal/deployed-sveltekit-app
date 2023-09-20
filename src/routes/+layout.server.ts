import { generateAvatar } from '$lib/server/utils';
import type { ServerLoad } from '@sveltejs/kit';

export const prerender = true;

export const load: ServerLoad = async () => {
	const avatar = await generateAvatar();

	return {
		avatar
	};
};
