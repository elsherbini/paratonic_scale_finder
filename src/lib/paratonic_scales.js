// Import required functions from 'tonal' library
import { Note, Scale, Chord, Pcset} from 'tonal';

// Create a paratonic scale from home key and target chord, with optional sharps or flats
// simplify can help make sense of really weird keys or chords, like B# major
export function makeParatonicScale(homeKey, targetChord, sharpsOrFlats, simplify) {
  // note this function probably breaks if the tonic is a double accidental
  const getSharpsOrFlats = (notes) => {
    return notes.map((note) => Note.get(note).acc) // Note.acc returns "" for natural, "#" for sharp, "b" for flat
    .reduce((result, note) => result  ? result : note, "") // if you see a sharp or flat, remember it, else keep looking
  }

  const chordAccidentalsMatch = getSharpsOrFlats(Chord.get(targetChord).notes) === sharpsOrFlats 
  const keyAccidentalsMatch = getSharpsOrFlats(Scale.get(homeKey).notes) === sharpsOrFlats 
 
  // Generate note based on home key, target chord, sharps or flats, and simplification preference
  const pickNote = (homeKey, targetChord, sharpsOrFlats, simplify) =>{
    console.log(Scale.get("C major").notes)
    console.log(Chord.get(targetChord).notes)
    const targetChordTones =Object.fromEntries(
      Chord.get(targetChord).notes
      .map((note) => simplify ? Note.simplify(note) : note)
      .map((note) => chordAccidentalsMatch ? note : Note.enharmonic(note))
      .map( (note) => [Note.get(note).letter, note])
  )
    const scaleTones = Object.fromEntries(
      Scale.get(homeKey).notes
      .map((note) => simplify ? Note.simplify(note) : note )
      .map((note) => keyAccidentalsMatch ? note : Note.enharmonic(note))
      .filter((note) => !Pcset.isNoteIncludedIn(Chord.get(targetChord).notes)(note))
      .map( (note) => [Note.get(note).letter, note])
      )

    // three cases: note in target chord, note in scale, or note is a leftover letter. 
    // in the last case, you can deduce it's the accidental of that letter
    // e.g. C major + Dbm6 takes an Eb. Because Dbm6 has an Fb, which is enharmonic to E.
    return (note) => note in targetChordTones ? targetChordTones[note] : note in scaleTones ? scaleTones[note] : Note.get(note + sharpsOrFlats).name
  }

  // these lines just rotate the notes so the scale starts on the tonic of the home key
  const rotateArray = (arr, query) => arr.concat(arr.splice(0, arr.indexOf(query)));
  const tonicLetter = simplify ? Note.get(Note.simplify(Scale.get(homeKey).tonic)).letter : Note.get(Scale.get(homeKey).tonic).letter
  const noteLetters = rotateArray(["A", "B","C","D","E","F","G"], tonicLetter)
  console.log(homeKey, targetChord, sharpsOrFlats, simplify)
  console.log(noteLetters)
  console.log(noteLetters.map(pickNote(homeKey, targetChord, sharpsOrFlats, simplify)))
  return noteLetters.map(pickNote(homeKey, targetChord, sharpsOrFlats, simplify)) 
}