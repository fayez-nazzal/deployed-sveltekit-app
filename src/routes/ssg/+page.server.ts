import { fetchComments } from "$lib/server/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const comments = await fetchComments(fetch);

    return {
        comments
    }
};

export const prerender = true;
