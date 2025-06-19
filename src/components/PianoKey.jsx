import { useState } from 'react';
import { keys } from '../data/notes';

const blackKeyOffsets = {
  'C#4': 0.65, 'D#4': 1.65, 'F#4': 3.65, 'G#4': 4.65, 'A#4': 5.65,
  'C#5': 7.65, 'D#5': 8.65, 'F#5': 10.65, 'G#5': 11.65, 'A#5': 12.65,
};

export default function PianoKey({ note, offset, index, playNote }) {
  const isBlack = note.includes('#');
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const left = isBlack
    ? `${blackKeyOffsets[note] * 60}px`
    : `${(index - blackKeyCountBefore(index)) * 60}px`;

  const style = {
    position: 'absolute',
    left,
    width: isBlack ? '40px' : '60px',
    height: isBlack ? '160px' : '260px',
    backgroundColor: isBlack ? '#000' : '#fff',
    color: isBlack ? '#fff' : '#000',
    zIndex: isBlack ? 2 : 1,
    border: '1px solid #333',
    transition: 'all 0.1s ease',
    transform: pressed ? 'scale(0.98)' : 'scale(1)',
    boxShadow: pressed
      ? isBlack
        ? '0 0 10px #fff5'
        : 'inset 0 0 10px #0004'
      : hovered
        ? isBlack
          ? '0 0 6px #888'
          : '0 0 6px #999'
        : 'none',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '8px',
    fontSize: '14px',
  };

  const handleClick = () => {
    setPressed(true);
    playNote(offset);
    setTimeout(() => setPressed(false), 150);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
    >
      <span>{note}</span>
    </button>
  );
}

function blackKeyCountBefore(index) {
  const blackNotes = ['C#', 'D#', 'F#', 'G#', 'A#'];
  let count = 0;
  for (let i = 0; i < index; i++) {
    if (blackNotes.some(n => keys[i].note.includes(n))) {
      count++;
    }
  }
  return count;
}