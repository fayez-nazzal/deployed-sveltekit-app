<script lang="ts">
	import AddCommentForm from '$lib/AddCommentForm.svelte';
	import CommentsList from '$lib/CommentsList.svelte';
	import type { IComment } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let streamedComments = data.streamed.comments as Promise<IComment[]>;
</script>

<AddCommentForm method="POST" action="/ssr" />

{#await streamedComments}
	{#each Array(5) as _}
		<div class="skeleton-loader" />
	{/each}
{:then comments}
	<CommentsList {comments} />
{/await}

<style>
	.skeleton-loader {
		margin: var(--comments-spacing) auto;
		width: var(--comments-width);
		height: var(--comment-height);
		border-radius: var(--border-radius);
		background: #efefef;
		background: linear-gradient(110deg, #ededed 10%, #f5f5f5 21%, #ededed 38%);
		background-size: 200% 100%;
		animation: 1.5s shine linear infinite;
	}

	@keyframes shine {
		to {
			background-position-x: -200%;
		}
	}
</style>
