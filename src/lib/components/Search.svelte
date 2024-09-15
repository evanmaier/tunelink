<script lang="ts">
	import { onMount } from 'svelte';
	import algoliasearch from 'algoliasearch';
	import type { SearchClient, SearchIndex } from 'algoliasearch';

	let client: SearchClient;
    let index: SearchIndex
	let query = '';
    let hits: any[] = [];

	onMount(async () => {
		client = algoliasearch('1E1MHC45I5', 'e908d30f05b78357334a123381635a38');
		index = client.initIndex('instruments');
	});

	async function search() {
        try {
			const searchResponse = await index.search(query, { 
                hitsPerPage: 3,
                attributesToRetrieve: ['model', 'make', 'year', 'pictures'],  
            });
            hits = searchResponse.hits;
		} catch (error) {
			console.error('Error performing search:', error);
		}
	}
</script>

<div class='mb-4 w-4/12'>
    <input type="text" name="search" placeholder="Search" class="input input-bordered w-full" bind:value={query} on:keyup={search} />
</div>

<div class="grid grid-cols-1 gap-2 max-w-xs">
    {#each hits as hit }
    <div class="rounded-lg p-2 shadow-md">
        <div class='flex items-center'>
            <img 
                src="{hit.pictures[0]}" 
                alt="pic" 
                class="h-20 w-20 object-cover rounded-md mr-4" 
            />
            <div>
                <p class='text-lg font-semibold'>{hit.make} {hit.model}</p>
                <p class='text-md'>{hit.year}</p>
            </div>
        </div>
    </div>
    {/each}
</div>
