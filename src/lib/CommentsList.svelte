<script lang="ts">
	import type { IComment } from './types';
	import { getCommentAvatar } from './utils';

	export let comments: IComment[];
</script>

<ul class="comments-list">
	{#each comments as comment (comment.id)}
		<div class="comment">
			<img width={48} height={48} src={getCommentAvatar(comment)} alt="User Avatar" />
			<p>{comment.body}</p>
		</div>
	{/each}
</ul>

<style>
	.comments-list {
		display: block;
		list-style-type: none;
		padding-left: 2rem;
		padding-right: 2rem;
	}

	.comment {
		margin-bottom: 0.8rem;
		background-color: var(--surface);
		padding: 0.5rem;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.comment > img {
		border-radius: 50%;
		overflow: hidden;
	}
</style>
