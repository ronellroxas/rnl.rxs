<script lang="ts">
    import { fade } from "svelte/transition";
    import SkillsList from "./SkillsList.svelte";

    const jsTsKeywords = ["ReactJS", "NextJS", "NodeJS", "Express", "Svelte", "Angular"];
    const sqlKeywords = ["MySQL", "OracleSQL", "TSQL", "PostgreSQL", "MongoDB", "Firebase", "SQLite"];
    const pythonKeywords = ["SKLearn", "Tensorflow", "Keras", "Pandas", "DataSci", "Flask", "FastAPI"];
    const platformKeywords = ["Android", "Java", "Kotlin", "C++", "C#"];
    const testingKeywords = ["Jest", "Selenium", "Junit"];
    const otherKeywords = ["Devops", "Git", "docker", "AWS", "Figma"];

    let isShowAll = false;

    interface keywordInterface {
        [key: string]: string[];
    }

    const keywords: keywordInterface = {
        "javascript": jsTsKeywords,
        "typescript": jsTsKeywords,
        "database": sqlKeywords, 
        "python": pythonKeywords,
        "platforms": platformKeywords,
        "testing": testingKeywords,
        "others": otherKeywords,
    }

    const allWords = [
        ...new Set(Object.values(keywords).flat()),
        ...Object.keys(keywords)
    ];

    $: selectedKeyword = "";
    $: currentKeywords = isShowAll ? allWords : 
        selectedKeyword == "" ? 
            Array.from(Object.keys(keywords)) :
            keywords[selectedKeyword];

    $: reload = false;

    // reload animations on select
    $: if (Object.keys(keywords).includes(selectedKeyword) || selectedKeyword == "") {
        reload = !reload;
    }

    function handleShowAll() {
        isShowAll = !isShowAll;
        selectedKeyword = isShowAll ? "all" : "";
        reload = !reload;

        console.log(isShowAll, selectedKeyword, reload)
    }
</script>

<div class="lang-framework-section">
    <div class="lang-fram-content">
        <span class="content-banner">Languages and Frameworks</span>
        {#key reload}
            {#key isShowAll}
                <SkillsList 
                    bind:keywords={currentKeywords} 
                    bind:selectedKeyword={selectedKeyword} 
                />
            {/key}
        {/key}
    </div>
    <button 
        class="show-all-btn" 
        on:click={handleShowAll}
        transition:fade={{ delay: 2000 }}
    >
        {isShowAll ? "RESET" : "SHOW ALL"}
    </button>
</div>

<style>
    .lang-framework-section {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .lang-fram-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 2em;
    }

    .show-all-btn {
        color: var(--PRIMARY);
        font-size: 0.9rem;
    }

    .show-all-btn:hover {
        font-weight: bolder;
    }
</style>
