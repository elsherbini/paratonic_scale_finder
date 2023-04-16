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

	$:  homeKey = [$homeKeyTonic, $homeKeyQuality].join(" ")
	$:  homeKeyNotes = Scale.get(homeKey).notes.join(" ")
	$:  targetChord = [$targetChordTonic, $targetChordQuality].join("")
	$:  targetChordNotes = Chord.get(targetChord).notes.join(" ")
	$: resultScale = makeParatonicScale(homeKey, targetChord, $sharpsOrFlats).join(" ")
    $: resultScaleLabel = Scale.detect(makeParatonicScale(homeKey, targetChord, $sharpsOrFlats), {'match':"exact"})
	export const prerender = false;
</script>


<section class="p-9 grid grid-cols-2 justify-start gap-4">
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
	</div>

	<div class="card p-3">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]"><label class="label">
	<span>Home Key</span></label>
	<div class="input-group-shim">
<RadioGroup display="flex" selected={homeKeyTonic}>
	<RadioItem value="C">C</RadioItem>
	<RadioItem value="{$sharpsOrFlats === "#" ? "C#" : "Db"}">{$sharpsOrFlats === "#" ? "C#" : "Db"}</RadioItem>
	<RadioItem value="D">D</RadioItem>
	<RadioItem value="{$sharpsOrFlats === "#" ? "D#" : "Eb"}">{$sharpsOrFlats === "#" ? "D#" : "Eb"}</RadioItem>
	<RadioItem value="E">E</RadioItem>
	<RadioItem value="F">F</RadioItem>
	<RadioItem value="{$sharpsOrFlats === "#" ? "F#" : "Gb"}">{$sharpsOrFlats === "#" ? "F#" : "Gb"}</RadioItem>
	<RadioItem value="G">G</RadioItem>
	<RadioItem value="{$sharpsOrFlats === "#" ? "G#" : "Ab"}">{$sharpsOrFlats === "#" ? "G#" : "Ab"}</RadioItem>
	<RadioItem value="A">A</RadioItem>
	<RadioItem value="{$sharpsOrFlats === "#" ? "A#" : "Bb"}">{$sharpsOrFlats === "#" ? "A#" : "Bb"}</RadioItem>
	<RadioItem value="B">B</RadioItem>
</RadioGroup>
</div>
<div class="input-group-shim">
<RadioGroup selected={homeKeyQuality}>
	<RadioItem value="major">Major</RadioItem>
	<RadioItem value="minor">Minor</RadioItem>
</RadioGroup>
</div>
</div>
</div>

<div class="card p-3">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<label class="label"><span>Target Chord</span></label>
		<div class="input-group-shim">
			<RadioGroup selected={targetChordTonic}>
				<RadioItem value="C">C</RadioItem>
				<RadioItem value="{$sharpsOrFlats === "#" ? "C#" : "Db"}">{$sharpsOrFlats === "#" ? "C#" : "Db"}</RadioItem>
				<RadioItem value="D">D</RadioItem>
				<RadioItem value="{$sharpsOrFlats === "#" ? "D#" : "Eb"}">{$sharpsOrFlats === "#" ? "D#" : "Eb"}</RadioItem>
				<RadioItem value="E">E</RadioItem>
				<RadioItem value="F">F</RadioItem>
				<RadioItem value="{$sharpsOrFlats === "#" ? "F#" : "Gb"}">{$sharpsOrFlats === "#" ? "F#" : "Gb"}</RadioItem>
				<RadioItem value="G">G</RadioItem>
				<RadioItem value="{$sharpsOrFlats === "#" ? "G#" : "Ab"}">{$sharpsOrFlats === "#" ? "G#" : "Ab"}</RadioItem>
				<RadioItem value="A">A</RadioItem>
				<RadioItem value="{$sharpsOrFlats === "#" ? "A#" : "Bb"}">{$sharpsOrFlats === "#" ? "A#" : "Bb"}</RadioItem>
				<RadioItem value="B">B</RadioItem>
			</RadioGroup>
			</div>
		<div class="input-group-shim">
			<RadioGroup selected={targetChordQuality}>
				<RadioItem value="7">Dominant 7</RadioItem>
				<RadioItem value="m6">Minor 6</RadioItem>
				<RadioItem value="m7b5">Minor 7 b5</RadioItem>
			</RadioGroup>
		</div>
	</div>
</div>
</div>
<div class="card p-4">
	<label class="label"><span>Paratonic Scale</span></label>
	<h3>{resultScale} {resultScaleLabel ? " = " : ""} {resultScaleLabel}</h3> <br>
	<label class="label"><span>Home Key</span></label>
	<h3>{homeKey} = {homeKeyNotes}</h3>
	<label class="label"><span>Target Chord</span></label>
	<h3>{targetChord} = {targetChordNotes}</h3>
	<label class="label"><span>Sharps or Flats</span></label>
	<h3>{$sharpsOrFlats}</h3>
</div>
</section>

<section class="p-9 grid grid-cols-1 justify-start gap-4">

</section>
