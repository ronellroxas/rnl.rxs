<script lang="ts">
    export let text: string;
    export let selected: number[] = [];
    export let index = -1;

    $: isSelected = selected.includes(index);
</script>

<button
    type="button" 
    class="filter-tag {isSelected ? "filter-tag-selected" : ""}" 
    style={`animation-delay: ${200*index}ms`}
    on:click
>
    {text}
</button>

<style>
    @keyframes slide-anim {
        0% {
            translate: -2rem 0;
            opacity: 0;
        }
        100% {
            translate: 0 0;
            opacity: 1;
        }
    }

    .filter-tag {
        position: relative;
        display: inline-flex;
        padding: 0.5em 1em;
        border-radius: 0.5rem;
        color: var(--PRIMARY);
        cursor: pointer;
        min-width: fit-content;
        margin: 0.2rem;

        overflow: hidden;
        
        border: 1px solid var(--PRIMARY);

        opacity: 0;
        transition: background-color 400ms ease-in-out, color 400ms ease-in-out, scale 200ms ease-out;
        animation: slide-anim 400ms ease-in-out 1 forwards;
    }

    .filter-tag:hover {
        background-color: var(--PRIMARY);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
    }

    .filter-tag:active {
        scale: 0.9;
    }

</style>
