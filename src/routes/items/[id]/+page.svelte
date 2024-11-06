<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { user } from '$lib/stores/AuthStore';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: PageData;

	let location = '';

	onMount(async () => {
		if (!data.instrument) return;

		const coords = `${data.instrument._geoloc.lng},${data.instrument._geoloc.lat}`;

		const response = await fetch('/api/mapbox/reverse', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ coords })
		});

		const res = await response.json();
		location = res.features[0].place_name;
	});
</script>

{#if data.instrument}
	<div class="flex flex-col p-2 h-[calc(100vh-4rem)]">
		<div class="flex flex-col items-center">
			<h2 class="text-2xl font-bold text-center">{data.instrument.name}</h2>

			<div class="flex flex-col w-screen items-center">
				<img
					src={data.instrument.imageURL}
					alt="instrument"
					class=" w-[95vw] aspect-square object-cover rounded-lg"
				/>

				<div class="grid grid-cols-1 grid-rows-2 gap-2 p-2">
					<div class="flex justify-between items-center">
						<div class="flex flex-col">
							<label for="price" class="text-lg font-semibold">Price</label>
							<p id="price">$ {data.instrument.price}</p>
						</div>

						{#if data.ownerName}
							<div class="flex flex-col">
								<label for="owner" class="text-lg font-semibold">Owner</label>
								<p id="owner">{data.ownerName}</p>
							</div>
						{/if}

						<div class="flex flex-col">
							<label for="available" class="text-lg font-semibold">Available</label>
							<p id="available">{data.instrument.available}</p>
						</div>

						<div class="flex flex-col">
							<label for="condition" class="text-lg font-semibold">Condition</label>
							<p id="condition">{data.instrument.condition}</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label for="description" class="text-lg font-semibold">Description</label>
						<p id="description" class="max-w-sm">{data.instrument.description}</p>
					</div>

					<div class="flex flex-col">
						<label for="location" class="text-lg font-semibold">Location</label>
						<p id="location" class="max-w-sm">{location}</p>
					</div>

					<div class="flex justify-start">
						{#if !data.instrument.available}
							<h3 class="text-xl font-bold">Instrument Not Available</h3>
						{:else if data.existingRequest}
							<h3 class="text-xl font-bold">Existing Request Is Active</h3>
						{:else if $user}
							<button
								class="btn btn-primary w-full"
								on:click={() => goto(`/requests/new/${$page.params.id}`)}>Request Rental</button
							>
						{:else}
							<button class="btn btn-primary" on:click={() => goto('/login')}
								>Sign in to request rental</button
							>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
