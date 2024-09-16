<script lang='ts'>
    import { page } from "$app/stores";
	import { onMount } from "svelte";
    import { doc, getDoc, type DocumentData } from "firebase/firestore";
    import { db } from "$lib/firebase";
    import AuthCheck from '$lib/components/AuthCheck.svelte';

    let i: DocumentData | undefined; 

    onMount(async () => {
        try {
            const ref = doc(db, 'instruments', $page.params.id);
            const snapshot = await getDoc(ref);
            i = snapshot.data();
        } catch (error: any) {
            console.log(error.message);
        }
    });
</script>


<AuthCheck>
    {#if i}
        <div class='flex flex-col items-center p-10'>
            <h2 class="text-2xl font-bold text-center p-2">{i.year} {i.make} {i.model}</h2>
        
            <div class='flex p-2'>
                {#each i.pictures as picURL}
                <img src={picURL} alt="instrument" class="max-w-full max-h-[600px] object-cover" />
                {/each}
            </div>
    
            <p class='max-w-prose p-2'>{i.description}</p>
    
            {#each i.reviews as review}
                <div>{review}</div>
            {/each}
        </div>
    {/if}
</AuthCheck>