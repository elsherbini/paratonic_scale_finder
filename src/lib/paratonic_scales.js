// Import required functions from 'tonal' library
import { Note, Scale, Chord, Pcset} from 'tonal';

// Create a paratonic scale from home key and target chord, with optional sharps or flats
// simplify can help make sense of really weird keys or chords, like B# major
export function makeParatonicScale(homeKey, targetChord, sharpsOrFlats, startScaleOn, simplify) {
  // note this function probably breaks if the tonic is a double accidental
  const getSharpsOrFlats = (notes) => {
    return notes.map((note) => Note.get(note).acc) // Note.acc returns "" for natural, "#" for sharp, "b" for flat
    .reduce((result, note) => result  ? result : note, "") // if you see a sharp or flat, remember it, else keep looking
  }

  const chordAccidentalsMatch = getSharpsOrFlats(Chord.get(targetChord).notes) === sharpsOrFlats 
  const keyAccidentalsMatch = getSharpsOrFlats(Scale.get(homeKey).notes) === sharpsOrFlats 
 
  // Generate note based on home key, target chord, sharps or flats, and simplification preference
  const pickNoteFromNoteLetter = (homeKey, targetChord, sharpsOrFlats, simplify) =>{

    // these Object.fromEntries lines make an object of note letters as keys and notes as values
    // e.g. Dbm6 becomes {"D":"Db", "F":"Fb", "A":"Ab", "G":"Gb"}
    const targetChordTones =Object.fromEntries(
      Chord.get(targetChord).notes
      .map((note) => simplify ? Note.simplify(note) : note)
      .map((note) => chordAccidentalsMatch ? note : Note.enharmonic(note))
      .map( (note) => [Note.get(note).letter, note])
  )
    const scaleTones = Object.fromEntries(
      Scale.get(homeKey).notes
      .map((note) => simplify ? Note.simplify(note) : note )
      //.map((note) => keyAccidentalsMatch ? note : Note.enharmonic(note))
      .filter((note) => !Pcset.isNoteIncludedIn(Chord.get(targetChord).notes)(note))
      .map( (note) => [Note.get(note).letter, note])
      )

    // three cases: note in target chord, note in scale, or note is a leftover letter. 
    // in the last case, you pick the sharpened or flattened version of that note relative to the homeKey
    // e.g. C major + Dbm6 takes an Eb. Because Dbm6 has an Fb, which is enharmonic to E.
    return (note_letter) => note_letter in targetChordTones  // is the note_letter in the targetChordTones object?
      ? targetChordTones[note_letter]  // if so pick that note
      : note_letter in scaleTones // is the note letter in the scaleTones object?
      ? scaleTones[note_letter]  // if so pick that note
      : !Pcset.isNoteIncludedIn(Scale.get(homeKey).notes)(note_letter) // is the note_letter included in the homeScale (no accidental?)
      ? note_letter // if not, pick that note letter as the ntoe
      : Note.get(note_letter + sharpsOrFlats).name // otherwise, pick that note letter with the correct accidental
  }

  // these lines just rotate the notes so the scale starts on the tonic of the home key
  const rotateArray = (arr, query) => arr.concat(arr.splice(0, arr.indexOf(query)));
  const tonicLetter = startScaleOn === "key"
    ? simplify ? Note.get(Note.simplify(Scale.get(homeKey).tonic)).letter : Note.get(Scale.get(homeKey).tonic).letter
    : simplify ? Note.get(Note.simplify(Chord.get(targetChord).tonic)).letter : Note.get(Chord.get(targetChord).tonic).letter
  const noteLetters = rotateArray(["A", "B","C","D","E","F","G"], tonicLetter)
  return noteLetters.map(pickNoteFromNoteLetter(homeKey, targetChord, sharpsOrFlats, simplify)) 
}

// Usage examples
//makeParatonicScale( homeKey="C major",targetChord="Dbm6", sharpsOrFlats="b" ) 
//makeParatonicScale( homeKey="C major",targetChord="E7", sharpsOrFlats="#" ) 
//makeParatonicScale( homeKey="A minor",targetChord="E7", sharpsOrFlats="#" ) 

//makeParatonicScale(homeKey="E major",targetChord="Abm6", sharpsOrFlats="b" )
//makeParatonicScale(homeKey="E major",targetChord="Ab7", sharpsOrFlats="#" )
//makeParatonicScale( homeKey="E major",targetChord="Ab7", sharpsOrFlats="b" ) 
//makeParatonicScale( homeKey="Eb major",targetChord="D7", sharpsOrFlats="b" ) 
//makeParatonicScale( homeKey="Eb major",targetChord="D7", sharpsOrFlats="#" ) 

//makeParatonicScale( homeKey="B# major",targetChord="Cbm7b5", sharpsOrFlats="b" ) 
//makeParatonicScale( homeKey="B# major",targetChord="Cbm7b5", sharpsOrFlats="b", simplify=true) 
