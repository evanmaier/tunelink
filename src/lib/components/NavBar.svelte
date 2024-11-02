<script lang="ts">
	import { user } from '$lib/stores/AuthStore';
	import { invalidateAll } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import logo from '$lib/assets/tunelink-alt-high-resolution-logo-transparent.svg';

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

<nav class="bg-base-100 shadow-md flex justify-between items-center">
	<ul class="menu menu-horizontal space-x-4">
		<li>
			<a href="/" class="btn btn-ghost">Home</a>
		</li>
		<li>
			<a href="/about" class="btn btn-ghost">About</a>
		</li>
		<li>
			<a href="/feedback" class="btn btn-ghost">Feedback</a>
		</li>
		{#if $user}
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
				<a href="/requests" class="btn btn-ghost">Rentals</a>
			</li>
			<li>
				<button on:click={logOut} class="btn btn-primary text-white">Sign Out</button>
			</li>
		{:else}
			<li>
				<a href="/login" class="btn btn-primary text-white">Sign In</a>
			</li>
		{/if}
	</ul>
	<img src={logo} alt="logo" class="h-8 object-cover mr-4" />
</nav>
