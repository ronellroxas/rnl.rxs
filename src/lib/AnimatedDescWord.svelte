<script lang="ts">
    import { onMount } from "svelte";

    export let word = "";
    export let order = 0;

    let spanElement: HTMLSpanElement;
    
    onMount(() => {
        spanElement.style.animationDelay = `${order * 0.03 + 0.8}s`;
    });

    // highlight words in this to primary color. Split with spaces.
    const HIGHLIGHTED_WORDS = `honorable mention award de la salle university manila 
            2023 computer science major software technology 
            bulacan ph full-stack developer development machine 
            learning data science devops platforms mobile web`
        .split(" ")
        .map(word => word.toLowerCase());

    function shouldHighlight(word: string) {
        var finalWord = word.trim().toLowerCase();
        if (word.endsWith(".") || word.endsWith(",")) {
            var finalWord = finalWord.substring(0, finalWord.length - 1);
        }

        return HIGHLIGHTED_WORDS.includes(finalWord);
    }
</script>

<span 
    class="desc-word 
        {shouldHighlight(word) ? 
        "word-highlight" : ""}
    " 
    bind:this={spanElement}>
    {word}
</span>

<style>
    @keyframes desc-word-anim {
        from {
            opacity: 0;
            transform: translateY(100px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .desc-word {
        opacity: 0;
        margin: 0.5em 0.15em; 
        display: inline-block;
        animation: desc-word-anim 0.5s ease-in-out 1;
        animation-fill-mode: forwards;
    }

    .word-highlight {
        color: var(--PRIMARY);
        font-weight: bold;
    }
</style>