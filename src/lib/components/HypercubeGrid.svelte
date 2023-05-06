<script>

import {Note, Scale, Chord, Key} from 'tonal';

export const tonic = 'C'
export const mode = 'ionian'

function relativeMajor(tonic, mode){
	const pc = Note.get(tonic).pc;
	let relative = ""
	switch(mode){
		case "ionian":
			relative = pc
		case "dorian":
			relative = Note.transpose(pc, "-2M");
		case "phrygian":
			relative = Note.transpose(pc, "-3M");
		case "lydian":
			relative = Note.transpose(pc, "-4P");
		case "mixolydian":
			relative = Note.transpose(pc, "4P");
		case "aeolian":
			relative = Note.transpose(pc, "3m");
		case "locrian":
			relative = Note.transpose(pc, "1m");
	}

}



const generate_chords = function(tonic, mode) {
	return Key.majorKey(tonic).triads
}
</script>

<div class="grid grid-cols-2 gap-4">

	{#each generate_chords("C", "ionian") as chord}
	<div>
		<span class="chip variant-filled">
			<span>{chord}</span>
		</span>
    </div>
	{/each}

</div>

<style>

</style>