<script lang="ts">
	import { enhance } from '$app/forms';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const today = new Date().toISOString().split('T')[0];
	let startDate: string;
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

<AuthCheck>
	{#if data.instrument}
		<div class="flex flex-col justify-center gap-4 p-10">
			<div class="flex flex-col items-center gap-6 p-8 max-w-3xl mx-auto">
				<h2 class="text-2xl font-bold text-center p-2">{data.instrument.name}</h2>

				<div class="flex gap-6 max-w-2xl">
					<img src={data.instrument.imageURL} alt="instrument" class=" max-w-sm object-contain rounded-lg" />

					<div class="flex flex-col gap-2">
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

						<div class="flex flex-col">
							<label for="description" class="text-lg font-semibold">Description</label>
							<p id="description" class="max-w-sm">{data.instrument.description}</p>
						</div>

						<div class="flex flex-col">
							<label for="location" class="text-lg font-semibold">Location</label>
							<p id="location" class="max-w-sm">{location}</p>
						</div>
					</div>
				</div>
			</div>
			{#if !data.instrument.available}
				<h3 class="text-xl font-bold text-center p-2">Instrument in not currently available</h3>
			{:else if data.existingRequest}
				<h3 class="text-xl font-bold text-center p-2">Existing request is currently active</h3>
			{:else}
				<div class="flex flex-col items-center">
					<h2 class="text-2xl font-bold text-center p-2">Rental Request</h2>

					<form method="post" use:enhance>
						<input type="hidden" name="ownerID" value={data.instrument?.ownerID} />

						<div class="flex">
							<div class="p-2">
								<label class="font-semibold">
									Start:
									<input type="date" name="startDate" bind:value={startDate} min={today} required />
								</label>
							</div>

							<div class="p-2">
								<label class="font-semibold">
									End:
									<input type="date" name="endDate" min={startDate} required />
								</label>
							</div>
						</div>

						<div class="p-2">
							<label class="font-semibold">
								Message
								<textarea
									name="message"
									value="Hello!"
									class="textarea textarea-bordered w-full"
									required
								/>
							</label>
						</div>
						<button class="btn btn-primary w-full">Submit</button>
						{#if form?.success}
							<p>Request Sent!</p>
						{/if}
						{#if form?.error}
							<p>Error: {form.error}</p>
						{/if}
					</form>
				</div>
			{/if}
		</div>
	{/if}
</AuthCheck>
