import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const API = 'https://fraud-detection-api-z6a8.onrender.com';
const COLOR = '#4299e1';
const FRAUD_COLOR = '#e53e3e';

function FraudDetection() {
  const [stats, setStats] = useState(null);
  const [classDistribution, setClassDistribution] = useState([]);
  const [amountDistribution, setAmountDistribution] = useState([]);
  const [boxData, setBoxData] = useState(null);
  const [timeDistribution, setTimeDistribution] = useState([]);
  const [featureDifferences, setFeatureDifferences] = useState([]);
  const [modelResults, setModelResults] = useState([]);
  const [confusionMatrices, setConfusionMatrices] = useState(null);
  const [curves, setCurves] = useState(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    fetch(`${API}/api/stats`).then(r => r.json()).then(setStats);
    fetch(`${API}/api/class-distribution`).then(r => r.json()).then(setClassDistribution);
    fetch(`${API}/api/amount-distribution`).then(r => r.json()).then(setAmountDistribution);
    fetch(`${API}/api/box-data`).then(r => r.json()).then(setBoxData);
    fetch(`${API}/api/time-distribution`).then(r => r.json()).then(setTimeDistribution);
    fetch(`${API}/api/feature-differences`).then(r => r.json()).then(setFeatureDifferences);
    fetch(`${API}/api/model-results`).then(r => r.json()).then(setModelResults);
    fetch(`${API}/api/confusion-matrices`).then(r => r.json()).then(setConfusionMatrices);
    fetch(`${API}/api/curves`).then(r => r.json()).then(setCurves);
  }, []);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '20px 12px' : '20px 20px',
      fontFamily: 'sans-serif',
      animation: 'fadeIn 0.1s ease'
    }}>

      {/* Title */}
      <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', marginBottom: '10px' }}>
        Catching Fraud at Scale: A Machine Learning Case Study
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
        This project tackles one of the most challenging problems in financial machine learning:
        detecting fraudulent credit card transactions in a dataset where fraud represents only
        0.17% of all cases. Using a real dataset of {stats ? stats.total.toLocaleString() : '284,807'} transactions,
        we build and compare three classification models — Logistic Regression, Random Forest,
        and XGBoost — while addressing the class imbalance problem with SMOTE oversampling.
      </p>
      <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
        The central challenge: a model that predicts "legitimate" for every transaction would be
        99.83% accurate — and completely useless. This case study explains why accuracy is the
        wrong metric, what to measure instead, and how each model navigates the tradeoff between
        catching fraud and avoiding false alarms.
      </p>

      {/* Table of Contents */}
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '20px'
      }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '16px', color: '#333' }}>
          Our approach follows the standard data science pipeline — click any section to jump there:
        </p>
        {[
          { id: 'data-overview', label: '1. Dataset Overview — source, structure and the imbalance problem' },
          { id: 'descriptive', label: '2. Descriptive Analysis — what does fraud actually look like?' },
          { id: 'modeling', label: '3. Modeling — Logistic Regression, Random Forest, XGBoost + SMOTE' },
          { id: 'comparison', label: '4. Model Comparison — metrics, confusion matrices, PR and ROC curves' },
          { id: 'recommendations', label: '5. Business Recommendations — what this means in production' },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '10px 16px',
              marginBottom: '8px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: COLOR,
              fontSize: '1rem',
              borderLeft: `3px solid ${COLOR}`
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ebf8ff'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {item.label}
          </div>
        ))}
      </div>

      <p style={{ color: '#666', fontSize: '1rem', marginBottom: '10px' }}>
        Source: <a href="https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud" target="_blank" rel="noreferrer">
          Kaggle — Credit Card Fraud Detection (ULB Machine Learning Group)
        </a>
      </p>
      <p style={{ color: '#666', fontSize: '1rem', marginBottom: '40px' }}>
        GitHub: <a href="https://github.com/tcharkow/fraud-detection" target="_blank" rel="noreferrer">
          tcharkow/fraud-detection
        </a>
      </p>

      {/* Tech Stack */}
      <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Tech Stack
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '40px'
      }}>
        {[
          { name: 'Python', role: 'Data analysis & modeling', color: '#3776ab', emoji: '🐍' },
          { name: 'Scikit-learn', role: 'LR, Random Forest, SMOTE', color: '#f89939', emoji: '🤖' },
          { name: 'XGBoost', role: 'Gradient boosting classifier', color: '#189ab4', emoji: '⚡' },
          { name: 'Pandas', role: 'Data cleaning & EDA', color: '#150458', emoji: '🐼' },
          { name: 'imbalanced-learn', role: 'SMOTE oversampling', color: '#e53e3e', emoji: '⚖️' },
          { name: 'FastAPI', role: 'Backend REST API', color: '#009688', emoji: '🚀' },
          { name: 'React', role: 'Frontend dashboard', color: '#61dafb', emoji: '⚛️' },
          { name: 'Plotly', role: 'Interactive visualizations', color: '#3f4f75', emoji: '📊' },
        ].map((tool, i) => (
          <div key={i} style={{
            padding: '16px',
            borderRadius: '8px',
            border: `2px solid ${tool.color}`,
            backgroundColor: '#fafafa',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{tool.emoji}</div>
            <div style={{ fontWeight: 'bold', color: tool.color, marginBottom: '4px' }}>{tool.name}</div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>{tool.role}</div>
          </div>
        ))}
      </div>

      {/* Section 1 - Dataset Overview */}
      <h2 id="data-overview" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Dataset Overview
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        The dataset contains {stats ? stats.total.toLocaleString() : '284,807'} credit card transactions
        made by European cardholders over two days in September 2013. It was published by the
        ULB Machine Learning Group in collaboration with Worldline. Features V1–V28 are
        PCA-transformed to protect cardholder confidentiality — the original variables cannot
        be recovered. Only Amount and Time were left untransformed.
      </p>

      {/* Class imbalance callout */}
      <div style={{
        backgroundColor: '#fff5f5',
        border: `2px solid ${FRAUD_COLOR}`,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: COLOR, marginTop: 0 }}>⚠️ The Core Challenge: Class Imbalance</h3>
        <p style={{ color: '#555', lineHeight: '1.8', margin: 0 }}>
          Only <strong>{stats ? stats.fraud_count : 492}</strong> of {stats ? stats.total.toLocaleString() : '284,807'} transactions
          are fraudulent — a fraud rate of <strong>{stats ? stats.fraud_rate : 0.17}%</strong>.
          This extreme imbalance means standard accuracy is meaningless: a model predicting
          "legitimate" for every transaction would score 99.83% accuracy while catching
          zero fraud cases. We address this with SMOTE oversampling and evaluate models
          using Precision, Recall, F1, and AUPRC instead.
        </p>
      </div>

      {/* Class distribution chart */}
      <Plot
        data={[{
          type: 'bar',
          x: classDistribution.map(d => d.label),
          y: classDistribution.map(d => d.count),
          marker: { color: [COLOR, FRAUD_COLOR] },
          text: classDistribution.map(d => d.count.toLocaleString()),
          textposition: 'outside'
        }]}
        layout={{
          title: 'Transaction Class Distribution',
          xaxis: { title: '' },
          yaxis: { showticklabels: false, showgrid: false },
          height: 350,
          margin: isMobile ? { l: 40, r: 40, t: 50, b: 50 } : { l: 60, r: 60, t: 50, b: 50 }
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Section 2 - Descriptive Analysis */}
      <h2 id="descriptive" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Descriptive Analysis
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        Before modeling, we explore what fraud actually looks like in the data — how fraudulent
        transactions differ from legitimate ones in terms of amount, timing, and PCA feature values.
      </p>

      {/* Amount distribution — split into two histograms */}
      <h3 style={{ marginTop: '30px' }}>Transaction Amount: Fraud vs Legitimate</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        At first glance, both distributions appear similarly right-skewed — most transactions
        are small with a long tail of larger amounts. The histogram alone doesn't reveal
        a clear difference. The box plot below tells a more precise story.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <Plot
          data={[{
            type: 'bar',
            name: 'Legitimate',
            x: amountDistribution.map(d => d.bin_start),
            y: amountDistribution.map(d => d.legit_count),
            marker: { color: COLOR }
          }]}
          layout={{
            title: 'Legitimate Transactions',
            xaxis: { title: 'Amount (€)' },
            yaxis: { showticklabels: false, showgrid: false },
            height: 350,
            margin: isMobile ? { l: 40, r: 20, t: 50, b: 50 } : { l: 40, r: 20, t: 50, b: 50 }
          }}
          useResizeHandler={true}
          style={{ width: '100%' }}
          config={{ responsive: true }}
        />
        <Plot
          data={[{
            type: 'bar',
            name: 'Fraud',
            x: amountDistribution.map(d => d.bin_start),
            y: amountDistribution.map(d => d.fraud_count),
            marker: { color: FRAUD_COLOR }
          }]}
          layout={{
            title: 'Fraud Transactions',
            xaxis: { title: 'Amount (€)' },
            yaxis: { showticklabels: false, showgrid: false },
            height: 350,
            margin: isMobile ? { l: 40, r: 20, t: 50, b: 50 } : { l: 40, r: 20, t: 50, b: 50 }
          }}
          useResizeHandler={true}
          style={{ width: '100%' }}
          config={{ responsive: true }}
        />
      </div>

      {/* Box plots — horizontal, side by side */}
      <h3 style={{ marginTop: '40px' }}>Amount Distribution by Class</h3>
     <p style={{ color: '#666', lineHeight: '1.8' }}>
        The box plots reveal what the histograms obscure. Fraud has a significantly lower
        median (€{boxData ? boxData.fraud.median : 9.25}) compared to legitimate
        (€{boxData ? boxData.legit.median : 22.00}). Despite this, fraud has a higher mean
        (€{boxData ? boxData.fraud.mean : 122.21} vs €{boxData ? boxData.legit.mean : 88.29})
        due to high-value outliers. This pattern is consistent with a known fraud behavior:
        a small test charge near €0 is made first to verify the card is active, followed by
        a larger transaction if the test succeeds. The box plot captures this where the
        histogram cannot.
      </p>

      {boxData && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <Plot
            data={[{
              type: 'box',
              name: 'Legitimate',
              orientation: 'h',
              q1: [boxData.legit.q1],
              median: [boxData.legit.median],
              q3: [boxData.legit.q3],
              lowerfence: [boxData.legit.min],
              upperfence: [boxData.legit.max],
              mean: [boxData.legit.mean],
              marker: { color: COLOR }
            }]}
            layout={{
              title: 'Legitimate — Amount Distribution',
              xaxis: { title: 'Amount (€)', showgrid: false },
              yaxis: { showticklabels: false },
              height: 250,
              margin: isMobile ? { l: 20, r: 20, t: 50, b: 50 } : { l: 20, r: 20, t: 50, b: 50 }
            }}
            useResizeHandler={true}
            style={{ width: '100%' }}
            config={{ responsive: true }}
          />
          <Plot
            data={[{
              type: 'box',
              name: 'Fraud',
              orientation: 'h',
              q1: [boxData.fraud.q1],
              median: [boxData.fraud.median],
              q3: [boxData.fraud.q3],
              lowerfence: [boxData.fraud.min],
              upperfence: [boxData.fraud.max],
              mean: [boxData.fraud.mean],
              marker: { color: FRAUD_COLOR }
            }]}
            layout={{
              title: 'Fraud — Amount Distribution',
              xaxis: { title: 'Amount (€)', showgrid: false },
              yaxis: { showticklabels: false },
              height: 250,
              margin: isMobile ? { l: 20, r: 20, t: 50, b: 50 } : { l: 20, r: 20, t: 50, b: 50 }
            }}
            useResizeHandler={true}
            style={{ width: '100%' }}
            config={{ responsive: true }}
          />
        </div>
      )}

      {/* Time distribution */}
      <h3 style={{ marginTop: '40px' }}>Transaction Timing: 48-Hour Window</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        The dataset covers 48 hours of transactions. Time is recorded as seconds elapsed
        since the first transaction — we don't know the absolute start time, only the
        relative pattern. Fraud transactions show erratic spikes throughout the window
        rather than following the smooth daily rhythm of legitimate transactions,
        which dip noticeably in the second 24 hours (likely overnight).
      </p>
      <Plot
        data={[
          {
            type: 'bar',
            name: 'Legitimate (normalized)',
            x: timeDistribution.map(d => d.hour),
            y: timeDistribution.map(d => d.legit_normalized),
            marker: { color: '#4299e1', opacity: 0.7 }
          },
          {
            type: 'bar',
            name: 'Fraud',
            x: timeDistribution.map(d => d.hour),
            y: timeDistribution.map(d => d.fraud_count),
            marker: { color: FRAUD_COLOR, opacity: 0.8 }
          }
        ]}
        layout={{
          title: 'Transactions per Hour — Fraud vs Legitimate (normalized to same scale)',
          barmode: 'overlay',
          xaxis: { title: 'Hour in 48-hour window' },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          margin: isMobile ? { l: 40, r: 40, t: 50, b: 50 } : {},
          legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.2 }
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* PCA features */}
      <h3 style={{ marginTop: '40px' }}>Top PCA Features by Discriminating Power</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Although V1–V28 cannot be interpreted directly (they are PCA-transformed for
        confidentiality), we can measure how much each feature differs between fraud
        and legitimate transactions. Features with large absolute differences carry
        the most signal for our models. V3, V14, V17, V12 and V10 are strongly
        negative for fraud — legitimate transactions cluster near zero for all features
        by PCA construction.
      </p>
      <Plot
        data={[
          {
            type: 'bar',
            name: 'Fraud mean',
            x: featureDifferences.map(d => d.feature),
            y: featureDifferences.map(d => d.fraud_mean),
            marker: { color: FRAUD_COLOR, opacity: 0.85 }
          },
          {
            type: 'bar',
            name: 'Legitimate mean',
            x: featureDifferences.map(d => d.feature),
            y: featureDifferences.map(d => d.legit_mean),
            marker: { color: '#4299e1', opacity: 0.85 }
          }
        ]}
        layout={{
          title: 'Top 10 PCA Features: Mean Value by Class',
          barmode: 'group',
          xaxis: { title: '' },
          yaxis: { showgrid: false, zeroline: true },
          height: 400,
          margin: isMobile ? { l: 40, r: 40, t: 50, b: 50 } : {},
          legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.2 }
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Section 3 - Modeling */}
      <h2 id="modeling" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Modeling
      </h2>

      {/* SMOTE explanation */}
      <h3 style={{ marginTop: '30px' }}>Step 1 — Handling Class Imbalance with SMOTE</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        With only 394 fraud cases in the training set, any model will simply learn to
        predict "legitimate" always. SMOTE (Synthetic Minority Oversampling Technique)
        fixes this by generating synthetic fraud samples — not duplicates, but new points
        interpolated between existing fraud cases in feature space. After SMOTE, the
        training set contains 227,451 fraud and 227,451 legitimate transactions.
        Critically, SMOTE is applied only to training data — the test set stays at
        its natural imbalance so evaluation reflects real-world conditions.
      </p>

      {/* Model explanations */}
      <h3 style={{ marginTop: '40px' }}>Step 2 — Three Models in Sequence</h3>
      {[
        {
          name: 'Logistic Regression',
          color: '#4299e1',
          emoji: '📏',
          role: 'Baseline',
          explanation: 'Draws a straight decision boundary through feature space — each transaction lands on the fraud or legitimate side. Fast, interpretable, and useful as a performance floor. Limited because fraud patterns are rarely linearly separable in PCA space.'
        },
        {
          name: 'Random Forest',
          color: '#48bb78',
          emoji: '🌲',
          role: 'Ensemble',
          explanation: 'Builds 100 independent decision trees, each trained on a random subset of data and features. Every tree votes on fraud vs legitimate — the majority wins. The randomness prevents trees from making the same mistakes, producing a robust ensemble that is hard to fool.'
        },
        {
          name: 'XGBoost',
          color: FRAUD_COLOR,
          emoji: '⚡',
          role: 'Best Performer',
          explanation: 'Builds trees sequentially rather than independently. Each new tree focuses specifically on the transactions the previous trees got wrong — plugging gaps rather than repeating successes. More powerful than Random Forest and 23x faster to train (6.5s vs 148.5s).'
        }
      ].map((model, i) => (
        <div key={i} style={{
          padding: '24px',
          marginBottom: '16px',
          borderRadius: '8px',
          border: `2px solid ${model.color}`,
          backgroundColor: '#fafafa'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ color: model.color, fontSize: '1.2rem', margin: 0 }}>
              {model.emoji} {model.name}
            </h4>
            <span style={{
              backgroundColor: model.color,
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem'
            }}>
              {model.role}
            </span>
          </div>
          <p style={{ color: '#555', lineHeight: '1.8', margin: 0 }}>{model.explanation}</p>
        </div>
      ))}

      {/* Section 4 - Model Comparison */}
      <h2 id="comparison" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Model Comparison
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        All three models were evaluated on the same held-out test set of 56,962 transactions
        (98 fraud, 56,864 legitimate) — data the models never saw during training.
        The primary metric is AUPRC (Area Under the Precision-Recall Curve), as recommended
        by the dataset authors for imbalanced classification. AUC-ROC is shown for reference
        but is overly optimistic given the class imbalance.
      </p>

      {/* Metrics table */}
      <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Model</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Precision</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Recall</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>F1</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>AUPRC</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Fraud Caught</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>False Alarms</th>
            </tr>
          </thead>
          <tbody>
            {modelResults.map((row, i) => (
              <tr key={i} style={{
                backgroundColor: row.model === 'XGBoost' ? '#fff5f5' : i % 2 === 0 ? 'white' : '#fafafa',
                fontWeight: row.model === 'XGBoost' ? 'bold' : 'normal'
              }}>
                <td style={{ padding: '12px', border: '1px solid #ddd', color: row.model === 'XGBoost' ? FRAUD_COLOR : 'inherit' }}>
                  {row.model === 'XGBoost' ? '🏆 ' : ''}{row.model}
                </td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.precision.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.recall.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.f1.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.auprc.toFixed(4)}</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.fraud_caught} / 98</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd', color: row.false_positives > 100 ? FRAUD_COLOR : 'inherit' }}>{row.false_positives.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/* Metric explanations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '30px'
      }}>
        {[
          {
            metric: 'Precision',
            formula: 'TP / (TP + FP)',
            explanation: 'Of all transactions flagged as fraud, what fraction were actually fraud? Low precision = many false alarms annoying legitimate customers.'
          },
          {
            metric: 'Recall',
            formula: 'TP / (TP + FN)',
            explanation: 'Of all actual fraud cases, what fraction did the model catch? Low recall = fraud slipping through undetected, costing the bank money.'
          },
          {
            metric: 'F1 Score',
            formula: '2 × (Precision × Recall) / (Precision + Recall)',
            explanation: 'Harmonic mean of Precision and Recall. Useful single number when you care about both — penalizes models that are strong on one but weak on the other.'
          },
          {
            metric: 'AUPRC',
            formula: 'Area Under the Precision-Recall Curve',
            explanation: 'Measures performance across all possible thresholds. The primary metric for imbalanced datasets — unlike accuracy, it cannot be gamed by predicting the majority class.'
          }
        ].map((item, i) => (
          <div key={i} style={{
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            borderLeft: `4px solid ${COLOR}`,
            backgroundColor: '#fafafa'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>{item.metric}</span>
              <code style={{
                fontSize: '0.8rem',
                backgroundColor: '#edf2f7',
                padding: '2px 8px',
                borderRadius: '4px',
                color: '#4a5568'
              }}>{item.formula}</code>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{item.explanation}</p>
          </div>
        ))}
      </div>

      {/* Confusion matrices */}
      <h3 style={{ marginTop: '40px' }}>Confusion Matrices</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '24px' }}>
        Each cell shows what the model actually did with the 56,962 test transactions.
        The key tradeoff: catching more fraud (higher recall) means more false alarms
        (lower precision). No model is perfect — the right choice depends on whether
        the business prioritizes catching every fraud case or minimizing customer friction.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {confusionMatrices && ['Logistic Regression', 'Random Forest', 'XGBoost'].map((model, i) => {
          const matrix = confusionMatrices[model];
          const modelColor = ['#4299e1', '#48bb78', FRAUD_COLOR][i];
          return (
            <div key={i} style={{
              border: `2px solid ${modelColor}`,
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fafafa'
            }}>
              <h4 style={{ color: modelColor, marginTop: 0, marginBottom: '16px', textAlign: 'center' }}>
                {model}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { label: '✓ Correctly Cleared', value: matrix[0][0].toLocaleString(), bg: '#f0fff4', color: '#276749' },
                  { label: '⚠️ False Alarm', value: matrix[0][1].toLocaleString(), bg: '#fffbeb', color: '#744210' },
                  { label: '❌ Fraud Missed', value: matrix[1][0].toLocaleString(), bg: '#fff5f5', color: '#c53030' },
                  { label: '✅ Fraud Caught', value: matrix[1][1].toLocaleString(), bg: '#f0fff4', color: '#276749' },
                ].map((cell, j) => (
                  <div key={j} style={{
                    backgroundColor: cell.bg,
                    borderRadius: '6px',
                    padding: '12px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: cell.color, marginBottom: '4px' }}>{cell.label}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: cell.color }}>{cell.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* PR and ROC curves */}
      <h3 style={{ marginTop: '40px' }}>Precision-Recall & ROC Curves</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        The Precision-Recall curve (left) is the primary evaluation chart for imbalanced
        datasets — it shows the tradeoff between catching fraud and raising false alarms
        at every possible threshold. The ROC curve (right) looks equally good for all
        three models because it uses True Negative Rate, which is inflated when the
        negative class dominates. AUPRC is the honest metric here.
      </p>
      {curves && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '20px'
        }}>
          <Plot
            data={[
              {
                type: 'scatter', mode: 'lines', name: `LR (AUPRC=${curves['Logistic Regression'].auprc})`,
                x: curves['Logistic Regression'].pr_curve.recall,
                y: curves['Logistic Regression'].pr_curve.precision,
                line: { color: '#4299e1' }
              },
              {
                type: 'scatter', mode: 'lines', name: `RF (AUPRC=${curves['Random Forest'].auprc})`,
                x: curves['Random Forest'].pr_curve.recall,
                y: curves['Random Forest'].pr_curve.precision,
                line: { color: '#48bb78' }
              },
              {
                type: 'scatter', mode: 'lines', name: `XGB (AUPRC=${curves['XGBoost'].auprc})`,
                x: curves['XGBoost'].pr_curve.recall,
                y: curves['XGBoost'].pr_curve.precision,
                line: { color: FRAUD_COLOR }
              }
            ]}
            layout={{
              title: 'Precision-Recall Curve',
              xaxis: { title: 'Recall', range: [0, 1] },
              yaxis: { title: 'Precision', range: [0, 1], showgrid: false },
              height: 400,
              margin: isMobile ? { l: 50, r: 20, t: 50, b: 50 } : { l: 60, r: 20, t: 50, b: 50 },
              legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.25 }
            }}
            useResizeHandler={true}
            style={{ width: '100%' }}
            config={{ responsive: true }}
          />
          <Plot
            data={[
              {
                type: 'scatter', mode: 'lines', name: `LR (AUC=${curves['Logistic Regression'].auc_roc})`,
                x: curves['Logistic Regression'].roc_curve.fpr,
                y: curves['Logistic Regression'].roc_curve.tpr,
                line: { color: '#4299e1' }
              },
              {
                type: 'scatter', mode: 'lines', name: `RF (AUC=${curves['Random Forest'].auc_roc})`,
                x: curves['Random Forest'].roc_curve.fpr,
                y: curves['Random Forest'].roc_curve.tpr,
                line: { color: '#48bb78' }
              },
              {
                type: 'scatter', mode: 'lines', name: `XGB (AUC=${curves['XGBoost'].auc_roc})`,
                x: curves['XGBoost'].roc_curve.fpr,
                y: curves['XGBoost'].roc_curve.tpr,
                line: { color: FRAUD_COLOR }
              },
              {
                type: 'scatter', mode: 'lines', name: 'Random',
                x: [0, 1], y: [0, 1],
                line: { color: '#999', dash: 'dash' }
              }
            ]}
            layout={{
              title: 'ROC Curve',
              xaxis: { title: 'False Positive Rate', range: [0, 1] },
              yaxis: { title: 'True Positive Rate', range: [0, 1], showgrid: false },
              height: 400,
              margin: isMobile ? { l: 50, r: 20, t: 50, b: 50 } : { l: 60, r: 20, t: 50, b: 50 },
              legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.25 }
            }}
            useResizeHandler={true}
            style={{ width: '100%' }}
            config={{ responsive: true }}
          />
        </div>
      )}

      {/* Section 5 - Business Recommendations */}
      <h2 id="recommendations" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Business Recommendations
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
        Fraud detection is not a pure ML problem — it's a business decision about how to
        balance two types of errors with very different costs. Missing fraud costs the bank
        money. False alarms cost customer trust. Here's how to translate these model results
        into production decisions.
      </p>

      {[
        {
          icon: '⚡',
          title: 'Deploy XGBoost as the Primary Model',
          color: FRAUD_COLOR,
          insight: 'XGBoost achieves the best AUPRC (0.8773), catches 87 of 98 fraud cases, and trains in 6.5 seconds — making it practical for retraining on fresh data. Its 32 false alarms strike a better balance than Random Forest\'s missed fraud (18) or Logistic Regression\'s 1,458 false alarms.',
          action: 'Use XGBoost as the primary scoring model. Set the classification threshold based on the business\'s tolerance for false alarms — lowering the threshold catches more fraud but increases customer friction.'
        },
        {
          icon: '🎯',
          title: 'Use a Two-Stage Detection System',
          color: '#ed8936',
          insight: 'No single threshold works for all fraud types. Small-amount fraud (test charges under €10) and large-amount fraud (over €500) have very different risk profiles and should be handled differently.',
          action: 'Stage 1: flag all transactions above a low-confidence fraud score for review. Stage 2: auto-block only high-confidence fraud. This maximizes catch rate while routing uncertain cases to human review rather than blocking customers outright.'
        },
        {
          icon: '📊',
          title: 'Monitor AUPRC in Production, Not Accuracy',
          color: '#48bb78',
          insight: 'Accuracy is meaningless for imbalanced fraud data — a model that degrades over time may still report 99%+ accuracy while missing increasingly more fraud. AUPRC will drop immediately when model performance declines.',
          action: 'Set up monitoring dashboards tracking AUPRC, Precision, and Recall on a rolling 7-day window. Trigger model retraining when AUPRC drops below 0.80 or Recall drops below 0.80.'
        },
        {
          icon: '⚖️',
          title: 'Retrain Regularly with Fresh Fraud Patterns',
          color: '#4299e1',
          insight: 'Fraud patterns evolve as fraudsters adapt to detection systems. A model trained on 2013 data will degrade against 2024 fraud techniques. The V1–V28 PCA features make this harder to interpret — but SMOTE and retraining cadence remain critical.',
          action: 'Retrain monthly on the most recent 6 months of labeled transactions. Prioritize labeling speed — the faster confirmed fraud cases are added to training data, the faster the model adapts to new patterns.'
        }
      ].map((rec, i) => (
        <div key={i} style={{
          border: `2px solid ${rec.color}`,
          borderRadius: '8px',
          padding: '28px',
          marginBottom: '24px',
          backgroundColor: '#fafafa'
        }}>
          <h3 style={{ color: rec.color, fontSize: '1.3rem', marginBottom: '16px' }}>
            {rec.icon} {rec.title}
          </h3>
          <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '12px' }}>{rec.insight}</p>
          <div style={{
            backgroundColor: 'white',
            border: `1px solid ${rec.color}`,
            borderRadius: '6px',
            padding: '12px 16px',
            color: '#555',
            fontSize: '0.95rem',
            fontStyle: 'italic'
          }}>
            💡 {rec.action}
          </div>
        </div>
      ))}

    </div>
  );
}

export default FraudDetection;