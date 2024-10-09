<script lang="ts">
	import { page } from '$app/stores';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user } from '$lib/stores/AuthStore';
	import type { PageData } from './$types';

	export let data: PageData;
	const today = new Date().toISOString().split('T')[0];
	let startDate: string;

	// async function handleSubmit() {
	// 	const data = {
	// 		instrumentID: $page.params.id,
	// 		ownerID: i?.owner,
	// 		renterID: $user?.uid,
	// 		dates: {
	// 			start: startDate,
	// 			end: endDate
	// 		},
	// 		timestamp: Timestamp.fromDate(new Date())
	// 	};

	// 	addDoc(collection(db, 'requests'), data)
	// 		.then((docRef) => {
	// 			console.log('added document:', docRef.id, 'with data:', data);
	// 		})
	// 		.catch((error) => {
	// 			console.log('error', error.message);
	// 		});
	// }
</script>

<AuthCheck>
	{#if data.instrument}
		<div class="flex flex-col items-center p-10">
			<h2 class="text-2xl font-bold text-center p-2">{data.instrument.name}</h2>

			<div class="flex p-2">
				<img
					src={data.instrument.imageURL}
					alt="instrument"
					class="max-w-full max-h-[600px] object-cover"
				/>
			</div>

			<p class="max-w-prose p-2">{data.instrument.description}</p>

			<div class="h-screen flex flex-col items-center">
				<h2 class="text-2xl font-bold text-center p-2">Rental Request</h2>
				<form method="post">
					<div class="p-2">
						<label>
							Start
							<input type="date" name="startDate" bind:value={startDate} min={today} required />
						</label>
					</div>

					<div class="p-2">
						<label>
							End
							<input type="date" name="endDate" min={startDate} required />
						</label>
					</div>

					<button class="btn btn-primary w-full">Submit</button>
				</form>
			</div>
		</div>
	{/if}
</AuthCheck>
