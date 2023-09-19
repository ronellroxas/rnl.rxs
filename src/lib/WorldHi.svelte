<script lang="ts">
    import TextInput from "./TextInput.svelte";
    import WorldTour from "./WorldTour.svelte";

    export let show = false;
    
    import world from "$lib/data/countries-110m.json";

    let countryValue: string = "";

    // get country names
    let countryNames = world.objects.countries.geometries.map((geo) => geo.properties.name);
</script>

{#if show}
    <div class="world-overlay">
        <div class="world-comm">
            <span class="world-hi">Say Hi! 👋</span>
            <button 
                class="close-button" 
            >
                <i class="mi mi-close icon"/>
            </button>
            <p>
                One of the best things about developing applications is that I know
                my app can reach anywhere in the world! Because of this, I've always
                wondered where people are viewing my applications are from!
            </p>
            <p>
                So say Hi! I would love to see which parts of the world I reach! Or feel free to reach out to me anywhere in my 
                <a href="#">socials.</a>
            </p>
            <form class="hi-form" autocomplete="off">
                <TextInput placeholder="Nickname" optional={true} helperText="What do I call you?"/>
                <TextInput 
                    placeholder="Country" 
                    helperText="Where are you viewing this right now?"
                    suggestions={countryNames}
                    value={countryValue}
                />
                <input class="hi-form-btn" type="button" value="Say Hi!"/>
            </form>
            <WorldTour />
        </div>
    </div>
{/if}

<style>
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
        z-index: 1;
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
        padding: 2em;
        overflow-y: scroll;
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

    @media only screen and (max-width:700px) {
        .hi-form {
            flex-direction: column;
            row-gap: 2rem;
        }
    }

    .hi-form-btn {
        border: none;
        font-size: 1rem;
        background-color: var(--PRIMARY);
        color: var(--CURRENT-TEXT-ON-PRIMARY);
        padding: 0.5em 1em;
        border-radius: 1em;
    }
</style>
