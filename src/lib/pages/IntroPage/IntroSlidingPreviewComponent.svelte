<script lang="ts">
    import { onMount } from "svelte";
    import PreviewContainer from "$lib/components/PreviewContainer.svelte";

    let slides: HTMLDivElement;
    
    let enableHover = false;

    onMount(() => {
        setTimeout(() => {
            enableHover = true;
        }, 800);
    });

    function handleSlideMouseEnter() {
        if (!enableHover) return;

        for (let slide of slides.children) {
            if (!slide.classList.contains("sliding-preview")) return;

            (slide as HTMLDivElement).style.animationPlayState = "paused";
        }
    }

    function handleSlideMouseExit() {
        for (let slide of slides.children) {
            if (!slide.classList.contains("sliding-preview")) return;

            (slide as HTMLDivElement).style.animationPlayState = "running";
        }
    }

    function scroll(name: string) {
        let section = document.getElementById(name)!!;
        section.scrollIntoView({behavior: "smooth"});
    }

</script>

<div class="slides" bind:this={slides} 
    on:mouseenter={handleSlideMouseEnter} 
    on:mouseleave={handleSlideMouseExit}
    role="banner"
>
    {#each {length: 3} as _}
        <div class="sliding-preview">
            <PreviewContainer onClickHandler={() => scroll("bg")}>
                <span>Background</span>
            </PreviewContainer>
            <PreviewContainer onClickHandler={() => scroll("lang-fram")}>
                <span>Languages and Frameworks</span>
            </PreviewContainer>
            <PreviewContainer onClickHandler={() => scroll("projects")}>
                <span>Projects</span>
            </PreviewContainer>
            <PreviewContainer><span>Contacts</span></PreviewContainer>
        </div>
    {/each}
</div>

<style>
    @keyframes slide {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }
    
    @keyframes slide-opacity {
        0% {opacity: 0; scale: 0.5;}
        100% {opacity: 1; scale: 1;}
    }
    .slides {
        overflow-x: hidden;
        white-space: nowrap;
        width: 100vw;
        position: relative;
    }

    .sliding-preview {
        opacity: 0;
        display: inline-block;
        margin-top: 2em;
        margin-bottom: 2em;
        animation: slide 20s linear infinite, slide-opacity 1s linear 1 forwards 0.8s;
    }
</style>