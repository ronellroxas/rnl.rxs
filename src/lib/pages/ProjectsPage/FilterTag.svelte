<script lang="ts">
    export let text: string;
</script>

<div class="filter-tag">{text}</div>

<style>
    .filter-tag {
        position: relative;
        display: inline-flex;
        padding: 0.5em 1em;
        border-radius: 0.5rem;
        color: var(--PRIMARY);
        cursor: pointer;
        width: fit-content;
        overflow: hidden;
        
        border: 1px solid var(--PRIMARY);

        transition: background-color 400ms ease-in-out, color 400ms ease-in-out;
    }

    .filter-tag:hover {
        background-color: var(--PRIMARY);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
    }
</style>
