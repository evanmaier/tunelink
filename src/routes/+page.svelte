<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user } from "$lib/stores/user";
</script>

<AuthCheck>
    <h1>welcome {$user?.email}</h1>
</AuthCheck>

