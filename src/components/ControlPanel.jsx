export default function ControlPanel({
  sustain,
  showLabels,
  volume,
  transpose,
  onToggleSustain,
  onToggleLabels,
  onVolumeChange,
  onTranspose
}) {
  return (
    <div className="control-panel">
        <div>
            <label>
                <input type="checkbox" checked={sustain} onChange={onToggleSustain} />
                Sustained Notes
            </label>
            <label>
                <input type="checkbox" checked={showLabels} onChange={onToggleLabels} />
                Show Key Labels
            </label>
        </div>
        <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Volume
                <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                />
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Transpose:
                <button onClick={() => onTranspose(-12)} disabled={transpose === -12}>-12</button>
                <button onClick={() => onTranspose(0)} disabled={transpose === 0}>0</button>
                <button onClick={() => onTranspose(12)} disabled={transpose === 12}>+12</button>
            </div>
        </div>
    </div>
  );
}