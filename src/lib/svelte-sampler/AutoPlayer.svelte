<script>import * as Tone from 'tone';
let duration = 4; // bars
let bpm = 100; // Beats per minute
let vol = 0; // Volume
let metronome = false;
let key = 'D';
let timeSig = '4/4';
let isPlaying = false;
let playComp = false;
let isSoloPlaying = false; // Current state
let playSolo = false; // User action
let isLoadingSamples = false;
let samplesLoaded = false;
let isReady = false;
let loadPiano;
export let sampler;
let pianoLoop;
let pianoSoloLoop;
let metronomeLoop;
let metronomeLoop2;
const SEQUENCE = ['add6', 'triad'];
$: notesPlaying = [];
$: soloNotesPlaying = [];
/**
 * Map interval notation to semitones
 * eg. 3rd -> 4 semitones
 * @param tones Interval (in tones)
 * @returns {Number} the equivalent number of semitones
 */
function tonesToSemitones(tones) {
    const map = {
        2: 2,
        3: 4,
        4: 5,
        5: 7,
        6: 9,
        7: 11
    };
    return map[tones];
}
const PROGRESSIONS = {
    blues: {
        bars: 12,
        chords: [1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 5],
        timeSig: 4 / 4
    },
    'ii-v-i': {
        bars: 4,
        chords: [2, 5, 1, 1],
        timeSig: 4 / 4
    }
};
let currentProgression;
let currentChord;
let currentChordIdx = 0;
const SOLO_RHYTHMS = ['4t', '4n'];
/**
 * Returns a function that changes a sequence of notes
 *
 * Can be based on a scale or a chord
 * Can return a completely new sequence, or change existing
 * @param technique
 */
function getTechnique(technique) {
    if (technique === '1long2short-halftime') {
    }
}
/**
 * . . . . . .
 * becomes
 * .   . .   .
 */
const OneLong2ShortHalfTime = (notes) => { };
/**
 * . . . . . . . .
 * becomes
 * .   . .     . .
 */
const JazzSyncopated1 = (notes) => { };
/**
 * Get a chord based on a root and inversion name
 * @param root the root key (MIDI)
 * @param quality The inversion
 * @returns {Chord} with a list of @see Tone.Unit.Note
 */
function chord(root, quality) {
    let notesMidi = [];
    switch (quality) {
        case 'minor':
            notesMidi = [root, root + 3, root + 7]; //triad
            break;
        case 'major':
        default:
            notesMidi = [root, root + 4, root + 7]; //triad
    }
    notesMidi = notesMidi.map((n) => Tone.Frequency(n, 'midi').toNote());
    return {
        root,
        notes: notesMidi,
        quality
    };
}
/**
 * Get a relative chord in the current key.
 * eg. if we're in C major, a 6th is A minor
 * eg. if we're in F major, a 5th is Bb major
 * @param interval
 * @param octave
 */
function relativeChord(interval, octave) {
    switch (interval) {
        case 4:
        case 5:
            return chord(getMidiRoot(octave) + tonesToSemitones(interval));
        case 2:
        case 3:
        case 6:
            return chord(getMidiRoot(octave) + tonesToSemitones(interval), 'minor');
        case 7:
            return chord(getMidiRoot(octave) + tonesToSemitones(interval), 'major');
        default:
            return chord(getMidiRoot(octave));
    }
}
const SCALES = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 9, 11],
    'minor-harmonic': [0, 2, 3, 5, 7, 8, 11],
    'minor-melodic': [0, 2, 3, 5, 7, 9, 11],
    pentatonic: [0, 3, 5, 7, 10]
};
/**
 * Get a scale based on a key, type and mode
 * eg. F, major, dorian
 * @param root Currently playing chord
 * @param type
 * @param mode
 */
function getScale(root, type, mode) {
    let scale = SCALES[type];
    return scale.map((n) => root + n).map((n) => Tone.Frequency(n, 'midi').toNote());
}
function getScaleFromChord(chord, octaveShift) {
    switch (chord.quality) {
        case 'major':
            return getScale(chord.root + octaveShift * 12, 'major', 'ionian');
        case 'minor':
            return getScale(chord.root + octaveShift * 12, 'minor', 'ionian');
        default:
            return getScale(chord.root + octaveShift * 12, 'major', 'ionian');
    }
}
/**
 * Get the MIDI value of the current key, in the given octave
 * @param octave
 */
function getMidiRoot(octave) {
    return Tone.Frequency(key + octave).toMidi();
}
$: {
    if (isPlaying) {
        console.log('bpm type', typeof bpm);
        Tone.getContext().transport.bpm.value = bpm;
    }
}
function onTimeSigUpdated(e) {
    timeSig = e.target.value;
    Tone.getContext().transport.timeSignature = timeSig.split('/').map((t) => parseInt(t));
    // We can't keep playing if the time sig changes, have to reset
    restart();
}
function onVolumeUpdated(e) {
    vol = parseInt(e.target.value);
    Tone.getDestination().volume.value = vol;
    console.log('current volume', Tone.getDestination().volume.value);
}
function playChord(chord, holdDuration, time) {
    chord.notes.forEach((n) => {
        sampler.triggerAttack(n);
    });
    // Draw key down
    Tone.Draw.schedule(function () {
        //this callback is invoked from a requestAnimationFrame
        //and will be invoked close to AudioContext time
        notesPlaying = chord.notes;
    }, time); //use AudioContext time of the event
    chord.notes.forEach((n) => {
        sampler.triggerRelease(n, '+4n');
    });
    Tone.Draw.schedule(function () {
        //this callback is invoked from a requestAnimationFrame
        //and will be invoked close to AudioContext time
        notesPlaying = [];
        notesPlaying = notesPlaying;
    }, '+4n'); //use AudioContext time of the event
}
function restart() {
    Tone.getContext().transport.cancel();
    Tone.getContext().transport.stop();
    let restartMetronome = false;
    let restartPiano = false;
    if (metronome) {
        metronomeToggle();
        restartMetronome = true;
    }
    isSoloPlaying = false;
    if (isPlaying) {
        pianoCompToggle();
        restartPiano = true;
    }
    if (restartMetronome)
        metronomeToggle();
    if (restartPiano)
        pianoCompToggle();
    Tone.getContext().transport.start('+0.4');
}
async function metronomeToggle() {
    if (metronome) {
        Tone.getContext().transport.clear(metronomeLoop);
        Tone.getContext().transport.clear(metronomeLoop2);
        metronome = false;
    }
    else {
        // We want metronome to be 2x faster than time sig
        // 3/4 becomes 6/8
        const noteLength = parseInt(timeSig.split('/')[1]);
        const beats = parseInt(timeSig.split('/')[0]);
        // Setup metronome
        let metronomeSample = new Tone.Player('fx/metronome.wav', () => {
            metronomeLoop = Tone.getContext().transport.scheduleRepeat((time) => {
                if (metronome) {
                    metronomeSample.volume.value = -15;
                    metronomeSample.start(0);
                }
            }, `${noteLength}n`, '0');
            metronomeLoop = new Tone.Loop((time) => {}, '8n');
        }).toDestination();
        // Setup metronome
        let metronomeSample2 = new Tone.Player('fx/metronome.wav', () => {
            metronomeLoop2 = Tone.getContext().transport.scheduleRepeat((time) => {
                if (metronome) {
                    metronomeSample2.volume.value = 0;
                    metronomeSample2.start(0);
                }
                console.log('timeSig', Tone.getContext().transport.timeSignature);
            }, `${noteLength}nx${beats}`, '0');
            // metronomeLoop = new Tone.Loop((time) => {}, '8n');
        }).toDestination();
        metronome = true;
    }
}
/**
 * Based on a chord progression, gives a list of notes with length, velocity
 */
function generateNextSoloSection() { }
let currentBar = 1;
// A single measure
function playProgression() {
    Tone.getContext().transport.schedule((time) => {
        // Play a progression for one measure (or custom length)
        currentProgression.chords.forEach((chord) => {
            playNextChord(currentProgression, time);
        });
        // Repeat
        currentBar++;
        playProgression();
    }, `${currentBar}m`);
}
function playNextChord(progression, transportTime) {
    console.log('Playing chord at time', transportTime);
    // Schedule the chord
    if (progression !== currentProgression) {
        currentProgression = progression;
    }
    currentChord = relativeChord(currentProgression.chords[currentChordIdx], 2);
    playChord(currentChord, '4n', transportTime);
    if (currentChordIdx === currentProgression.bars - 1) {
        currentChordIdx = 0;
    }
    else {
        currentChordIdx++;
    }
    // console.log('currentChordIdx', currentChordIdx);
    // This function is recursive - schedules the next chord immediately
    Tone.getContext().transport.schedule((time) => {
        playNextChord(progression, time);
    }, '	');
}
async function pianoCompToggle() {
    console.log("clicked")
    console.log(isPlaying)
    if (isPlaying) {
        Tone.getContext().transport.clear(pianoLoop);
        isPlaying = false;
    }
    else {
        // Setup piano loop (and start it)
        let bar = 1;
        let progression = PROGRESSIONS['ii-v-i'];
        let soloPattern;
        let currentSoloRhythmIdx = 1;
        let currentSoloRhythm = SOLO_RHYTHMS[currentSoloRhythmIdx];
        let soloRhythmCount = SOLO_RHYTHMS.length;
        Tone.getContext().transport.schedule((time) => {
            playNextChord(progression, time);
        }, '1');
        isPlaying = true;
    }
}
function toggleSolo() {
    playSolo = !playSolo;
}
</script>

<div class="settings">
	<button type="button" class="btn variant-filled-primary" on:click={pianoCompToggle}>{isPlaying ? 'Stop' : 'Play'}</button>
	<button type="button" class="btn variant-filled-primary" on:click={metronomeToggle}>{metronome ? 'Stop metronome' : 'Start metronome'}</button>
	<button type="button" class="btn variant-filled-primary" on:click={toggleSolo}>{isSoloPlaying ? 'Stop solo' : 'Start solo'}</button>

	<label>
		🥁 BPM
		<input type="number" bind:value={bpm} />
	</label>
	<label>
		🔊 Volume: {vol}dB
		<input type="range" min={-30} max={0} step={1} value={vol} on:change={onVolumeUpdated} />
	</label>
	<label>
		🎼 Key:
		<input type="text" bind:value={key} />
	</label>
	<label>
		🎼 Time sig:
		<input type="text" value={timeSig} on:change={onTimeSigUpdated} />
	</label>
</div>
