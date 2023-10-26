<script lang="ts">
    // components
    import ContentSection from "$lib/components/ContentSection.svelte";
    import LazyComponent from "$lib/lazyLoading/LazyComponent.svelte";
</script>

<ContentSection id="intro">
    <LazyComponent this={() => import('$lib/pages/IntroPage/Intro.svelte')}>
        <svelte:fragment slot="component" let:Component>
            <Component/>
        </svelte:fragment>
    </LazyComponent>
</ContentSection>
<ContentSection id="bg" inverted={true}>
    <LazyComponent this={() => import('$lib/pages/BackgroundPage/BackgroundContent.svelte')}>
        <svelte:fragment slot="component" let:Component>
            <Component />
        </svelte:fragment>
    </LazyComponent>
</ContentSection>
<ContentSection id="lang-fram">
    <LazyComponent this={() => import('$lib/pages/LangPage/LangFrameworkContent.svelte')}>
        <svelte:fragment slot="component" let:Component>
            <Component />
        </svelte:fragment>
    </LazyComponent>
</ContentSection>
<ContentSection id="projects">
    <LazyComponent this={() => import('$lib/pages/ProjectsPage/ProjectsContent.svelte')}>
        <svelte:fragment slot="component" let:Component>
            <Component />
        </svelte:fragment>
    </LazyComponent>
</ContentSection>