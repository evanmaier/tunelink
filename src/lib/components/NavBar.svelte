<script lang="ts">
	import { user } from '$lib/stores/AuthStore';
	import { invalidateAll } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';

	async function logOut() {
		try {
			await signOut(auth);
			await fetch('/api/auth', { method: 'DELETE' });
			invalidateAll();
		} catch (error: any) {
			console.log(error.message);
		}
	}
</script>

<nav class="bg-base-100 shadow-md">
	<ul class="menu menu-horizontal space-x-4">
		{#if $user}
			<li>
				<a href="/" class="btn btn-ghost">Home</a>
			</li>
			<li>
				<a href="/profile" class="btn btn-ghost">Profile</a>
			</li>
			<li>
				<a href="/addInstrument" class="btn btn-ghost">Add Instrument</a>
			</li>
			<li>
				<a href="/yourInstruments" class="btn btn-ghost">Your Instruments</a>
			</li>
			<li>
				<a href="/requests/{$user.uid}" class="btn btn-ghost">Rental Requests</a>
			</li>
			<li>
				<button on:click={logOut} class="btn btn-primary text-white">Sign Out</button>
			</li>
		{:else}
			<a href="/login" class="btn btn-primary text-white">Sign In</a>
		{/if}
	</ul>
</nav>
