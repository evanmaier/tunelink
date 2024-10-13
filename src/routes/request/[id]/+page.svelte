<script lang="ts">
	import type { PageData } from './$types';
	import { user } from '$lib/stores/AuthStore';
	export let data: PageData;
</script>

<div class="grid grid-cols-2 gap-4 p-4">
	<div class="flex flex-row">
		<img src={data.imageURL} class=" max-w-xl" alt="instrument" />
		<div class="flex flex-col gap-4 p-4">
			<p>start date: {data.dates.start}</p>
			<p>end date: {data.dates.end}</p>
			<p>name: {data.name}</p>
			<p>price: ${data.price}</p>
			<p>description: {data.description}</p>
		</div>
	</div>

	<div class="flex flex-col border">
		{#each data.messages as message}
			<div class="flex flex-row gap-4">
				<p>{message.timestamp.toISOString().split('T')[0]}</p>
				<p class:text-left={message.senderID == $user?.uid} class="text-right">
					{message.message}
				</p>
			</div>
		{/each}
	</div>
</div>
