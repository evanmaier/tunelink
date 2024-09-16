<script lang="ts">
	import { db, storage } from '$lib/firebase';
	import {
		doc,
		collection,
		setDoc,
		Timestamp,
		DocumentReference,
		updateDoc
	} from 'firebase/firestore';
	import { user } from '$lib/stores/AuthStore';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { userData } from '$lib/stores/DocStore';
	import { longitude, latitude } from '$lib/stores/GeoStore.js';

	type Review = {
		comment: string;
		createdAt: Timestamp;
		rating: number;
		userID: string;
	};

	let available = true;
	let category: string;
	let condition: string;
	let description: string;
	let make: string;
	let model: string;
	let year: number;
	let pictures: Array<string> = [];
	let pricePerDay: number;
	let address: string;
	let preview = '';
	let lat = 0;
	let lon = 0;
	let owner = '';

	let form: any;

	const instrumentRef = doc(collection(db, 'instruments'));
	let userRef: DocumentReference;
	if ($user) {
		userRef = doc(db, 'users', $user.uid);
	}

	async function upload(e: any) {
		const files: Array<File> = [...e.target.files];
		const storageRef = ref(storage, `instruments/${instrumentRef.id}`);

		files.forEach(async (image: any) => {
			const result = await uploadBytes(storageRef, image);
			const url = await getDownloadURL(result.ref);
			pictures.push(url);
		});
	}

	async function handleSubmit() {
		if ($user) {
			owner = $user.uid;
		}

		const data = {
			available,
			category,
			condition,
			createdAt: Date.now(),
			description,
			location: {lat, lon},
			make,
			model,
			year,
			owner,
			pictures,
			pricePerDay,
			reviews: new Array<Review>(),
		};

		let instruments = $userData?.instruments;
		if (!instruments) {
			instruments = [];
		}

		// update instruments array in user collection
		await setDoc(instrumentRef, data)
			.then(async () => {
				instruments.push(instrumentRef.id);
				await updateDoc(userRef, {
					instruments
				});
			})
			.catch((error) => {
				console.log(error.message);
			});

		form.reset();
	}

	async function geocode() {
		if (address && address.length > 4) {
			const location = `${$longitude},${$latitude}`;
			const response = await fetch('/api/mapbox', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ address, location })
			});
			const data = await response.json();
			try {
				preview = data.features[0].place_name;
				[lon, lat] = data.features[0].center;
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
			<div class="flex">
				<input
					on:input={geocode}
					type="text"
					bind:value={address}
					class="input input-bordered w-full max-w-xs"
				/>
				<button class="btn btn-success" on:click|preventDefault={confirmAddress}>Confirm</button>
			</div>

			<p class="text-sm max-w-xs">{preview}</p>

			<div class="py-4">
				<button type="submit" class="btn btn-primary w-full">Submit</button>
			</div>
		</form>
	</div>
</AuthCheck>
