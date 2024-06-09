import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../css/fallingRain.css";

function FallingRain({ speed }) {
  const colorSets = useMemo(() => {
    return [
      ['#660000', '#990000', '#cc0000', '#ff0000', '#ff3333', '#ff6666', '#ff9999', '#ffcccc'],
      ['#660000', '#990000', '#cc0000', '#ff0000', '#ff3300', '#ff6633', '#ff9966', '#ffcc99'],
      ['#333300', '#666600', '#999900', '#cccc00', '#ffff00', '#ffff33', '#ffff66', '#ffff99'],
      ['#003300', '#006600', '#009900', '#00cc00', '#33ff00', '#66ff33', '#99ff66', '#ccff99']
    ];
  }, []);

  const [colorIndex, setColorIndex] = useState(0); // preserve color order
  const [currentColors, setCurrentColors] = useState(colorSets[colorIndex]);
  const [rainComponents, setRainComponents] = useState([]);
  let uniqueId = useRef(4) // maintain rain component length
  const rows = new Array(8).fill(0);

  //change color 
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1 === colorSets.length ? 0 : prev + 1));
      setCurrentColors(colorSets[colorIndex]);
    }, 5 * 1000);

    return () => clearInterval(interval);
  }, [colorIndex, colorSets, speed]);

  // add rain component
  const addRainComponent = useCallback(() => {
    setRainComponents((prev) => [
      ...prev,
      {
        id: uniqueId.current + 1,
        delay: getRandomDelay(prev.length),
        duration: `${(11 - speed) * 0.8}s`
      }
    ]);
    // update rain component length
    uniqueId.current = uniqueId.current + 1;
  }, [speed, uniqueId]);

  // remove rain component
  const removeRainComponent = useCallback(() => {
    setRainComponents((prev) => {
      const newComponents = [...prev];
      newComponents.splice(Math.floor(Math.random() * newComponents.length), 1);
      return newComponents;
    });
    uniqueId.current =  uniqueId.current - 1;
  }, []);

  // add initial 4 rain component and after that add and remove randomly
  useEffect(() => {
    const initialRainComponents = Array.from({ length: 4 }, (_, index) => ({
      id: index,
      delay: getRandomDelay(index),
      duration: `${(11 - speed) * 0.8}s`
    }));
    setRainComponents(initialRainComponents);

    const interval = setInterval(() => {
      console.log(uniqueId.current);
      if ((Math.random() > 0.5 && uniqueId.current > 3) || uniqueId.current > 8) {
        removeRainComponent();
      } else {
        addRainComponent();
      }
    }, (11 - speed) * 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  function getRandomDelay(colIndex) {
    const baseDelay = Math.random();
    const stagger = colIndex * 0.1;
    return (baseDelay + stagger).toFixed(2);
  }


  return (
    <div className="rain-col" style={{columnGap: `${Math.random() * 10}rem`}}>
      {rainComponents.map((rain) => (
        <div
          key={rain.id}
          className="falling-rain"
          style={{
            animationDuration: rain.duration,
            animationDelay: `${rain.delay}s`,
          }}
        >
          {rows.map((_, i) => (
            <div
              key={`${rain.id}-${i}`}
              className="rain-box"
              style={{ backgroundColor: currentColors[Math.floor(i % 8)] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default FallingRain;
