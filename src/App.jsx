import { useEffect, useRef, useState } from 'react';
import { keys } from './data/notes';
import { keyToNote } from './data/keyMap';
import PianoKey from './components/PianoKey';
import { usePiano } from './utils/usePiano';
import './piano.css';

function App() {
  const { playNote } = usePiano();
  const activeKeys = useRef(new Set());
  const [pressedNotes, setPressedNotes] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const note = keyToNote[key];
      if (!note || activeKeys.current.has(key)) return;

      const noteObj = keys.find(k => k.note === note);
      if (noteObj) {
        playNote(noteObj.offset);
        activeKeys.current.add(key);
        setPressedNotes((prev) => [...prev, note]);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      const note = keyToNote[key];
      activeKeys.current.delete(key);
      setPressedNotes((prev) => prev.filter(n => n !== note));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playNote]);

  return (
    <div className="app">
      <h1>React Piano</h1>
      <div className="piano">
        {keys.map((key, index) => (
          <PianoKey
            note={key.note}
            {...key}
            index={index}
            playNote={playNote}
            isPressed={pressedNotes.includes(key.note)}
            label={noteToKey[key.note]}
          />
        ))}
      </div>
    </div>
  );
}

export const noteToKey = Object.fromEntries(
  Object.entries(keyToNote).map(([k, v]) => [v, k.toUpperCase()])
);

export default App;