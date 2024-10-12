<script lang="ts">
	import { enhance } from '$app/forms';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user } from '$lib/stores/AuthStore';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;
	const today = new Date().toISOString().split('T')[0];
	let startDate: string;
</script>

<AuthCheck>
	<div class="flex flex-col items-center p-10">
		<h2 class="text-2xl font-bold text-center p-2">{data?.name}</h2>

		<div class="flex p-2">
			<img src={data?.imageURL} alt="instrument" class="max-w-full max-h-[600px] object-cover" />
		</div>

		<p class="max-w-prose p-2">{data?.description}</p>

		<div class="h-screen flex flex-col items-center">
			<h2 class="text-2xl font-bold text-center p-2">Rental Request</h2>

			<form method="post" use:enhance>
				<input type="hidden" name="uid" value={$user?.uid} />

				<div class="flex">
					<div class="p-2">
						<label class="label-text">
							Start
							<input type="date" name="startDate" bind:value={startDate} min={today} required />
						</label>
					</div>

					<div class="p-2">
						<label class="label-text">
							End
							<input type="date" name="endDate" min={startDate} required />
						</label>
					</div>
				</div>

				<div class="p-2">
					<label class="label-text">
						Message
						<textarea
							name="message"
							value="Hello!"
							class="textarea textarea-bordered w-full"
							required
						/>
					</label>
				</div>
				<button class="btn btn-primary w-full">Submit</button>
				{#if form?.success}
					<p>Request Sent!</p>
				{/if}
				{#if form?.error}
					<p>Error: {form.error}</p>
				{/if}
			</form>
		</div>
	</div>
</AuthCheck>
