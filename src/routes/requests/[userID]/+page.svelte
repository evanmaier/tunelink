<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	export let data: PageData;

	function gotoRequest(id: string) {
		goto(`/request/${id}`);
	}
</script>

<AuthCheck>
	<h2 class="text-2xl font-bold text-center p-10">Rental Requests</h2>

	<div class="flex flex-col items-center justify-center gap-4">
		<div class="flex flex-col gap-5 shadow-md rounded-lg p-2 w-1/3 min-h-32">
			<h3 class="text-xl font-semibold text-center">Pending</h3>
			{#if data.pending}
				{#each data.pending as request}
					<button
						on:click={() => gotoRequest(request?.id)}
						class="rounded-lg p-2 border-2 border-gray-600 w-full"
					>
						<div class="flex flex-row gap-4 items-center w-full">
							<img src={request.imageURL} alt="pic" class="h-20 w-20 object-cover rounded-md" />
							<p class="text-md font-semibold flex-1">{request.message}</p>
							<p class="ml-auto">{request.date.toISOString().split('T')[0]}</p>
						</div>
					</button>
				{/each}
			{/if}
		</div>

		<div class="flex flex-col gap-5 shadow-md rounded-lg p-2 w-1/3 min-h-32">
			<h3 class="text-xl font-semibold text-center">Accepted</h3>
			{#if data.accepted}
				{#each data.accepted as request}
					<button
						on:click={() => gotoRequest(request?.id)}
						class="rounded-lg p-2 border-2 border-gray-600 w-full"
					>
						<div class="flex flex-row gap-4 items-center w-full">
							<img src={request.imageURL} alt="pic" class="h-20 w-20 object-cover rounded-md" />
							<p class="text-md font-semibold flex-1">{request.message}</p>
							<p class="ml-auto">{request.date.toISOString().split('T')[0]}</p>
						</div>
					</button>
				{/each}
			{/if}
		</div>

		<div class="flex flex-col gap-5 shadow-md rounded-lg p-2 w-1/3 min-h-32">
			<h3 class="text-xl font-semibold text-center">Declined</h3>
			{#if data.declined}
				{#each data.declined as request}
					<button
						on:click={() => gotoRequest(request?.id)}
						class="rounded-lg p-2 border-2 border-gray-600 w-full"
					>
						<div class="flex flex-row gap-4 items-center w-full">
							<img src={request.imageURL} alt="pic" class="h-20 w-20 object-cover rounded-md" />
							<p class="text-md font-semibold flex-1">{request.message}</p>
							<p class="ml-auto">{request.date.toISOString().split('T')[0]}</p>
						</div>
					</button>
				{/each}
			{/if}
		</div>
	</div>
</AuthCheck>
