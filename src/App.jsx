import { keys } from './data/notes';
import PianoKey from './components/PianoKey';
import { usePiano } from './utils/usePiano';
import './piano.css';

function App() {
  const { playNote } = usePiano();

  return (
    <div className="app">
      <h1>React Piano</h1>
      <div className="piano">
        {keys.map((key, index) => (
          <PianoKey
            key={key.note}
            {...key}
            index={index}
            playNote={playNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;