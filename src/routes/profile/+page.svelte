<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
	import { db } from "$lib/firebase";
    import { user } from "$lib/stores/user";
    import { doc, getDoc, writeBatch } from "firebase/firestore";

    let username = "";
    let loading = false;
    let isAvailable = false;
    let debounceTimer: NodeJS.Timeout;

    async function checkAvailability() {
        isAvailable = false;
        loading = true;
        clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(async () => {
            console.log("checking username @" + username);
            const ref = doc(db, "usernames", username);
            const exists = await getDoc(ref).then((doc) => doc.exists());

            isAvailable = !exists;
            loading = false;
        }, 500)
    
    }

    async function confirmUsername() {
        console.log("confirming username", username);
        const batch = writeBatch(db);
        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), { username });

        await batch.commit();

        username = '';
        isAvailable = false;

    }

</script>



<AuthCheck>
    <div class="flex justify-center items-center min-h-screen">
        <div class="w-full max-w-sm text-center">
            <h2>Profile</h2>
            <form class="flex flex-col" on:submit|preventDefault={ confirmUsername }>     
                <input 
                type="text"
                placeholder="Username"
                class="input w-full"
                bind:value={username}
                on:input={checkAvailability}
                >
                <button class="btn btn-success">Confirm username @{username}</button>
                <p>Is available? {isAvailable}</p>
                <p>Loading? {loading}</p>
            </form>
        </div>
    </div>
</AuthCheck>