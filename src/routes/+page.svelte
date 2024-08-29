<script lang="ts">
    import { user } from '$lib/firebase'
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    onMount(() => {
    if (!$user) {
      goto('/login');
    }
  });
</script>

{#if $user}
    <h1>Welcome {$user.email}</h1>
{/if}