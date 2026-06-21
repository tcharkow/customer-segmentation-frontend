import React, { useState } from 'react';

const FRAUD_COLOR = '#e53e3e';

const questions = [
  {
    description: "A €1.00 charge appears on a card at 2:47am, followed 3 minutes later by a €847.00 purchase at an electronics retailer.",
    amount: '€1.00 → €847.00',
    time: '2:47am',
    correct: 'Fraud',
    explanation: 'Classic test charge pattern — a tiny amount is charged first to verify the card is active, then a large purchase follows immediately after confirmation.'
  },
  {
    description: "A €54.20 grocery purchase made on a Saturday afternoon at a supermarket the cardholder visits weekly.",
    amount: '€54.20',
    time: 'Saturday 2:30pm',
    correct: 'Legitimate',
    explanation: 'Consistent with normal shopping behavior — familiar merchant, expected amount, typical day and time.'
  },
  {
    description: "A €0.50 charge from an unknown online merchant, followed 1 minute later by a €1,200.00 transaction at a luxury goods website.",
    amount: '€0.50 → €1,200.00',
    time: '4:12am',
    correct: 'Fraud',
    explanation: 'Two red flags: a micro test charge at an unusual hour, immediately followed by a high-value purchase. Fraudsters test cards with minimal amounts before attempting large transactions.'
  },
  {
    description: "A €32.50 restaurant charge on a Friday evening in the same city where the cardholder lives.",
    amount: '€32.50',
    time: 'Friday 8:15pm',
    correct: 'Legitimate',
    explanation: 'Amount, time, and location are all consistent with a normal Friday dinner. No suspicious pattern.'
  },
  {
    description: "Five transactions of €9.99 each made within 10 minutes at five different online merchants the cardholder has never used.",
    amount: '€9.99 × 5',
    time: '1:23am',
    correct: 'Fraud',
    explanation: 'Multiple small charges at unfamiliar merchants in rapid succession at an unusual hour. Fraudsters often spread charges across merchants to stay below alert thresholds.'
  },
  {
    description: "A €120.00 fuel station charge on a Monday morning during the cardholder's usual commute route.",
    amount: '€120.00',
    time: 'Monday 7:45am',
    correct: 'Legitimate',
    explanation: 'Consistent with a regular commuter filling up before work. Familiar pattern, expected location and time.'
  },
  {
    description: "A €2.00 charge from a parking meter app, followed immediately by a €3,200.00 wire transfer to an overseas account.",
    amount: '€2.00 → €3,200.00',
    time: '3:58am',
    correct: 'Fraud',
    explanation: 'The small parking charge is a test. The immediate high-value overseas transfer at 4am is a major red flag — legitimate wire transfers of this size are rarely initiated in the middle of the night.'
  },
  {
    description: "A €67.00 pharmacy purchase on a Tuesday afternoon, consistent with the cardholder's monthly prescription refill.",
    amount: '€67.00',
    time: 'Tuesday 3:00pm',
    correct: 'Legitimate',
    explanation: 'Regular recurring purchase at a familiar merchant. Amount and timing match historical behavior — no anomaly to flag.'
  }
];

export default function FraudGame({ apiReady }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const question = questions[current];

  const handleAnswer = (answer) => {
    if (selected) return;
    setSelected(answer);
    if (answer === question.correct) setScore(s => s + 1);
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
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Analysis is ready!</h2>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          You scored {score} out of {questions.length} —
          {score >= 6 ? " impressive fraud instincts!" : score >= 4 ? " good effort!" : " the analysis below will sharpen your intuition!"}
        </p>
        <p style={{ color: FRAUD_COLOR, fontSize: '1rem' }}>Scroll down to explore ↓</p>
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
          {score >= 6 ? "Strong fraud detection instincts!" : score >= 4 ? "Good effort! The analysis below will deepen your understanding." : "The analysis below will help build your fraud intuition."}
        </p>
        {apiReady ? (
          <p style={{ color: FRAUD_COLOR, fontSize: '1rem' }}>✅ Analysis ready — scroll down to explore ↓</p>
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
          🔍 Fraud or Legitimate?
        </h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Based on the transaction description, is this fraud or a legitimate purchase?
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
            backgroundColor: FRAUD_COLOR,
            borderRadius: '3px',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>

      {/* Transaction Card */}
      <div style={{
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{ fontSize: '1.05rem', color: '#333', lineHeight: '1.7', marginBottom: '20px' }}>
          {question.description}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>Amount</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>{question.amount}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '4px' }}>Time</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>{question.time}</div>
          </div>
        </div>
      </div>

      {/* Answer Buttons */}
      <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        {['Legitimate', 'Fraud'].map(option => {
          const isSelected = selected === option;
          const isCorrect = option === question.correct;
          let bgColor = 'white';
          let borderColor = '#e2e8f0';
          let textColor = '#333';
          if (selected) {
            if (isCorrect) { bgColor = '#f0fff4'; borderColor = '#48bb78'; textColor = '#276749'; }
            else if (isSelected) { bgColor = '#fff5f5'; borderColor = FRAUD_COLOR; textColor = FRAUD_COLOR; }
          }
          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: `2px solid ${borderColor}`,
                backgroundColor: bgColor,
                cursor: selected ? 'default' : 'pointer',
                fontWeight: 'bold',
                color: textColor,
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
            >
              {option === 'Legitimate' ? '✓ ' : '🚨 '}{option}
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
          border: `1px solid ${selected === question.correct ? '#48bb78' : FRAUD_COLOR}`,
          marginBottom: '20px',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          <strong>{selected === question.correct ? '✓ Correct!' : `✗ That was ${question.correct}`}</strong>
          <p style={{ margin: '8px 0 0', color: '#666' }}>{question.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {selected && (
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            backgroundColor: FRAUD_COLOR,
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