import type { ServerLoad } from '@sveltejs/kit';
import dayjs from 'dayjs';

export const csr = true;

export const load: ServerLoad = async ({ fetch, setHeaders }) => {
	const time = dayjs().format('HH:mm:ss');

	setHeaders({
		'Cache-Control': 'max-age=10'
	})

	return {
		time
	}
};
