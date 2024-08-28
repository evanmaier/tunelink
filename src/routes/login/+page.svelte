<script lang="ts">
    import { auth } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider);
            console.log(user)
        } catch (error) {
            console.error(error);
        }        
    }

</script>

<div class="flex justify-center items-center min-h-screen">
	<div class="w-full max-w-sm text-center">

        <h2 class="text-2xl font-bold mb-6">Sign in</h2>

        <form method="POST" action="/login" class="flex flex-col gap-4">
            <input name="email" type="email" placeholder="Email" class="input input-bordered w-full max-w-s">
            <input name="password" type="text" placeholder="Password" class="input input-bordered w-full max-w-s">
            <button class="btn">Sign in with email</button>
            <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
        </form>
        
    </div>
</div>