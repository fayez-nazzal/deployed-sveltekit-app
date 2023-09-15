<script lang="ts">
	const onRefresh = () => {
		window.location.href = '';
	};
</script>

<button on:click={onRefresh}> Refresh Page </button>

<style>
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
