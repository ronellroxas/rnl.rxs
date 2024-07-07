<script lang="ts">
    import { type ProjectModel } from "$lib/db";

    export let hoveringProject: HTMLButtonElement | null;
    export let project: ProjectModel;
    export let index: number = 0;

    let hovering = false;

    let container: HTMLButtonElement;
    
    $: purposeColor = `var(--${project.purpose.toUpperCase()}-COLOR)`;

    function handleHover(e: MouseEvent, isEnter: boolean) {
        const btn = e.currentTarget as HTMLButtonElement;

        hovering = isEnter;

        if (isEnter) {
            hoveringProject = btn;
        } else {
            hoveringProject = null;
        }
    }
</script>

<button
    class={`project-container ${hovering ? "inverted-project" : ""}`} 
    style={`--PROJECT-COLOR: ${purposeColor}; animation-delay: ${index*100}ms`}
    data-color={purposeColor}
    bind:this={container}
    on:mouseenter={(e) => handleHover(e, true)}
    on:mouseleave={(e) => handleHover(e, false)}
>
    <div class="title-row">
        <span class="project-title">{project.title}</span>
        <span class="project-purp">{project.purpose.toUpperCase()}</span>
    </div>
    <span class="project-desc">{project.description}</span>
    <span class="project-langs">{project.languages}</span>
</button>

<style>

    @keyframes slide-anim {
        0% {
            translate: -2rem 0.5rem;
            opacity: 0;
        }
        100% {
            translate: 0 0;
            opacity: 1;
        }
    }

    .title-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-align: start;
    }

    .project-container {
        position: relative;
        border: 1px solid var(--PROJECT-COLOR);
        
        width: 100%;
        min-height: 20vh;
        max-height: 10rem;

        padding: 1rem;

        overflow: hidden;
        border-radius: 1rem;
        box-sizing: border-box;
        cursor: pointer;

        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 0.5rem;

        color: var(--PROJECT-COLOR);

        --COLOR-TRANSITION: color 400ms ease-in-out, background-color 400ms ease-in-out;

        opacity: 0;
        transition: var(--COLOR-TRANSITION);
        animation: slide-anim 400ms ease-in-out 1 forwards;
    }

    .project-title {
        color: var(--PROJECT-COLOR);
        font-weight: bold;
    }

    .project-langs {
        font-size: 0.8rem;
        align-self: flex-end;
    }

    .project-purp {
        font-size: 0.8rem;
        
        padding: 0.5rem 1rem;
        background-color: var(--PROJECT-COLOR);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
        border-radius: 1rem;

        transition: var(--COLOR-TRANSITION);
    }

    .inverted-project {
        background-color: var(--PROJECT-COLOR);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
    }

    .inverted-project > .title-row > .project-title {
        color: var(--CURRENT-TEXT-ON-PRIMARY);
    }

    .inverted-project > .title-row > .project-purp {
        background-color: var(--CURRENT-BG-COLOR);
        color: var(--PROJECT-COLOR);
    }
    
    .project-desc {
        text-align: left;
        overflow-x: hidden;
        overflow-wrap: break-word;
        line-height: 1.25rem;
        max-width: 100%;
        flex: 1;
    }

</style>