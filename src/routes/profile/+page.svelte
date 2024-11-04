<script lang="ts">
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores/AuthStore';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	$: username = form?.username ?? $user?.displayName;
</script>

<AuthCheck>
	<div class="flex flex-col items-center">
		<h2 class="text-2xl font-bold m-4">Profile</h2>

		<form action="?/username" method="post" class="flex flex-col p-2 space-y-2" use:enhance>
			<label for="current">Current Username</label>
			<p id="current" class="text-lg font-semibold">{username}</p>
			<label for="username">New Username</label>
			<input type="text" name="username" class="input input-bordered w-full max-w-sm" required />
			<button class="btn btn-primary">Update Username</button>
		</form>

		<form action="?/password" method="post" class="flex flex-col p-2 space-y-2" use:enhance>
			<label for="password">New Password</label>
			<input type="text" name="password" class="input input-bordered" required />
			<button class="btn btn-primary w-full max-w-sm">Update Password</button>
		</form>

		<form action="?/delete" method="post" class="p-2 flex w-[230px]" use:enhance>
			<button class="btn btn-warning w-full">Delete Account</button>
		</form>
	</div>
</AuthCheck>
