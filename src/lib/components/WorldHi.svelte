<script lang="ts">
    import TextInput from "$lib/components/TextInput.svelte";
    import WorldTour from "$lib/graphs/WorldTour.svelte";

    export let show = false;
    export let form: ActionData;

    import world from "$lib/data/countries-110m.json";
    import {
        snackbarStoreState,
        viewStoreState,
        type SnackbarProps,
        SnackbarTypeEnum,

        pushSnackbarState

    } from "../store";
    
    import { fade, scale } from "svelte/transition";
    import { enhance } from "$app/forms";
    import type { ActionData } from "../../routes/$types";
    

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
        pushSnackbarState(snackbar);
    }

    function handleEnhance(formElement: HTMLFormElement, cancel: () => void) {
        submitted = true;

        // revalidate
        const inputs = formElement.querySelectorAll("input");
        
        inputs.forEach(input => {
            const valid = input.dataset.valid!!;

            if (valid == "false") {
                const snackbar: SnackbarProps = {
                    text: `Sorry! Input ${input.name} is not valid. Please try again!`,
                    type: SnackbarTypeEnum.ERROR
                }
                pushSnackbarState(snackbar);
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
                    apps from! So say Hi! I would love to see which
                    parts of the world I reach! Or feel free to reach out to me
                    anywhere in my
                    <a href="#">socials.</a> Or just report a bug with the app (lol).
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
                        max={50}
                        optional={true}
                        helperText="Anything you wanna say or add?"
                        bind:value={messageValue}
                    />
                    <button
                        class="form-btn"
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
        font-size: 2rem;
        /* positioning */
        position: absolute;
        right: 16px;
        top: 16px;

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

    @media (max-width: 600px) {
        .world-comm {
            width: 100vw;
            height: 100vh;
        }
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
</style>
