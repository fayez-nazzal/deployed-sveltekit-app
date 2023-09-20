import { DEFAULT_AVATAR_SRC } from './constants';
import type { IComment } from './types';

export const uuid = () => {
	return crypto.randomUUID();
};

export const makeNewComment = (body: string, avatar?: string) => ({ body, avatar });

export const getCommentAvatar = (comment: IComment) => {
	return comment.avatar || DEFAULT_AVATAR_SRC;
};
