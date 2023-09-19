<script lang="ts">
    import { slide } from "svelte/transition";
    import { TextValidator, VALIDATOR_FLAGS } from "$lib/InputValidators/TextValidator";

    export let placeholder: string;
    export let helperText: string = "";
    export let optional: boolean = false;
    export let suggestions: string[] | undefined = undefined;
    export let value: string = "";

    let inputRef: HTMLDivElement;
    let suggestionsRef: HTMLDivElement;

    $: optionalText = optional ? " (optional)" : "";
    $: showSuggestions = value.length > 0;
    $: filteredCountries = suggestions?.filter(sugg => sugg.toLowerCase().includes(value.toLowerCase()));

    const validate = () => {
        const validator = new TextValidator();

        if (!optional) {
            validator.addConstraint(VALIDATOR_FLAGS.REQUIRED);
        }
        if (suggestions != undefined) {
            validator.addConstraint(VALIDATOR_FLAGS.OPTIONS, suggestions);
        }

        const isValid = validator.isValid(value);        
        if (!isValid) {
            inputRef.classList.add("input-error");
        } else {
            inputRef.classList.remove("input-error");
        }
    }

    const closeSuggestions = () => {
        showSuggestions = false;
        
        // check validity
        validate();
    }

    const onClick = (selected: string) => {
        value = selected;
        closeSuggestions();
    }
</script>

<div class="input-box">
    <input 
        bind:this={inputRef}
        class="text-input" 
        type="text" 
        on:blur={closeSuggestions}
        placeholder={placeholder + optionalText}
        bind:value={value}
    />
    <span class="helper-text">{helperText}</span>
    {#if showSuggestions && suggestions != undefined}
        <div bind:this={suggestionsRef} class="suggestions-container" transition:slide>
            {#if filteredCountries != undefined && filteredCountries.length > 0}
                {#each filteredCountries as item}
                    <button 
                        class="suggestion-item" 
                        on:mousedown={() => onClick(item)}>
                            {item}
                    </button>
                {/each}
            {:else}
                <button class="suggestion-item">Country not found.</button>
            {/if}
        </div>
    {/if}
</div>

<style>
    .input-box {
        position: relative;
        width: 100%;
    }

    .text-input {
        width: 100%;
        background: none;
        padding: 1em;
        border-radius: 1em;
        border: 1px solid var(--NEUTRAL-COLOR);
        outline: none;
        box-sizing: border-box;
    }

    .text-input:focus {
        border: 2px solid var(--PRIMARY);
        border-radius: 1em 1em 0em 0em;
    }

    .helper-text {
        position: absolute;
        left: 1em;
        bottom: 0;
        top: 110%;
        font-size: 0.8rem;
        font-style: italic;
        color: var(--NEUTRAL-COLOR);
    }

    @media only screen and (max-width:700px) {
        .helper-text {
            font-size: 0.6rem;
        }
    }
    
    .suggestions-container {
        border-radius: 0em 0em 1em 1em;
        position: absolute;
        background: var(--CURRENT-BG-COLOR);
        z-index: 3;
        top: 100%;
        left: 0;
        right: 0;

        display: flex;
        flex-direction: column;

        border: 1px solid var(--NEUTRAL-COLOR);
        border-top: 0;

        max-height: calc(100vh/2);
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0;
    }
    
    .suggestion-item {
        font-size: 0.8rem;
        text-align: left;
        box-sizing: border-box;
        padding: 1em;
        background: none;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    .suggestion-item:hover {
        background: var(--PRIMARY);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
    }

</style>