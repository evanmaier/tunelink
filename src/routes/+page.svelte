<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { auth } from "$lib/firebase";
	import { user } from "$lib/stores/user";
    import { signOut } from "firebase/auth";
    import AuthCheck from "$lib/components/AuthCheck.svelte";

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

<AuthCheck>
    <h1>welcome {$user?.email}</h1>
    <button on:click={logOut} class="btn-primary">Sign Out</button>
</AuthCheck>

