<script lang="ts">
    import { onMount } from "svelte";

    let skillsList: HTMLDivElement;

    export let keywords: string[];
    export let selectedKeyword: string = "";

    const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ+#";
    const BACK_KEYWORD = "←back";

    $: firstRun = selectedKeyword == "";
    $: CHAR_ANIMATION_DURATION = 2000;
    $: KEYWORD_SHOW_DELAY = Math.floor(CHAR_ANIMATION_DURATION/keywords.length);

    function getRandomLetter() {
        return LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
    }


    function animateCharacter(span: HTMLSpanElement, duration: number = CHAR_ANIMATION_DURATION) {
        const charInterval = setInterval(() => {
                // do not update anymore if it is a key
                if (!span.classList.contains("skill-char-key")) {
                    span.textContent = getRandomLetter();
                }
                
                setTimeout(() => {
                    clearInterval(charInterval);
                }, duration);
            }, 100);
    }

    let currentKeywordHover = "";
    
    
    onMount(() => {
        const COLUMN_SIZE = getComputedStyle(skillsList).getPropertyValue("grid-template-columns").split(" ").length;
        const MAX_POSITION = COLUMN_SIZE*getComputedStyle(skillsList).getPropertyValue("grid-template-rows").split(" ").length;

        function applyKeyword(span: HTMLSpanElement, word: string, char: string) {
            span.textContent = char;
            span.classList.add("skill-char-key");
            (span as HTMLSpanElement).dataset.keyword = word; 
            span.style.color = "var(--PRIMARY)";
            span.style.fontWeight = "bolder";

            // set hover effect
            span.addEventListener("mouseover", () => toggleKeywordHover(word, false));
            span.addEventListener("mouseleave", () => toggleKeywordHover(word, true));
            span.addEventListener("mousedown", () => {
                selectedKeyword = word == BACK_KEYWORD ? "" : word;
            });
        }

        function generatePosition(): number {
            return firstRun ? 
            Math.floor(Math.random() * MAX_POSITION) :
            Math.floor(Math.random() * (MAX_POSITION - BACK_KEYWORD.length + 2) + BACK_KEYWORD.length + 1);
        }

        function toggleKeywordHover(word: string, isExit: boolean) {
            const keywordSpans = skillsList.querySelectorAll(`span[data-keyword="${word}"`);
            
            
            // no need to run again if hovering over same keyword for mouseover
            if (!isExit && currentKeywordHover == word) return;

            currentKeywordHover = isExit ? "" : word;

            keywordSpans.forEach(span => {
                if (isExit) {
                    (span as HTMLSpanElement).style.backgroundColor = "transparent"; 
                    (span as HTMLSpanElement).style.color = "var(--PRIMARY)";
                } else {
                    (span as HTMLSpanElement).style.backgroundColor = "var(--PRIMARY)"; 
                    (span as HTMLSpanElement).style.color = "var(--CURRENT-TEXT-ON-PRIMARY)";
                }                
            });
        }

        for (var i = 0; i < MAX_POSITION; i++) {
            let span = document.createElement("span");
            span.textContent = getRandomLetter();
            span.classList.add("skill-char");
            skillsList.appendChild(span);

            // char animation
            animateCharacter(span);

            // add hover animation only after the initial animation
            setTimeout(() => {
                span.addEventListener("mouseover", () => animateCharacter(span, 500));
            }, CHAR_ANIMATION_DURATION);
        }

        let prevPositions: number[] = [];

        // append a back keyword on animation end
        if (!firstRun) {  
            setTimeout(() => {
                let i = 0;
                for (let char of BACK_KEYWORD) {
                    const span = skillsList.children.item(i);
                    if (span != null && span != undefined) {
                        applyKeyword(span as HTMLSpanElement, BACK_KEYWORD, char);
                    }
                    i++;
                }
            }, CHAR_ANIMATION_DURATION);
        }

        // append keywords after char animation
        setTimeout(() => {
            for (var i = 0; i < keywords.length; i++) {
                // generate random position for keyword
                const word = keywords[i];
            
                let position = generatePosition();

                // Generate position until:
                // 1. it does not overlap with other keywords
                // 2. end position does not overlap
                // 3. you can fit the entire word in the line
                while (prevPositions.includes(position) || 
                    prevPositions.includes(position + word.length) || 
                    position + word.length > Math.ceil(position/COLUMN_SIZE)*COLUMN_SIZE) {
                        
                    position = generatePosition();
                }
                
                //console.log(word, position, Math.ceil(position/COLUMN_SIZE)*COLUMN_SIZE);

                for (const char of word) {
                    const span = skillsList.children.item(position);
                    if (span != null && span != undefined) {
                        setTimeout(() => {
                            applyKeyword(span as HTMLSpanElement, word, char);
                        }, KEYWORD_SHOW_DELAY*i);
                    }
                    
                    prevPositions.push(position);
                    position++;

                }

                // push index of last char
                prevPositions.push(position);
                // push index of next char to create space in between words
                prevPositions.push(position + 1);
            }
        }, KEYWORD_SHOW_DELAY);

    });
</script>

<div class="skills-list" bind:this={skillsList}>
</div>

<style>
    .skills-list {
        display: grid;
        grid-template-rows: repeat(15, 1fr);
        grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
        width: 95%;
        color: var(--TEXT-ON-NEUTRAL);

        text-align: center;
        vertical-align: middle;
        justify-items: center;

        animation: skills-fade 2s ease-in-out forwards;
        text-transform: uppercase;

        overflow-x: hidden;
    }
</style>