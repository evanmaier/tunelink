<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
    
    export let form: ActionData;

	const today = new Date().toISOString().split('T')[0];
	let startDate: string;
</script>

<div class="flex flex-col items-center">
    <h2 class="text-2xl font-bold text-center p-2">Rental Request</h2>

    <form method="post" use:enhance>
        <div class="flex">
            <div class="p-2">
                <label class="font-semibold">
                    Start:
                    <input type="date" name="startDate" bind:value={startDate} min={today} required />
                </label>
            </div>

            <div class="p-2">
                <label class="font-semibold">
                    End:
                    <input type="date" name="endDate" min={startDate} required />
                </label>
            </div>
        </div>

        <div class="p-2">
            <label class="font-semibold">
                Message
                <textarea
                    name="message"
                    value="Hello!"
                    class="textarea textarea-bordered w-full"
                    required
                />
            </label>
        </div>
        <button class="btn btn-primary w-full">Submit</button>
        {#if form?.success}
            <p>Request Sent!</p>
        {/if}
        {#if form?.error}
            <p>Error: {form.error}</p>
        {/if}
    </form>
</div>