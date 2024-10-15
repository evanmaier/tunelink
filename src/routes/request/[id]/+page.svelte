<script lang="ts">
	import type { PageData } from './$types';
	import { user } from '$lib/stores/AuthStore';
	import { writable } from 'svelte/store';
	import {
		collection,
		onSnapshot,
		orderBy,
		query,
		Timestamp,
		addDoc,
		doc,
		updateDoc
	} from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	export let data: PageData;

	interface Message {
		message: string;
		senderID: string;
		timestamp: Timestamp;
	}

	let newMessage = '';
	let status = '';

	const messages = writable<Message[]>([]);
	const messagesRef = collection(db, `requests/${$page.params.id}/messages`);
	const q = query(messagesRef, orderBy('timestamp', 'asc'));

	const requestRef = doc(db, 'requests', $page.params.id);

	onMount(() => {
		const messagesUnsubscribe = onSnapshot(q, (querySnapshot) => {
			messages.set(querySnapshot.docs.map((doc) => doc.data() as Message));
		});

		const requestUnsubscribe = onSnapshot(requestRef, (doc) => {
			status = doc.get('status');
		});

		return () => {
			messagesUnsubscribe();
			requestUnsubscribe();
		};
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

	async function acceptRequest() {
		await updateDoc(requestRef, { status: 'accepted' });
	}

	async function rejectRequest() {
		await updateDoc(requestRef, { status: 'declined' });
	}
</script>

<AuthCheck>
	<div class="grid grid-cols-2 p-4">
		<div class="flex flex-col items-center max-w-xl mx-auto">
			<img src={data.imageURL} class="rounded-lg" alt="instrument" />
			<div class="flex gap-3 m-2">
				<div class="flex flex-col">
					<h3 class="text-lg font-semibold">Status</h3>
					<p>{status}</p>
				</div>

				<div class="flex flex-col">
					<h3 class="text-lg font-semibold">Dates</h3>
					<p>Start: {data.dates.start}</p>
					<p>End: {data.dates.end}</p>
				</div>

				<div class="flex flex-col">
					<h3 class="text-lg font-semibold">Name</h3>
					<p>{data.name}</p>
				</div>

				<div class="flex flex-col">
					<h3 class="text-lg font-semibold">Price</h3>
					<p>{data.price}</p>
				</div>

				{#if data.ownerID == $user?.uid}
					<button on:click={acceptRequest} class="btn btn-success"> Accept </button>
					<button on:click={rejectRequest} class="btn btn-error"> Reject </button>
				{/if}
			</div>
		</div>

		<div class="flex flex-col gap-4 max-w-xl">
			<div class="flex flex-col border border-gray-500 rounded-lg max-h-svh">
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

			{#if status != 'declined'}
				<div class="flex gap-4 items-center">
					<input
						type="text"
						bind:value={newMessage}
						class="textarea textarea-bordered w-full"
						placeholder="type message here"
					/>
					<button on:click={sendMessage} class="btn btn-success h-full">Send</button>
				</div>
			{/if}
		</div>
	</div>
</AuthCheck>
