<script lang="ts">
	import { avatar } from './stores';
	import { fetchAvatar } from './utils';

	export let setAvatar = (value: string) => {
		$avatar = value;
	};

	const generateAvatar = async () => {
		const avatar = await fetchAvatar();
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
