<script>
    import ContentSection from "$lib/ContentSection.svelte";
    import LazyComponent from "$lib/LazyComponent.svelte";
    import MenuButton from "$lib/MenuButton.svelte";
    import SideMenu from "$lib/SideMenu.svelte";
    import ThemeToggler from "$lib/ThemeToggler.svelte";
    import WorldHi from "$lib/WorldHi.svelte";

    $: showMenu = false;
    $: showWorld = false; // MOVE TO STORE
</script>

<MenuButton bind:show={showMenu}/>

{#if showMenu}
    <SideMenu bind:show={showMenu}/>
{/if}

<ThemeToggler />
<WorldHi show={true} />
<ContentSection id="intro">
    <LazyComponent this={() => import('$lib/Intro.svelte')}>
        <svelte:fragment slot="component" let:Component>
            <Component/>
        </svelte:fragment>
    </LazyComponent>
</ContentSection>
<ContentSection id="bg" inverted={true}>
    <LazyComponent this={() => import('$lib/BackgroundContent.svelte')}>
        <svelte:fragment slot="component" let:Component>
            <Component />
        </svelte:fragment>
    </LazyComponent>
</ContentSection>
<ContentSection id="lang-fram">
    <LazyComponent this={() => import('$lib/LangFrameworkContent.svelte')}>
        <svelte:fragment slot="component" let:Component>
            <Component />
        </svelte:fragment>
    </LazyComponent>
</ContentSection>