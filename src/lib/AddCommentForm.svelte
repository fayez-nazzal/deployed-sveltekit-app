<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let method: string | undefined = undefined;
	export let action: string | undefined = undefined;

	const onSubmit = async () => {
		await invalidateAll();
	};

	let newComment = '';

	const enhanceAction = method === 'POST' ? enhance : () => {};
</script>

<form {method} {action} on:submit={onSubmit} use:enhanceAction>
	<input type="text" name="comment" bind:value={newComment} />
	<button type="submit">Send</button>
</form>

<style>
	form {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
		justify-content: center;
		align-items: center;
	}

	input {
		width: clamp(10rem, 50vw, 20rem);
		filter: drop-shadow(0 0 0.15rem rgba(0, 0, 0, 0.3));
	}

	button {
		background: var(--primary);
	}

	input,
	button {
		border-radius: var(--border-radius);
		padding: 1rem 0.64rem;
		border: none;
		font-weight: 500;
		font-size: 0.8rem;
		color: var(--text);
	}

	input:focus {
		outline: 2px solid var(--primary);
	}

	button:hover {
		filter: brightness(1.1);
		cursor: pointer;
	}
</style>
