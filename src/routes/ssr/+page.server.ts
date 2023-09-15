import { makeNewComment } from '$lib/utils';
import { postUserComment } from '$lib/server/utils';
import { fail, type Actions } from '@sveltejs/kit';

export const ssr = true;

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
