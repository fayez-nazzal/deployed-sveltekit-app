<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const onRefresh = () => {
		window.location.href = '';
	};
</script>

<div class="wrapper">
	<p>
		Current Time: <span class="time">{data.time}</span>
	</p>
	<p>Time is cached for 10 seconds</p>
	<button on:click={onRefresh}> Refresh Page </button>
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

	button {
		background: var(--primary);
		border-radius: var(--border-radius);
		padding: 1rem 0.64rem;
		border: none;
		font-weight: 500;
		font-size: 1.1rem;
		color: var(--text);
		transition: all;
	}

	button:hover {
		filter: brightness(1.2);
		cursor: pointer;
	}

	button:active {
		transform: scale(0.8);
	}
</style>
