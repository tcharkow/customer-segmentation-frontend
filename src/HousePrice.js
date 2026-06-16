import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import HousePriceGame from './HousePriceGame';

const API = 'https://house-price-prediction-api-37qk.onrender.com';
const COLOR = '#4299e1';

function HousePrice() {
  const [cleaningSummary, setCleaningSummary] = useState([]);
  const [modelComparison, setModelComparison] = useState([]);
  const [correlation, setCorrelation] = useState([]);
  const [salePriceData, setSalePriceData] = useState([]);
  const [neighborhoodTiers, setNeighborhoodTiers] = useState([]);
  const [qualityVsPrice, setQualityVsPrice] = useState([]);
  const [livingAreaVsPrice, setLivingAreaVsPrice] = useState([]);
  const [yearBuiltVsPrice, setYearBuiltVsPrice] = useState([]);
  const [apiReady, setApiReady] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [salePriceStats, setSalePriceStats] = useState(null);

  // Predict state
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [inputs, setInputs] = useState({
    overall_qual: 7,
    overall_cond: 5,
    effective_year: 2000,
    x1st_flr_sf: 1200,
    x2nd_flr_sf: 0,
    garage_cars: 2,
    full_bath: 2,
    neighborhood_tier: 'Mid-Range'
  });

  const isMobile = window.innerWidth < 768;

  // Show game if API takes more than 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!apiReady) setShowGame(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [apiReady]);

  // Fetch all data
  useEffect(() => {
    fetch(`${API}/api/cleaning-summary`)
      .then(r => r.json())
      .then(data => {
        setCleaningSummary(data);
        setApiReady(true);
        setShowGame(false);
      });

    fetch(`${API}/api/model-comparison`).then(r => r.json()).then(setModelComparison);
    fetch(`${API}/api/correlation`).then(r => r.json()).then(setCorrelation);
    fetch(`${API}/api/sale-price-distribution`).then(r => r.json()).then(setSalePriceData);
    fetch(`${API}/api/neighborhood-tiers`).then(r => r.json()).then(setNeighborhoodTiers);
    fetch(`${API}/api/quality-vs-price`).then(r => r.json()).then(setQualityVsPrice);
    fetch(`${API}/api/living-area-vs-price`).then(r => r.json()).then(setLivingAreaVsPrice);
    fetch(`${API}/api/year-built-vs-price`).then(r => r.json()).then(setYearBuiltVsPrice);
    fetch(`${API}/api/sale-price-stats`).then(r => r.json()).then(setSalePriceStats);
  }, []);

  const handlePredict = async () => {
    setPredicting(true);
    setPrediction(null);
    try {
      const res = await fetch(`${API}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });
      const data = await res.json();
      setPrediction(data.predicted_price);
    } catch (e) {
      setPrediction('Error');
    }
    setPredicting(false);
  };

  if (showGame && !apiReady) {
    return <HousePriceGame apiReady={apiReady} />;
  }

  const tierColors = {
    'Budget': '#fc8181',
    'Mid-Range': '#4299e1',
    'Premium': '#48bb78',
    'Luxury': '#ed8936'
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '20px 12px' : '20px 20px',
      fontFamily: 'sans-serif',
      animation: 'fadeIn 0.1s ease'
    }}>

      {/* Title */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
        The Appraiser: Predicting Fair Market Value with Machine Learning
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '20px' }}>
        Real estate appraisers spend years developing intuition about what makes a house 
        worth what it's worth. This project asks: can a machine learn the same thing from 
        data? Using 2,410 real house sales from Ames, Iowa, we built a Lasso regression 
        model that predicts sale price with 94% accuracy — identifying which features 
        actually drive value and by how much.
      </p>
      <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '20px' }}>
        The dataset contains 82 variables per house — from square footage and garage size 
        to basement quality and neighborhood. Our goal is not just to predict prices, but 
        to understand <strong>which features matter most</strong> and build a model that 
        generalizes to houses it has never seen.
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
          { id: 'data-cleaning', label: '1. Clean and validate the raw data' },
          { id: 'descriptive-analysis', label: '2. Explore distributions and key price drivers' },
          { id: 'feature-engineering', label: '3. Engineer meaningful features for modeling' },
          { id: 'modeling', label: '4. Build and compare four regression models' },
          { id: 'estimator', label: '5. Estimate the fair market value of your house' },
          { id: 'recommendations', label: '6. Translate findings into actionable insights' },
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
              transition: 'background-color 0.2s',
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
        Source: <a href="https://www.tandfonline.com/doi/abs/10.1080/10691898.2011.11889627" target="_blank" rel="noreferrer">
          Ames Housing Dataset — De Cock (2011), Journal of Statistics Education
        </a>
      </p>
      <p style={{ color: '#666', fontSize: '1rem', marginBottom: '40px' }}>
        Available via: <a href="https://cran.r-project.org/web/packages/AmesHousing/index.html" target="_blank" rel="noreferrer">
          R AmesHousing package
        </a>
      </p>

      {/* Tech Stack */}
      <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Tech Stack
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
        This project was built end-to-end using the following tools — from raw data analysis
        in R to a deployed interactive web application.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '40px'
      }}>
        {[
          { name: 'R', role: 'Data analysis & modeling', color: '#276DC3', emoji: '📊' },
          { name: 'tidyverse', role: 'Data cleaning & visualization', color: '#1a162d', emoji: '🔧' },
          { name: 'glmnet', role: 'Ridge & Lasso regression', color: '#276DC3', emoji: '🤖' },
          { name: 'Python', role: 'Model retraining for API', color: '#3776ab', emoji: '🐍' },
          { name: 'Scikit-learn', role: 'Lasso deployment model', color: '#f89939', emoji: '⚙️' },
          { name: 'FastAPI', role: 'Backend REST API', color: '#009688', emoji: '⚡' },
          { name: 'React', role: 'Frontend dashboard', color: '#61dafb', emoji: '⚛️' },
          { name: 'Render', role: 'Backend deployment', color: '#46e3b7', emoji: '🚀' },
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

      {/* Architecture */}
      <h3 style={{ marginTop: '40px' }}>How It All Connects</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Analysis and modeling happen in R. The trained model logic is reproduced in Python
        for deployment, served via FastAPI, and displayed in an interactive React dashboard.
      </p>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '30px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {[
          { label: 'Ames Dataset', sublabel: 'AmesHousing R package', color: '#718096' },
          { label: '→', arrow: true },
          { label: 'R & tidyverse', sublabel: 'Clean & analyze', color: '#276DC3' },
          { label: '→', arrow: true },
          { label: 'glmnet / sklearn', sublabel: 'Lasso regression', color: '#f89939' },
          { label: '→', arrow: true },
          { label: 'FastAPI', sublabel: 'REST API on Render', color: '#009688' },
          { label: '→', arrow: true },
          { label: 'React', sublabel: 'Dashboard on Vercel', color: '#61dafb' },
        ].map((item, i) => (
          item.arrow ? (
            <div key={i} style={{
              fontSize: '1.5rem',
              color: '#cbd5e0',
              transform: isMobile ? 'rotate(90deg)' : 'none'
            }}>→</div>
          ) : (
            <div key={i} style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: `2px solid ${item.color}`,
              backgroundColor: 'white',
              textAlign: 'center',
              minWidth: '120px'
            }}>
              <div style={{ fontWeight: 'bold', color: item.color, fontSize: '0.9rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>{item.sublabel}</div>
            </div>
          )
        ))}
      </div>

      {/* Data Cleaning */}
      <h2 id="data-cleaning" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Data Cleaning
      </h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        The raw Ames dataset contains 2,930 observations across 82 variables. Before any 
        analysis, we made deliberate cleaning decisions — each one documented and justified.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Step</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Rows Remaining</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Rows Removed</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Reason</th>
            </tr>
          </thead>
          <tbody>
            {cleaningSummary.map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{row.step}</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.rows.toLocaleString()}</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd', color: row.removed > 0 ? '#e53e3e' : 'inherit' }}>
                  {row.removed > 0 ? `-${row.removed.toLocaleString()}` : '—'}
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd', color: '#666' }}>{row.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Descriptive Analysis */}
      <h2 id="descriptive-analysis" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Descriptive Analysis
      </h2>

      {/* Sale Price Distribution */}
<h3 style={{ marginTop: '30px' }}>Distribution of Sale Prices</h3>
<p style={{ color: '#666', lineHeight: '1.8' }}>
  The distribution of sale prices is right-skewed — most houses sold between $100k 
  and $250k, but a long tail of luxury properties stretches the distribution to the 
  right. The red curve shows what a perfect normal distribution would look like given 
  the same mean and standard deviation. The data clearly deviates from it, with more 
  mass concentrated at lower prices and a longer right tail. This skew violates the 
  normality assumption of linear regression — which is why we apply a log transformation 
  to the target variable before modeling.
</p>
<Plot
  data={[
    {
      type: 'histogram',
      x: salePriceData,
      nbinsx: 60,
      histnorm: 'probability density',
      marker: { color: COLOR, opacity: 0.7 },
      name: 'Observed'
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Normal curve',
      x: Array.from({ length: 200 }, (_, i) => 
        (salePriceStats?.mean - 3 * salePriceStats?.std) + 
        i * (6 * salePriceStats?.std / 200)
      ),
      y: Array.from({ length: 200 }, (_, i) => {
        const x = (salePriceStats?.mean - 3 * salePriceStats?.std) + 
                  i * (6 * salePriceStats?.std / 200);
        const mean = salePriceStats?.mean || 1;
        const std = salePriceStats?.std || 1;
        return (1 / (std * Math.sqrt(2 * Math.PI))) * 
               Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
      }),
      line: { color: 'red', width: 2 }
    }
  ]}
  layout={{
    title: 'Distribution of Sale Prices — Ames, Iowa',
    xaxis: { title: 'Sale Price ($)' },
    yaxis: { showticklabels: false, showgrid: false },
    height: 400,
    margin: isMobile ? { l: 40, r: 20, t: 50, b: 50 } : {},
    legend: { orientation: 'h', x: 0, y: -0.2 }
  }}
  useResizeHandler={true}
  style={{ width: '100%' }}
  config={{ responsive: true }}
/>

{/* Log Sale Price Distribution */}
<h3 style={{ marginTop: '40px' }}>Distribution of Log Sale Price</h3>
<p style={{ color: '#666', lineHeight: '1.8' }}>
  Applying a log transformation compresses the right tail and produces a distribution 
  that closely follows the normal curve. The red curve now fits the data much more 
  tightly — confirming that log(sale_price) is the right target variable for regression. 
  All model predictions are made in log space and converted back to dollars via exp().
</p>
<Plot
  data={[
    {
      type: 'histogram',
      x: salePriceStats?.log_prices || [],
      nbinsx: 60,
      histnorm: 'probability density',
      marker: { color: '#48bb78', opacity: 0.7 },
      name: 'Observed'
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Normal curve',
      x: Array.from({ length: 200 }, (_, i) =>
        (salePriceStats?.log_mean - 3 * salePriceStats?.log_std) +
        i * (6 * salePriceStats?.log_std / 200)
      ),
      y: Array.from({ length: 200 }, (_, i) => {
        const x = (salePriceStats?.log_mean - 3 * salePriceStats?.log_std) +
                  i * (6 * salePriceStats?.log_std / 200);
        const mean = salePriceStats?.log_mean || 1;
        const std = salePriceStats?.log_std || 1;
        return (1 / (std * Math.sqrt(2 * Math.PI))) *
               Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
      }),
      line: { color: 'red', width: 2 }
    }
  ]}
  layout={{
    title: 'Distribution of Log(Sale Price)',
    xaxis: { title: 'Log(Sale Price)' },
    yaxis: { showticklabels: false, showgrid: false },
    height: 400,
    margin: isMobile ? { l: 40, r: 20, t: 50, b: 50 } : {},
    legend: { orientation: 'h', x: 0, y: -0.2 }
  }}
  useResizeHandler={true}
  style={{ width: '100%' }}
  config={{ responsive: true }}
/>

      {/* Neighborhood Tiers */}
      <h3 style={{ marginTop: '40px' }}>Neighborhood Tiers — Classified by K-Means</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Rather than manually drawing arbitrary price boundaries between neighborhoods, 
        we used K-Means clustering to classify them objectively into four tiers based 
        on median sale price. This is a more rigorous approach — the algorithm finds 
        natural groupings in the data rather than relying on subjective judgment. 
        Budget neighborhoods have a median around $110k, while Luxury neighborhoods 
        exceed $300k. These tiers became a feature in our regression model.
      </p>
      <Plot
        data={[{
          type: 'bar',
          x: neighborhoodTiers.map(d => d.tier),
          y: neighborhoodTiers.map(d => d.median_price),
          marker: { color: neighborhoodTiers.map(d => tierColors[d.tier] || COLOR) },
          text: neighborhoodTiers.map(d => `$${d.median_price.toLocaleString()}`),
          textposition: 'outside',
          textfont: { size: 13 }
        }]}
        layout={{
          title: 'Median Sale Price by Neighborhood Tier',
          xaxis: { title: '' },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          margin: isMobile ? { l: 40, r: 20, t: 50, b: 50 } : {}
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Quality vs Price */}
      <h3 style={{ marginTop: '40px' }}>Overall Quality vs Sale Price</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Overall quality rating is the single strongest predictor in our dataset — 
        with a Pearson correlation of 0.81 with log sale price. The relationship 
        is remarkably consistent: each additional quality point adds roughly 25% 
        to the sale price. A house rated 9/10 sells for more than double the price 
        of one rated 5/10. This variable alone explains 66% of price variation.
      </p>
      <Plot
        data={[{
          type: 'bar',
          x: qualityVsPrice.map(d => d.quality),
          y: qualityVsPrice.map(d => d.median_price),
          marker: { color: COLOR },
          text: qualityVsPrice.map(d => `$${d.median_price.toLocaleString()}`),
          textposition: 'outside',
          textfont: { size: 12 }
        }]}
        layout={{
          title: 'Median Sale Price by Overall Quality Rating',
          xaxis: { title: 'Overall Quality (1–10)', dtick: 1 },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          margin: isMobile ? { l: 40, r: 20, t: 50, b: 50 } : {}
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Living Area vs Price */}
<h3 style={{ marginTop: '40px' }}>Living Area vs Sale Price</h3>
<p style={{ color: '#666', lineHeight: '1.8' }}>
  Size matters — but location matters more. Each point below represents one house 
  sale. While there is a clear positive relationship between living area and price, 
  the color reveals something more interesting: at any given size, Luxury neighborhood 
  houses (orange) consistently sell for more than Budget ones (red). A 1,500 sq ft 
  house in a Luxury neighborhood can sell for the same price as a 2,500 sq ft house 
  in a Budget one. Location explains much of the price variation that size alone cannot.
  Notice also that the spread of prices widens as houses get larger — smaller homes 
  cluster tightly around the trend line, while large expensive homes show much more 
  variance. This is called heteroscedasticity, and it is one of the reasons we model 
  log(price) rather than raw price.
</p>
<Plot
  data={[
    ...['Budget', 'Mid-Range', 'Premium', 'Luxury'].map(tier => ({
      type: 'scatter',
      mode: 'markers',
      name: tier,
      x: livingAreaVsPrice.filter(d => d.neighborhood_tier === tier).map(d => d.living_area),
      y: livingAreaVsPrice.filter(d => d.neighborhood_tier === tier).map(d => d.sale_price),
      marker: { color: tierColors[tier], opacity: 0.5, size: 6 }
    })),
    {
  type: 'scatter',
  mode: 'lines',
  name: 'Trend',
  showlegend: true,
  x: (() => {
    const xs = livingAreaVsPrice.map(d => d.living_area);
    return [Math.min(...xs), Math.max(...xs)];
  })(),
  y: (() => {
    const xs = livingAreaVsPrice.map(d => d.living_area);
    const ys = livingAreaVsPrice.map(d => d.sale_price);

    const n = xs.length;
    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;

    const slope =
      xs.reduce((acc, x, i) => acc + (x - meanX) * (ys[i] - meanY), 0) /
      xs.reduce((acc, x) => acc + Math.pow(x - meanX, 2), 0);

    const intercept = meanY - slope * meanX;

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);

    return [minX * slope + intercept, maxX * slope + intercept];
  })(),
  line: { color: 'black', width: 2, dash: 'dash' }
}
  ]}
  layout={{
    title: 'Sale Price vs Living Area — Colored by Neighborhood Tier',
    xaxis: { title: 'Above Ground Living Area (sq ft)' },
    yaxis: { title: 'Sale Price ($)', showgrid: false },
    height: 450,
    margin: isMobile ? { l: 60, r: 20, t: 50, b: 50 } : {},
    legend: {
      orientation: isMobile ? 'h' : 'v',
      x: isMobile ? 0 : 1,
      y: isMobile ? -0.3 : 1
    }
  }}
  useResizeHandler={true}
  style={{ width: '100%' }}
  config={{ responsive: true }}
/>

      {/* Year Built vs Price */}
      <h3 style={{ marginTop: '40px' }}>Year Built vs Sale Price</h3>
     <p style={{ color: '#666', lineHeight: '1.8' }}>
    Newer houses tend to sell for more — but the relationship is not perfectly linear. 
    Older houses built before 1950 show tighter price clustering — most sold in a narrow 
    range regardless of other features, reflecting a market where age itself caps value. 
    Newer construction shows the opposite pattern: prices spread widely, meaning a 2005 
    house can sell anywhere from $150k to $400k+ depending on size, quality and location. 
    This increasing variance with price is another manifestation of the same heteroscedasticity
    we observed in the living area chart — further confirming that log(sale_price) is the right modeling choice.
    </p>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'markers',
          x: yearBuiltVsPrice.map(d => d.effective_year),
          y: yearBuiltVsPrice.map(d => d.sale_price),
          marker: { color: COLOR, opacity: 0.4, size: 5 }
        }]}
        layout={{
          title: 'Sale Price vs Year Built (or Last Renovated)',
          xaxis: { title: 'Effective Year (Built or Remodeled)' },
          yaxis: { title: 'Sale Price ($)', showgrid: false },
          height: 400,
          margin: isMobile ? { l: 60, r: 20, t: 50, b: 50 } : {}
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Feature Engineering */}
      <h2 id="feature-engineering" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Feature Engineering
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        Raw variables rarely enter a model as-is. We made four deliberate engineering 
        decisions to make the data more useful for regression:
      </p>
      {[
        {
          title: 'Log transformation of sale price',
          desc: 'The target variable is right-skewed. Taking log(sale_price) produces a near-normal distribution and makes the regression assumptions hold. All model outputs are converted back to dollars via exp().'
        },
        {
          title: 'Effective year — built or remodeled',
          desc: 'A house built in 1960 but fully renovated in 2015 should be treated differently from one that has never been touched. effective_year = max(year_built, year_remodeled) captures this.'
        },
        {
          title: 'Ordinal encoding of quality variables',
          desc: 'Categorical quality ratings (Ex/Gd/TA/Fa/Po) were converted to numeric scores (5/4/3/2/1) to preserve their natural ordering. A model can then learn that Excellent is better than Good by a consistent margin.'
        },
        {
          title: 'Neighborhood tier from K-Means',
          desc: 'Instead of including 28 individual neighborhood dummy variables, we used K-Means to group them into 4 tiers. This reduces dimensionality and produces a more interpretable feature.'
        }
      ].map((item, i) => (
        <div key={i} style={{
          padding: '20px 24px',
          marginBottom: '16px',
          borderRadius: '8px',
          border: `1px solid #e2e8f0`,
          borderLeft: `4px solid ${COLOR}`,
          backgroundColor: '#fafafa'
        }}>
          <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>{item.title}</div>
          <div style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>{item.desc}</div>
        </div>
      ))}

      {/* Modeling */}
      <h2 id="modeling" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Modeling
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        We built four models in sequence — each one adding complexity and rigor. 
        The goal was not just to find the best model, but to understand what each 
        step added and why.
      </p>

      {/* Model Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Model</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Variables</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>R²</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>RMSE</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {modelComparison.map((row, i) => (
              <tr key={i} style={{
                backgroundColor: row.model === 'Lasso' ? '#fff8f0' : i % 2 === 0 ? 'white' : '#fafafa',
                fontWeight: row.model === 'Lasso' ? 'bold' : 'normal'
              }}>
                <td style={{ padding: '12px', border: '1px solid #ddd', color: row.model === 'Lasso' ? COLOR : 'inherit' }}>
                  {row.model === 'Lasso' ? '🏆 ' : ''}{row.model}
                </td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.variables}</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>
                  {row.r2 !== null ? row.r2.toFixed(2) : '—'}
                </td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.rmse.toFixed(4)}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd', color: '#666' }}>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Correlations Chart */}
      <h3 style={{ marginTop: '40px' }}>Top 15 Features by Correlation with Sale Price</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        Before building the full model, we computed the Pearson correlation between every 
        numeric feature and log sale price. This gives us an early ranking of which variables 
        are most linearly related to price. Overall quality dominates at 0.81, followed by 
        living area at 0.73. Features below 0.10 were candidates for removal.
      </p>
      <Plot
        data={[{
          type: 'bar',
          orientation: 'h',
          x: correlation.map(d => d.correlation),
          y: correlation.map(d => d.variable),
          marker: {
            color: correlation.map(d => d.correlation >= 0 ? COLOR : '#fc8181')
          },
          text: correlation.map(d => d.correlation.toFixed(2)),
          textposition: 'outside',
          textfont: { size: 11 }
        }]}
        layout={{
          title: 'Top 15 Feature Correlations with Log Sale Price',
          xaxis: { title: 'Pearson Correlation (r)', range: [-0.1, 1.0] },
          yaxis: { autorange: 'reversed' },
          height: 500,
          margin: isMobile ? { l: 130, r: 60, t: 50, b: 50 } : { l: 150, r: 80, t: 50, b: 50 }
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

{/* Model Validation */}
<h3 style={{ marginTop: '40px' }}>Model Validation — The 4 OLS Assumptions</h3>
<p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
  A regression model is only trustworthy if its residuals (actual price minus predicted price) 
  satisfy four statistical assumptions. We verified each one on the Lasso model after training.
</p>

{[
  {
    condition: '1. Errors are independent',
    test: 'Residuals vs Fitted plot',
    result: '✅ Pass',
    explanation: 'The residuals show no systematic pattern across fitted values — no clusters, no curves. Each prediction error is independent of the others.'
  },
  {
    condition: '2. Errors have a mean of zero',
    test: 'Residuals vs Fitted plot',
    result: '✅ Pass',
    explanation: 'The red line sits flat at 0 across the entire range of predictions. The model is not systematically over- or under-estimating.'
  },
  {
    condition: '3. Errors have constant variance (homoscedasticity)',
    test: 'Scale-Location plot',
    result: '✅ Pass',
    explanation: 'The spread of residuals is consistent from low to high fitted values — no funnel shape. The model is equally accurate across cheap and expensive houses.'
  },
  {
    condition: '4. Errors are normally distributed',
    test: 'Q-Q plot + residuals histogram',
    result: '✅ Pass',
    explanation: 'Residuals follow the diagonal line closely across the full range, and the histogram is symmetric and bell-shaped centered at zero. The log transformation of sale price was key to achieving this.'
  }
].map((item, i) => (
  <div key={i} style={{
    display: 'flex',
    gap: '16px',
    padding: '20px 24px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    borderLeft: `4px solid ${COLOR}`,
    backgroundColor: '#fafafa',
    alignItems: 'flex-start'
  }}>
    <div style={{ minWidth: '40px', fontSize: '1.3rem' }}>✅</div>
    <div>
      <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>{item.condition}</div>
      <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '6px' }}>Tested via: {item.test}</div>
      <div style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>{item.explanation}</div>
    </div>
  </div>
))}
      {/* Price Estimator */}
      <h2 id="estimator" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Price Estimator
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
        The Lasso model is live. Adjust the house characteristics below and get an 
        instant price estimate — the same way an appraiser would weigh location, 
        size, quality and condition to arrive at fair market value.
      </p>

      <div style={{
        backgroundColor: '#f8f9fa',
        border: `2px solid ${COLOR}`,
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Overall Quality (1–10)', key: 'overall_qual', type: 'range', min: 1, max: 10, step: 1 },
            { label: 'Overall Condition (1–10)', key: 'overall_cond', type: 'range', min: 1, max: 10, step: 1 },
            { label: 'Effective Year (Built or Remodeled)', key: 'effective_year', type: 'range', min: 1900, max: 2010, step: 1 },
            { label: '1st Floor Area (sq ft)', key: 'x1st_flr_sf', type: 'range', min: 300, max: 3000, step: 50 },
            { label: '2nd Floor Area (sq ft)', key: 'x2nd_flr_sf', type: 'range', min: 0, max: 2000, step: 50 },
            { label: 'Garage Capacity (cars)', key: 'garage_cars', type: 'range', min: 0, max: 4, step: 1 },
            { label: 'Full Bathrooms', key: 'full_bath', type: 'range', min: 0, max: 4, step: 1 },
          ].map(field => (
            <div key={field.key}>
              <label style={{ fontSize: '0.9rem', color: '#555', display: 'block', marginBottom: '6px' }}>
                {field.label}: <strong style={{ color: COLOR }}>{inputs[field.key].toLocaleString()}</strong>
              </label>
              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={inputs[field.key]}
                onChange={e => setInputs({ ...inputs, [field.key]: Number(e.target.value) })}
                style={{ width: '100%', accentColor: COLOR }}
              />
            </div>
          ))}

          <div>
            <label style={{ fontSize: '0.9rem', color: '#555', display: 'block', marginBottom: '6px' }}>
              Neighborhood Tier
            </label>
            <select
              value={inputs.neighborhood_tier}
              onChange={e => setInputs({ ...inputs, neighborhood_tier: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid #e2e8f0`,
                fontSize: '1rem'
              }}
            >
              {['Budget', 'Mid-Range', 'Premium', 'Luxury'].map(tier => (
                <option key={tier} value={tier}>{tier}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={predicting}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: predicting ? '#ccc' : COLOR,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: predicting ? 'default' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {predicting ? 'Estimating...' : '🏠 Estimate Fair Market Value'}
        </button>

        {prediction !== null && (
          <div style={{
            marginTop: '24px',
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: `2px solid ${COLOR}`,
            textAlign: 'center'
          }}>
            <p style={{ color: '#666', marginBottom: '8px', fontSize: '1rem' }}>Estimated Fair Market Value</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: COLOR, margin: 0 }}>
              ${typeof prediction === 'number' ? prediction.toLocaleString() : prediction}
            </p>
            <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '8px' }}>
              Based on Lasso regression model — R² = 0.94, RMSE ≈ 9.7%
            </p>
          </div>
        )}
      </div>

      {/* Business Recommendations */}
      <h2 id="recommendations" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Appraiser Insights
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
        Beyond prediction accuracy, the model tells us something concrete about what 
        drives value in real estate. These insights are actionable — for buyers, sellers, 
        investors and appraisers alike.
      </p>

      {[
        {
          icon: '🏆',
          title: 'Quality Rating is the #1 Value Driver',
          color: COLOR,
          insight: 'Overall quality has a 0.81 correlation with price — stronger than size, location or age. Each quality point adds roughly 25% to the sale price. A house rated 8/10 is worth approximately double one rated 4/10, even at the same size and location.',
          action: 'For sellers: invest in quality upgrades before listing. Kitchen and exterior quality have the highest impact per dollar spent.'
        },
        {
          icon: '📍',
          title: 'Location Multiplies Everything Else',
          color: '#4299e1',
          insight: 'Neighborhood tier explains price variation that size alone cannot. A 1,500 sq ft house in a Luxury neighborhood can match the price of a 2,500 sq ft house in a Budget area. The model captures this through neighborhood tier coefficients.',
          action: 'For buyers: the best value is often found in Premium neighborhoods, where prices are high but not yet at Luxury premiums. Mid-Range neighborhoods with improving infrastructure are worth watching.'
        },
        {
          icon: '📅',
          title: 'Recency of Construction or Renovation Matters',
          color: '#48bb78',
          insight: 'Effective year (built or last remodeled) has a correlation of 0.55 with price. Modern layouts, updated systems and energy efficiency are real price drivers — not just aesthetics. A 1980 house renovated in 2015 commands prices closer to new construction.',
          action: 'For investors: targeted renovation of older properties in good neighborhoods is often the highest-ROI strategy. Focus on kitchens, bathrooms and energy systems.'
        },
        {
          icon: '📐',
          title: 'Size Has Diminishing Returns',
          color: '#fc8181',
          insight: 'First and second floor square footage both have strong correlations (~0.62-0.73), but the relationship is not linear. Adding 500 sq ft to a 1,000 sq ft house adds more value than adding 500 sq ft to a 3,000 sq ft one. The model captures this through the log transformation.',
          action: 'For developers: smaller, high-quality homes in good locations often outperform large homes in average locations on a price-per-square-foot basis.'
        }
      ].map((item, i) => (
        <div key={i} style={{
          border: `2px solid ${item.color}`,
          borderRadius: '8px',
          padding: '28px',
          marginBottom: '24px',
          backgroundColor: '#fafafa'
        }}>
          <h3 style={{ color: item.color, fontSize: '1.3rem', marginBottom: '16px' }}>
            {item.icon} {item.title}
          </h3>
          <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '12px' }}>{item.insight}</p>
          <div style={{
            backgroundColor: 'white',
            border: `1px solid ${item.color}`,
            borderRadius: '6px',
            padding: '12px 16px',
            color: '#555',
            fontSize: '0.95rem',
            fontStyle: 'italic'
          }}>
            💡 {item.action}
          </div>
        </div>
      ))}

    </div>
  );
}

export default HousePrice;