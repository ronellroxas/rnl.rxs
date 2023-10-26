<script lang="ts">
    import MenuButton from "$lib/components/MenuButton.svelte";
    import SideMenu from "$lib/components/SideMenu.svelte";
    import ThemeToggler from "$lib/components/ThemeToggler.svelte";
    import WorldHi from "$lib/components/WorldHi.svelte";
    import Snackbar from "$lib/snackbar/Snackbar.svelte";
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

<Snackbar />

<slot></slot>