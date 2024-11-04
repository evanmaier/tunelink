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

<div class="navbar bg-base-100">
	<div class="justify-start w-1/3">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</div>
			<ul class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
		</div>
	</div>
	<div class="justify-center w-1/3">
		<a href="/" class="btn btn-ghost text-xl">
			<img src={logo} alt="logo" class="h-8 object-cover" />
		</a>
	</div>
</div>
