<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;
	function gotoRequest(id: string) {
		goto(`/request/${id}`);
	}
</script>

<div class="flex flex-col items-center gap-4 p-10">
	<h2 class="text-2xl font-bold text-center mb-5">Rental Requests</h2>
	<div class="grid grid-cols-3 gap-4 items-center">
		{#each data?.requests as request}
			<button
				on:click={() => gotoRequest(request?.id)}
				class="rounded-lg p-2 shadow-md w-full text-left"
			>
				<img src={request.imageURL} alt="pic" class="h-20 w-20 object-cover rounded-md" />
				<p class="text-lg font-semibold">{request.message}</p>
				<p>{request.date.toISOString().split('T')[0]}</p>
			</button>
		{/each}
	</div>
</div>
