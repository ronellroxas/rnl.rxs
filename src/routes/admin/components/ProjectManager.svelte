<script lang="ts">
    import { enhance } from "$app/forms";
    import TextInput from "$lib/components/TextInput.svelte";
    import { ProjectLanguages, ProjectPurpose, ProjectType } from "$lib/db";
    import TagList from "$lib/components/TagList.svelte";

    function getEnumValues(list: any) {
        return Object.values(list)
            .filter(entry => isNaN(Number(entry))) as string[];
    }

    let selectedLanguages: number[] = [];
    const langValues = getEnumValues(ProjectLanguages);

    $: selectedLanguagesStr = selectedLanguages.toString();
</script>

<form 
    use:enhance
    class="project-mgr"
    method="post"
    action="/api/project"
>
    <div class="project-info">
        <TextInput name="title" placeholder="title"/>
        <TextInput name="type" placeholder="type" suggestions={getEnumValues(ProjectType)}/>
        <TextInput name="purpose" placeholder="purpose" suggestions={getEnumValues(ProjectPurpose)}/>
    </div>
    <TagList 
        bind:selected={selectedLanguages}
        title="Languages/Frameworks" filters={langValues} 
    />
    <input 
        name="selected-langs" 
        class="selected-lang-hidden" 
        type="text" 
        value={selectedLanguagesStr}
        required
        />
    <textarea 
        name="desc"
        class="proj-desc-area"
        placeholder="Project Description"
        required={true}
    />
    <button type="submit" class="form-btn">Create Project</button>
</form>

<style>
    .project-mgr {
        display: flex;
        flex-direction: column;
        row-gap: 1em;
        font-family: inherit;
    }

    .project-info {
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
        font-family: inherit;
        justify-content: space-between;
    }

    .proj-desc-area {
        width: 100%;
        background: none;
        border-radius: 0.5rem;
        min-height: 100px;
        padding: 0.5rem;
    }

    .selected-lang-hidden {
        display: none;
    }
</style>