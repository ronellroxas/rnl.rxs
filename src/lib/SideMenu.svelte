<script lang="ts">
    import { slide, fade, blur } from "svelte/transition";
    import { quintIn } from "svelte/easing";
    import { viewStoreState } from "./store";

    export let show = true;

    let menu: HTMLDivElement;

    const ANIMATION_DURATION = 500;

    viewStoreState.subscribe((viewStoreState) => {
        show = viewStoreState.showSideMenu;
    });


    function toggleMenu() {
        viewStoreState.update((viewStoreState) => 
        viewStoreState = {...viewStoreState, showSideMenu: !show})
    }
</script>

<div class="overlay"
    transition:fade={{duration: ANIMATION_DURATION}}
    on:click={toggleMenu}
    on:keypress={toggleMenu}
    role="button"
    tabindex="0"
>
</div>
<div 
    class="menu" 
    bind:this={menu}
    transition:slide={{axis: "x", duration: ANIMATION_DURATION, easing: quintIn}}
>
    <div class="menu-overlay"></div>
    <button 
        class="menu-button" 
        on:click={toggleMenu}
        transition:blur={{ amount: 10, duration: ANIMATION_DURATION + 200 }}
    >
    <i class="mi mi-chevron-double-left icon"/>
    </button>
</div>


<style>
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        background: var(--OVERLAY-COLOR);
        z-index: 3;
        height: 100%;
    }

    .menu {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        z-index: 4;
        width: 25vw;
        background: var(--CURRENT-BG-COLOR);
        box-sizing: border-box;
    }

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

        color: var(--PRIMARY);
        font-size: 2em;
        transform: scale(1);
        transition: transform 0.3s ease-out;
        width: fit-content;
        aspect-ratio: 1;
        overflow: hidden;
    }

    @keyframes background-anim {
        from {
            background-position: 0% 0%;
        }
        to {
            background-position: 0% 100%;
        }
    }

    .menu-overlay {
        width: 2px;
        height: 100%;
        background-size: 100% 350px !important;
        background: var(--PRIMARY-GRADIENT);

        position: absolute;
        right: 0;
        top: 0;

        animation: background-anim 20s linear infinite;
    }

    @media only screen and (max-width: 1000px) {
        .menu {
            width: 50vw;
        }
    }

    @media only screen and (max-width: 600px) {
        .menu {
            width: 100vw;
        }

        .menu-overlay {
            width: 1px;
        }
    }
</style>
