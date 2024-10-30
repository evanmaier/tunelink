<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="min-h-screen flex flex-col">
	<NavBar />
	<main class="flex-1">
		<slot />
	</main>
</div>
