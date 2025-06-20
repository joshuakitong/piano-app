import { useState, useEffect, useRef } from 'react';
import { keys } from './data/notes';
import { keyToNote } from './data/keyMap';
import { songs } from './data/songs';
import PianoKey from './components/PianoKey';
import ControlPanel from './components/ControlPanel';
import MusicSheet from './components/MusicSheet';
import { usePiano } from './utils/usePiano';
import { transposeNote } from './utils/transposeNote';
import './piano.css';

function App() {
  const [sustain, setSustain] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [volume, setVolume] = useState(1);
  const [pressedNotes, setPressedNotes] = useState([]);
  const [transpose, setTranspose] = useState(0);
  const [selectedSong, setSelectedSong] = useState('');

  const currentSheet = songs[selectedSong] || [];
  const { playNote } = usePiano(sustain, volume, transpose);
  const activeKeys = useRef(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const note = keyToNote[key];
      if (!note || activeKeys.current.has(key)) return;

      const noteObj = keys.find(k => k.note === note);
      if (noteObj) {
        playNote(noteObj.offset);
        activeKeys.current.add(key);
        setPressedNotes(prev => [...prev, note]);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      const note = keyToNote[key];
      activeKeys.current.delete(key);
      setPressedNotes(prev => prev.filter(n => n !== note));
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
      <h1>Piano</h1>

      <ControlPanel
        sustain={sustain}
        showLabels={showLabels}
        volume={volume}
        transpose={transpose}
        onToggleSustain={() => setSustain(prev => !prev)}
        onToggleLabels={() => setShowLabels(prev => !prev)}
        onVolumeChange={setVolume}
        onTranspose={(val) => setTranspose(val)}
      />

      <div className="piano">
        {keys.map((key, index) => (
          <PianoKey
            key={key.note}
            note={transposeNote(key.note, transpose)}
            offset={key.offset}
            index={index}
            playNote={playNote}
            isPressed={pressedNotes.includes(key.note)}
            label={showLabels ? noteToKey[key.note] : null}
          />
        ))}
      </div>

      <MusicSheet 
        sheet={currentSheet} 
        title={selectedSong} 
      />
    </div>
  );
}

export const noteToKey = Object.fromEntries(
  Object.entries(keyToNote).map(([k, v]) => [v, k.toUpperCase()])
);

export default App;