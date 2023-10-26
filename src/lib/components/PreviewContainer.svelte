<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";

    export let size = "250px";
    export let minSize = "150px";
    export let maxSize = "250px";
    export let style = "";
    
    export let onClickHandler: MouseEventHandler<HTMLDivElement> = () => {};
</script>

<div 
    class="preview-container"
    style="width: {size}; max-width: {maxSize}; min-width: {minSize}; {style}"
    on:click={onClickHandler}
    role="button"
    tabindex="0"
    {...$$restProps}
>
    <slot />
</div>

<style>
    .preview-container {
        display: inline-block;
        aspect-ratio: 1;

        border-radius: 2em;
        height: auto;
        padding: 1em;
        margin: 0 1em;
        transition: transform 0.3s ease-out, border-color 0.5s ease-in-out;
        cursor: pointer;
        color: var(--PRIMARY);
        background: rgba(255, 255, 255, 0);
        border: 1px solid var(--PRIMARY);

        box-sizing: border-box;
        position: relative;
        
    }

    .preview-container:hover {
        transform: scale(1.2);
        border-color: rgba(255, 255, 255, 0);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
    }

    .preview-container::after {
        border-radius: 2em;
        content: "";
        position: absolute;
        z-index: -1;
        background: var(--PRIMARY);
        inset: 0;
        scale: 0;

        transition: scale 0.3s;
    }

    .preview-container:hover::after {
        scale: 1;
    }
</style>