<script lang='ts'>
    import { db, storage } from "$lib/firebase";
    import { doc, collection, setDoc, GeoPoint } from "firebase/firestore";
    import { user } from "$lib/stores/AuthStore";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import { onMount } from "svelte";

    // onMount ensures this runs in the browser 
    onMount(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition( (position) => { 
                lat = position.coords.latitude;
                long = position.coords.longitude; 
            });
        } else {
            console.log('no geolocation available');
        }
    });

    const instrumentRef = doc(collection(db, 'instruments'));

    let available: boolean;
    let category: string;
    let condition: string;
    let description: string;
    let lat: number;
    let long: number;
    let make: string;
    let model: string;
    let path: string;
    let pictures: string[];
    let pricePerDay: number;

    

    async function upload(e: any) {
        const files = e.target.files;
        const storageRef = ref(storage, `instruments/${instrumentRef.id}`);
        
        files.array.forEach( async (image: any) => {
            const result = await uploadBytes(storageRef, image);
            const url = await getDownloadURL(result.ref);
            pictures.push(url);
        });
        
    }

    async function handleSubmit() { 
        if ($user) {
            path = `users/${$user.uid}`;
        }

        await setDoc(instrumentRef, {
            available: available,
            category: category,
            condition: condition,
            createdAt: Date.now(),
            description: description,
            location: new GeoPoint(lat, long),
            make: make,
            model: model,
            owner: doc(db, path),
            pictures: pictures,
            pricePerDay: pricePerDay,
            reviews: {}
        });
    }

</script>

<AuthCheck>
    <div class="flex justify-center items-center min-h-screen">
        <div class="w-full max-w-sm text-center">
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col">
        <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Available</span>
              <input type="checkbox" bind:value={available} class="toggle" checked />
            </label>
          </div>
    
        <select bind:value={category} class="select select-bordered w-full max-w-xs">
            <option disabled selected>Category</option>
            <option>Guitar</option>
            <option>Bass</option>
            <option>Other</option>
          </select>
    
        <select bind:value={condition} class="select select-bordered w-full max-w-xs">
            <option disabled selected>Condition</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Poor</option>
          </select>
    
        <div class='label'>
            <span class="label-text">Make</span>
          </div>
          <input type="text" bind:value={make} class="input input-bordered w-full max-w-xs" />
        
        <div class='label'>
            <span class="label-text">Model</span>
          </div>
          <input type="text" bind:value={model} class="input input-bordered w-full max-w-xs" />

        <div class='label'>
            <span class="label-text">Choose images</span>
          </div>
          <input
            on:change={upload}
            type="file"
            class="file-input file-input-bordered w-full max-w-xs"
            accept="image/png, image/jpeg, image/gif, image/webp"
          />
    
        <div class='label'>
            <span class="label-text">Price per day</span>
          </div>
          <input type="text" bind:value={pricePerDay} class="input input-bordered w-full max-w-xs" />

        <button type='submit' class='btn btn-primary w-full'>Submit</button>

    </form>
</div>
</div>
</AuthCheck>
