<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		doc,
		getDoc,
		addDoc,
		collection,
		Timestamp,
		type DocumentData
	} from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user } from '$lib/stores/AuthStore';

	let i: DocumentData | undefined;
	let startDate = '';
	let endDate = '';
	const today = new Date().toISOString().split('T')[0];

	onMount(async () => {
		try {
			const ref = doc(db, 'instruments', $page.params.id);
			const snapshot = await getDoc(ref);
			i = snapshot.data();
		} catch (error: any) {
			console.log(error.message);
		}
	});

	async function handleSubmit() {
		const data = {
			instrumentID: $page.params.id,
			ownerID: i?.owner,
			renterID: $user?.uid,
			dates: {
				start: startDate,
				end: endDate
			},
			updatedAt: Timestamp.fromDate(new Date())
		};

		addDoc(collection(db, 'requests'), data)
			.then((docRef) => {
				console.log('added document:', docRef.id, 'with data:', data);
			})
			.catch((error) => {
				console.log('error', error.message);
			});
	}
</script>

<AuthCheck>
	{#if i}
		<div class="flex flex-col items-center p-10">
			<h2 class="text-2xl font-bold text-center p-2">{i.name}</h2>

			<div class="flex p-2">
				{#each i.pictures as picURL}
					<img src={picURL} alt="instrument" class="max-w-full max-h-[600px] object-cover" />
				{/each}
			</div>

			<p class="max-w-prose p-2">{i.description}</p>

			{#each i.reviews as review}
				<div>{review}</div>
			{/each}

			<div class="h-screen flex flex-col items-center">
				<h2 class="text-2xl font-bold text-center p-2">Rental Request</h2>
				<form on:submit|preventDefault={handleSubmit}>
					<div class="p-2">
						<label>
							Start
							<input type="date" bind:value={startDate} min={today} required />
						</label>
					</div>

					<div class="p-2">
						<label>
							End
							<input type="date" bind:value={endDate} min={startDate} required />
						</label>
					</div>

					<button class="btn btn-primary w-full">Submit</button>
				</form>
			</div>
		</div>
	{/if}
</AuthCheck>
