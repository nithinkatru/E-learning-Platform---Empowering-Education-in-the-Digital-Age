import React, { useState, useEffect } from 'react';
import './IQGame.css'; // Ensure the CSS file is correctly linked

const shapeTypes = ['star', 'circle', 'triangle'];

function IQGame() {
  const [shapes, setShapes] = useState(new Array(10).fill(null).map(() => shapeTypes[Math.floor(Math.random() * shapeTypes.length)]));
  const [activeShapes, setActiveShapes] = useState(new Array(10).fill(false));
  const [selectedShape, setSelectedShape] = useState('');
  const [correctClicks, setCorrectClicks] = useState(0);
  const [incorrectClicks, setIncorrectClicks] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!selectedShape || gameOver) return;

    const interval = setInterval(() => {
      const newShapes = shapes.map(() => shapeTypes[Math.floor(Math.random() * shapeTypes.length)]); // Always shuffle with the three shapes
      setActiveShapes(newShapes.map(() => Math.random() < 0.3)); // 30% chance to activate any shape
      setShapes([...newShapes]);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedShape, gameOver]);

  const handleShapeClick = (index) => {
    if (gameOver) return; // Prevent any interaction if the game is over.

    // Check if the clicked shape is active and matches the selected shape.
    if (activeShapes[index] && shapes[index] === selectedShape) {
        setCorrectClicks(prevCorrectClicks => prevCorrectClicks + 1); // Update correct clicks using a function to ensure the latest state is used.
        if (correctClicks + 1 === 5) {
            alert('Congratulations! You won!');
            setGameOver(true);
        }
    } else {
        setIncorrectClicks(prevIncorrectClicks => prevIncorrectClicks + 1); // Similarly, update incorrect clicks safely using the previous state.
        if (incorrectClicks + 1 === 5) {
            alert('Game over! Too many incorrect taps.');
            setGameOver(true);
        }
    }
    // Immediately after checking, set the active state of that shape to false to prevent double counting if the user clicks again before it disappears.
    setActiveShapes(prevActiveShapes => 
        prevActiveShapes.map((isActive, idx) => idx === index ? false : isActive)
    );
};


  const handleStartGame = () => {
    setShapes(new Array(10).fill(null).map(() => shapeTypes[Math.floor(Math.random() * shapeTypes.length)]));
    setActiveShapes(new Array(10).fill(false));
    setCorrectClicks(0);
    setIncorrectClicks(0);
    setGameOver(false);
  };

  return (
    <div className="IQGame-container">
      <h2>Memory Challenge Game</h2>
      {gameOver ? (
        <>
          <p>Game Over! Would you like to play again?</p>
          <button onClick={handleStartGame}>Start New Game</button>
        </>
      ) : (
        <>
          {!selectedShape && (
            <div>
              <p>Select your shape:</p>
              <select onChange={(e) => setSelectedShape(e.target.value)} value={selectedShape}>
                <option value="">Choose a shape</option>
                {shapeTypes.map((shape, index) => (
                  <option key={index} value={shape}>{shape}</option>
                ))}
              </select>
            </div>
          )}
          <div className="shapes-container">
            {shapes.map((shape, index) => (
              <div key={index} className={`shape ${activeShapes[index] ? 'active' : ''} ${shape}`} onClick={() => handleShapeClick(index)}>
                {shape}
              </div>
            ))}
          </div>
          <p>Score: Correct Clicks - {correctClicks}, Incorrect Clicks - {incorrectClicks}</p>
        </>
      )}
    </div>
  );
}

export default IQGame;
