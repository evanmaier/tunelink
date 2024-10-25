<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import {
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
		updateProfile
	} from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';

	async function handleSignIn(email: string, password: string) {
		const credential = await signInWithEmailAndPassword(auth, email, password);
		const idToken = await credential.user.getIdToken();

		await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});

		goto('/');
	}

	export let data;

	const { form, errors, constraints, message, enhance } = superForm(data.loginForm, {
		onUpdated({ form }) {
			if (form.valid) {
				console.log('signing in user');
				handleSignIn(form.data.email, form.data.password);
			}
		}
	});

	const {
		form: registerForm,
		errors: registerErrors,
		constraints: registerConstraints,
		message: registerMessage,
		enhance: registerEnhance
	} = superForm(data.registerForm, {
		onUpdated({ form }) {
			if (form.valid) {
				console.log('register user', form.data.email);
				handleSignUp(form.data.email, form.data.password, form.data.username);
			}
		}
	});

	async function handleSignUp(email: string, password: string, username: string) {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(userCredential.user, { displayName: username });
			console.log('register success');
			goto('/');
		} catch (error: any) {
			console.log(error.message);
		}
	}
</script>

<div class="flex space-x-10 items-end justify-center mt-10">
	<div class="w-full max-w-sm text-center">
		<form method="POST" action="?/login" use:enhance class="flex flex-col">
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
			{#if $errors.email}<span>{$errors.email}</span>{/if}
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
			{#if $errors.password}<span>{$errors.password}</span>{/if}

			<button type="submit" class="btn btn-primary mt-4 mb-4">Sign in</button>
		</form>
	</div>

	<div class="w-full max-w-sm text-center">
		<form method="POST" action="?/register" use:registerEnhance class="flex flex-col">
			{#if $registerMessage}<span>{$registerMessage}</span>{/if}
			<div class="label">
				<span class="label-text">Email</span>
			</div>
			<input
				type="email"
				name="email"
				aria-invalid={$registerErrors.email ? 'true' : undefined}
				bind:value={$registerForm.email}
				{...$registerConstraints.email}
				class="input input-bordered w-full max-w-s"
			/>
			{#if $registerErrors.email}
				<span>{$registerErrors.email}</span>
			{/if}

			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input
				name="password"
				type="password"
				aria-invalid={$registerErrors.password ? 'true' : undefined}
				bind:value={$registerForm.password}
				{...$registerConstraints.password}
				class="input input-bordered w-full max-w-s"
			/>
			{#if $registerErrors.password}
				<span>{$registerErrors.password}</span>
			{/if}

			<div class="label">
				<span class="label-text">Username</span>
			</div>
			<input
				name="username"
				type="text"
				aria-invalid={$registerErrors.username ? 'true' : undefined}
				bind:value={$registerForm.username}
				{...$registerConstraints.username}
				class="input input-bordered w-full max-w-s"
			/>
			{#if $registerErrors.username}
				<span>{$registerErrors.username}</span>
			{/if}

			<button type="submit" class="btn btn-success mt-4 mb-4">Register </button>
		</form>
	</div>
</div>
