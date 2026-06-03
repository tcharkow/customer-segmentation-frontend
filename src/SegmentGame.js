import React, { useState } from 'react';

const questions = [
  {
    customer: { Recency: 5, Frequency: 18, Monetary: 12400 },
    correct: 'Champions',
    explanation: 'Bought 5 days ago, 18 orders, £12,400 spent — highly engaged, high value.'
  },
  {
    customer: { Recency: 210, Frequency: 1, Monetary: 280 },
    correct: 'Lost/Inactive',
    explanation: 'Last purchase 210 days ago, only 1 order, £280 spent — a one-time buyer who never returned.'
  },
  {
    customer: { Recency: 85, Frequency: 5, Monetary: 2100 },
    correct: 'At Risk',
    explanation: 'Decent history (5 orders, £2,100) but 85 days since last purchase — drifting away.'
  },
  {
    customer: { Recency: 12, Frequency: 2, Monetary: 430 },
    correct: 'Recent Light Buyers',
    explanation: 'Bought recently (12 days) but only 2 orders and modest spend — new, not yet loyal.'
  },
  {
    customer: { Recency: 3, Frequency: 24, Monetary: 18600 },
    correct: 'Champions',
    explanation: 'Bought 3 days ago, 24 orders, £18,600 — the definition of a champion customer.'
  },
  {
    customer: { Recency: 190, Frequency: 2, Monetary: 520 },
    correct: 'Lost/Inactive',
    explanation: 'Nearly 6 months since last purchase, minimal orders and spend — effectively lost.'
  },
  {
    customer: { Recency: 60, Frequency: 6, Monetary: 3200 },
    correct: 'At Risk',
    explanation: '2 months since last purchase with solid history — showing early signs of churn.'
  },
  {
    customer: { Recency: 8, Frequency: 3, Monetary: 680 },
    correct: 'Recent Light Buyers',
    explanation: 'Active recently but low frequency and spend — promising but needs nurturing.'
  }
];

const segments = ['Champions', 'At Risk', 'Recent Light Buyers', 'Lost/Inactive'];

const colors = {
  'Champions': '#48bb78',
  'At Risk': '#ed8936',
  'Recent Light Buyers': '#4299e1',
  'Lost/Inactive': '#fc8181'
};

export default function SegmentGame({ apiReady }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const question = questions[current];

  const handleAnswer = (segment) => {
    if (selected) return;
    setSelected(segment);
    if (segment === question.correct) {
      setScore(s => s + 1);
    }
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
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
          The analysis is ready!
        </h2>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          You scored {score} out of {questions.length} — 
          {score >= 6 ? " impressive, you're a natural!" : score >= 4 ? " good effort!" : " keep exploring the analysis below!"}
        </p>
        <p style={{ color: '#4299e1', fontSize: '1rem' }}>Scroll down to explore ↓</p>
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
          {score >= 6 ? "Impressive — you have strong RFM intuition!" : score >= 4 ? "Good effort! The analysis below will sharpen your intuition." : "The analysis below will help build your RFM intuition."}
        </p>
        {apiReady ? (
          <p style={{ color: '#4299e1', fontSize: '1rem' }}>
            ✅ Analysis ready — scroll down to explore ↓
          </p>
        ) : (
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            ⏳ Still loading the analysis... hang tight!
          </p>
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
          Guess the Customer Segment
        </h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Based on their RFM profile, which segment does this customer belong to?
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
            width: `${((current) / questions.length) * 100}%`,
            backgroundColor: '#4299e1',
            borderRadius: '3px',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>

      {/* Customer Card */}
      <div style={{
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#333' }}>Customer Profile</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { label: 'Recency', value: `${question.customer.Recency} days`, desc: 'since last purchase' },
            { label: 'Frequency', value: `${question.customer.Frequency} orders`, desc: 'total orders placed' },
            { label: 'Monetary', value: `£${question.customer.Monetary.toLocaleString()}`, desc: 'total lifetime spend' }
          ].map((metric, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>{metric.label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>{metric.value}</div>
              <div style={{ fontSize: '0.7rem', color: '#aaa' }}>{metric.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Buttons */}
      <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {segments.map(segment => {
          const isSelected = selected === segment;
          const isCorrect = segment === question.correct;
          let bgColor = 'white';
          let borderColor = '#e2e8f0';
          if (selected) {
            if (isCorrect) { bgColor = '#f0fff4'; borderColor = colors[segment]; }
            else if (isSelected) { bgColor = '#fff5f5'; borderColor = '#fc8181'; }
          }
          return (
            <button
              key={segment}
              onClick={() => handleAnswer(segment)}
              style={{
                padding: '14px',
                borderRadius: '8px',
                border: `2px solid ${borderColor}`,
                backgroundColor: bgColor,
                cursor: selected ? 'default' : 'pointer',
                fontWeight: 'bold',
                color: selected && isCorrect ? colors[segment] : '#333',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              {segment}
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
          backgroundColor: selected === question.correct ? '#f0fff4' : '#fff5f5',
          border: `1px solid ${selected === question.correct ? '#48bb78' : '#fc8181'}`,
          marginBottom: '20px',
          fontSize: '0.9rem',
          color: '#444',
          textAlign: 'center'
        }}>
          <strong>{selected === question.correct ? '✓ Correct!' : `✗ It was ${question.correct}`}</strong>
          <p style={{ margin: '8px 0 0', color: '#666' }}>{question.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {selected && (
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            backgroundColor: '#4299e1',
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