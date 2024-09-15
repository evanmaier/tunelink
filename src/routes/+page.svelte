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
	<h1 class="text-2xl font-bold p-10 text-center">Welcome {$userData?.username}</h1>

	<div class=" flex flex-col justify-center items-center">
		<Search />
	</div>

</AuthCheck>
