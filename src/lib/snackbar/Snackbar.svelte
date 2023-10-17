<script lang="ts">
    import { get } from "svelte/store";
    import {
        snackbarStoreState,
    } from "../store";
    import SnackbarItem from "./SnackbarItem.svelte";

    $: snackbarStore = get(snackbarStoreState);
    $: console.log(snackbarStore.pending)
    snackbarStoreState.subscribe((store) => (snackbarStore = store));
</script>

<div class="snackbars-list">
    {#if snackbarStore != undefined && snackbarStore.pending.length > 0}
        {#each snackbarStore.pending as pending}
            <SnackbarItem pending={pending} />
        {/each}
    {/if}
</div>

<style>
    .snackbars-list {
        display: block;
        position: fixed;
        bottom: 2em;
        right: 2em;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        row-gap: 1em;
        align-items: end;
        justify-content: end;
        z-index: 5;
    }
</style>
