<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch, TabGroup, Tab} from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let storeThree = writable('paratonic');
	let inputDevice = null;
	let DevicePicker;
	
	onMount(async () => {
		if (browser) {
			const module = await import('$lib/svelte-sampler/components/DevicePicker.svelte');
			DevicePicker = module.default;
		}
	});
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Scale Finder</strong>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<TabGroup
				selected={storeThree}
				justify="justify-start md:justify-center"
				borderColor="border-primary-500"
				fill="fill-primary-500"
				color="text-primary-500"
				hover="hover:bg-primary-500/10"
			>
				<Tab value="paratonic">
					Paratonic
				</Tab>
			</TabGroup>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex items-center gap-4">
					<!-- MIDI Device Picker -->
					{#if browser && DevicePicker}
						<div class="flex items-center gap-2">
							<label class="text-sm">MIDI In:</label>
							<svelte:component this={DevicePicker} type="input" bind:value={inputDevice} />
						</div>
					{/if}
					<a class="btn btn-sm btn-ghost-surface" href="https://github.com/elsherbini/paratonic_scale_finder" target="_blank" rel="noreferrer">GitHub</a>
					<LightSwitch />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
