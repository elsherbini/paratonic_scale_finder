<script lang="ts">
	import SampleLib from "../lib/svelte-sampler/SampleLib.svelte";
	import { onMount } from 'svelte';
	import { browser } from '$app/environment'; 
	import { page } from '$app/stores';
	import { RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import {makeParatonicScale} from '../lib/paratonic_scales'
	import { Scale, Chord} from 'tonal';
	import * as Tone from 'tone';
	import MdiStop from 'virtual:icons/mdi/stop'
	import MdiPlay from 'virtual:icons/mdi/play'
	import MdiVolume from 'virtual:icons/mdi/volume-high'




	let vol;
	let sampler;
	let inputId;
	let reverbOn;
	export let track;
	let isPlaying =false;
	let toneInitialized = false;
	let bpm = 100;
	let timeSig = "4/4"

	async function initTone() {
		await Tone.start();
		toneInitialized = true;
		
    if (!Tone.getContext().disposed)
        Tone.getContext().dispose();
    // Tone.setContext(new Tone.OfflineContext(1, 0.5, 44100));
    Tone.setContext(new Tone.Context({ latencyHint: 'interactive', lookAhead: 0 }));
    // Tone.setContext(new Tone.Context({ latencyHint: 'playback', lookAhead: 5}));
    Tone.getContext().transport.bpm.value = bpm;
    Tone.getDestination().volume.value = vol;
    Tone.getContext().transport.timeSignature = timeSig.split('/').map((t) => parseInt(t));
	Tone.Transport.setLoopPoints("0m", "4m")
}
	
const playButtonClick = () =>{
		if (isPlaying) {
			sampler.stop()
			isPlaying = false;
    	}
    else {
		isPlaying = true;
		sampler.paratonicExample(homeKey, targetChord, resultScale)
    	}
	}

  const urls = {
    A1: "RhodesMK1_A1_60.mp3",
    A2: "RhodesMK1_A2_70.mp3",
    A3: "RhodesMK1_A3_70.mp3",
    A4: "RhodesMK1_A4_60.mp3",
    A5: "RhodesMK1_A5_60.mp3",
    A6: "RhodesMK1_A6_70.mp3",
    "A#1": "RhodesMK1_As1_60.mp3",
    "A#2": "RhodesMK1_As2_70.mp3",
    "A#3": "RhodesMK1_As3_70.mp3",
    "A#4": "RhodesMK1_As4_60.mp3",
    "A#5": "RhodesMK1_As5_60.mp3",
    "A#6": "RhodesMK1_As6_70.mp3",
    B1: "RhodesMK1_B1_60.mp3",
    B2: "RhodesMK1_B2_70.mp3",
    B3: "RhodesMK1_B3_70.mp3",
    B4: "RhodesMK1_B4_70.mp3",
    B5: "RhodesMK1_B5_60.mp3",
    B6: "RhodesMK1_B6_60.mp3",
    C2: "RhodesMK1_C2_60.mp3",
    C3: "RhodesMK1_C3_70.mp3",
    C4: "RhodesMK1_C4_70.mp3",
    C5: "RhodesMK1_C5_60.mp3",
    C6: "RhodesMK1_C6_60.mp3",
    C7: "RhodesMK1_C7_60.mp3",
    "C#2": "RhodesMK1_Cs2_70.mp3",
    "C#3": "RhodesMK1_Cs3_60.mp3",
    "C#4": "RhodesMK1_Cs4_60.mp3",
    "C#5": "RhodesMK1_Cs5_70.mp3",
    "C#6": "RhodesMK1_Cs6_60.mp3",
    "C#7": "RhodesMK1_Cs7_60.mp3",
    D2: "RhodesMK1_D2_70.mp3",
    D3: "RhodesMK1_D3_60.mp3",
    D4: "RhodesMK1_D4_60.mp3",
    D5: "RhodesMK1_D5_70.mp3",
    D6: "RhodesMK1_D6_60.mp3",
    D7: "RhodesMK1_D7_60.mp3",
    "D#2": "RhodesMK1_Ds2_60.mp3",
    "D#3": "RhodesMK1_Ds3_70.mp3",
    "D#4": "RhodesMK1_Ds4_60.mp3",
    "D#5": "RhodesMK1_Ds5_60.mp3",
    "D#6": "RhodesMK1_Ds6_60.mp3",
    "D#7": "RhodesMK1_Ds7_60.mp3",
    E1: "RhodesMK1_E1_60.mp3",
    E3: "RhodesMK1_E3_70.mp3",
    E4: "RhodesMK1_E4_60.mp3",
    E5: "RhodesMK1_E5_60.mp3",
    E6: "RhodesMK1_E6_60.mp3",
    E7: "RhodesMK1_E7_70.mp3",
    F1: "RhodesMK1_F1_60.mp3",
    F2: "RhodesMK1_F2_70.mp3",
    F3: "RhodesMK1_F3_60.mp3",
    F4: "RhodesMK1_F4_60.mp3",
    F5: "RhodesMK1_F5_70.mp3",
    F6: "RhodesMK1_F6_60.mp3",
    "F#1": "RhodesMK1_Fs1_60.mp3",
    "F#2": "RhodesMK1_Fs2_70.mp3",
    "F#3": "RhodesMK1_Fs3_70.mp3",
    "F#4": "RhodesMK1_Fs4_60.mp3",
    "F#5": "RhodesMK1_Fs5_70.mp3",
    "F#6": "RhodesMK1_Fs6_60.mp3",
    G1: "RhodesMK1_G1_60.mp3",
    G2: "RhodesMK1_G2_70.mp3",
    G3: "RhodesMK1_G3_70.mp3",
    G4: "RhodesMK1_G4_80.mp3",
    G5: "RhodesMK1_G5_60.mp3",
    G6: "RhodesMK1_G6_60.mp3",
    "G#1": "RhodesMK1_Gs1_60.mp3",
    "G#2": "RhodesMK1_Gs2_60.mp3",
    "G#3": "RhodesMK1_Gs3_60.mp3",
    "G#4": "RhodesMK1_Gs4_60.mp3",
    "G#5": "RhodesMK1_Gs5_60.mp3",
    "G#6": "RhodesMK1_Gs6_70.mp3",
  };


  	
	const urlKey = $page.url.searchParams.get('k') || "C major"
	const urlChord = $page.url.searchParams.get('c') || "E7"
	const urlSharpsOrFlats = $page.url.searchParams.get('a') || "#"
	const urlStartScaleOn = $page.url.searchParams.get('s') || "chord"
	const urlNoAug2nds = $page.url.searchParams.get('n') || "no"
	
	const homeKeyTonic: Writable<string> = writable(urlKey.split(' ')[0]);
	const homeKeyQuality: Writable<string> = writable(urlKey.split(' ')[1]);
	const targetChordTonic: Writable<string> = writable(Chord.get(urlChord).tonic || "E");
	const targetChordQuality: Writable<string> = writable(Chord.tokenize(urlChord).slice(-1)[0]);
	const sharpsOrFlats: Writable<string> = writable(urlSharpsOrFlats);
	const startScaleOn: Writable<string> = writable(urlStartScaleOn);
    const noAug2nds: Writable<string> = writable(urlNoAug2nds);

	$:  homeKey = [$homeKeyTonic, $homeKeyQuality].join(" ")
	$:  homeKeyNotes = Scale.get(homeKey).notes.join(" ")
	$:  targetChord = [$targetChordTonic, $targetChordQuality].join("")
	$:  targetChordNotes = Chord.get(targetChord).notes.join(" ")
	$: resultScale = makeParatonicScale(homeKey, targetChord, $sharpsOrFlats, $startScaleOn, $noAug2nds === 'no').join(" ")
	$: handleVol(vol)


	const handleVol = () => {
		if (browser) {
			if (toneInitialized) {
				Tone.getDestination().volume.value = vol;
			}
			else {
				initTone()
			}
		}
	}
	onMount(() => {
		initTone()
	});
</script>


<section class="py-1 px-3 grid grid-cols-1 md:grid-cols-2 justify-start gap-4">

	<div class="card p-3">
	<div class="input-group input-group-divider"><label class="label">
	<span>Home Key</span></label>
	<div class="input-group-shim">
<select size="5" class="select" bind:value="{$homeKeyTonic}">
	<option value="C">C</option>
	<option value="C#">C#</option>
	<option value="Db">Db</option>
	<option value="D">D</option>
	<option value="D#">D#</option>
	<option value="Eb">Eb</option>
	<option value="E">E</option>
	<option value="F">F</option>
	<option value="F#">F#</option>
	<option value="Gb">Gb</option>
	<option value="G">G</option>
	<option value="G#">G#</option>
	<option value="Ab">Ab</option>
	<option value="A">A</option>
	<option value="A#">A#</option>
	<option value="Bb">Bb</option>
	<option value="B">B</option>
</select>
</div>
<RadioGroup selected={homeKeyQuality}>
	<RadioItem value="major">Major</RadioItem>
	<RadioItem value="minor">Minor</RadioItem>
</RadioGroup>
<label class="label"><span>Home Key</span></label>
<h2>{homeKey} = <br> {homeKeyNotes}</h2>
</div>
</div>
<div class="card p-3">
	<div class="input-group input-group-divider">
		<label class="label"><span>Sharps or Flats</span></label>
		<div class="input-group-shim">
			<RadioGroup selected={sharpsOrFlats}>
				<RadioItem value="b">b</RadioItem>
				<RadioItem value="#">#</RadioItem>
			</RadioGroup>
		</div>
		<label class="label"><span>Target Chord</span></label>
		<div class="input-group-shim">
			<select size="5" class="select" bind:value="{$targetChordTonic}">
				<option  value="C">C</option>
				<option  value="{$sharpsOrFlats === "#" ? "C#" : "Db"}">{$sharpsOrFlats === "#" ? "C#" : "Db"}</option>
				<option  value="D">D</option>
				<option  value="{$sharpsOrFlats === "#" ? "D#" : "Eb"}">{$sharpsOrFlats === "#" ? "D#" : "Eb"}</option>
				<option  value="E">E</option>
				<option  value="{$sharpsOrFlats === "#" ? "E#" : "Fb"}">{$sharpsOrFlats === "#" ? "E#" : "Fb"}</option>
				<option  value="F">F</option>
				<option  value="{$sharpsOrFlats === "#" ? "F#" : "Gb"}">{$sharpsOrFlats === "#" ? "F#" : "Gb"}</option>
				<option  value="G">G</option>
				<option  value="{$sharpsOrFlats === "#" ? "G#" : "Ab"}">{$sharpsOrFlats === "#" ? "G#" : "Ab"}</option>
				<option  value="A">A</option>
				<option  value="{$sharpsOrFlats === "#" ? "A#" : "Bb"}">{$sharpsOrFlats === "#" ? "A#" : "Bb"}</option>
				<option  value="B">B</option>
				<option  value="{$sharpsOrFlats === "#" ? "B#" : "Cb"}">{$sharpsOrFlats === "#" ? "B#" : "Cb"}</option>
			</select>
			</div>
		<div class="input-group-shim">
			<RadioGroup selected={targetChordQuality}>
				<RadioItem value="7">Dom7</RadioItem>
				<RadioItem value="m6">m6</RadioItem>
				<RadioItem value="m7b5">m7b5</RadioItem>
			</RadioGroup>
			<label class="label"><span>Target Chord</span></label>
			<h2>{targetChord} = {targetChordNotes}</h2>
		</div>
	</div>
</div>
</section>
<section class="py-0 px-3 grid grid-cols-1 justify-start gap-4">
			<SampleLib
			  theme="dark"
			  samplesPath="/audio/rhodes/"
			  {inputId}
			  {urls}
			  bind:this={sampler}
			  bind:reverbOn
			/>
</section>
<section class="py-6 px-3 grid grid grid-cols-1 md:grid-cols-2 justify-start gap-4">


<div class="card p-4 flex flex-row">
	<div class="basis-2/3">
	<label class="label"><span>Paratonic Scale</span></label>
	<h2>{resultScale}</h2> <br>
	<div class="input-group-shim">
		<label class="label"><span>Start Scale On</span></label>
		<RadioGroup selected={startScaleOn}>
			<RadioItem value="key">Key tonic</RadioItem>
			<RadioItem value="chord">Chord root</RadioItem>
		</RadioGroup>

		<label class="label"><span>Remove augmented 2nds?</span></label>
		<RadioGroup selected={noAug2nds}>
			<RadioItem value={"no"}>No A2nds</RadioItem>
			<RadioItem value={"yes"}>A2nds</RadioItem>
		</RadioGroup>
	
	<div class="input-group input-group-divider ">
		<label class="label"><span>Sharps or Flats</span></label>
		<div class="input-group-shim">
			<RadioGroup selected={sharpsOrFlats}>
				<RadioItem value="b">b</RadioItem>
				<RadioItem value="#">#</RadioItem>
			</RadioGroup>
		</div>
	</div>
</div>
</div>
<div class="basis-1/3">
	<label class="label"><span>Play the scale</span></label>
	<div class="input-group input-group-divider ">
		<button type="button" class="btn btn-small btn-filled-secondary border-token rounded-token text-justify"  on:click={playButtonClick}> {#if isPlaying} <MdiStop />Stop
			{:else}<MdiPlay />Play{/if}</button>

			<label class="label"><span> Volume </span></label>
			<RangeSlider name="range-slider" accent='accent-surface-900 dark:accent-surface-50' bind:value={vol} min={-30} max={0} step={1}>
				<div class="flex justify-between items-center">
					<div class="font-bold"><MdiVolume /></div>
					<div class="text-xs">{vol}db</div>
				</div>
			</RangeSlider>
		</div>
</div>
</div>
</section>
