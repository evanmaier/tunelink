<script lang="ts">
	import { user } from '$lib/stores/AuthStore';
</script>

{#if $user}
	<slot />
{:else}
	<p>you must be signed in to access this content</p>
{/if}
