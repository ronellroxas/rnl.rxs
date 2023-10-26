<script lang="ts">
    import PreviewContainer from "$lib/components/PreviewContainer.svelte";
import TagList from "./TagList.svelte";

    $: filters = ["test", "test", "test", "test", "test", "test"];
</script>

<div class="project-section">
    <div class="project-half">
        <span class="content-banner">Projects</span>
        <TagList filters={filters} />
    </div>
    <div class="list-half">
        {#each {length: 20} as _}
            <PreviewContainer>
                Test
            </PreviewContainer>
        {/each}
    </div>
</div>

<style>
    .project-section {
        display: flex;
        flex-direction: row;
        min-width: 100%;
        max-height: 80vh;
    }
    
    .project-half {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        row-gap: 1em;

        min-width: 50%;
        min-height: 100%;
    }

    .list-half {
        overflow-y: scroll;
    }
</style>
