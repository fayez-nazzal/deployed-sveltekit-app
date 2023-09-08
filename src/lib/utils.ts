import { DEFAULT_AVATAR_SRC } from './constants';
import type { IComment } from './types';

export const uuid = () => {
	return crypto.randomUUID();
};

export const makeNewComment = (body: string, avatar?: string) => ({ id: uuid(), body, avatar });

export const fetchAvatar = async (_fetch = fetch) => {
	try {
		// include credentials so that the cookie is sent
		const res = await _fetch('/api/avatar', { credentials: 'include' });
		const emoji = await res.text();
		return emoji;
	} catch {
		return DEFAULT_AVATAR_SRC;
	}
};

export const getCommentAvatar = (comment: IComment) => {
	return comment.avatar || DEFAULT_AVATAR_SRC;
};
