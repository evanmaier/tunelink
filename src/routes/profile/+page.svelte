<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user } from '$lib/stores/AuthStore';
	import { deleteUser } from 'firebase/auth';

	async function deleteAccount() {
		if (!$user) {
			console.log('user or their data is null');
			return;
		}

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
