<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from "$lib/firebase";
	import { goto } from '$app/navigation';

    async function handleSignIn(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            goto('/');
        })
        .catch((error) => {
            $message  = (error.message);
        });
    }

    export let data;
    const { form, errors, constraints, message, enhance} = superForm(data.form, {
        onUpdated({form}) {
            if (form.valid) {
                console.log("signing in user");
                handleSignIn(form.data.email, form.data.password);
            }
        }
    });

</script>

<div class="flex justify-center items-center min-h-screen">
	<div class="w-full max-w-sm text-center">
        <form method="POST" use:enhance class="flex flex-col">
            {#if $message}<span>{$message}</span>{/if}
            <div class='label'>
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
            <div class='label'>
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
            
            <button type="submit" class="btn mt-4 mb-4">Sign in</button>

            <a href="/register" role="button" class='btn btn-primary'>Register</a>

        </form>
    </div>
</div>