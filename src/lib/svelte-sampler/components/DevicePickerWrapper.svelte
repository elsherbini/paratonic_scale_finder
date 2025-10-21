<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	export let type;
	export let value = null;
	
	let DevicePicker;
	let mounted = false;
	
	onMount(async () => {
		if (browser) {
			try {
				const module = await import('./DevicePicker.svelte');
				DevicePicker = module.default;
				mounted = true;
			} catch (error) {
				console.error('Failed to load DevicePicker:', error);
			}
		}
	});
</script>

{#if mounted && DevicePicker}
	<svelte:component this={DevicePicker} {type} bind:value />
{:else if browser}
	<select disabled>
		<option>Loading...</option>
	</select>
{/if}

<style>
	select {
		background: #090909;
		border-radius: 2px;
		padding: 0.2em;
		color: #53aa8b;
		font-family: 'Lunatic Superstar', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 20px;
	}
</style>
