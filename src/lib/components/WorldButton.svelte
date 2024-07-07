<script lang="ts">
    import { bounceOut } from "svelte/easing";
    import { fade, scale } from "svelte/transition";
    import viewport from "$lib/lazyLoading/useViewportAction";
    import { viewStoreState } from "../store";

    let showWorld = false;

    $: isScrolled = false;
    $: showTooltip = false;

    setTimeout(() => {
        showTooltip = true;

        setTimeout(() => {
            showTooltip = false;
        }, 2000);
    }, 2500);
    
    function toggleTooltip() {
        showTooltip = !showTooltip;
    }

    viewStoreState.subscribe(({showWorldHi}) => {
        showWorld = showWorldHi;
    });

    function toggleVisibility() {
        viewStoreState.update((viewStoreState) => 
            viewStoreState = { ...viewStoreState, showWorldHi: !showWorld }
        )
    }

</script>

<div
    use:viewport
    class="world-emoji"
    transition:scale={{ delay: 1000, easing: bounceOut, duration: 800 }}
    on:viewportEnter={() => {
        isScrolled = false;
    }}
    on:viewportExit={() => {
        isScrolled = true;
    }}
>
    <button
        class="world-button {isScrolled ? 'stick' : ''}"
        on:mouseenter={toggleTooltip}
        on:mouseleave={toggleTooltip}
        on:click={toggleVisibility}
    >
        🌎
        {#if showTooltip}
            <span transition:fade class="world-tooltip">
                Say <span class="tooltip-hi">Hi!</span>
            </span>
        {/if}
    </button>
</div>

<style>
    .world-emoji {
        display: block;
        width: fit-content;
        height: fit-content;
        z-index: 0;
    }

    .world-button {
        /* remove button styles */
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        margin: 0;

        scale: 1;
        font-size: 4em;
        opacity: 1;
        transition-property: font-size, scale, opacity;
        transition-duration: 200ms;
        height: fit-content;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .stick {
        position: fixed;
        top: 16px;
        left: 50%;
        font-size: 2em;
        transform: translate(-50%, 0);
        opacity: 0.8;

        flex-direction: column;
    }

    .world-button:hover {
        scale: 1.2;
        opacity: 1;
    }

    .world-tooltip {
        font-size: 1rem;
        background: var(--CURRENT-BG-COLOR);
        color: var(--CURRENT-TEXT-COLOR);
        transition: background-color var(--BG-ANIMATION-DURATION);
    }

    .tooltip-hi {
        color: var(--PRIMARY);
        font-weight: bold;
    }
</style>
