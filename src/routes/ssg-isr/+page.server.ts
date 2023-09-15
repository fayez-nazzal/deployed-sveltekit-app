import { fetchComments } from "$lib/server/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const comments = await fetchComments(fetch);

	return {
		comments
	}
};

export const config = {
	isr: {
		expiration: 15 // regenerate every 15 seconds
	}
};
