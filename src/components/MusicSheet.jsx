export default function MusicSheet({ sheet = [], title = '' }) {
  const lines = [];
  let currentLine = [];

  sheet.forEach((note) => {
    if (note === '\n') {
      lines.push(currentLine);
      currentLine = [];
    } else {
      currentLine.push(note);
    }
  });

  if (currentLine.length) lines.push(currentLine);

  return (
    <div className="song-sheet">
      <div className="song-title"><strong>{title}</strong></div>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="notes-line">
          {line.map((note, i) => (
            <span key={i} className="notes">{note}</span>
          ))}
        </div>
      ))}
    </div>
  );
}