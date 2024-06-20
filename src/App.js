import React, { useState } from "react";
import "./App.css";
import EffectSelector from "./components/EffectSelector.js";
import FallingRain from "./components/FallingRain.js";
import FallingBox from "./components/FallingBox.js";

function App() {
  const [effect, setEffect] = useState("falling-rain");
  const [speed, setSpeed] = useState(1);

  return (
    <div className="app">
      <div className="channel">
        {/* <div className="effect-display"> */}
          {effect === "falling-rain" && <FallingBox speed={speed} />}
        {/* </div> */}
        <EffectSelector
          effect={effect}
          setEffect={setEffect}
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>
    </div>
  );
}

export default App;
