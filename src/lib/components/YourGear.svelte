<script lang="ts">
	import { userData } from '$lib/stores/DocStore';
	import { type DocumentData, getDoc } from 'firebase/firestore';
	import AuthCheck from './AuthCheck.svelte';

	let instruments: Array<DocumentData | undefined> = [];
	$: if ($userData?.instruments) {
		instruments = [];
		Promise.all(
			$userData.instruments.map(async (ref) => {
				try {
					const doc = await getDoc(ref);
					return doc.data();
				} catch {
					console.log('something went wrong');
					return undefined;
				}
			})
		).then((docs) => {
			instruments = docs.filter((doc) => doc);
		});
	}
</script>

<AuthCheck>
	<div class="flex flex-col p-4 items-center justify-center">
		<h2 class="text-2xl font-bold">your instruments:</h2>
		{#if $userData}
			{#each instruments as i}
				{#if i}
					<h3>{i.year} {i.make} {i.model}</h3>
					{#each i.pictures as picURL}
						<img src={picURL} alt="instrument" class="max-w-full max-h-[400px] object-cover" />
					{/each}
					<p>{i.description}</p>
				{:else}
					<p>no instruments yet, consider adding one</p>
				{/if}
			{/each}
		{:else}
			<p>loading...</p>
		{/if}
	</div>
</AuthCheck>
