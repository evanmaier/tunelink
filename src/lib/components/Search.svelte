<script lang="ts">
	import { onMount } from 'svelte';
	import { latitude, longitude } from '$lib/stores/GeoStore';
	import algoliasearch from 'algoliasearch';
	import type { SearchClient, SearchIndex } from 'algoliasearch';
	import { goto } from '$app/navigation';

	let client: SearchClient;
	let index: SearchIndex;
	let query = '';
	let searchHits: any[] = [];
	let localHits: any[] = [];
	let radius = 10; // 10 km

	onMount(async () => {
		client = algoliasearch('1E1MHC45I5', 'af24678105793bd1e288cfb617b53e2d');
		index = client.initIndex('instruments');
		localSearch();
	});

	async function userSearch() {
		await index.search(query, {
            hitsPerPage: 3,
            attributesToRetrieve: ['name', 'pictures', 'id'],
        }).then(({hits})=> {
            searchHits = hits;
        }).catch((error)=> {
			console.error('Error performing user search:', error);
		});
	}

	async function localSearch() {
		await index.search('', {
            aroundRadius: radius*1000,
            aroundLatLng: `${$latitude}, ${$longitude}`,
            hitsPerPage: 3,
            attributesToRetrieve: ['name', 'pictures', 'id'],
        }).then(({hits})=> {
            localHits = hits;
        }).catch((error)=> {
			console.error('Error performing local search:', error);
		});
    }

	function gotoitem(hit: any) {
		goto(`/items/${hit.objectID}`);
	}
</script>

<div class="mb-4 w-4/12">
	<input
		type="text"
		name="search"
		placeholder="Search"
		class="input input-bordered w-full"
		bind:value={query}
		on:keyup={userSearch}
	/>
</div>

<div class="grid grid-cols-1 gap-2 max-w-xs">
	{#each searchHits as hit}
		<button on:click={() => gotoitem(hit)} class="rounded-lg p-2 shadow-md w-full text-left">
			<div class="flex items-center">
				<img src={hit.pictures[0]} alt="pic" class="h-20 w-20 object-cover rounded-md mr-4" />
				<p class="text-lg font-semibold">{hit.name}</p>
			</div>
		</button>
	{/each}
</div>

<h2 class='text-2xl font-bold text-center mt-10'>Local Instruments</h2>

<div class='flex flex-row items-center space-x-2'>
    <label for="radius" class='label-text'>Search Radius km</label>
    <input type="text" id='radius' bind:value={radius} on:change={localSearch} placeholder="search radius (m)" class='max-w-20'>
</div>


<div class="grid grid-flow-col auto-cols-max gap-2">
	{#each localHits as hit}
		<button on:click={() => gotoitem(hit)} class="rounded-lg p-2 shadow-md w-full text-left">
			<div class="flex flex-col items-center">
				<h3 class="text-lg font-semibold">{hit.name}</h3>
				<img src={hit.pictures[0]} alt="pic" class="h-96 w-96 object-cover rounded-md mr-4" />
			</div>
		</button>
	{/each}
</div>
