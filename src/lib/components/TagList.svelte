<script lang="ts">
    import { onMount } from "svelte";
    import FilterTag from "./FilterTag.svelte";
    import { fade } from "svelte/transition";

    export let title: string = "";
    export let filters: string[];
    export let unique: boolean = false;
    export let initializeAsSelected = false;
    export let selected: number[] = [];
    export let index: number = 0;


    function toggleSelect(index: number) {
        if (selected.includes(index)) {
            selected = selected.filter(sel => sel != index);
        } else {
            if (unique) {
                selected = [index];
            } else {
                selected = [...selected, index];
            }
        }
    }

    onMount(() => {
        if (initializeAsSelected) {
            for (var i = 0; i < filters.length; i++) {
                toggleSelect(i);
            }
        }
    });
    

</script>

<div class="tag-list" transition:fade={{ duration: 200, delay: 200*index }}>
    {#if title != ""}
        <span class="filter-title" style={selected.length > 0 ? "color: var(--PRIMARY); font-weight: bold" : ""}>{title} 
            <span class="select-count">
                {#if selected.length == filters.length}
                    all filters selected
                {:else if selected.length == 0}
                    no filters selected
                {:else}
                    {selected.length}/{filters.length} filters selected
                {/if}
            </span>
        </span>    
    {/if}
    <div class="filter-list">
        {#each filters as filter, i}
                <FilterTag 
                    text={filter}
                    bind:selected={selected}
                    index={i}
                    on:click={() => toggleSelect(i)}
                />
        {/each}
    </div>
    <button 
        type="button"
        class="clear-btn" 
        style={`opacity: ${selected.length > 0 ? "1" : "0"}`}
        on:click={() => selected = []}
    >
        Clear filter/s
    </button>
</div>

<style>
    .tag-list {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        justify-content: center;
        align-items: flex-start;

        padding: 0 1rem;
    }

    .filter-list {
        max-width: 100%;
        font-size: inherit;
    }

    .filter-title {
        font-style: italic;
        color: var(--NEUTRAL-COLOR);
    }

    .select-count {
        font-size: 0.7rem;
        color: var(--PRIMARY);
        font-style: normal;
        font-weight: normal;
    }

    .clear-btn {
        font-size: min(0.8rem, 2vw);
        color: var(--PRIMARY);
        font-weight: bold;
    }
</style>