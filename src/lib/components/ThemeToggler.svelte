<script lang="ts">
    import { onMount } from "svelte";
    import { fade, type FadeParams } from "svelte/transition";
    import { quartInOut } from "svelte/easing";

    let iconElement: HTMLElement;

    $: isDarkMode = false;

    onMount(() => {
        isDarkMode = window.document.body.classList.contains("dark-mode");
    });

    function handleToggle() {
        // toggle button icon
        isDarkMode = !isDarkMode;

        // toggle theme
        window.document.body.classList.toggle("dark-mode");
    }

    const transitionParams: FadeParams = {
        duration: 300,
        easing: quartInOut,
    };
</script>

{#if isDarkMode}
    <button class="theme-toggle" on:click={handleToggle}>
        <i
            bind:this={iconElement}
            class="mi mi-sun icon"
            transition:fade={transitionParams}
        />
    </button>
{:else}
    <button class="theme-toggle" on:click={handleToggle}>
        <i
            bind:this={iconElement}
            class="mi mi-moon icon"
            transition:fade={transitionParams}
        />
    </button>
{/if}

<style>
    .theme-toggle {
        /* positioning */
        position: fixed;
        top: 16px;
        right: 16px;

        /* remove button styles */
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;

        font-size: 2em;

        transform: scale(1);
        transition: transform 0.3s ease-out;
        z-index: 2;
    }

    .theme-toggle:hover {
        transform: scale(1.2);
    }
</style>
