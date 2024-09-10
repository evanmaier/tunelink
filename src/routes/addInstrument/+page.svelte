<script lang="ts">
	import { db, storage } from '$lib/firebase';
	import {
		doc,
		collection,
		setDoc,
		GeoPoint,
		Timestamp,
		DocumentReference
	} from 'firebase/firestore';
	import { user } from '$lib/stores/AuthStore';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	type Review = {
		comment: string;
		createdAt: Timestamp;
		rating: number;
		user: DocumentReference;
	};

	let available = true;
	let category: string;
	let condition: string;
	let description: string;
	let make: string;
	let model: string;
	let year: number;
	let path: string;
	let pictures: Array<string> = [];
	let pricePerDay: number;
	let address: string;

	let form: any;

	const instrumentRef = doc(collection(db, 'instruments'));

	async function upload(e: any) {
		const files: Array<File> = [...e.target.files];
		const storageRef = ref(storage, `instruments/${instrumentRef.id}`);

		files.forEach(async (image: any) => {
			const result = await uploadBytes(storageRef, image);
			const url = await getDownloadURL(result.ref);
			pictures.push(url);
		});
	}

	async function handleSubmit(event: any) {
		if ($user) {
			path = `users/${$user.uid}`;
		}

		const data = {
			available: available,
			category: category,
			condition: condition,
			createdAt: Date.now(),
			description: description,
			location: new GeoPoint(0, 0), //TODO: user set location by address
			make: make,
			model: model,
			year: year,
			owner: doc(db, path),
			pictures: pictures,
			pricePerDay: pricePerDay,
			reviews: new Array<Review>()
		};

		console.log(data);

		await setDoc(instrumentRef, data).catch((error) => {
			console.log(error.message);
		});

		form.reset();
	}
</script>

<AuthCheck>
	<div class="h-screen flex flex-col items-center justify-center">
		<h2 class="mb-4">Add an instrument</h2>
		<form bind:this={form} on:submit|preventDefault={handleSubmit}>
			<div class="form-control mb-4">
				<label class="label cursor-pointer">
					<span class="label-text">Available</span>
					<input type="checkbox" class="toggle" bind:checked={available} required />
				</label>
			</div>

			<div class="label">
				<span class="label-text">Category</span>
			</div>
			<div class="mb-4">
				<select bind:value={category} class="select select-bordered w-full max-w-xs" required>
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
				<select bind:value={condition} class="select select-bordered w-full max-w-xs" required>
					<option disabled selected>Select</option>
					<option>Excellent</option>
					<option>Good</option>
					<option>Poor</option>
				</select>
			</div>

			<div class="label">
				<span class="label-text">Description</span>
			</div>
			<textarea
				bind:value={description}
				class="textarea textarea-bordered w-full max-w-xs"
				required
			/>

			<div class="label">
				<span class="label-text">Make</span>
			</div>
			<input type="text" bind:value={make} class="input input-bordered w-full max-w-xs" required />

			<div class="label">
				<span class="label-text">Model</span>
			</div>
			<input type="text" bind:value={model} class="input input-bordered w-full max-w-xs" required />

			<div class="label">
				<span class="label-text">Year</span>
			</div>
			<input type="text" bind:value={year} class="input input-bordered w-full max-w-xs" required />

			<div class="label">
				<span class="label-text">Price per day</span>
			</div>
			<input
				type="text"
				bind:value={pricePerDay}
				class="input input-bordered w-full max-w-xs"
				required
			/>

			<div class="label">
				<span class="label-text">Choose images</span>
			</div>
			<input
				on:change={upload}
				type="file"
				multiple
				class="file-input file-input-bordered w-full max-w-xs"
				accept="image/png, image/jpeg, image/gif, image/webp"
				required
			/>

			<div class="label">
				<span class="label-text">Address</span>
			</div>
			<input
				type="text"
				bind:value={address}
				placeholder="TODO!"
				class="input input-bordered w-full max-w-xs"
			/>

			<div class="py-4">
				<button type="submit" class="btn btn-primary w-full">Submit</button>
			</div>
		</form>
	</div>
</AuthCheck>
