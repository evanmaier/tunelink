<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { user } from '$lib/stores/AuthStore';
</script>

<AuthCheck>
	<form action="/username" method="post">
		<input type="hidden" value={$user?.uid}>
		<label for="username">New Username</label>
		<input type="text" id="username" required>
		<button class="btn btn-primary">Update Username</button>
	</form>

	<form action="/password" method="post">
		<input type="hidden" value={$user?.uid}>
		<label for="password">New Password</label>
		<input type="text" id="password" required>
		<button class="btn btn-primary">Update Password</button>
	</form>

	<form action="/delete" method="post">
		<input type="hidden" value={$user?.uid}>
		<button class="btn btn-warning">Delete Account</button>
	</form>
</AuthCheck>
