<script lang="ts">
	import { avatar } from './stores';
</script>

<button>
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
