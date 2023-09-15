<script lang="ts">
	import AddCommentForm from '$lib/AddCommentForm.svelte';
	import CommentsList from '$lib/CommentsList.svelte';
	import type { PageData } from '../ssr-comments/$types';

	export let data: PageData;
	const comments = data.comments;
</script>

<AddCommentForm method="POST" />

<CommentsList {comments} />
