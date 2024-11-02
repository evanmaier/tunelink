<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="min-h-screen flex flex-col">
	<NavBar />
	<main class="flex-1">
		<slot />
	</main>
</div>
