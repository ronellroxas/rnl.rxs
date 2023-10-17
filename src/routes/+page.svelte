<script lang="ts">
    // components
    import ContentSection from "$lib/ContentSection.svelte";
    import LazyComponent from "$lib/lazyLoading/LazyComponent.svelte";
    import MenuButton from "$lib/MenuButton.svelte";
    import SideMenu from "$lib/SideMenu.svelte";
    import Snackbar from "$lib/snackbar/Snackbar.svelte";
    import ThemeToggler from "$lib/ThemeToggler.svelte";
    import WorldHi from "$lib/WorldHi.svelte";
    
    //  store
    import { viewStoreState, type IViewStore } from "$lib/store";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    let viewStore: IViewStore = {
        showSideMenu: false,
        showWorldHi: false   
    }

    viewStoreState.subscribe((viewStoreState) => {
        viewStore = viewStoreState
    });
</script>

<MenuButton />

{#if viewStore.showSideMenu}
    <SideMenu bind:show={viewStore.showSideMenu}/>
{/if}

<ThemeToggler />
<WorldHi show={viewStore.showWorldHi} form={form}/>
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
<Snackbar />