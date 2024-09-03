<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
	import { db } from "$lib/firebase";
    import { user } from "$lib/stores/user";
    import { doc, getDoc, writeBatch } from "firebase/firestore";

    let username = "";
    let loading = false;
    let isAvailable = false;
    let debounceTimer: NodeJS.Timeout;

    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
    $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
    $: isTaken = isValid && !isAvailable && !loading;
    $: isTouched = username.length > 0;

    async function checkAvailability() {
        isAvailable = false;
        loading = true;
        clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(async () => {
            if(username.length !== 0) {
                console.log("checking username @" + username);
                const ref = doc(db, "usernames", username);
                const exists = await getDoc(ref).then((doc) => doc.exists());
                isAvailable = !exists;
                loading = false;
            }
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
            <form class="flex flex-col" on:submit|preventDefault={ confirmUsername }>     
                <input 
                type="text"
                placeholder="Username"
                class="input w-full"
                bind:value={username}
                on:input={checkAvailability}
                class:input-warning={isTaken}
                class:input-success={isAvailable && isValid && !loading}
                >
                <div class="my-4 min-h-16 px-8 w-full">
                    {#if loading && isTouched}
                      <p class="text-secondary">Checking availability of @{username}...</p>
                    {/if}

                    {#if !isValid && isTouched}
                        <p class="text-error text-sm">
                        must be 3-16 characters long, alphanumeric only
                        </p>
                    {/if}
                
                    {#if isTaken}
                      <p class="text-warning text-sm">
                        @{username} is not available
                      </p>
                    {/if}
                
                    {#if isValid && isAvailable}
                      <button class="btn btn-success">Confirm username @{username} </button>
                    {/if}
                </div>
            </form>
        </div>
    </div>
</AuthCheck>