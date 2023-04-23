<script lang="ts">
	import SampleLib from "../lib/svelte-sampler/SampleLib.svelte";
	import AutoPlayer from "../lib/svelte-sampler/AutoPlayer.svelte";

	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import {makeParatonicScale} from '../lib/paratonic_scales'
	import { Scale, Chord} from 'tonal';



	let player;
	let sampler;
	let inputId;
	let reverbOn;
	export let track;

	const playMyNote = () =>{
		console.log(sampler)
		console.log(sampler.playMidiFile)
		console.log(sampler.sampler)
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


	const homeKeyTonic: Writable<string> = writable('C');
	const homeKeyQuality: Writable<string> = writable('major');
	const targetChordTonic: Writable<string> = writable('E');
	const targetChordQuality: Writable<string> = writable('7');
	const sharpsOrFlats: Writable<string> = writable('#');
	const startScaleOn: Writable<string> = writable('key');
		

	$:  homeKey = [$homeKeyTonic, $homeKeyQuality].join(" ")
	$:  homeKeyNotes = Scale.get(homeKey).notes.join(" ")
	$:  targetChord = [$targetChordTonic, $targetChordQuality].join("")
	$:  targetChordNotes = Chord.get(targetChord).notes.join(" ")
	$: resultScale = makeParatonicScale(homeKey, targetChord, $sharpsOrFlats, $startScaleOn).join(" ")
	export const prerender = false;
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
		<button type="button" class="btn filled-primary"  on:click={() => sampler.playMidiFile(`/midi/vb_improv_1.midi`)}
			>Play it</button
		  >
	<label class="label"><span>Paratonic Scale</span></label>
	<h2>{resultScale}</h2> <br>
	<div class="input-group-shim">
		<label class="label"><span>Start Scale On</span></label>
		<RadioGroup selected={startScaleOn}>
			<RadioItem value="key">Key tonic</RadioItem>
			<RadioItem value="chord">Chord root</RadioItem>
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
	<AutoPlayer  sampler={sampler} bind:this={player}/>
</div>
</section>
