<script lang="ts">
    import { blur } from "svelte/transition";
    export let show = false;

    function toggleMenu() {
        show = !show;
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