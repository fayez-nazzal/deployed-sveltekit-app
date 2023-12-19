import { SUPABASE_URL, SUPABASE_PUBLIC_KEY } from '$env/static/private';
import { DEFAULT_AVATAR_SRC } from '$lib/constants';
import type { IComment } from '../types';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL as string, SUPABASE_PUBLIC_KEY as string);

export const fetchUserComments = async () => {
	const { data: userComments } = await supabase
		.from('comments')
		.select('*')
		.order('created_at', { ascending: false });

	return userComments as IComment[];
};

export const postUserComment = async (comment: IComment) => {
	const { data, error } = await supabase.from('comments').insert([comment]);

	if (error) {
		console.error(error);
		return;
	}

	console.log(data);
};

// Used to demonstrate streaming feature
export const generateRandomColor = async () => {
	const int = Math.floor(Math.random() * 16777215);

	const hash = await crypto.subtle.digest('SHA-256', new Uint8Array([int]));

	const hex = Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	return hex.slice(0, 6);
};

export const generateAvatar = async () => {
	try {
		// include credentials so that the cookie is sent
		const color1 = await generateRandomColor();
		const color2 = await generateRandomColor();
		const color3 = await generateRandomColor();

		const url = `https://source.boringavatars.com/beam/120/Stefan?colors=${color1},${color2},${color3}`;
		return url;
	} catch {
		return DEFAULT_AVATAR_SRC;
	}
};

export const delayedFetchComments = async ({ milliseconds }: { milliseconds: number }) => {
	return new Promise((resolve) => {
		setTimeout(async () => {
			const comments = await fetchUserComments();
			resolve(comments);
		}, milliseconds);
	});
};
