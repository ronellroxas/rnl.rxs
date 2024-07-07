<script lang="ts">
    import { type ProjectLanguages, type ProjectModel, ProjectModelUtils, ProjectPurpose } from "$lib/db/ProjectModel";
    import ProjectContainer from "./ProjectContainer.svelte";
    import TagList from "$lib/components/TagList.svelte";
    import { onMount } from "svelte";
    import MouseTrail from "./MouseTrail.svelte";
    import { langStoreState, pushLangState, pushSnackbarState, SnackbarTypeEnum } from "$lib/store";

    $: filters = ["test", "test", "test", "test", "test", "test"];
    
    let langList: ProjectLanguages[] = [];
    $: languages = langList;
    
    let projectList: ProjectModel[] = [];
    $: projects = projectList;
    langStoreState.subscribe((langStoreState) => {
        langList = langStoreState.languages;
    });

    let arrowTopVisibility = false;
    let arrowBottomVisibility = false;
    let listHeight = 0;
    let currentListScrollBottom: number;
    let mouseX: number = 0;
    let mouseY: number = 0;

    let currentHoveringProject: HTMLButtonElement | null = null;
    let section: HTMLDivElement;
    let listHalf: HTMLDivElement;

    let selectedProjectPurpose : ProjectPurpose[] = []

    function getEnumValuesAsStrings(list: any) {
        return Object.keys(list)
            .filter(entry => isNaN(Number(entry))) as string[];
    }

    function handleOverflowArrows(currentScroll: number, scrollHeight: number) {
        arrowBottomVisibility = currentScroll < scrollHeight;
        arrowTopVisibility = currentScroll - listHeight > 0;
    }

    function handleScroll(e: UIEvent) {
        const list = e.currentTarget as HTMLDivElement;
        currentListScrollBottom = list.scrollTop + list.clientHeight;
        
        handleOverflowArrows(currentListScrollBottom, list.scrollHeight);
    }

    async function getProjects() {
        let response = await fetch("/api/project");
        let json = await response.json();

        if (json.isSuccess) {
            let data = json.data as ProjectModel[];
            let langs = [...new Set(data.flatMap(proj => proj.languages))];
            pushLangState(ProjectModelUtils.getMappedLanguages(langs));
            projectList = data;
        } else {
            let snackbar = {
                text: "There was a problem retrieving projects, please reload and try again!",
                type: SnackbarTypeEnum.ERROR
            };

            pushSnackbarState(snackbar);
        }
    }

    onMount(() => {
        handleOverflowArrows(listHalf.clientHeight, listHalf.scrollHeight);
        listHeight = listHalf.clientHeight;

        section.onmousemove = e => {
            let bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            mouseX = e.clientX - bounds.left;
            mouseY = e.clientY - bounds.top;
        }

        getProjects();
    });
</script>

<div class="project-section" bind:this={section}>
    <MouseTrail 
        bind:currentHoveringProject={currentHoveringProject}
        bind:mouseX={mouseX} 
        bind:mouseY={mouseY}
    />
    
    <div class="project-half">
        <span class="content-banner">Projects</span>
        <div class="project-filters">
            <TagList index={1} title="Languages/Frameworks" filters={languages} />
            <TagList index={2} title="Type" filters={filters} />
            <TagList index={3} title="Purpose" 
                filters={getEnumValuesAsStrings(ProjectPurpose)} 
                bind:selected={selectedProjectPurpose}
            />
        </div>
    </div>
    <!-- <div 
        class="project-overflow-indicator"
        >
        {#if arrowBottomVisibility}
            <i class="mi mi-chevron-double-down icon" transition:scale={{ easing: bounceInOut, duration: 600 }}/>
        {:else if arrowTopVisibility}
            <i class="mi mi-chevron-double-up icon" transition:scale={{ easing: bounceInOut, duration: 600 }}/>
        {/if}
    </div> -->
    <div 
        class="list-half"
        bind:this={listHalf}
        on:scroll={handleScroll}
    >
        {#each projects as project, i}
        <ProjectContainer 
            index={i}
            project={project}
            bind:hoveringProject={currentHoveringProject}
        />
        {/each}
    </div>
</div>

<style>
    .project-section {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 100%;
        row-gap: 1rem;

        justify-content: center;
        align-items: center;

        --INTERNSHIP-COLOR: #775b90;
        --PERSONAL-COLOR: #905c5b;
        --ACADEMIC-COLOR: #75905b;
    }

    .project-filters {
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
        justify-content: space-between;
        align-items: flex-start;
    }

    @media screen and (max-width: 750px) {
        .project-filters {
            flex-direction: column;
            row-gap: 0.5rem;
        }
    }

    .project-half {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        row-gap: 1em;

        min-width: 50%;
        min-height: 100%;
    }

    .list-half {
        position: relative;
        padding: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1rem;
        max-height: 50vh;
        width: 100%;
        max-width: 100%;
        overflow-y: scroll;
        box-sizing: border-box;
        justify-items: start;
    }

    @keyframes arrow-anim {
        0%, 100% {
            opacity: 0.5;
        }
        10%, 80% {
            opacity: 1;
        }
    }

</style>
