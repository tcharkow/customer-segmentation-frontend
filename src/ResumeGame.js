import React, { useState, useEffect, useCallback } from 'react';

const COLOR = '#4299e1';

const RESUME_WORDS = [
    'Python', 'SQL', 'React', 'FastAPI', 'NLP', 'ML', 'AWS',
    'XGBoost', 'Pandas', 'Docker', 'Git', 'API', 'dbt', 'ETL'
  ];
  
function ResumeGame({ apiReady }) {
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const isMobile = window.innerWidth < 768;

  

  const spawnWord = useCallback(() => {
    const word = RESUME_WORDS[Math.floor(Math.random() * RESUME_WORDS.length)];
    const id = Date.now() + Math.random();
    const left = Math.random() * 80 + 5;
    setWords(prev => [...prev, { id, word, left, top: 0 }]);
  }, []);

  useEffect(() => {
    if (gameOver || apiReady) return;
    const interval = setInterval(spawnWord, 1200);
    return () => clearInterval(interval);
  }, [gameOver, apiReady, spawnWord]);

  useEffect(() => {
    if (gameOver || apiReady) return;
    const interval = setInterval(() => {
      setWords(prev => {
        const updated = prev.map(w => ({ ...w, top: w.top + 1.2 }));
        const escaped = updated.filter(w => w.top > 100);
        if (escaped.length > 0) {
          setMissed(m => {
            const newMissed = m + escaped.length;
            if (newMissed >= 5) setGameOver(true);
            return newMissed;
          });
        }
        return updated.filter(w => w.top <= 100);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver, apiReady]);

  const catchWord = (id) => {
    setWords(prev => prev.filter(w => w.id !== id));
    setScore(s => s + 1);
  };

  if (apiReady) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <h2 style={{ color: COLOR, marginBottom: '8px' }}>🎯 Catch the Skills!</h2>
      <p style={{ color: '#666', marginBottom: '4px' }}>
        Catch skills while the API wakes up...
      </p>
      <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '20px' }}>
        Score: {score} &nbsp;|&nbsp; Missed: {missed}/5
      </p>

      <div style={{
        position: 'relative',
        width: isMobile ? '320px' : '500px',
        height: '400px',
        border: `2px solid ${COLOR}`,
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f8f9fa'
      }}>
        {gameOver ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>😅</div>
            <p style={{ color: '#666' }}>Game over! Score: {score}</p>
            <button
              onClick={() => { setWords([]); setScore(0); setMissed(0); setGameOver(false); }}
              style={{
                marginTop: '12px',
                padding: '8px 20px',
                backgroundColor: COLOR,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          words.map(w => (
            <div
              key={w.id}
              onClick={() => catchWord(w.id)}
              style={{
                position: 'absolute',
                left: `${w.left}%`,
                top: `${w.top}%`,
                backgroundColor: COLOR,
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                transform: 'translateX(-50%)'
              }}
            >
              {w.word}
            </div>
          ))
        )}
      </div>
      <p style={{ color: '#bbb', fontSize: '0.8rem', marginTop: '16px' }}>
        Loading model — this may take 30–60 seconds on first visit
      </p>
    </div>
  );
}

export default ResumeGame;