<script lang="ts">
	import { createUserWithEmailAndPassword, type User } from 'firebase/auth';
	import { superForm, setError } from 'sveltekit-superforms';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';

	async function isAvailable(username: string) {
		try {
			console.log('checking username', username);
			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());
			return !exists;
		} catch (error) {
			console.log('error checking username availability', error);
		}
	}

	async function createUsername(user: User, username: string) {
		try {
			console.log('creating username', username);
			const usernamesDocRef = doc(db, 'usernames', username);
			await setDoc(usernamesDocRef, {
				uid: user.uid
			});
		} catch (error) {
			console.log('error creating username', error);
		}
	}

	async function createUser(user: User, username: string) {
		try {
			console.log('creating user', user.uid);
			const userDocRef = doc(db, 'users', user.uid);
			const instruments: Array<string> = [];
			await setDoc(userDocRef, {
				email: user.email,
				username: username,
				instruments: instruments
			});
		} catch (error) {
			console.log('error creating user', error);
		}
	}

	async function handleSignUp(email: string, password: string, username: string) {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				createUser(userCredential.user, username);
				return userCredential;
			})
			.then((userCredential) => {
				createUsername(userCredential.user, username);
				return username;
			})
			.then(() => {
				console.log('register success');
				goto('/');
			})
			.catch((error) => {
				console.log('error:', error);
				$message = error.message;
			});
	}

	export let data;
	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		async onUpdate({ form }) {
			if (form.valid) {
				const available = await isAvailable(form.data.username);
				if (!available) {
					setError(form, 'username', 'username is not available');
					form.valid = false;
				}
			}
		},

		onUpdated({ form }) {
			if (form.valid) {
				console.log('register user', form.data.email);
				handleSignUp(form.data.email, form.data.password, form.data.username);
			}
		}
	});
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
