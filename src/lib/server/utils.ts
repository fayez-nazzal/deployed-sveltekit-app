import { env } from '$env/dynamic/private';
import type { IComment, IRandomData } from '../types';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(env.SUPABASE_URL as string, env.SUPABASE_PUBLIC_KEY as string);

export const fetchUserComments = async () => {
	const { data: userComments } = await supabase
		.from('comments')
		.select('*')
		.order('id', { ascending: false });

	return userComments;
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

export const generateRandomString = (length: number) => {
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const generateLargeJSON = () => {
	const largeObj: { data: IRandomData[] } = { data: [] };
	let size = 0;
	const targetSize = 2 * 1024 * 1024; // 2MB in bytes

	while (size < targetSize) {
		const randomData = {
			name: generateRandomString(10),
			age: Math.floor(Math.random() * 100)
		};
		largeObj.data.push(randomData);
		size = Buffer.from(JSON.stringify(largeObj)).length;
	}
	return largeObj;
};
