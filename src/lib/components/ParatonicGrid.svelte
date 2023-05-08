<script lang="ts">
import {Interval, Note, Scale, Chord} from 'tonal';
import { homeKey, targetChord, resultScale, startScaleOn } from '$lib/stores.js'
import MdiUp from 'virtual:icons/mdi/arrow-up-thin'
import MdiDown from 'virtual:icons/mdi/arrow-down-thin'

const noteTextColors = (note) => {
    const map = {0: 'tertiary', 3: 'tertiary', 6: 'tertiary', 9: 'tertiary', 1: 'primary', 4: 'primary', 7: 'primary', 10: 'primary', 2: 'secondary', 5: 'secondary', 8: 'secondary', 11: 'secondary'}
    return map[Note.get(note).chroma]
}

const makeNote = (note, transposeChroma) => {
    return {name: Note.get(note).pc, col: ((Note.get(note).chroma - transposeChroma >= 0 
        ? Note.get(note).chroma - transposeChroma 
        : Note.get(note).chroma - transposeChroma + 12)+ 1).toString(),
         color:noteTextColors(note)}
    }

const getNotesFromScale = (scaleName, transposeChroma ) => {
    return Scale.get(scaleName).notes.map((note) => makeNote(note, transposeChroma))
}

const getNotesFromChord = (chordName, transposeChroma) => {
    return Chord.get(chordName).notes.map((note) => makeNote(note, transposeChroma))
}

const getNotesFromString = (noteString, transposeChroma ) => {
    return noteString.split(" ").map((note) => makeNote(note, transposeChroma))
}

$: transposeChroma = $startScaleOn === 'chord' ? Note.get(Chord.get($targetChord).notes[0]).chroma : Note.get(Scale.get($homeKey).tonic).chroma
$: homeScaleNotes = getNotesFromScale($homeKey, transposeChroma);
$: chordNotes = getNotesFromChord($targetChord, transposeChroma) ;
$: scaleNotes = getNotesFromString($resultScale, transposeChroma);
</script>

<div class="flex flex-row">
<div class="basis1/6 grid grid-rows-3 divide-y-4">
    <div style="display:table-cell" class="text-right align-bottom">{$homeKey}</div>
    <div style="display:table-cell" class="text-right align-bottom">Paratonic Scale</div>
    <div style="display:table-cell" class="text-right align-bottom">{$targetChord} </div>
</div>
<div class="basis-5/6 grid grid-cols-12 grid-rows-3 content-center text-center divide-y-4 divide-x-4">
    {#each homeScaleNotes as note}
    <div class="col-start-{note.col} row-start-1 text-{note.color}-600 text-sm md:text-2xl">{note.name}</div>
    {/each}
    {#each scaleNotes as note}
    <div class="col-start-{note.col} row-start-2 text-{note.color}-600 text-sm md:text-2xl">{note.name}</div>
    {/each}
    {#each  chordNotes as note}
    <div class="col-start-{note.col} row-start-3 text-{note.color}-600 text-sm md:text-2xl">{note.name}</div>
    {/each}
    <div class="col-start-1 row-start-1 text-primary-600" > </div>
    <div class="col-start-2 row-start-1 text-secondary-600" > </div>
    <div class="col-start-3 row-start-1 text-tertiary-600" > </div>
    <div class="col-start-4 row-start-1" > </div>
    <div class="col-start-5 row-start-1" > </div>
    <div class="col-start-6 row-start-1" > </div>
    <div class="col-start-7 row-start-1" > </div>
    <div class="col-start-8 row-start-1" > </div>
    <div class="col-start-9 row-start-1" > </div>
    <div class="col-start-10 row-start-1" > </div>
    <div class="col-start-11 row-start-1" > </div>
    <div class="col-start-12 row-start-1" > </div>
    <div class="col-start-1 row-start-2" > </div>
    <div class="col-start-2 row-start-2" > </div>
    <div class="col-start-3 row-start-2" > </div>
    <div class="col-start-4 row-start-2" > </div>
    <div class="col-start-5 row-start-2" > </div>
    <div class="col-start-6 row-start-2" > </div>
    <div class="col-start-7 row-start-2" > </div>
    <div class="col-start-8 row-start-2" > </div>
    <div class="col-start-9 row-start-2" > </div>
    <div class="col-start-10 row-start-2" > </div>
    <div class="col-start-11 row-start-2" > </div>
    <div class="col-start-12 row-start-2" > </div>
    <div class="col-start-1 row-start-3" > </div>
    <div class="col-start-2 row-start-3" > </div>
    <div class="col-start-3 row-start-3" > </div>
    <div class="col-start-4 row-start-3" > </div>
    <div class="col-start-5 row-start-3" > </div>
    <div class="col-start-6 row-start-3" > </div>
    <div class="col-start-7 row-start-3" > </div>
    <div class="col-start-8 row-start-3" > </div>
    <div class="col-start-9 row-start-3" > </div>
    <div class="col-start-10 row-start-3" > </div>
    <div class="col-start-11 row-start-3" > </div>
    <div class="col-start-12 row-start-3" > </div>
</div>
</div>