<script lang="ts">
	import { enhance } from '$app/forms';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
</script>

<AuthCheck>
	<h2 class="text-2xl font-bold text-center m-10">Profile</h2>
	<div class="flex flex-col items-center">
		<form action="?/username" method="post" class="flex flex-col p-2 space-y-2" use:enhance>
			<label for="username">New Username</label>
			<input type="text" id="username" class="input input-bordered w-full max-w-sm" required />
			<button class="btn btn-primary">Update Username</button>
		</form>

		<form action="?/password" method="post" class="flex flex-col p-2 space-y-2" use:enhance>
			<label for="password">New Password</label>
			<input type="text" id="password" class="input input-bordered" required />
			<button class="btn btn-primary w-full max-w-sm">Update Password</button>
		</form>

		<form action="?/delete" method="post" class="p-2 flex w-[230px]" use:enhance>
			<button class="btn btn-warning w-full">Delete Account</button>
		</form>
	</div>
</AuthCheck>
