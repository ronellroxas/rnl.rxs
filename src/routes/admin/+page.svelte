<script lang="ts">
    import ContentSection from "$lib/components/ContentSection.svelte";
    import { snackbarStoreState, type SnackbarProps, SnackbarTypeEnum } from "$lib/store";
    import type { ActionData, PageData } from "./$types";
    import Login from "./components/Login.svelte";
    import ProjectManager from "./components/ProjectManager.svelte";
    import MessageTable from "./components/MessageTable.svelte";

    export let form: ActionData | undefined;
    export let data: PageData;
    $:console.log(data);
    // not using store so every refresh will need login
    $: isLoggedIn = false;
    let idleTime = 0;

    const IDLE_MAX = 5; // 5 mins

    const resetIdleTime = (event: Event) => {
        idleTime = 0;
    }

    $: if (isLoggedIn) {
        console.log("start idle tracking");
        document.addEventListener("mousemove", resetIdleTime);
        document.addEventListener("keydown", resetIdleTime);

        let idleTimer = setInterval(() => {
            idleTime++;

            if (idleTime >= IDLE_MAX/2) {
                const snackbar: SnackbarProps = {
                    text: "Are you there? You might logout if you stay idle for too long.",
                    type: SnackbarTypeEnum.NEUTRAL,
                    isExpiring: false
                }
                snackbarStoreState.update((store) => store = {...store, pending: [...store.pending, snackbar]});
            }

            if (idleTime >= IDLE_MAX) {
                clearInterval(idleTimer);
                document.removeEventListener("mousedown", resetIdleTime);
                document.removeEventListener("keydown", resetIdleTime);

                form = undefined;
                isLoggedIn = false;

                const snackbar: SnackbarProps = {
                    text: "You have been logged out due to inactivity. Please login again!",
                    type: SnackbarTypeEnum.NEUTRAL,
                    isExpiring: false
                }
                snackbarStoreState.update((store) => store = {...store, pending: [...store.pending, snackbar]});
            }
        }, 60000) //1 min
    }
</script>

<ContentSection id="">
    <div class="admin-notes">
    {#if isLoggedIn}
        <span class="content-banner">Messages</span>
        <MessageTable />
        <span class="content-banner">Project Management</span>
        <ProjectManager />
    {:else}
        <span class="content-banner">Admin stuff</span>
        <span>Hi! This page is meant for me only (Ronell) and doesn't really do anything without a passkey.</span>
        <span>
            Feel free to look around, but there are more interesting things in the
            <a href="/">landing page</a>!
        </span>
        <Login {form} bind:isLoggedIn={isLoggedIn}/>
    {/if}
</div>
    
</ContentSection>

<style>
    .admin-notes {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        text-align: center;
        justify-content: center;
        width: 80%;
    }

    @media (max-width: 600px) {
        .admin-notes {
            width: 90%;
        }
    }
</style>