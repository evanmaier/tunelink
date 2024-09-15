<script lang='ts'>
    export let data;
</script>

{#if data}
    <p>{data.make} {data.model} {data.year}</p>
{/if}
