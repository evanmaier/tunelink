<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { latitude, longitude } from '$lib/stores/GeoStore';
	import { onMount } from 'svelte';
	import YourGear from '$lib/components/YourGear.svelte';
	import Todo from '$lib/components/Todo.svelte';

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
	<div class="flex h-full">
		<!-- Left side -->
		<div class="w-1/2 relative">
			<div class="absolute right-0 top-0 h-full"></div>
			<YourGear />
		</div>

		<!-- Right side -->
		<div class="w-1/2">
			<Todo />
		</div>
	</div>
</AuthCheck>
