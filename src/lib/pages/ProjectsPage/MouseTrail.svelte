<script lang="ts">

    export let currentHoveringProject: HTMLButtonElement | null;
    export let mouseX: number;
    export let mouseY: number;

    let mouseTrail: HTMLDivElement;

    $: showTrailClass = currentHoveringProject != null ? "show-trail" : "";

    $: if (mouseTrail != undefined || mouseTrail != null) {
        let x = mouseX - mouseTrail.offsetWidth / 2,
            y = mouseY - mouseTrail.offsetHeight / 2

        let keyframes = {
            transform: `translate(${x}px, ${y}px)`,
        }

        mouseTrail.animate(keyframes, {
            duration: 800,
            fill: "forwards"
        });

        mouseTrail.style.backgroundColor = currentHoveringProject?.dataset.color!!;
    }
</script>

<div class={`mouse-trail ${showTrailClass}`}
    bind:this={mouseTrail}>
    <i class="mi mi-expand icon"/>
</div>

<style>
    .mouse-trail {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        aspect-ratio: 1;

        width: 5rem;

        background-color: transparent;
        pointer-events: none;

        left: 0;
        top: 0;

        z-index: 1000;

        border-radius: 10rem;
        opacity: 0;

        border: 1px solid var(--CURRENT-BG-COLOR);
        transition: opacity 200ms ease-in-out
    }

    .show-trail {
        opacity: 1;
    }

    .icon {
        font-size: 2rem;
        color: var(--CURRENT-TEXT-ON-PRIMARY);
    }

    .icon::before {
        margin: 0;
        padding: 0;
    }
</style>