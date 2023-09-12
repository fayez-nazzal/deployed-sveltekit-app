<script lang="ts">
	import type { PageData } from './$types';
	import HeaderLink from '$lib/HeaderLink.svelte';
	import AvatarButton from '$lib/AvatarButton.svelte';
	import { avatar } from '$lib/stores';

	export let data: PageData;

	$avatar = data.avatar;
</script>

<svelte:head>
	<title>Deployed SvelteKit app</title>
	<meta name="description" content="Example app for Mastering SvelteKit deployment series" />
</svelte:head>

<header class="flex items-center justify-between p-4 bg-gray-100">
	<nav>
		<HeaderLink href="/">Home</HeaderLink>
		<HeaderLink href="/ssr-comments">SSR</HeaderLink>
		<HeaderLink href="/prerendered-comments">Prerender</HeaderLink>
		<HeaderLink href="/streaming">Streaming</HeaderLink>
	</nav>

	<AvatarButton />
</header>

<main>
	{#key data}
		<slot />
	{/key}
</main>

<style>
	:root {
		font-size: 1.25rem;
		--primary: #e77728;
		--surface: #f1f1f1;
		--primary-80: #e7772880;
		--primary-30: #e7772830;
		--border-radius: 0.5rem;
		--text: #333;
		--comment-height: 64px;
		--comments-spacing: 1rem;
		--comments-width: 80vw;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Rubik', sans-serif;
		margin: 0;
		color: var(--text);
	}

	header {
		position: sticky;
		top: 0;
		z-index: 1;
		background: #ffd151;
		display: flex;
		padding: 0.5rem 1.5rem;
	}

	nav {
		display: flex;
		gap: 0.5rem;
		margin-right: auto;
	}

	main {
		padding: 1.25rem;
	}
</style>
