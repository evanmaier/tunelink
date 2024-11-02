<script lang="ts">
	import { latitude, longitude } from '$lib/stores/GeoStore';
	import { onMount } from 'svelte';
	import Search from '$lib/components/Search.svelte';
	import logo from '$lib/assets/tunelink-high-resolution-logo-transparent.svg';

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

<div class=" flex flex-col justify-center items-center p-10">
	<div>
		<img src={logo} alt="logo" class="h-20 mb-10 object-cover" />
	</div>
	<Search />
</div>
