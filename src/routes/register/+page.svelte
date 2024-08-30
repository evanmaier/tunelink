<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<div class="flex justify-center items-center min-h-screen">
	<div class="w-full max-w-sm text-center">
        <h2 class="text-2xl font-bold mb-6">Register</h2>
        <form method="POST" use:enhance class="flex flex-col gap-4 p-4">
            <input name="email" type="email" placeholder="Email" required class="input input-bordered w-full max-w-s">
            <input name="password" type="password" placeholder="Password" required class="input input-bordered w-full max-w-s">
            <button class="btn">Register</button>
        </form>
    </div>
</div>