<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { userData } from '$lib/stores/DocStore';
	import { latitude, longitude } from '$lib/stores/GeoStore';
	import { onMount } from 'svelte';

	onMount( async() => {
		try{
			const res = await fetch('/api/location');
			const data = await res.json();
			$latitude = data.lat;
			$longitude = data.lon;
		} catch (error: any) {
			console.log(error.message);
		}
	});

</script>

<h1>your latitude is {$latitude} and your longitude is {$longitude}</h1>

<AuthCheck>
	<div class="flex flex-col items-center justify-center p-4 min-h-screen">
		<h1 class="text-2xl font-bold mb-10">Welcome {$userData?.username}</h1>
		<h2 class="text-2xl font-bold text-center">TODO</h2>
		<ul class="list-disc list-inside text-lg">
			<li class="mb-2 line-through">Add instrument</li>
			<li class="mb-2">Your instruments</li>
			<li class="mb-2">Messages / notifications / rental requests</li>
			<li class="mb-2">Recommended rentals near you</li>
			<li class="mb-2">Search bar</li>
		</ul>	
	</div>
	
</AuthCheck>
