<script lang="ts">
	import type { PageData } from './$types';
	import { user } from '$lib/stores/AuthStore';
	import { writable } from 'svelte/store';
	import { collection, onSnapshot, orderBy, query, Timestamp, addDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data: PageData;

	interface Message {
		message: string;
		senderID: string;
		timestamp: Timestamp;
	}

	let newMessage = '';

	const messages = writable<Message[]>([]);
	const messagesRef = collection(db, `requests/${$page.params.id}/messages`);

	onMount(() => {
		const q = query(messagesRef, orderBy('timestamp', 'asc'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			messages.set(querySnapshot.docs.map((doc) => doc.data() as Message));
		});
		return () => unsubscribe();
	});

	async function sendMessage() {
		if (newMessage.trim() == '') return;

		await addDoc(messagesRef, {
			message: newMessage,
			senderID: $user?.uid,
			timestamp: new Timestamp(Date.now() / 1000, 0)
		});

		newMessage = '';
	}
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

	<div class="flex flex-col gap-4">
		<div class="flex flex-col border border-gray-500 rounded-lg">
			{#each $messages as message}
				{#if message.senderID == $user?.uid}
					<div class="flex justify-end p-2">
						<p class="max-w-xs rounded-md p-2 text-white bg-blue-500">
							{message.message}
						</p>
					</div>
				{:else}
					<div class="flex justify-start p-2">
						<p class="max-w-xs rounded-md p-2 text-white bg-gray-500">
							{message.message}
						</p>
					</div>
				{/if}
			{/each}
		</div>

		<div class="flex gap-4 items-center">
			<input
				type="text"
				bind:value={newMessage}
				class="textarea textarea-bordered w-full"
				placeholder="type message here"
			/>
			<button on:click={sendMessage} class="btn btn-success h-full">Send</button>
		</div>
	</div>
</div>
