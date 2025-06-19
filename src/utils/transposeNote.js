const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function transposeNote(note, semitones) {
  const match = note.match(/^([A-G]#?)(\d)$/);
  if (!match) return note;

  const [, baseNote, octaveStr] = match;
  const octave = parseInt(octaveStr);
  const noteIndex = noteNames.indexOf(baseNote);
  const midi = octave * 12 + noteIndex;

  const transposedMidi = midi + semitones;
  const newOctave = Math.floor(transposedMidi / 12);
  const newNote = noteNames[transposedMidi % 12];

  return `${newNote}${newOctave}`;
}