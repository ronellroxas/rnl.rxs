<script lang="ts">
    import { slide, fade } from "svelte/transition";
    import PreviewContainer from "./PreviewContainer.svelte";
    $: currentSelected = -1;

    function select(index: number) {
        currentSelected = index;
    }
</script>

<div class="lang-framework-section">
    <div class="lang-fram-content">
        <span class="content-banner">Languages and Frameworks</span>
        <div class="select-parent"
            in:fade={{ delay: 600 }}
        >
            {#if currentSelected >= 0}
                <div
                    class="selected-card"
                    on:click={() => select(-1)}
                    on:keypress={() => select(-1)}
                    tabindex="0"
                    role="button"
                    in:slide={{ duration: 300, axis: "x", delay: 300 }}
                    out:slide={{ duration: 300, axis: "x" }}
                >
                    <span>Test</span>
                </div>
            {:else}
                <div
                    class="lang-fram-grid"
                    in:slide={{ duration: 300, axis: "x", delay: 300 }}
                >
                    {#each { length: 8 } as _, i}
                    <PreviewContainer
                        size="auto"
                        onClickHandler={() => select(i)}
                    />
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .lang-fram-content {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 2em;
    }

    .lang-fram-grid {
        width: fit-content;
        width: 100vw;
        max-width: 100vw;
        display: grid;
        gap: 1em;
        grid-template-columns: repeat(4, auto);
        justify-content: center;

        
    }

    @media only screen and (max-width: 900px) {
        .lang-fram-grid {
            grid-template-columns: repeat(3, auto);
        }
    }

    @media only screen and (max-width: 600px) {
        .lang-fram-content {
            width: 95vw;
        }

        .lang-fram-grid {
            grid-template-columns: repeat(2, auto);
            justify-content: space-evenly;
        }
    }

    .selected-card {
        display: inline-block;
        width: 100%;
        height: 100%;
        max-width: 850px;
        padding: 2rem;
        border-radius: 2em;
        background: var(--PRIMARY);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
        cursor: pointer;
    }

    .select-parent {
        display: flex;
        width: 100vw;
        min-height: 400px;
        height: 100%;
        justify-content: center;
    }
</style>
