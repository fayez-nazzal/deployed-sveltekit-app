<script lang="ts">
	import CommentsList from '$lib/CommentsList.svelte';
	import RefreshButton from '$lib/RefreshButton.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;

	let comments = data.comments;
</script>

<div class="wrapper">
	<RefreshButton />

	<CommentsList {comments} />
</div>

<style>
	.wrapper {
		text-align: center;
	}
</style>
