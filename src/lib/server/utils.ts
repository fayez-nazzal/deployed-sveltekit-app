import fs from 'fs';
import path from 'path';
import type { IComment } from '../types';
import { fileURLToPath } from 'url';

export const fetchUserComments = async () => {
	// We are trying to simulate user-specific data here.
	// In a real app, you would probably use a database.
	const filePath = getUserCommentsFilePath();

	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, JSON.stringify([]));
	}

	const fileContents = fs.readFileSync(filePath, 'utf8');
	const userComments = JSON.parse(fileContents);

	return userComments;
};

export const fetchComments = async (_fetch: typeof fetch) => {
	const userComments = await fetchUserComments();

	const commentsRespose = await _fetch('https://dummyjson.com/comments');
	const { comments } = await commentsRespose.json();

	return [...userComments, ...comments];
};

export const getUserCommentsFilePath = () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	return path.join(__dirname, 'user-comments.json');
};

export const postUserComment = async (comment: IComment) => {
	const filePath = getUserCommentsFilePath();
	const fileContents = fs.readFileSync(filePath, 'utf8');

	const userComments: IComment[] = JSON.parse(fileContents);
	userComments.unshift(comment);

	fs.writeFileSync(filePath, JSON.stringify(userComments));
};

export const generateRandomColor = async () => {
	const int = Math.floor(Math.random() * 16777215);

	const hash = await crypto.subtle.digest('SHA-256', new Uint8Array([int]));

	const hex = Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	return hex.slice(0, 6);
};
