<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { userData } from "$lib/stores/DocStore";
</script>

<AuthCheck>
    <h1>welcome {$userData?.username}</h1>
    <ul>
        todo:
        <li>
            add instrument
        </li>
        <li>
            your instruments
        </li>
        <li>
            messages / notifications / rental requests
        </li>
        <li>
            recommended rentals near you
        </li>
        <li>
            search bar
        </li>
    </ul>
</AuthCheck>

