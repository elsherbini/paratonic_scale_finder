<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
    import {makeParatonicScale} from '../lib/paratonic_scales'
	import { Scale, Chord} from 'tonal';

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
    $: resultScaleLabel = Scale.detect(makeParatonicScale(homeKey, targetChord, $sharpsOrFlats, $startScaleOn), {'match':"exact"}).join(" ")
	export const prerender = false;
</script>


<section class="py-3 px-9 grid grid-cols-2 justify-start gap-4">
	<div p-6>


	<div class="card p-3">
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<label class="label"><span>Sharps or Flats</span></label>
			<div class="input-group-shim">
				<RadioGroup selected={sharpsOrFlats}>
					<RadioItem value="b">b</RadioItem>
					<RadioItem value="#">#</RadioItem>
				</RadioGroup>
			</div>
			</div>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]"><label class="label">
	<span>Home Key</span></label>
	<div class="input-group-shim">
<select size="5" class="select" bind:value="{$homeKeyTonic}">
	<option value="C">C</option>
	<option value="{$sharpsOrFlats === "#" ? "C#" : "Db"}">{$sharpsOrFlats === "#" ? "C#" : "Db"}</option>
	<option value="D">D</option>
	<option value="{$sharpsOrFlats === "#" ? "D#" : "Eb"}">{$sharpsOrFlats === "#" ? "D#" : "Eb"}</option>
	<option value="E">E</option>
	<option value="F">F</option>
	<option value="{$sharpsOrFlats === "#" ? "F#" : "Gb"}">{$sharpsOrFlats === "#" ? "F#" : "Gb"}</option>
	<option value="G">G</option>
	<option value="{$sharpsOrFlats === "#" ? "G#" : "Ab"}">{$sharpsOrFlats === "#" ? "G#" : "Ab"}</option>
	<option value="A">A</option>
	<option value="{$sharpsOrFlats === "#" ? "A#" : "Bb"}">{$sharpsOrFlats === "#" ? "A#" : "Bb"}</option>
	<option value="B">B</option>
</select>
</div>
<RadioGroup selected={homeKeyQuality}>
	<RadioItem value="major">Major</RadioItem>
	<RadioItem value="minor">Minor</RadioItem>
</RadioGroup>
<h2>{homeKey} = {homeKeyNotes}</h2>
</div>
</div>
</div>
<div class="card p-3">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
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
				<RadioItem value="m6">Min6</RadioItem>
				<RadioItem value="m7b5">Min7b5</RadioItem>
			</RadioGroup>
			<label class="label"><span>Target Chord</span></label>
			<h2>{targetChord} = {targetChordNotes}</h2>
		</div>
	</div>
</div>
</section>

<section class="py-0 px-9 grid grid-cols-1 justify-start gap-4">
	<div class="card p-4">
		<label class="label"><span>Paratonic Scale</span></label>
		<div class="input-group-shim">
			<RadioGroup selected={startScaleOn}>
				<RadioItem value="key">Tonic of key</RadioItem>
				<RadioItem value="chord">Tonic of chord</RadioItem>
			</RadioGroup>
		<label class="label"><span>Paratonic Scale</span></label>
		<h2>{resultScale} = {resultScaleLabel !== "" ? resultScaleLabel : "unknown scale"}</h2> <br>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<label class="label"><span>Sharps or Flats</span></label>
			<div class="input-group-shim">
				<RadioGroup selected={sharpsOrFlats}>
					<RadioItem value="b">b</RadioItem>
					<RadioItem value="#">#</RadioItem>
				</RadioGroup>
			</div>
		</div>
	</div>
</section>
