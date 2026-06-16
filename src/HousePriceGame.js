import React, { useState } from 'react';

const questions = [
  {
    house: {
      quality: 9,
      condition: 8,
      year: 2008,
      sqft: 3200,
      garage: 3,
      tier: 'Luxury'
    },
    description: "A large 3,200 sq ft home built in 2008 in one of Ames' most prestigious neighborhoods. Rated 9/10 for quality, 3-car garage, impeccably maintained.",
    correct: 3,
    explanation: "High quality, large size, luxury neighborhood and recent construction all push this well above $350k."
  },
  {
    house: {
      quality: 5,
      condition: 4,
      year: 1955,
      sqft: 900,
      garage: 1,
      tier: 'Budget'
    },
    description: "A compact 900 sq ft bungalow built in 1955 in a budget neighborhood. Rated 5/10 for quality, single garage, showing its age.",
    correct: 0,
    explanation: "Old construction, small size, budget neighborhood and below-average quality all point to under $150k."
  },
  {
    house: {
      quality: 7,
      condition: 6,
      year: 2001,
      sqft: 1800,
      garage: 2,
      tier: 'Mid-Range'
    },
    description: "A solid 1,800 sq ft home built in 2001 in a mid-range neighborhood. Rated 7/10 for quality, 2-car garage, well maintained.",
    correct: 1,
    explanation: "Average size, decent quality and mid-range location put this squarely in the $150k–$250k range."
  },
  {
    house: {
      quality: 8,
      condition: 7,
      year: 2005,
      sqft: 2400,
      garage: 2,
      tier: 'Premium'
    },
    description: "A spacious 2,400 sq ft home built in 2005 in a premium neighborhood. Rated 8/10 for quality, 2-car garage, recently renovated kitchen.",
    correct: 2,
    explanation: "Premium location, above-average size and high quality push this into the $250k–$350k range."
  },
  {
    house: {
      quality: 6,
      condition: 5,
      year: 1972,
      sqft: 1400,
      garage: 1,
      tier: 'Mid-Range'
    },
    description: "A 1,400 sq ft ranch-style home built in 1972 in a mid-range neighborhood. Rated 6/10 for quality, single garage, original finishes throughout.",
    correct: 1,
    explanation: "Older construction and original finishes keep the price modest despite the mid-range location — $150k–$250k."
  },
  {
    house: {
      quality: 10,
      condition: 9,
      year: 2010,
      sqft: 4000,
      garage: 3,
      tier: 'Luxury'
    },
    description: "A stunning 4,000 sq ft custom-built home from 2010 in Ames' most exclusive area. Rated 10/10 for quality, 3-car garage, high-end finishes throughout.",
    correct: 3,
    explanation: "The highest quality rating, maximum size and luxury location — this is a top-tier property well above $350k."
  },
  {
    house: {
      quality: 4,
      condition: 3,
      year: 1942,
      sqft: 750,
      garage: 0,
      tier: 'Budget'
    },
    description: "A tiny 750 sq ft home built in 1942 in a budget neighborhood. Rated 4/10 for quality, no garage, needs significant work.",
    correct: 0,
    explanation: "No garage, very old, very small and needs work in a budget area — well under $150k."
  },
  {
    house: {
      quality: 7,
      condition: 7,
      year: 1998,
      sqft: 2100,
      garage: 2,
      tier: 'Premium'
    },
    description: "A well-maintained 2,100 sq ft home built in 1998 in a premium neighborhood. Rated 7/10 for quality, 2-car garage, updated bathrooms.",
    correct: 2,
    explanation: "Premium location with good size and quality land this in the $250k–$350k range despite the older build year."
  }
];

const options = [
  { label: 'Under $150k', value: 0, color: '#fc8181' },
  { label: '$150k – $250k', value: 1, color: '#4299e1' },
  { label: '$250k – $350k', value: 2, color: '#48bb78' },
  { label: 'Over $350k', value: 3, color: '#ed8936' },
];

export default function HousePriceGame({ apiReady }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const question = questions[current];

  const handleAnswer = (value) => {
    if (selected !== null) return;
    setSelected(value);
    if (value === question.correct) setScore(s => s + 1);
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
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏠</div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Analysis is ready!</h2>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          You scored {score} out of {questions.length} —
          {score >= 6 ? " impressive appraiser instincts!" : score >= 4 ? " good effort!" : " the analysis below will sharpen your intuition!"}
        </p>
        <p style={{ color: '#ed8936', fontSize: '1rem' }}>Scroll down to explore ↓</p>
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
          {score >= 6 ? '🏆' : score >= 4 ? '👍' : '📚'}
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
          You scored {score} out of {questions.length}!
        </h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          {score >= 6 ? "Strong appraiser instincts — you understand what drives house prices!" : score >= 4 ? "Good effort! The analysis below will deepen your understanding." : "The analysis below will help build your pricing intuition."}
        </p>
        {apiReady ? (
          <p style={{ color: '#ed8936', fontSize: '1rem' }}>✅ Analysis ready — scroll down to explore ↓</p>
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
          🏠 Guess the House Price
        </h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Based on the description, which price range does this house fall into?
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
            backgroundColor: '#ed8936',
            borderRadius: '3px',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>

      {/* House Card */}
      <div style={{
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6', marginBottom: '16px' }}>
          {question.description}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { label: 'Quality', value: `${question.house.quality}/10` },
            { label: 'Year Built', value: question.house.year },
            { label: 'Size', value: `${question.house.sqft.toLocaleString()} sq ft` },
            { label: 'Garage', value: `${question.house.garage} car${question.house.garage !== 1 ? 's' : ''}` },
            { label: 'Condition', value: `${question.house.condition}/10` },
            { label: 'Neighborhood', value: question.house.tier },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Buttons */}
      <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        {options.map(option => {
          const isSelected = selected === option.value;
          const isCorrect = option.value === question.correct;
          let bgColor = 'white';
          let borderColor = '#e2e8f0';
          if (selected !== null) {
            if (isCorrect) { bgColor = '#fff8f0'; borderColor = '#ed8936'; }
            else if (isSelected) { bgColor = '#fff5f5'; borderColor = '#fc8181'; }
          }
          return (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              style={{
                padding: '14px',
                borderRadius: '8px',
                border: `2px solid ${borderColor}`,
                backgroundColor: bgColor,
                cursor: selected !== null ? 'default' : 'pointer',
                fontWeight: 'bold',
                color: '#333',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              {option.label}
              {selected !== null && isCorrect && ' ✓'}
              {selected !== null && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selected !== null && (
        <div style={{
          width: '100%',
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: selected === question.correct ? '#fff8f0' : '#fff5f5',
          border: `1px solid ${selected === question.correct ? '#ed8936' : '#fc8181'}`,
          marginBottom: '20px',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          <strong>{selected === question.correct ? '✓ Correct!' : `✗ It was ${options[question.correct].label}`}</strong>
          <p style={{ margin: '8px 0 0', color: '#666' }}>{question.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {selected !== null && (
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            backgroundColor: '#ed8936',
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