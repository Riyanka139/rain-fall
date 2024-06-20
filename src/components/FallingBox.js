import React, { useEffect, useState } from 'react';
import '../css/FallingBox.css';

const colorThemes = ['red', 'orange', 'yellow', 'green'];

const FallingBox = () => {
  const [fallingBoxes, setFallingBoxes] = useState([]);
  const [currentColor, setCurrentColor] = useState(0);
  const [shades, setShades] = useState([]);

  useEffect(() => {
    const fallInterval = setInterval(() => {
      startFalling(currentColor);
    }, 1000); // Adjust the interval for how often new boxes start falling

    return () => clearInterval(fallInterval);
  }, [currentColor]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColor((prevColor) => (prevColor + 1) % colorThemes.length);
    }, 3000); // Change color every 3 seconds

    return () => clearInterval(colorInterval);
  }, []);

  const startFalling = (colorIndex) => {
    const leftPosition = Math.random() * 90; // Ensure boxes don't go out of view
    const length = Math.floor(Math.random() * 2) + 5; // Length between 5-6
    const shades = Array.from({ length }, (_, i) => `shade-${i}-${colorThemes[colorIndex]}`);
    setShades(shades)

    const newBox = { id: Math.random(), left: leftPosition, shades };

    setFallingBoxes(prev => [...prev, newBox]);

    setTimeout(() => {
      setFallingBoxes(prev => prev.filter(box => box.id !== newBox.id));
    }, 5000); // Match this duration with CSS animation duration
  };

  return (
    <div className="falling-container">
      {fallingBoxes.map(box => (
        <div key={box.id} className="falling-box" style={{ left: `${box.left}%` }}>
          {shades.map((shade, index) => (
            <div key={index} className={`box ${shade}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FallingBox;