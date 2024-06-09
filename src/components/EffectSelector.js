function EffectSelector({ effect, setEffect, speed, setSpeed }) {
  return (
    <div className="effect-selector">
      <div className="effect">
        <label>Select Effect:</label>
        <select value={effect} onChange={(e) => setEffect(e.target.value)}>
          <option value="falling-rain">Falling Rain</option>
          <option value="blackout">Blackout</option>
        </select>
      </div>
      <label>Speed:</label>
      <input
        type="range"
        min="1"
        max="10"
        value={speed}
        style={{marginLeft: '1rem'}}
        onChange={(e) => setSpeed(e.target.value)}
      />
    </div>
  );
}

export default EffectSelector;
