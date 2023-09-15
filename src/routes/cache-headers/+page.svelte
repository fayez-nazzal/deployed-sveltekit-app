<script lang="ts">
	import RefreshButton from '$lib/RefreshButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="wrapper">
	<p>
		Current Time: <span class="time">{data.time}</span>
	</p>
	<p>Time is cached for 10 seconds</p>

	<RefreshButton />
</div>

<style>
	.wrapper {
		text-align: center;
	}

	p {
		font-size: 1.25rem;
	}

	.time {
		text-decoration: underline;
		color: var(--primary);
	}
</style>
