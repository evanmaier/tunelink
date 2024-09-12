<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db } from '$lib/firebase';
	import { user } from '$lib/stores/AuthStore';
	import { userData } from '$lib/stores/DocStore';
	import { deleteUser } from 'firebase/auth';
	import { doc, deleteDoc } from 'firebase/firestore';

	async function deleteAccount() {
		if (!$user || !$userData) {
			console.log('user or their data is null');
			return;
		}

		await deleteDoc(doc(db, 'usernames', $userData?.username))
			.then(() => {
				console.log(`username has been deleted`);
			})
			.catch((error) => {
				console.log(error.message);
			});

		await deleteDoc(doc(db, 'users', $user.uid))
			.then(() => {
				console.log(`user data has been deleted`);
			})
			.catch((error) => {
				console.log(error.message);
			});

		await deleteUser($user)
			.then(() => {
				console.log(`user auth has been deleted`);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
</script>

<AuthCheck>
	<button on:click={deleteAccount} class="btn btn-warning">Delete Account</button>
</AuthCheck>
