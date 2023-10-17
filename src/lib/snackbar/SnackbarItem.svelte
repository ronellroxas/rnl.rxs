<script lang="ts">
    import { snackbarStoreState, type SnackbarProps } from "$lib/store";
    import { slide } from "svelte/transition";

    export let pending: SnackbarProps;
    export let duration: number = 5000; //in ms

    const closeSnackbarItem = () => {
        snackbarStoreState.update((store) =>
            store = { 
                pending: store.pending.filter(p => p != pending)
            }
        )
    }

    setTimeout(() => closeSnackbarItem(), duration)
</script>

<button 
        class="snackbar-item" 
        data-type={pending.type}
        on:click={() => closeSnackbarItem()}
        transition:slide={{ axis: "y"}}
    >
    {pending.text}
    <i class="mi mi-close icon snackbar-icon" />
</button>

<style>
    .snackbar-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        column-gap: 1em;

        position: relative;
        padding: 1.5rem 1rem;
        border-radius: 0.5rem;
        outline: none;
        border: none;
        text-align: left;
        cursor: pointer;
        width: 100%;
        color: var(--STATUS-TEXT-COLOR);

        box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);

        transition: translate 400ms;
    }

    .snackbar-item:hover {
        translate: -1rem;
    }

    .snackbar-item[data-type="0"] {
        background-color: var(--PRIMARY);
    }

    .snackbar-item[data-type="1"] {
        background-color: var(--SUCCESS-COLOR);
    }

    .snackbar-item[data-type="2"] {
        background-color: var(--ERROR-COLOR);
    }

    .snackbar-item[data-type="3"] {
        background-color: var(--NEUTRAL-COLOR);
    }
</style>