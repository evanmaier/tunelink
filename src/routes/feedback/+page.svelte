<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../addInstrument/$types';
	export let form: ActionData;
</script>

<div class="grid items-center mx-auto max-w-2xl p-4">
	<form method="post" class="flex flex-col gap-4" use:enhance>
		<h2 class="font-bold text-2xl text-center">Feedback</h2>
		<textarea
			name="content"
			placeholder="Type here"
			class="textarea textarea-bordered textarea-lg min-h-60"
			required
		/>
		<button class="btn btn-primary text-white">Submit</button>
		{#if form?.success}
			<p class=" text-green-800 text-lg">Feedback Submitted</p>
		{/if}
		{#if form?.error}
			<p class="text-red-800 text-lg">Error: {form.error}</p>
		{/if}
	</form>
</div>
