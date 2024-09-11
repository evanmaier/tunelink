<script lang="ts">
	import { userData } from '$lib/stores/DocStore';
	import AuthCheck from './AuthCheck.svelte';
</script>

<AuthCheck>
	<div class="flex flex-col items-center justify-center p-4 h-full w-full">
		<h1 class="text-2xl font-bold mb-10">Welcome {$userData?.username}</h1>
		<h2 class="text-2xl font-bold text-center underline">TODO</h2>
		<ul class="list-disc list-inside text-lg">
			<li class="mb-2">Link user data structure to owned instruments</li>
			<li class="mb-2">Delete users and instruments from DB</li>
			<li class="mb-2">Set location using address when uploading a new instrument</li>
			<li class="mb-2">Recommended rentals near you</li>
			<li class="mb-2">Search bar</li>
			<li class="mb-2">Messages / notifications / rental requests</li>
		</ul>
	</div>
</AuthCheck>
