<script lang="ts">
    import FilterTag from "./FilterTag.svelte";

    export let filters: string[];
</script>

<div class="filter-list">
    {#each filters as filter}
            <FilterTag text={filter} />
    {/each}
</div>

<style>
    .filter-list {
        display: flex;
        flex-direction: row;
        column-gap: 0.5rem;
    }
</style>