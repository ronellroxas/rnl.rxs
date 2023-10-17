<script lang="ts">
    import TextInput from "./TextInput.svelte";
    import WorldTour from "./graphs/WorldTour.svelte";

    export let show = false;
    export let form: ActionData;

    import world from "$lib/data/countries-110m.json";
    import {
        snackbarStoreState,
        viewStoreState,
        type SnackbarProps,
        SnackbarTypeEnum
    } from "./store";
    
    import { fade, scale } from "svelte/transition";
    import { enhance } from "$app/forms";
    import type { ActionData } from "../routes/$types";
    import CountryGraph from "./graphs/CountryGraph.svelte";
    

    $: nameValue = "";
    $: countryValue = "";
    $: messageValue = "";

    let submitted = false;
    let worldWidth: number;

    $: width = worldWidth - 64; // remove padding size

    // get country names
    let countryNames = world.objects.countries.geometries.map(
        (geo) => geo.properties.name
    );

    function close() {
        viewStoreState.update(
            (viewStoreState) =>
                (viewStoreState = { ...viewStoreState, showWorldHi: false })
        );
    }

    function addSnackbar(snackbar: SnackbarProps) {
        snackbarStoreState.update((store) => 
            store = { ...store, pending: [...store.pending, snackbar]}
        )
    }

    function handleSubmitResult(success: boolean) {
        let snackbar: SnackbarProps;
        if (success) {
            countryValue = "";
            snackbar = {
                text: `Hello ${nameValue}! Thank you for saying hi!`,
                type: SnackbarTypeEnum.SUCCESS,
            };
        } else {
            snackbar = {
                text: `Sorry! Something went wrong. Please try again!`,
                type: SnackbarTypeEnum.ERROR,
            };
        }
        addSnackbar(snackbar);
    }

    function handleEnhance(formElement: HTMLFormElement, cancel: () => void) {
        submitted = true;

        // revalidate
        const inputs = formElement.querySelectorAll("input");
        
        inputs.forEach(input => {
            const valid = input.dataset.valid;

            if (!valid) {
                const snackbar: SnackbarProps = {
                    text: "Sorry! There seems to be a problem with the input/s.",
                    type: SnackbarTypeEnum.ERROR
                }
                addSnackbar(snackbar);
                cancel();
            }
        })

        submitted = false;
        formElement.querySelector("button")?.blur();

        return async({result, update}) => {
            handleSubmitResult(result.data.isSuccess);
            update();
        }
    }
</script>

{#if show}
    <div class="world-overlay" transition:fade>
        <div class="world-comm" bind:clientWidth={worldWidth} transition:scale>
            <div class="world-desc">
                <span class="world-hi">Say Hi! 👋</span>
                <button class="close-button" on:click={close}>
                    <i class="mi mi-close icon" />
                </button>
                <p>
                    One of the best things about developing applications is that
                    I know my app can reach anywhere in the world! Because of
                    this, I've always wondered where people are viewing my
                    applications are from! So say Hi! I would love to see which
                    parts of the world I reach! Or feel free to reach out to me
                    anywhere in my
                    <a href="#">socials.</a>
                </p>
                <form
                    use:enhance={({ formElement, cancel }) => handleEnhance(formElement, cancel)}
                    method="POST"
                    action="/?/createMessage"
                    class="hi-form"
                    autocomplete="off"
                >
                    <TextInput
                        name="name"
                        placeholder="Nickname"
                        helperText="What do I call you?"
                        bind:value={nameValue}
                    />
                    <TextInput
                        name="country"
                        placeholder="Country"
                        helperText="Where are you viewing this right now?"
                        suggestions={countryNames}
                        bind:value={countryValue}
                    />
                    <TextInput
                        name="message"
                        placeholder="Say Hi!"
                        max={5}
                        optional={true}
                        helperText="Anything you wanna say or add?"
                        bind:value={messageValue}
                    />
                    <button
                        class="hi-form-btn"
                        type="submit"
                        disabled={submitted}>Say Hi!</button
                    >
                </form>
            </div>
            <div class="graphs">
                <WorldTour
                    bind:countryValue
                    bind:countryNames
                    width={width / 2}
                />
                {#if form?.data}
                    <CountryGraph 
                        data={form?.data}
                        width={width/2}    
                    />
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .world-desc {
        padding: 0em 2em;
    }

    .graphs {
        display: flex;
        flex-direction: row;
    }

    .close-button {
        font-size: 4rem;
        /* positioning */
        position: absolute;
        right: 16px;
        top: 16px;

        /* remove button styles */
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        color: var(--CURRENT-TEXT-COLOR);
    }

    .close-button:hover {
        scale: 1.2;
    }

    .world-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 3;
        background: var(--OVERLAY-COLOR);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .world-comm {
        position: relative;
        width: 90%;
        height: 90%;
        background: var(--CURRENT-BG-COLOR);

        box-sizing: border-box;
        padding: 2rem;
        overflow-y: scroll;

        z-index: 4;
        display: flex;
        flex-direction: column;
        row-gap: 5em;
    }

    .world-hi {
        display: inline-block;
        color: var(--PRIMARY);
        font-size: 2em;
        font-weight: bold;
    }

    .hi-form {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        column-gap: 0.5em;
        justify-content: center;
        align-content: stretch;
    }

    @media only screen and (max-width: 700px) {
        .hi-form {
            flex-direction: column;
            row-gap: 2rem;
        }
    }

    .hi-form-btn {
        border: 1px solid var(--PRIMARY);
        font-size: 1rem;
        background-color: var(--PRIMARY);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
        padding: 0.5em 1em;
        border-radius: 1em;
        cursor: pointer;

        transition: background-color 0.5s;
        text-wrap: nowrap;
    }

    .hi-form-btn:hover {
        background-color: rgba(255, 255, 255, 0);
        color: var(--PRIMARY);
    }

    .hi-form-btn:focus {
        background-color: var(--PRIMARY);
    }

    .hi-form-btn[disabled] {
        color: var(--TEXT-ON-NEUTRAL);
        background-color: var(--NEUTRAL-COLOR);
        border: none;
        cursor: not-allowed;
    }
</style>
