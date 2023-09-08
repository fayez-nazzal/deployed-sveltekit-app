import { generateRandomColor } from '$lib/server/utils';
import { text, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const color1 = await generateRandomColor();
	const color2 = await generateRandomColor();
	const color3 = await generateRandomColor();

	const url = `https://source.boringavatars.com/beam/120/Stefan?colors=${color1},${color2},${color3}`;
	cookies.set('avatar', url, { path: '/' });

	return text(url);
};
