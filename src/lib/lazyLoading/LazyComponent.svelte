<!-- 
    Code from:
    https://svelte.dev/repl/6db375be880441299f7721b54434068f?version=3.38.1
 -->
<script lang="ts">
	import viewport from './useViewportAction';

	let loadComponent: Function;
	export { loadComponent as this }
	
	let isShowingComponent = false;
	let componentPromise: Promise<any>;
</script>

{#if !isShowingComponent}
	<div use:viewport 
		on:viewportEnter={() => {
			componentPromise = loadComponent();
			isShowingComponent = true;
		}}
	/>
{:else}
  {#await componentPromise}
		{""}
	{:then { default: Component }}
		<slot name="component" {Component} />
	{/await}
{/if}