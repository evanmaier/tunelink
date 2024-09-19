<script lang="ts">
	import { userData } from '$lib/stores/DocStore';
	import { user } from '$lib/stores/AuthStore';
	import {
		doc,
		getDoc,
		deleteDoc,
		updateDoc,
		type DocumentData,
		type DocumentReference
	} from 'firebase/firestore';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db } from '$lib/firebase';

	// get the user's instrument objects
	let iPromise: Promise<Map<DocumentReference, DocumentData>>;
	$: if ($userData?.instruments) {
		iPromise = getInstruments($userData.instruments);
	}

	async function getInstruments(ids: Array<string>) {
		let iMap: Map<DocumentReference, DocumentData> = new Map();
		for (const id of ids) {
			const ref = doc(db, 'instruments', id);
			const snap = await getDoc(ref);
			if (snap.exists()) {
				iMap.set(ref, snap.data());
			}
		}
		return iMap;
	}

	async function deleteInstrument(iRef: DocumentReference) {
		await deleteDoc(iRef);
		// update instruments array in user document
		if ($user && $userData?.instruments) {
			const userRef = doc(db, 'users', $user?.uid);
			const i = $userData?.instruments.filter((id) => iRef.id != id);
			await updateDoc(userRef, {
				instruments: i
			});
		}
	}
</script>

<AuthCheck>
	{#await iPromise}
		<p>Loading Instruments...</p>
	{:then iMap}
		<h2 class="text-2xl font-bold text-center">Your Instruments</h2>
		<div class="flex flex-col p-4 justify-center items-center">
			{#each [...(iMap || [])] as [ref, iData]}
				{#if iData}
					<div class="flex flex-col w-96 p-4">
						<h3 class="text-bold text-xl text-center p-4">{iData.name}</h3>
						{#each iData.pictures as picURL}
							<img src={picURL} alt="instrument" class="max-w-full max-h-[400px] object-cover" />
						{/each}
						<button on:click={() => deleteInstrument(ref)} class="btn btn-error mt-2">Delete</button
						>
					</div>
				{/if}
			{/each}
		</div>
	{/await}
</AuthCheck>
