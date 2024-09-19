<!-- <script lang='ts'>
    import { latitude, longitude } from '$lib/stores/GeoStore';
	import { onMount } from 'svelte';
	import algoliasearch from 'algoliasearch';
	import type { SearchClient, SearchIndex } from 'algoliasearch';


	let client: SearchClient;
	let index: SearchIndex;

    onMount(async () => {
		client = algoliasearch('1E1MHC45I5', 'af24678105793bd1e288cfb617b53e2d');
		index = client.initIndex('instruments');
        search();
	});

    async function localSearch() {
		await index.search('', {
            aroundRadius: radius,
            aroundLatLng: `${$latitude}, ${$longitude}`,
            hitsPerPage: 3,
            attributesToRetrieve: ['name', 'pictures', 'id'],
        }).then(({hits})=> {
            results = hits;
        });
    }
        
</script>

<h2 class='text-2xl font-bold text-center mt-10'>Local Instruments</h2>

<div class='flex flex-col items-center'>
    <label for="radius" class='label-text'>Search Radius</label>
    <input type="text" id='radius' bind:value={radius} on:change={search} placeholder="search radius (m)" class='max-w-24'>
</div>

<div class='flex p-4'>
    {#each results as hit}
        <div class="flex flex-col w-96 h-96 p-4">
            <h3 class="text-bold text-xl text-center p-4">{hit.name}</h3>
            <img src={hit.pictures[0]} alt="instrument" class="max-w-full max-h-[400px] object-cover" />
        </div>
    {/each}
</div> -->