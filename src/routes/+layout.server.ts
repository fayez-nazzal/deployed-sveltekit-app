import { fetchAvatar } from '$lib/utils';
import type { ServerLoad } from '@sveltejs/kit';
import { fetchComments } from '../lib/server/utils';

export const load: ServerLoad = async ({ fetch, depends, cookies }) => {
	const comments = await fetchComments(fetch);
	const avatar = cookies.get('avatar') || (await fetchAvatar(fetch));

	cookies.set('avatar', avatar);
	depends('layout');

	return {
		comments,
		avatar
	};
};
