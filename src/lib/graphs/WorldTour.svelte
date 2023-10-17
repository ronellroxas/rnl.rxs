<script lang="ts">
    import world from "$lib/data/countries-110m.json";
    import * as topojson from "topojson-client";
    import { geoOrthographic, geoPath } from "d3-geo";
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    export let countryValue: string;
    export let width: number;
    export let countryNames: string[] = [];

    // @ts-ignore
    let countries = topojson.feature(world, world.objects.countries).features;
    // @ts-ignore
    let borders = topojson.mesh(
        world,
        world.objects.countries,
        (a, b) => a !== b
    );
    let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any> | null = null;

    let dragging = false;
    const SENSITIVITY = 60;

    $: height = width;
    $: projection = geoOrthographic()
        .scale(width / 2)
        .rotate([0.1, 0.1])
        .translate([width / 2, height / 2]);
    $: path = geoPath(projection);

    function updateRotation(x: number, y: number) {
        projection.rotate([x, y]);
        path = geoPath(projection);
        svg?.selectAll("path").attr("d", path);
    }

    // rotation animation
    d3.timer(() => {
        if (!dragging && !countryNames.includes(countryValue)) {
            const rotate = projection.rotate();
            const k = SENSITIVITY / projection.scale();
            updateRotation(rotate[0] + 1 * k, rotate[1] - 1 * k);
        }
    }, 200);

    // on country value changed
    $: if (countryNames.includes(countryValue)) {
        let index = countryNames.indexOf(countryValue);
        let country = countries[index];

        let p = d3.geoCentroid(country);
        let r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);

        d3.transition()
            .duration(1250)
            .tween("rotate", () => {
                return (t) => {
                    let coords = r(t);
                    updateRotation(coords[0], coords[1]);
                };
            });
    }

    onMount(() => {
        svg = d3.select("svg");

        // click
        svg.on("click", ({ target }: { target: SVGPathElement }) => {
            if (target.classList.contains("country")) {
                let selectedCountryName = target.dataset.name!!;
                if (selectedCountryName != countryValue) {
                    countryValue = selectedCountryName;
                    return;
                }
            }

            countryValue = "";
        });

        // drag
        function dragStart(event: DragEvent) {
            dragging = true;
            const rotate = projection.rotate();
            const k = SENSITIVITY / projection.scale();

            updateRotation(rotate[0] + event.dx * k, rotate[1] - event.dy * k);

            dragging = false;
        }

        const drag = d3.drag().on("drag", dragStart);

        drag(svg);
    });
</script>

{#if !isNaN(width)}
    <div
        class="globe-container"
        transition:scale={{ delay: 400, duration: 3000, easing: quintOut }}
    >
        <svg {width} {height} class="globe">
            <circle
                id="globe-draw"
                r={width / 2}
                cx={width / 2}
                cy={height / 2}
            />

            <!-- Countries -->
            {#each countries as country, i}
                <path
                    data-index={i}
                    data-name={country.properties.name}
                    class="country {countryValue == country.properties.name
                        ? 'country-selected'
                        : ''}"
                    d={path(country)}
                    stroke="none"
                    tabIndex="0"
                />
            {/each}

            <path class="border" d={path(borders)} fill="none" />
        </svg>
    </div>
{/if}

<style>
    .globe-container {
        max-height: 100%;
        overflow: hidden;
    }

    .globe {
        display: block;
        cursor: grab;
    }

    #globe-draw {
        fill: var(--CURRENT-BG-COLOR);
        stroke: var(--PRIMARY);
    }

    .country {
        fill: var(--PRIMARY);
        stroke: var(--PRIMARY-DARKER);
        cursor: pointer;

        transition: fill 500ms ease-out, stroke 500ms ease-out;
    }

    .country:focus {
        outline: none;
    }

    .country-selected {
        fill: var(--PRIMARY-DARKER);
    }

    .border {
        stroke: var(--PRIMARY-DARKER);
    }
</style>
