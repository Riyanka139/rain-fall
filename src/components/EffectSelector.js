function EffectSelector({ effect, setEffect, speed, setSpeed }) {
  return (
    <fieldset className="effect-selector ">
      <legend>Channel 1 / Effect 1</legend>
      <div className="effect">
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
        className="range"
        onChange={(e) => setSpeed(e.target.value)}
      />
    </fieldset>
  );
}

export default EffectSelector;
