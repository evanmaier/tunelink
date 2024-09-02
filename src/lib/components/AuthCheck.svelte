<script lang="ts">
    import { user } from "$lib/stores/user"
</script>

{#if $user}
    <slot/>
{:else}
    <p>you must be signed in to access this content</p>
    <a href="/login" class="btn-primary">Sign In</a>
{/if}