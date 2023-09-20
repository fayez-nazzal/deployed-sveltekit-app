import { generateAvatar } from '$lib/server/utils';
import type { ServerLoad } from '@sveltejs/kit';

export const csr = false;

export const load: ServerLoad = async ({ cookies }) => {
	const avatar = cookies.get('avatar') || (await generateAvatar());

	cookies.set('avatar', avatar);

	return {
		avatar
	};
};
