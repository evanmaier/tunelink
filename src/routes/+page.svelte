<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { latitude, longitude } from '$lib/stores/GeoStore';
	import { onMount } from 'svelte';
	import { userData } from '$lib/stores/DocStore';
	import Search from '$lib/components/Search.svelte';

	onMount(async () => {
		try {
			const res = await fetch('/api/location');
			const data = await res.json();
			$latitude = data.lat;
			$longitude = data.lon;
		} catch (error: any) {
			console.log(error.message);
		}
	});
</script>

<AuthCheck>
	<h1 class="text-2xl font-bold mb-10 text-center">Welcome {$userData?.username}</h1>

	<div class=" flex flex-col justify-center items-center">
		<Search />
	</div>

	<a
		href="/yourInstruments"
		class="block p-4 max-w-sm mx-auto rounded-lg shadow-lg hover:shadow-xl"
	>
		<h3 class="text-xl font-semibold mb-2">Your Instruments</h3>
	</a>
</AuthCheck>
