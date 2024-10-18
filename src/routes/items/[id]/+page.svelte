<script lang="ts">
	import { enhance } from '$app/forms';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user } from '$lib/stores/AuthStore';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';
	import { db } from '$lib/firebase';
	import { page } from '$app/stores';
	import { doc, getDoc, type DocumentData } from 'firebase/firestore';

	export let form: ActionData;
	const today = new Date().toISOString().split('T')[0];
	let startDate: string;
	let location = '';

	const instrumentRef = doc(db, 'instruments', $page.params.id);
	let instrumentData: DocumentData | undefined;

	onMount(async () => {
		const instrumentSnap = await getDoc(instrumentRef);
		instrumentData = instrumentSnap.data();
		geocode();
	});

	async function geocode() {
		const coords = `${instrumentData?._geoloc.lng},${instrumentData?._geoloc.lat}`;
		const response = await fetch('/api/mapbox/reverse', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ coords })
		});
		const data = await response.json();
		location = data.features[0].place_name;
	}
</script>

<AuthCheck>
	{#if instrumentData}
		<div class="flex flex-col justify-center gap-4 p-10">
			<div class="flex flex-col items-center gap-6 p-8 max-w-3xl mx-auto">
				<div class="flex gap-6">
					<img src={instrumentData.imageURL} alt="instrument" class="object-contain rounded-lg" />

					<div class="flex flex-col gap-2">
						<div class="flex items-center gap-2">
							<label for="name" class="label font-semibold">Name:</label>
							<p id="name">{instrumentData.name}</p>
						</div>

						<div class="flex items-center gap-2">
							<label for="price" class="label font-semibold">Price:</label>
							<p id="price">{instrumentData.price}</p>
						</div>

						<div class="flex items-center gap-2">
							<label for="owner" class="label font-semibold">Owner:</label>
							<p id="owner">{instrumentData.owner}</p>
						</div>

						<div class="flex items-center gap-2">
							<label for="available" class="label font-semibold">Available:</label>
							<p id="available">{instrumentData.available}</p>
						</div>

						<div class="flex items-center gap-2">
							<label for="condition" class="label font-semibold">Condition:</label>
							<p id="condition">{instrumentData.condition}</p>
						</div>

						<div class="flex items-baseline gap-2">
							<label for="description" class="label font-semibold">Description:</label>
							<p id="description">{instrumentData.description}</p>
						</div>

						<div class="flex items-baseline gap-2">
							<label for="location" class="label font-semibold">Location:</label>
							<p id="location">{location}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col items-center">
				<h2 class="text-2xl font-bold text-center p-2">Rental Request</h2>

				<form method="post" use:enhance>
					<input type="hidden" name="uid" value={$user?.uid} />
					<input type="hidden" name="ownerID" value={instrumentData?.ownerID} />

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
		</div>
	{/if}
</AuthCheck>
