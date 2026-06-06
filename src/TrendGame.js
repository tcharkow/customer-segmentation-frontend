import React, { useState } from 'react';

const questions = [
  {
    description: "It's 6am on a Tuesday. The household just woke up.",
    context: "Early morning, weekday",
    trend: 'up',
    explanation: "Morning routines drive a sharp spike — lights, shower, coffee machine, breakfast all turn on simultaneously."
  },
  {
    description: "It's 10am on a Wednesday. Adults are at work, but it's a French school half-day.",
    context: "Mid-morning, Wednesday",
    trend: 'up',
    explanation: "Children home from school means TV, gaming, snacking — consumption stays elevated compared to other weekday mornings."
  },
  {
    description: "It's August. The household is entering its summer routine.",
    context: "Summer month transition",
    trend: 'down',
    explanation: "August is the lowest consumption month — long days mean less lighting, warm temperatures mean no heating needed."
  },
  {
    description: "It's 9pm on a Saturday. The family just finished dinner.",
    context: "Saturday evening",
    trend: 'down',
    explanation: "After the dinner peak, consumption gradually declines as TV turns off and the household winds down for bed."
  },
  {
    description: "October just started. Summer is over.",
    context: "Start of fall",
    trend: 'up',
    explanation: "Temperatures drop in October, days get shorter — heating kicks in and consumption rises sharply toward winter peak."
  },
  {
    description: "It's 2am on a Sunday night.",
    context: "Deep night",
    trend: 'down',
    explanation: "The household is asleep. Only passive devices remain — fridge, router, standby appliances drawing minimal power."
  },
  {
    description: "It's 5pm on a Friday. People are arriving home from work.",
    context: "Friday evening",
    trend: 'up',
    explanation: "The evening peak begins — lights, cooking, TV, heating all activate as the household fills up after the workday."
  },
  {
    description: "It's January 2nd. The holiday season just ended.",
    context: "Post-holiday January",
    trend: 'down',
    explanation: "Holiday decorations turn off, guests leave, routines normalize — consumption drops from the December holiday peak."
  }
];

export default function TrendGame({ apiReady }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const question = questions[current];

  const handleAnswer = (trend) => {
    if (selected) return;
    setSelected(trend);
    if (trend === question.trend) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (apiReady && current === questions.length - 1) {
      setShowTransition(true);
      return;
    }
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (showTransition) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚡</div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Analysis is ready!</h2>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          You scored {score} out of {questions.length} — 
          {score >= 6 ? " impressive energy intuition!" : score >= 4 ? " good effort!" : " the analysis below will sharpen your intuition!"}
        </p>
        <p style={{ color: '#48bb78', fontSize: '1rem' }}>Scroll down to explore ↓</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
          {score >= 6 ? '⚡' : score >= 4 ? '👍' : '📊'}
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
          You scored {score} out of {questions.length}!
        </h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          {score >= 6 ? "Strong energy intuition — you understand how human behavior drives consumption." : score >= 4 ? "Good effort! The analysis below will deepen your understanding." : "The analysis below will help build your energy intuition."}
        </p>
        {apiReady ? (
          <p style={{ color: '#48bb78', fontSize: '1rem' }}>✅ Analysis ready — scroll down to explore ↓</p>
        ) : (
          <p style={{ color: '#666', fontSize: '0.9rem' }}>⏳ Still loading the analysis... hang tight!</p>
        )}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '8px' }}>
          ⏳ Loading the analysis — play while you wait!
        </p>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>
          ⚡ Predict the Energy Trend
        </h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Based on the situation described, does electricity consumption go up or down?
        </p>
      </div>

      {/* Progress */}
      <div style={{ width: '100%', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>Question {current + 1} of {questions.length}</span>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>Score: {score}</span>
        </div>
        <div style={{ height: '6px', backgroundColor: '#eee', borderRadius: '3px' }}>
          <div style={{
            height: '100%',
            width: `${(current / questions.length) * 100}%`,
            backgroundColor: '#48bb78',
            borderRadius: '3px',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>

      {/* Question Card */}
      <div style={{
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '8px' }}>{question.context}</p>
        <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6', margin: 0 }}>
          {question.description}
        </p>
      </div>

      {/* Answer Buttons */}
      <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {[
          { value: 'up', label: '📈 Going Up', color: '#48bb78' },
          { value: 'down', label: '📉 Going Down', color: '#fc8181' }
        ].map(option => {
          const isSelected = selected === option.value;
          const isCorrect = option.value === question.trend;
          let bgColor = 'white';
          let borderColor = '#e2e8f0';
          if (selected) {
            if (isCorrect) { bgColor = '#f0fff4'; borderColor = '#48bb78'; }
            else if (isSelected) { bgColor = '#fff5f5'; borderColor = '#fc8181'; }
          }
          return (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              style={{
                padding: '20px',
                borderRadius: '8px',
                border: `2px solid ${borderColor}`,
                backgroundColor: bgColor,
                cursor: selected ? 'default' : 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#333',
                transition: 'all 0.2s'
              }}
            >
              {option.label}
              {selected && isCorrect && ' ✓'}
              {selected && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selected && (
        <div style={{
          width: '100%',
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: selected === question.trend ? '#f0fff4' : '#fff5f5',
          border: `1px solid ${selected === question.trend ? '#48bb78' : '#fc8181'}`,
          marginBottom: '20px',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          <strong>{selected === question.trend ? '✓ Correct!' : `✗ It was ${question.trend === 'up' ? '📈 Going Up' : '📉 Going Down'}`}</strong>
          <p style={{ margin: '8px 0 0', color: '#666' }}>{question.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {selected && (
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {current < questions.length - 1 ? 'Next Question →' : apiReady ? 'See the Analysis →' : 'Finish'}
        </button>
      )}
    </div>
  );
}