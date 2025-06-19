import { useState } from 'react';
import { keys } from '../data/notes';

const blackKeyOffsets = {
  'C#5': 0.65, 'D#5': 1.65, 'F#5': 3.65, 'G#5': 4.65, 'A#5': 5.65
};

export default function PianoKey({ note, offset, index, playNote, isPressed, label }) {
  const isBlack = note.includes('#');
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const left = isBlack
    ? `${blackKeyOffsets[note] * 50}px`
    : `${(index - blackKeyCountBefore(index)) * 50}px`;

  const style = {
    position: 'absolute',
    left,
    width: isBlack ? '33.35px' : '50px',
    height: isBlack ? '160px' : '260px',
    backgroundColor: isBlack ? '#000' : '#fff',
    color: isBlack ? '#fff' : '#000',
    zIndex: isBlack ? 2 : 1,
    border: '1px solid #333',
    transition: 'all 0.1s ease',
    transform: isPressed || pressed ? 'scale(0.98)' : 'scale(1)',
    boxShadow: isPressed || pressed
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
      <div className="note-label">
        <div>{note}</div>
        {label && <div className="key-label">({label})</div>}
      </div>
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