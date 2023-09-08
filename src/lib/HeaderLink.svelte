<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;

	$: isActive = $page.url.pathname === href;
</script>

<a {href} class={isActive ? 'active' : ''}><slot /></a>

<style>
	a {
		text-decoration: none;
		font-weight: 500;
		padding: 0.48rem;
		color: var(--text);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	a:hover {
		background: var(--primary-30);
	}

	a.active {
		background: var(--primary-80);
	}
</style>
