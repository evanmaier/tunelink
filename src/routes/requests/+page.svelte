<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	export let data: PageData;
</script>

<AuthCheck>
	<h2 class="text-2xl font-bold text-center">Rentals</h2>

	<div class="h-[95vh] grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col gap-2 shadow-md rounded-lg p-2 overflow-y-auto">
			<h3 class="text-xl font-semibold text-center">Pending</h3>
			{#if data.pending}
				{#each data.pending as request}
					<button
						on:click={() => goto(`requests/${request?.id}`)}
						class="rounded-lg p-2 border-2 border-gray-600 w-full"
					>
						<div class="flex flex-row gap-4 items-center">
							<img src={request.imageURL} alt="pic" class="h-20 w-20 object-cover rounded-md" />
							<p class="text-md font-semibold flex-1">{request.message}</p>
							<p class="ml-auto">{request.date.toISOString().split('T')[0]}</p>
						</div>
					</button>
				{/each}
			{/if}
		</div>

		<div class="flex flex-col gap-2 shadow-md rounded-lg p-2 overflow-y-auto">
			<h3 class="text-xl font-semibold text-center">Accepted</h3>
			{#if data.accepted}
				{#each data.accepted as request}
					<button
						on:click={() => goto(`requests/${request?.id}`)}
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

		<div class="flex flex-col gap-2 shadow-md rounded-lg p-2 overflow-y-auto">
			<h3 class="text-xl font-semibold text-center">Declined</h3>
			{#if data.declined}
				{#each data.declined as request}
					<button
						on:click={() => goto(`requests/${request?.id}`)}
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

		<div class="flex flex-col gap-2 shadow-md rounded-lg p-2 overflow-y-auto">
			<h3 class="text-xl font-semibold text-center">Active</h3>
			{#if data.active}
				{#each data.active as request}
					<button
						on:click={() => goto(`requests/${request?.id}`)}
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

		<div class="flex flex-col gap-2 shadow-md rounded-lg p-2 overflow-y-auto">
			<h3 class="text-xl font-semibold text-center">Complete</h3>
			{#if data.complete}
				{#each data.complete as request}
					<button
						on:click={() => goto(`requests/${request?.id}`)}
						class="rounded-lg p-2 border-2 border-gray-600 w-full"
					>
						<div class="flex flex-row gap-4 items-center">
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
