<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { doc, getDoc, type DocumentData } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import type { ActionData } from './$types';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { enhance } from '$app/forms';

	export let form: ActionData;
	let i: DocumentData | undefined;
	const ref = doc(db, 'instruments', $page.params.id);

	onMount(async () => {
		try {
			const snapshot = await getDoc(ref);
			i = snapshot.data();
		} catch (error: any) {
			console.log(error.message);
		}
	});
</script>

<AuthCheck>
	<div class="h-screen flex flex-col m-4">
		<form method="POST" use:enhance >
			<h2 class="text-2xl font-bold text-center">Edit Instrument</h2>
	
			<input type="hidden" name="id" value={ref?.id} />
	
			<label class="label">
				Available
				<input name="available" type="checkbox" checked={i?.available} class="toggle" />
			</label>
	
			<label for="name" class="label">Name</label>
			<input id="name" name="name" type="text" value={i?.name} class="input input-bordered w-full" />
	
			<label for="price" class="label">Price</label>
			<input
				id="price"
				name="price"
				type="number"
				value={i?.price}
				class="input input-bordered w-full"
			/>
	
			<label for="condition" class="label">Condition</label>
			<select
				id="condition"
				name="condition"
				value={i?.condition}
				class="select select-bordered w-full"
			>
				<option>Excellent</option>
				<option>Good</option>
				<option>Poor</option>
			</select>
	
			<label for="description" class="label">Description</label>
			<textarea
				id="description"
				name="description"
				value={i?.description}
				class="textarea textarea-bordered w-full"
			/>
	
			<button type="submit" class="btn btn-primary w-full">Submit</button>
	
			{#if form?.error}
				<p class="text-error">{form?.error}</p>
			{/if}
		</form>
	</div>
	
</AuthCheck>
