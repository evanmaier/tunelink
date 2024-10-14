<script lang="ts">
	import { db, storage } from '$lib/firebase';
	import { doc, collection } from 'firebase/firestore';
	import { user } from '$lib/stores/AuthStore';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { longitude, latitude } from '$lib/stores/GeoStore.js';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	let imageURL: string;
	let address: string;
	let preview = '';
	let lat = 0;
	let lng = 0;

	// creates reference to new document in instruments
	const instrumentRef = doc(collection(db, 'instruments'));

	async function upload(e: any) {
		const image = e.target.files[0];
		const storageRef = ref(storage, `instruments/${instrumentRef.id}`);
		const result = await uploadBytes(storageRef, image);
		imageURL = await getDownloadURL(result.ref);
	}

	async function geocode() {
		if (address) {
			const location = `${$longitude},${$latitude}`;
			const response = await fetch('/api/mapbox/forward', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ address, location })
			});
			const data = await response.json();
			try {
				preview = data.features[0].place_name;
				[lng, lat] = data.features[0].center;
			} catch {
				preview = 'keep typing';
			}
		}
	}

	function confirmAddress() {
		address = preview;
		preview = '';
	}
</script>

<AuthCheck>
	<div class="h-screen flex flex-col items-center">
		<h2 class="text-2xl font-bold text-center p-2">Add Instrument</h2>
		<form method="post" use:enhance>
			<input type="hidden" name="uid" value={$user?.uid} />
			<input type="hidden" name="lat" value={lat} />
			<input type="hidden" name="lng" value={lng} />
			<input type="hidden" name="imageURL" value={imageURL} />
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Available</span>
					<input type="checkbox" class="toggle" name="available" checked={true} required />
				</label>
			</div>

			<div class="label">
				<span class="label-text">Category</span>
			</div>
			<div class="mb-4">
				<select name="category" class="select select-bordered w-full" required>
					<option disabled selected>Select</option>
					<option>Guitar</option>
					<option>Bass</option>
					<option>Other</option>
				</select>
			</div>

			<div class="label">
				<span class="label-text">Condition</span>
			</div>
			<div class="mb-4">
				<select name="condition" class="select select-bordered w-full" required>
					<option disabled selected>Select</option>
					<option>Excellent</option>
					<option>Good</option>
					<option>Poor</option>
				</select>
			</div>

			<div class="label">
				<span class="label-text">Name</span>
			</div>
			<input type="text" name="name" class="input input-bordered w-full" required />

			<div class="label">
				<span class="label-text">Price</span>
			</div>
			<input type="number" name="price" class="input input-bordered w-full" required />

			<div class="label">
				<span class="label-text">Description</span>
			</div>
			<textarea name="description" class="textarea textarea-bordered w-full" required />

			<div class="label">
				<span class="label-text">Address</span>
			</div>
			<div class="flex flex-col">
				<input
					name="address"
					on:input={geocode}
					type="text"
					bind:value={address}
					class="input input-bordered w-full"
				/>
				<button on:click|preventDefault={confirmAddress} class="text-sm max-w-[300px] truncate"
					>{preview}</button
				>
			</div>

			<div class="label">
				<span class="label-text">Choose image</span>
			</div>
			<input
				on:change={upload}
				type="file"
				class="file-input file-input-bordered w-full"
				accept="image/png, image/jpeg, image/gif, image/webp"
				required
			/>

			<div class="py-4">
				<button type="submit" class="btn btn-primary w-full">Submit</button>
			</div>
			{#if form?.success}
				<p>Success!</p>
			{/if}
			{#if form?.error}
				<p>Error: {form.error}</p>
			{/if}
		</form>
	</div>
</AuthCheck>
