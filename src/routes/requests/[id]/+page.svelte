<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex flex-col items-center p-10">
    <h2 class="text-2xl font-bold text-center mb-10">Rental Requests</h2>
    {#each data?.requests as request}
    <div class="flex items-center gap-4">
        <img src={request.imageURL} alt="pic" class="h-20 w-20 object-cover rounded-md mr-4" />
        <p class="text-lg font-semibold">{request.message}</p>
        <p>{request.date.toISOString().split('T')[0]}</p>
    </div>
    {/each}
</div>
