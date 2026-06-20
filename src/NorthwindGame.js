import React, { useState } from 'react';

const COLOR = '#4299e1';

const questions = [
  {
    question: 'Renames "orderID" to order_id and casts "orderDate" from text to a date type.',
    options: ['Seeds', 'Staging', 'Mart'],
    answer: 'Staging',
    explanation: 'Staging models clean and standardize raw data — renaming columns and casting types.'
  },
  {
    question: 'Computes total revenue per month by joining orders and order_details.',
    options: ['Seeds', 'Staging', 'Mart'],
    answer: 'Mart',
    explanation: 'Mart models apply business logic — aggregations, joins, and KPI calculations.'
  },
  {
    question: 'A raw CSV file containing 830 rows of Northwind order data loaded into PostgreSQL.',
    options: ['Seeds', 'Staging', 'Mart'],
    answer: 'Seeds',
    explanation: 'Seeds are raw CSV files loaded directly into the database — no transformation applied.'
  },
  {
    question: 'Calculates lifetime revenue per customer using unit_price × quantity × (1 - discount).',
    options: ['Seeds', 'Staging', 'Mart'],
    answer: 'Mart',
    explanation: 'Mart models contain business logic like revenue formulas and customer aggregations.'
  },
  {
    question: 'Renames "productName" to product_name and "unitPrice" to unit_price.',
    options: ['Seeds', 'Staging', 'Mart'],
    answer: 'Staging',
    explanation: 'Staging models standardize column names to snake_case — no aggregation, no business logic.'
  },
  {
    question: 'Contains 91 rows of raw customer data with columns like "customerID" and "companyName" exactly as they appear in the CSV.',
    options: ['Seeds', 'Staging', 'Mart'],
    answer: 'Seeds',
    explanation: 'Seeds are raw CSV files loaded as-is into PostgreSQL — no renaming, no casting, no transformation.'
  },
  {
    question: 'Joins stg_products and stg_order_details to rank products by total units sold.',
    options: ['Seeds', 'Staging', 'Mart'],
    answer: 'Mart',
    explanation: 'Mart models join multiple staging models and apply business logic like rankings and aggregations.'
  },
  {
    question: 'Renames "shipVia" to shipper_id and keeps freight as-is.',
    options: ['Seeds', 'Staging', 'Mart'],
    answer: 'Staging',
    explanation: 'Staging models rename columns to snake_case conventions — light cleaning only, no joins or aggregations.'
  },
];

function NorthwindGame({ apiReady }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];

  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const optionColor = (option) => {
    if (!selected) return { backgroundColor: '#f8f9fa', border: '2px solid #e2e8f0', color: '#333' };
    if (option === q.answer) return { backgroundColor: '#c6f6d5', border: '2px solid #48bb78', color: '#276749' };
    if (option === selected) return { backgroundColor: '#fed7d7', border: '2px solid #fc8181', color: '#c53030' };
    return { backgroundColor: '#f8f9fa', border: '2px solid #e2e8f0', color: '#999' };
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '8px' }}>
        Loading pipeline data... play while you wait
      </p>

      <div style={{
        width: '100%',
        maxWidth: '560px',
        backgroundColor: 'white',
        border: `2px solid ${COLOR}`,
        borderRadius: '12px',
        padding: '32px',
      }}>
        {!done ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.85rem', color: '#999' }}>Question {current + 1} of {questions.length}</span>
              <span style={{ fontSize: '0.85rem', color: COLOR, fontWeight: 'bold' }}>Score: {score}</span>
            </div>

            <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
              Which pipeline layer does this describe?
            </p>
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.7', marginBottom: '24px', fontStyle: 'italic' }}>
              "{q.question}"
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(option)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    cursor: selected ? 'default' : 'pointer',
                    fontSize: '1rem',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    ...optionColor(option)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {selected && (
              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                fontSize: '0.9rem',
                color: '#555',
                lineHeight: '1.6'
              }}>
                💡 {q.explanation}
              </div>
            )}

            {selected && (
              <button
                onClick={handleNext}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: COLOR,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {current + 1 >= questions.length ? 'See Results' : 'Next →'}
              </button>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
              {score === questions.length ? '🏆' : score >= 5 ? '🎯' : '📚'}
            </div>
            <h2 style={{ color: COLOR, marginBottom: '8px' }}>
              {score} / {questions.length}
            </h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              {score === questions.length
                ? 'Perfect score — you know your pipeline layers!'
                : score >= 5
                ? 'Solid understanding of the ELT pattern.'
                : 'The pipeline is loading — explore the case study to learn more.'}
            </p>
            {apiReady && (
              <p style={{ color: '#48bb78', fontWeight: 'bold' }}>
                ✓ Pipeline data loaded — scroll up to explore the dashboard.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NorthwindGame;