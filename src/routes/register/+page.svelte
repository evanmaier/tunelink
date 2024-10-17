<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { auth } from '$lib/firebase';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { goto } from '$app/navigation';

	export let data;

	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.valid) {
				console.log('register user', form.data.email);
				handleSignUp(form.data.email, form.data.password, form.data.username);
			}
		}
	});

	async function handleSignUp(email: string, password: string, username: string) {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			if (auth.currentUser) {
				await updateProfile(auth.currentUser, { displayName: username });
			}
			console.log('register success');
			goto('/');
		} catch (error: any) {
			console.log(error.message);
		}
	}
</script>

<div class="flex justify-center items-center min-h-screen">
	<div class="w-full max-w-sm text-center">
		<form method="POST" use:enhance class="flex flex-col">
			{#if $message}<span>{$message}</span>{/if}
			<div class="label">
				<span class="label-text">Email</span>
			</div>
			<input
				type="email"
				name="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
				class="input input-bordered w-full max-w-s"
			/>
			{#if $errors.email}
				<span>{$errors.email}</span>
			{/if}

			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input
				name="password"
				type="password"
				aria-invalid={$errors.password ? 'true' : undefined}
				bind:value={$form.password}
				{...$constraints.password}
				class="input input-bordered w-full max-w-s"
			/>
			{#if $errors.password}
				<span>{$errors.password}</span>
			{/if}

			<div class="label">
				<span class="label-text">Username</span>
			</div>
			<input
				name="username"
				type="text"
				aria-invalid={$errors.username ? 'true' : undefined}
				bind:value={$form.username}
				{...$constraints.username}
				class="input input-bordered w-full max-w-s"
			/>
			{#if $errors.username}
				<span>{$errors.username}</span>
			{/if}

			<button type="submit" class="btn btn-success mt-4 mb-4">Register </button>
		</form>
	</div>
</div>
