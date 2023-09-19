<script>
    export let inverted = false;
</script>

<div class="section {inverted ? 'section-invert' : ''} " {...$$restProps}>
    <slot />
</div>

<style>
    .section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        min-height: 100vh;
    }

    .section-invert {
        /* background: var(--PRIMARY); */
        /* color: var(--CURRENT-TEXT-ON-PRIMARY); */
    }
</style>