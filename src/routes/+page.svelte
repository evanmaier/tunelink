<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { latitude, longitude } from '$lib/stores/GeoStore';
	import { onMount } from 'svelte';
	import { userData } from '$lib/stores/DocStore';

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

<h2 class="text-lg font-bold underline">TODO</h2>
<ul class="list-disc list-inside">
	<li class="mb-2">Delete users and instruments from DB</li>
	<li class="mb-2">Set location using address when uploading a new instrument</li>
	<li class="mb-2">Recommended rentals near you</li>
	<li class="mb-2">Search bar</li>
	<li class="mb-2">Messages / notifications / rental requests</li>
</ul>

<AuthCheck>
	<h1 class="text-2xl font-bold mb-10 text-center">Welcome {$userData?.username}</h1>

	<a
		href="/yourInstruments"
		class="block p-4 max-w-sm mx-auto rounded-lg shadow-lg hover:shadow-xl"
	>
		<h3 class="text-xl font-semibold mb-2">Your Instruments</h3>
	</a>
</AuthCheck>
