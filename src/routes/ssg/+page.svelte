<script lang="ts">
	import CommentsList from '$lib/CommentsList.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;

	let comments = data.comments;
</script>

<CommentsList {comments} />
