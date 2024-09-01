<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { auth } from "$lib/firebase";
	import { userStore } from "$lib/stores";
    import { signOut } from "firebase/auth";

    const currentUser = userStore(auth)

    async function logOut() {
        signOut(auth)
        .then(() => {
            invalidateAll();
        })
        .catch((error) => {
            console.log(error.message);
        });
    }
</script>

{#if $currentUser}
    <h1>welcome {$currentUser?.email}</h1>
    <button on:click={logOut} class="btn-primary">Sign Out</button>
{:else}
    <a href="/login" role="button" class="btn">Sign In</a>
{/if}


