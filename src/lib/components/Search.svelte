<script lang="ts">
	import { onMount } from 'svelte';
	import { latitude, longitude } from '$lib/stores/GeoStore';
	import { user } from '$lib/stores/AuthStore';
	import algoliasearch from 'algoliasearch';
	import type { SearchClient, SearchIndex } from 'algoliasearch';
	import { goto } from '$app/navigation';
	import { loginSchema } from './Schemas';

	let client: SearchClient;
	let index: SearchIndex;
	let query = '';
	let searchHits: any[] = [];
	let localHits: any[] = [];
	let radius = 50;

	onMount(() => {
		client = algoliasearch('1E1MHC45I5', 'af24678105793bd1e288cfb617b53e2d');
		index = client.initIndex('instruments');
	});

	$: if ($latitude && $longitude && index) {
		localSearch();
	}

	async function userSearch() {
		index
			.search(query, {
				filters: `NOT owner:${$user?.uid}`,
				hitsPerPage: 3,
				attributesToRetrieve: ['name', 'imageURL', 'id']
			})
			.then(({ hits }) => {
				searchHits = hits;
			})
			.catch((error) => {
				console.error('Error performing user search:', error);
			});
	}

	async function localSearch() {
		index
			.search('', {
				filters: `NOT owner:${$user?.uid}`,
				aroundRadius: radius * 1000,
				aroundLatLng: `${$latitude}, ${$longitude}`,
				hitsPerPage: 3,
				attributesToRetrieve: ['name', 'imageURL', 'id']
			})
			.then(({ hits }) => {
				localHits = hits;
			})
			.catch((error) => {
				console.error('Error performing local search:', error);
			});
	}
</script>

<div class="p-4 w-full max-w-xl">
	<input
		type="text"
		name="search"
		placeholder="Search"
		class="input input-bordered w-full"
		bind:value={query}
		on:keyup={userSearch}
	/>
</div>

<div class="flex flex-col w-full max-w-xl">
	{#if query.length > 0}
		{#if searchHits.length == 0}
			<div class="flex rounded-lg p-2 shadow-md w-full items-center">
				<p class="text-lg font-semibold mx-auto">No Search Results</p>
			</div>
		{:else}
			{#each searchHits as hit}
				<button
					on:click={() => goto(`/items/${hit.objectID}`)}
					class="rounded-lg p-2 shadow-md w-full text-left"
				>
					<div class="flex items-center">
						<img src={hit.imageURL} alt="pic" class="h-20 w-20 object-cover rounded-md mr-4" />
						<p class="text-lg font-semibold">{hit.name}</p>
					</div>
				</button>
			{/each}
		{/if}
	{/if}
</div>

<h2 class="text-2xl font-bold text-center p-2">Local Instruments</h2>

<div class="flex flex-col items-center w-full max-w-sm">
	<label for="radius" class="label-text p-2">Radius (km)</label>
	<input
		type="range"
		min="1"
		max="101"
		id="radius"
		bind:value={radius}
		on:change={localSearch}
		class="range w-full"
		step="25"
	/>
	<div class="flex w-full justify-between px-2 text-xs">
		<span>1</span>
		<span>25</span>
		<span>50</span>
		<span>75</span>
		<span>100</span>
	</div>
</div>

<div
	class="grid gap-2 grid-cols-1 md:grid-cols-{Math.min(2, localHits.length)} lg:grid-cols-{Math.min(
		3,
		localHits.length
	)}"
>
	{#each localHits as hit}
		<button on:click={() => goto(`/items/${hit.objectID}`)} class="rounded-lg p-2 shadow-md">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">{hit.name}</h3>
				<img src={hit.imageURL} alt="pic" class="max-w-xs aspect-square object-cover rounded-md" />
			</div>
		</button>
	{/each}
</div>
