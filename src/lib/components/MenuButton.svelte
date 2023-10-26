<script lang="ts">
    import { blur } from "svelte/transition";
    import { viewStoreState } from "$lib/store";
    
    let show = false;

    viewStoreState.subscribe((viewStoreState) => {
        show = viewStoreState.showSideMenu;
    });

    function toggleMenu() {
        viewStoreState.update((viewStoreState) => 
        viewStoreState = {...viewStoreState, showSideMenu: !show})
    }
</script>

{#if !show}
    <button 
        class="menu-button" 
        on:click={toggleMenu}
        transition:blur={{ amount: 10, duration: 500 }}
    >
        <i class="mi mi-menu icon"/>
    </button>
{/if}

<style>
    .menu-button {
        /* positioning */
        position: fixed;
        left: 16px;
        top: 16px;

        /* remove button styles */
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;

        color: inherit;
        font-size: 2em;
        transform: scale(1);
        transition: transform 0.3s ease-out;

        aspect-ratio: 1;
        overflow: hidden;
        z-index: 2;
    }

    .menu-button:hover {
        transform: scale(1.2);
    }
</style>