<script lang="ts">
	import { userData } from '$lib/stores/DocStore';
	import { type DocumentData, getDoc } from 'firebase/firestore';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

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

<h2 class="font-bold text-lg underline">Todo</h2>
<ul>
	<li>Editing</li>
	<li>Stats</li>
	<li>Removal</li>
</ul>

<AuthCheck>
	<h2 class="text-2xl font-bold text-center">Your Instruments</h2>
	<div class="flex p-4 justify-center">
		{#if $userData}
			{#each instruments as i}
				{#if i}
					<div class="flex flex-col w-96 p-4">
						<h3 class="text-bold text-xl text-center p-4">{i.year} {i.make} {i.model}</h3>
						{#each i.pictures as picURL}
							<img src={picURL} alt="instrument" class="max-w-full max-h-[400px] object-cover" />
						{/each}
					</div>
				{:else}
					<p>no instruments yet, consider adding one</p>
				{/if}
			{/each}
		{:else}
			<p>loading...</p>
		{/if}
	</div>
</AuthCheck>
