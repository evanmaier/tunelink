<script lang="ts">
	import { deleteDoc, doc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	async function deleteInstrument(id: string) {
		try {
			const ref = doc(db, 'instruments', id);
			await deleteDoc(ref);
			console.log('instrument deleted');
		} catch (error: any) {
			console.log(error.message);
		}
	}
</script>

<AuthCheck>
	<h2 class="text-2xl font-bold text-center">Your Instruments</h2>
	<div class="p-4 place-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
		{#each data.instruments as i}
			<div class="flex flex-col w-96 p-4">
				<h3 class="text-bold text-xl text-center p-4">{i.name}</h3>
				<img src={i.imageURL} alt="instrument" class="aspect-square object-cover" />
				<button on:click={() => goto(`yourInstruments/edit/${i.id}`)} class="btn btn-primary mt-2"
					>Edit</button
				>
				<button on:click={() => deleteInstrument(i.id)} class="btn btn-error mt-2">Delete</button>
			</div>
		{/each}
	</div>
</AuthCheck>
