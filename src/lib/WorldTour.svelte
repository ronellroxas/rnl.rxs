<script>
    import world from "$lib/data/countries-110m.json";
    import * as topojson from "topojson-client";

    // @ts-ignore
    let countries = topojson.feature(world, world.objects.countries).features;
    // @ts-ignore
    let borders = topojson.mesh(world,
        world.objects.countries,
        (a, b) => a !== b
    );

    import { geoOrthographic, geoPath } from "d3-geo";

    let width = 800;
    $: height = width;

    $: projection = geoOrthographic()
        .scale(width / 2)
        .rotate([0.1, 0.1])
        .translate([width / 2, height / 2]);

    $: path = geoPath(projection);

    let globe;
</script>

<svg {width} {height} class="globe" bind:this={globe}>
    <circle id="globe-draw" r={width / 2} cx={width / 2} cy={height / 2} />

    <!-- Countries -->
    {#each countries as country}
        <path class="country" d={path(country)} stroke="none" tabIndex="0" />
    {/each}

    <path class="border" d={path(borders)} fill="none" />
</svg>

<style>
    .globe {
        margin: 5em auto;
        display: block;
    }

    #globe-draw {
        fill: var(--CURRENT-BG-COLOR);
        stroke: var(--PRIMARY);
    }

    .country {
        fill: var(--PRIMARY);
    }

    .border {
        stroke: var(--PRIMARY-DARKER);
    }
</style>
