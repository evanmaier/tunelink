<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
    import SuperDebug from 'sveltekit-superforms';
    export let data;
    const { form, errors, constraints, message, enhance} = superForm(data.form);
</script>

<div class="flex justify-center items-center min-h-screen">
	<div class="w-full max-w-sm text-center">
        <form method="POST" use:enhance class="flex flex-col gap-4 p-4">
            {#if $message}<span>{$message}</span>{/if}
            
            <input 
                type="email"
                name="email"
                aria-invalid={$errors.email ? 'true' : undefined}  
                bind:value={$form.email}  
                {...$constraints.email}
                class="input input-bordered w-full max-w-s"
            />
            {#if $errors.email}<span>{$errors.email}</span>{/if}

            <input 
                name="password" 
                type="password"
                aria-invalid={$errors.password ? 'true' : undefined}  
                bind:value={$form.password}
                {...$constraints.password}  
                class="input input-bordered w-full max-w-s"
            />
            {#if $errors.password}<span>{$errors.password}</span>{/if}
            
            <button type="submit" class="btn">Sign in</button>

            <a href="/register" role="button" class='btn btn-primary'>Register</a>

        </form>
    </div>
</div>