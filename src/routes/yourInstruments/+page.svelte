<script lang="ts">
	import { user } from '$lib/stores/AuthStore';
	import {
		onSnapshot,
		deleteDoc,
		query,
		collection,
		where,
		type DocumentReference
	} from 'firebase/firestore';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	interface Item {
		name: string;
		imageURL: string;
		ref: DocumentReference;
	}
	const instruments = writable<Item[]>([]);

	const instrumentRef = collection(db, 'instruments');

	$: if ($user?.uid) {
		const q = query(instrumentRef, where('owner', '==', $user?.uid));
		const unsubscribe = onSnapshot(q, (qSnapshot) => {
			instruments.set(
				qSnapshot.docs.map((doc) => {
					return {
						name: doc.get('name'),
						imageURL: doc.get('imageURL'),
						ref: doc.ref
					};
				})
			);
		});
		onDestroy(() => unsubscribe());
	}

	async function deleteInstrument(iRef: DocumentReference) {
		try {
			await deleteDoc(iRef);
			console.log('instrument deleted');
		} catch (error: any) {
			console.log(error.message);
		}
	}

	function gotoEdit(id: string) {
		goto(`yourInstruments/edit/${id}`);
	}
</script>

<AuthCheck>
	<h2 class="text-2xl font-bold text-center">Your Instruments</h2>
	<div class="flex flex-col p-4 justify-center items-center">
		{#each $instruments as item}
			<div class="flex flex-col w-96 p-4">
				<h3 class="text-bold text-xl text-center p-4">{item.name}</h3>
				<img src={item.imageURL} alt="instrument" class="max-w-full max-h-[400px] object-cover" />
				<button on:click={() => gotoEdit(item.ref.id)} class="btn btn-primary mt-2">Edit</button>
				<button on:click={() => deleteInstrument(item.ref)} class="btn btn-error mt-2"
					>Delete</button
				>
			</div>
		{/each}
	</div>
</AuthCheck>
