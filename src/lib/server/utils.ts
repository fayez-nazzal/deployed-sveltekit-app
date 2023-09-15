import { env } from '$env/dynamic/private';
import type { IComment } from '../types';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(env.SUPABASE_URL as string, env.SUPABASE_PUBLIC_KEY as string);

export const fetchUserComments = async () => {
	const { data: userComments } = await supabase
		.from('comments')
		.select('*')
		.order('created_at', { ascending: false });

	return userComments as IComment[];
};

export const fetchComments = async (_fetch: typeof fetch) => {
	const userComments = await fetchUserComments();

	return userComments;
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

export const delayedFetchComments = async ({
	fetch: _fetch,
	milliseconds
}: {
	fetch: typeof fetch;
	milliseconds: number;
}) => {
	return new Promise((resolve) => {
		setTimeout(async () => {
			const comments = await fetchComments(_fetch);
			resolve(comments);
		}, milliseconds);
	});
};
