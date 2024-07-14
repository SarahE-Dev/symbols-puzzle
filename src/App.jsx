import React, { useState, useEffect } from 'react';
import './App.css';

const symbols = ['△', '○', '□', '◇', '⬟', '⬢'];
const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF00AA', '#AA00FF', '#00FFAA'];

function App() {
  const [code, setCode] = useState([]);
  const [guess, setGuess] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    generateNewCode();
  }, []);

  const generateNewCode = () => {
    const newCode = Array(4).fill().map(() => Math.floor(Math.random() * 6));
    setCode(newCode);
    setGuess([]);
    setFeedback([]);
    setAttempts(0);
    setGameWon(false);
  };

  const addToGuess = (index) => {
    if (guess.length < 4 && !gameWon) {
      setGuess([...guess, index]);
    }
  };

  const removeLastGuess = () => {
    setGuess(guess.slice(0, -1));
  };

  const checkGuess = () => {
    if (guess.length !== 4) return;

    const newFeedback = [];
    const codeCopy = [...code];
    const guessCopy = [...guess];

    // Check for correct position and color
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === codeCopy[i]) {
        newFeedback.push('●');
        codeCopy[i] = guessCopy[i] = null;
      }
    }

    // Check for correct color but wrong position
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] !== null) {
        const index = codeCopy.indexOf(guessCopy[i]);
        if (index !== -1) {
          newFeedback.push('○');
          codeCopy[index] = null;
        }
      }
    }

    setFeedback([...newFeedback, ...Array(4 - newFeedback.length).fill('×')]);
    setAttempts(attempts + 1);
    setGuess([]);

    if (newFeedback.length === 4 && newFeedback.every(f => f === '●')) {
      setGameWon(true);
    }
  };

  return (
    <div className="App">
      <h1>Cryptic Code Breaker</h1>
      <div className="game-board">
        <div className="code-input">
          {guess.map((g, i) => (
            <div key={i} className="symbol" style={{color: colors[g]}}>{symbols[g]}</div>
          ))}
        </div>
        <div className="controls">
          <button onClick={removeLastGuess}>⌫</button>
          <button onClick={checkGuess}>Submit</button>
        </div>
        <div className="symbol-options">
          {symbols.map((symbol, index) => (
            <button 
              className='symbol-button'
              key={index} 
              onClick={() => addToGuess(index)}
              style={{color: colors[index]}}
            >
              {symbol}
            </button>
          ))}
        </div>
        <div className="feedback">
          {feedback.map((f, i) => <span key={i}>{f}</span>)}
        </div>
        <div className="attempts">Attempts: {attempts}</div>
        {gameWon && <div className="win-message">Code Cracked!</div>}
      </div>
      <button className="new-game" onClick={generateNewCode}>New Game</button>
    </div>
  );
}

export default App;
