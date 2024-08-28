<script lang="ts">
    import { auth } from "$lib/firebase";

    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log(user)
    }
</script>
<div class="flex justify-center items-center min-h-screen">
	<div class="w-full max-w-sm text-center">
        <h2 class="text-2xl font-bold mb-6">Sign in</h2>

        <form method="POST" class="flex flex-col gap-4">
            <input name="username" type="text" placeholder="Username" class="input input-bordered w-full max-w-s">
            <input name="password" type="text" placeholder="Password" class="input input-bordered w-full max-w-s">
            <button class="btn">Sign in with email</button>
            <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
        </form>
        
    </div>
</div>