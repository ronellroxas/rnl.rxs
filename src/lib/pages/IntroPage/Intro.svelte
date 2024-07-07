<script lang="ts">
    import AnimatedDescWord from "$lib/components/AnimatedDescWord.svelte";
    import IntroSlidingPreviewComponent from "./IntroSlidingPreviewComponent.svelte";
    import WorldButton from "$lib/components/WorldButton.svelte";

    let desc = "This is a personal portfolio of Ronell Roxas containing experiences, knowledge, hobbies, and other contact information. Enjoy browsing and say Hi by clicking the globe anytime!";
    let words = desc.split(" ");
</script>

<div id="intro-section">
    <WorldButton/>
    <span class="content-banner">Hello World!</span>
    <div class="content-desc">
        {#each words as word, i}
            <AnimatedDescWord word={word} order={i}/>
        {/each}
    </div>
    <IntroSlidingPreviewComponent />
</div>

<style>
    @media only screen and (max-width: 1000px) {
        #intro-section {
            max-width: 95%;
            margin: auto;
        }
    }

    #intro-section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text-align: center;
    
        max-width: 100vw;
        overflow: visible;
    }

    .content-desc {
        padding: 0 1rem;
    }
</style>