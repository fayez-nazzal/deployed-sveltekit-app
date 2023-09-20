<script lang="ts">
	import { avatar } from './stores';

	export let setAvatar = (value: string) => {
		$avatar = value;
	};

	const generateAvatar = async () => {
		const res = await fetch('/api/avatar');
		const avatar = await res.text();
		setAvatar(avatar);
	};
</script>

<button on:click={generateAvatar}>
	<img src={$avatar} alt="avatar" width={48} height={48} />
</button>

<style>
	button {
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	button:active {
		transform: scale(0.9);
		transition: transform 0.1s ease-in-out;
	}
</style>
