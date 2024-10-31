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
	import { afterUpdate, onMount } from 'svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	export let data: PageData;

	interface Message {
		message: string;
		senderID: string;
		timestamp: Timestamp;
	}

	let newMessage = '';
	let status = '';
	let lastMessage: HTMLDivElement | null;

	const messages = writable<Message[]>([]);
	const messagesRef = collection(db, `requests/${$page.params.id}/messages`);
	const q = query(messagesRef, orderBy('timestamp', 'asc'));

	const requestRef = doc(db, 'requests', $page.params.id);

	const instrumentRef = doc(db, 'instruments', data?.instrumentID);

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

	async function accept() {
		await updateDoc(requestRef, { status: 'accepted' });
	}

	async function decline() {
		await updateDoc(requestRef, { status: 'declined' });
	}

	async function activate() {
		await updateDoc(requestRef, { status: 'active' });
		await updateDoc(instrumentRef, { available: false });
	}

	async function complete() {
		await updateDoc(requestRef, { status: 'complete' });
		await updateDoc(instrumentRef, { available: true });
	}

	afterUpdate(() => {
		if (lastMessage && $messages) {
			lastMessage.scrollIntoView();
		}
	});
</script>

<AuthCheck>
	<div class="flex flex-col p-4 items-center h-[85vh]">
		<div class="flex flex-col items-center max-w-3xl w-full mx-auto p-2">
			<div class="flex gap-3 m-2">
				<img src={data.imageURL} class="h-20 w-20 object-cover rounded-lg" alt="instrument" />
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
					{#if status == 'pending'}
						<button on:click={accept} class="btn btn-success"> Accept </button>
						<button on:click={decline} class="btn btn-error"> Reject </button>
					{/if}
					{#if status == 'accepted'}
						<button on:click={activate} class="btn btn-success"> Activate </button>
					{/if}
					{#if status == 'active'}
						<button on:click={complete} class="btn btn-success"> Complete </button>
					{/if}
				{/if}
			</div>
		</div>

		<div class="flex flex-col gap-4 max-w-2xl w-full grow overflow-hidden">
			<div class="flex flex-col border border-gray-500 rounded-lg overflow-y-auto grow">
				{#each $messages as message, i}
					{#if i == $messages.length - 1}
						<div
							class="flex p-2 {message.senderID == $user?.uid ? 'justify-end' : 'justify-start'}"
							bind:this={lastMessage}
						>
							<p
								class="max-w-xs rounded-md p-2 text-white {message.senderID == $user?.uid
									? 'bg-blue-500'
									: 'bg-gray-500'}"
							>
								{message.message}
							</p>
						</div>
					{:else}
						<div
							class="flex p-2 {message.senderID == $user?.uid ? 'justify-end' : 'justify-start'}"
						>
							<p
								class="max-w-xs rounded-md p-2 text-white {message.senderID == $user?.uid
									? 'bg-blue-500'
									: 'bg-gray-500'}"
							>
								{message.message}
							</p>
						</div>
					{/if}
				{/each}
			</div>

			{#if ['pending', 'accepted', 'active'].includes(status)}
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
