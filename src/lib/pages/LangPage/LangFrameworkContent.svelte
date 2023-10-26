<script lang="ts">
    import SkillsList from "./SkillsList.svelte";

    const jsTsKeywords = ["ReactJS", "NextJS", "NodeJS", "Express", "Svelte", "Angular"];
    const sqlKeywords = ["MySQL", "OracleSQL", "TSQL", "PostgreSQL", "MongoDB", "Firebase", "SQLite"];
    const pythonKeywords = ["SKLearn", "Tensorflow", "Keras", "Pandas", "Data Science", "Flask", "FastAPI"];
    const platformKeywords = ["Android", "Java", "Kotlin", "C++", "C#"];
    const testingKeywords = ["Jest", "Selenium", "Junit"];
    const otherKeywords = ["Devops", "Git", "docker", "AWS", "Figma"];

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
        "others": otherKeywords
    }

    $: selectedKeyword = "";
    $: currentKeywords = selectedKeyword == "" ? 
        Array.from(Object.keys(keywords)) :
        keywords[selectedKeyword];

    $: reload = false;
    $: console.log(currentKeywords)

    // reload animations on select
    $: if (Object.keys(keywords).includes(selectedKeyword) || selectedKeyword == "") {
        reload = !reload;
    }

</script>

<div class="lang-framework-section">
    <div class="lang-fram-content">
        <span class="content-banner">Languages and Frameworks</span>
        {#key reload}
            <SkillsList 
                bind:keywords={currentKeywords} 
                bind:selectedKeyword={selectedKeyword} 
            />
        {/key}
    </div>
</div>

<style>
    .lang-fram-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 2em;
    }

    @keyframes skills-fade {
        from {
            opacity: 0;
        } to {
            opacity: 1;
        }
    }
</style>
