import { fetchAvatar } from '$lib/utils';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ fetch, cookies }) => {
	const avatar = cookies.get('avatar') || (await fetchAvatar(fetch));

	cookies.set('avatar', avatar);

	return {
		avatar
	};
};
