import { makeNewComment } from '$lib/utils';
import { fetchComments, postUserComment } from '$lib/server/utils';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = true;

export const load: PageServerLoad = async () => {
	const comments = await fetchComments(fetch);

	return {
		comments
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const commentBody = formData.get('comment') as string;

		if (!commentBody) {
			return fail(400, {
				message: 'No comment provided',
				comment: ''
			});
		}

		const avatar = cookies.get('avatar');
		const comment = makeNewComment(commentBody, avatar);
		await postUserComment(comment);

		return {
			comment: ''
		};
	}
} satisfies Actions;
