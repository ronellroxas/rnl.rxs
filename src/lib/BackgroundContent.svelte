<script lang="ts">
    import { scale } from "svelte/transition";
    import AnimatedDescWord from "./AnimatedDescWord.svelte";
    import { bounceOut } from "svelte/easing";
    let paragraphs = [
        "I am from Bulacan PH! I am an aspiring Full-Stack Developer.",
        "I love technology including different fields like Development, Machine Learning, Data Science, and DevOps.",
        "I also love working on various platforms like mobile and web development.",
        "I graduated with Honorable Mention Award from De La Salle University Manila on 2023 with a Bachelor's Degree in Computer Science Major in Software Technology.",
    ].map((p) => p.split(" "));

    /**
     * Helper method to get the continuation index for staggering.
     * @param pNumber current paragraph number
     */
    function getContinuationIndex(pNumber: number): number {
        var curr = pNumber - 1;
        var index = 0;
        while (curr >= 0) {
            index += paragraphs[curr].length;
            curr -= 1;
        }
        return index;
    }
</script>

<div id="background-section">
    <div class ="bg-content">
        <span class="content-banner">Call me Ronell <span class="shake">👋</span></span>
        <div class="content-desc bg-content-desc">
            {#each paragraphs as paragraph, i}
                {#each paragraph as word, z}
                    <AnimatedDescWord
                        {word}
                        order={z + getContinuationIndex(i)}
                    />
                {/each}
                {#if i < paragraphs.length - 1}
                    <p />
                {/if}
            {/each}
        </div>
    </div>
    <div class="bg-content-img">
        <div class="content-img" transition:scale={{ easing: bounceOut, delay: 1100, duration: 800 }}>
            Replace with img
        </div>
        <div class="content-img" transition:scale={{ easing: bounceOut, delay: 800, duration: 800 }}>
            Replace with img
        </div>
        <div class="content-img" transition:scale={{ easing: bounceOut, delay: 500, duration: 800 }}>
            Replace with img
        </div>
    </div>
</div>

<style>

    .bg-content {
        max-width: 40vw;
    }
    
    #background-section {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    
    .bg-content-desc, .bg-content-img {
        box-sizing: border-box;
    }

    .bg-content-img {
        display: block;
        position: relative;
        min-width: 40vw;
        transition: transform 0.3s linear;
    }

    @media only screen and (max-width: 1000px) {
        .bg-content, .bg-content-img {
            max-width: 100vw;
        }

        .background-section {
            row-gap: 1em;
            flex-direction: column;
            margin: 0em 1em;
        }
    }

    .content-img {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        transform: translateY(50%);
        max-width: 250px;
        min-width: 150px;
        width: 20%;
        aspect-ratio: 3/4;
    }

    .content-img:nth-child(1) {
        background: var(--PRIMARY);
        z-index: 0;
    }

    .content-img:nth-child(2) {
        translate: 1em -1em;
        background: var(--CURRENT-TEXT-COLOR);
        z-index: -1;
    }

    .content-img:nth-child(3) {
        translate: 2em -2em;
        background: red;
        z-index: -2;
    }
</style>
