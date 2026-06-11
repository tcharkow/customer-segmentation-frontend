import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import SegmentGame from './SegmentGame';

const API = 'https://customer-segmentation-api-olf6.onrender.com';

function App() {
  const [cleaningSummary, setCleaningSummary] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [cumulativeRevenue, setCumulativeRevenue] = useState([]);
  const [segmentSummary, setSegmentSummary] = useState([]);
  const [segments, setSegments] = useState([]);
  const [elbowData, setElbowData] = useState([]);
  const [clusterProfiles, setClusterProfiles] = useState([]);
  const isMobile = window.innerWidth < 768;
  const [apiReady, setApiReady] = useState(false);
  const [showGame, setShowGame] = useState(false);


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
      
    fetch(`${API}/api/country-distribution`).then(r => r.json()).then(setCountryData);
    fetch(`${API}/api/monthly-revenue`).then(r => r.json()).then(setMonthlyRevenue);
    fetch(`${API}/api/revenue-distribution`).then(r => r.json()).then(setRevenueData);
    fetch(`${API}/api/cumulative-revenue`).then(r => r.json()).then(setCumulativeRevenue);
    fetch(`${API}/api/segment-summary`).then(r => r.json()).then(setSegmentSummary);
    fetch(`${API}/api/segments`).then(r => r.json()).then(setSegments);
    fetch(`${API}/api/elbow-method`).then(r => r.json()).then(setElbowData);
    fetch(`${API}/api/cluster-profiles`).then(r => r.json()).then(setClusterProfiles);

  }, []);

      if (showGame && !apiReady) {
  return <SegmentGame apiReady={apiReady} />;
}
  return (

    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '20px 12px' : '20px 20px', fontFamily: 'sans-serif', scrollBehavior: 'smooth', animation: 'fadeIn 0.1s ease' }}>
      
      {/* Title */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
        Understanding Customer Behavior: A Segmentation Case Study
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '20px' }}>
        This project analyzes a real transactional dataset from a UK-based non-store online 
        retailer, covering all transactions between December 1st 2010 and December 9th 2011. 
        The retailer specializes in unique all-occasion gifts, with a customer base consisting 
        largely of wholesalers — businesses buying in bulk to resell.
      </p>
      <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '20px' }}>
        The dataset contains 541,909 transactions across 8 variables. Our goal is to move 
        beyond aggregate sales numbers and understand <strong>who the customers actually are</strong> — 
        identifying distinct behavioral segments that a business can act on differently.
      </p>

      {/* Interactive Table of Contents */}
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
          { id: 'descriptive-analysis', label: '2. Explore distributions and patterns through descriptive statistics' },
          { id: 'segmentation', label: '3. Build customer profiles and identify natural segments using RFM and K-Means clustering' },
          { id: 'recommendations', label: '4. Translate findings into actionable business recommendations' },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '10px 16px',
              marginBottom: '8px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#4299e1',
              fontSize: '1rem',
              transition: 'background-color 0.2s',
              borderLeft: '3px solid #4299e1'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ebf8ff'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {item.label}
          </div>
        ))}
      </div>

      <p style={{ color: '#666', fontSize: '1rem', marginBottom: '10px' }}>
  Source: <a href="https://archive.ics.uci.edu/dataset/352/online+retail" target="_blank" rel="noreferrer">UCI Machine Learning Repository — Online Retail Dataset</a>
</p>
<p style={{ color: '#666', fontSize: '1rem', marginBottom: '40px' }}>
  Download: <a href="https://archive.ics.uci.edu/static/public/352/online+retail.zip" target="_blank" rel="noreferrer">online+retail.zip</a>
</p>
{/* Tech Stack */}
      <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Tech Stack
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
        This project was built end-to-end using the following tools — from raw data analysis 
        to a deployed interactive web application.
      </p>

      {/* Tool Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
        gap: '16px', 
        marginBottom: '40px' 
      }}>
        {[
          { name: 'Python', role: 'Data analysis & ML', color: '#3776ab', emoji: '🐍' },
          { name: 'Pandas', role: 'Data cleaning & feature engineering', color: '#150458', emoji: '🐼' },
          { name: 'Scikit-learn', role: 'K-Means clustering & standardization', color: '#f89939', emoji: '🤖' },
          { name: 'Plotly', role: 'Interactive visualizations', color: '#3f4f75', emoji: '📊' },
          { name: 'FastAPI', role: 'Backend REST API', color: '#009688', emoji: '⚡' },
          { name: 'React', role: 'Frontend dashboard', color: '#61dafb', emoji: '⚛️' },
          { name: 'Render', role: 'Backend deployment', color: '#46e3b7', emoji: '🚀' },
          { name: 'Vercel', role: 'Frontend deployment', color: '#000000', emoji: '▲' },
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

      {/* Architecture Diagram */}
      <h3 style={{ marginTop: '40px' }}>How It All Connects</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        The project follows a modern data application architecture — raw data is analyzed 
        in Python, served via a REST API, and displayed in an interactive web application.
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
          { label: 'UCI Dataset', sublabel: 'Raw Excel file', color: '#718096' },
          { label: '→', sublabel: '', color: '#cbd5e0', arrow: true },
          { label: 'Python & Pandas', sublabel: 'Clean & analyze', color: '#3776ab' },
          { label: '→', sublabel: '', color: '#cbd5e0', arrow: true },
          { label: 'Scikit-learn', sublabel: 'K-Means clustering', color: '#f89939' },
          { label: '→', sublabel: '', color: '#cbd5e0', arrow: true },
          { label: 'FastAPI', sublabel: 'REST API on Render', color: '#009688' },
          { label: '→', sublabel: '', color: '#cbd5e0', arrow: true },
          { label: 'React', sublabel: 'Dashboard on Vercel', color: '#61dafb' },
        ].map((item, i) => (
          item.arrow ? (
            <div key={i} style={{ 
              fontSize: isMobile ? '1.5rem' : '1.5rem', 
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

      {/* Section 2 - Data Cleaning */}
     <h2 id="data-cleaning" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Data Cleaning
      </h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Before any analysis, we made four deliberate cleaning decisions to ensure 
        the data was trustworthy.
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
{/* Section 3 - Descriptive Analysis */}
      <h2 id="descriptive-analysis" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Descriptive Analysis
      </h2>

      {/* Country Distribution */}
      <h3 style={{ marginTop: '30px' }}>Customer Distribution by Country</h3>
      <p style={{ color: '#666' }}>
        Understanding where customers come from helps us assess whether our segmentation 
        should account for geography. The UK dominates with 3,920 unique customers — 42x 
        more than Germany in second place. This tells us the business is primarily a domestic 
        UK retailer with limited international reach. For segmentation purposes, we kept all 
        customers together rather than splitting by country, since purchasing behavior 
        (not location) is what drives segment value.
      </p>
      <Plot
        data={[{
          type: 'bar',
          x: countryData.map(d => d.Country),
          y: countryData.map(d => d.Customers),
          marker: { color: '#4299e1' }
        }]}
        layout={{
          title: 'Top 10 Countries by Number of Customers',
          xaxis: { title: 'Country' },
          yaxis: { title: 'Unique Customers' },
          height: 400,
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Monthly Revenue */}
      <h3 style={{ marginTop: '40px' }}>Monthly Revenue Over Time</h3>
      <p style={{ color: '#666' }}>
        Before drawing conclusions from this chart, we verified the completeness of each 
        month. December 2011 was excluded because the dataset ends on December 9th — 
        including it would make December appear artificially low, which would be misleading. 
        The remaining months reveal a clear seasonal pattern: revenue is relatively flat in 
        Q1 and Q2, then accelerates sharply from August through November. This is consistent 
        with a wholesale retailer whose customers — likely small retail shops — stock up 
        inventory ahead of the Christmas shopping season. Note that with only one year of 
        complete data, we can identify seasonality but cannot confirm a year-over-year 
        growth trend.
      </p>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'lines+markers',
          x: monthlyRevenue.map(d => d.YearMonth),
          y: monthlyRevenue.map(d => d.Revenue),
          marker: { color: '#48bb78' },
          line: { color: '#48bb78' }
        }]}
        layout={{
          title: 'Monthly Revenue (£)',
          xaxis: { title: 'Month' },
          yaxis: { title: 'Revenue (£)' , showgrid: false},
          height: 400,
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />
{/* Revenue Distribution Histogram */}
      <h3 style={{ marginTop: '40px' }}>Distribution of Customer Revenue</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        This histogram shows how total spend is distributed across our 4,338 customers. 
        The vast majority spent under £2,000 — a classic right-skewed distribution. 
        A small number of high-spending customers stretch the tail to the right. 
        We filter to under £10,000 here to see where most customers actually sit — 
        the extreme outliers (including one customer who spent £280,000) would otherwise 
        compress everyone else into an unreadable sliver on the left.
      </p>
      <Plot
        data={[{
          type: 'histogram',
          x: revenueData.map(d => d.TotalRevenue),
          nbinsx: 100,
          marker: { color: '#4299e1' },
          name: 'Customers'
        }]}
        layout={{
          title: 'How much do customers spend in total? (under £10,000)',
          xaxis: { title: 'Total Revenue (£)' },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      
      {/* Cumulative Revenue */}
      <h3 style={{ marginTop: '40px' }}>Cumulative Revenue by Customer</h3>
      <p style={{ color: '#666' }}>
        A common assumption in retail is the Pareto principle — that 20% of customers 
        generate 80% of revenue. Rather than assuming this, we verified it mathematically 
        using a Lorenz curve. The red dashed line represents perfect equality, where every 
        customer spends exactly the same amount. The further the blue curve bends away from 
        that line, the more concentrated the revenue is. In our dataset, the top 20% of 
        customers generate 74.6% of total revenue — close to but not exactly the classic 
        80/20 rule. This concentration is precisely why customer segmentation is valuable: 
        treating all customers identically ignores the enormous difference in value between 
        your top spenders and occasional buyers.
      </p>
      <Plot
        data={[
          {
            type: 'scatter',
            mode: 'lines',
            x: cumulativeRevenue.map(d => d.CumulativeCustomerPct),
            y: cumulativeRevenue.map(d => d.CumulativeRevenuePct),
            name: 'Actual',
            line: { color: '#4299e1' }
          },
          {
            type: 'scatter',
            mode: 'lines',
            x: [0, 100],
            y: [0, 100],
            name: 'Perfect Equality',
            line: { color: 'red', dash: 'dash' }
          }
        ]}
        layout={{
  title: 'Cumulative Revenue Curve (Lorenz Curve)',
  xaxis: { title: 'Cumulative % of Customers' },
  yaxis: { title: 'Cumulative % of Revenue', showgrid: false},
  height: 400,
  margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
  legend: {
    orientation: isMobile ? 'h' : 'v',
    x: isMobile ? 0 : 1,
    y: isMobile ? -0.2 : 1
  }
}}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Section 4 - Customer Segmentation */}
      <h2 id="segmentation" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Customer Segmentation
      </h2>

      {/* RFM Explanation */}
      <h3 style={{ marginTop: '30px' }}>Step 1 — Building Customer Profiles with RFM</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Rather than segmenting customers by demographics or location, we segment them by 
        <strong> behavior</strong>. RFM analysis distills each customer's entire purchase 
        history into three numbers:
      </p>
      <ul style={{ color: '#666', lineHeight: '2.2', fontSize: '1rem' }}>
        <li><strong>Recency (R)</strong> — Days since their last purchase. A customer who 
        bought last week is more engaged than one who bought a year ago, even if they spent 
        the same total amount.</li>
        <li><strong>Frequency (F)</strong> — Number of separate orders placed. Repeat purchases 
        signal loyalty and habit — far more valuable than a single large order.</li>
        <li><strong>Monetary (M)</strong> — Total spend across all orders. This captures the 
        direct revenue value each customer has generated.</li>
      </ul>

      {/* Log + Standardization Explanation */}
      <h3 style={{ marginTop: '40px' }}>Step 2 — Preparing the Data for K-Means</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        K-Means clustering works by measuring distances between customers in RFM space. 
        This creates two problems with raw data that we must address before modeling:
      </p>
      <ul style={{ color: '#666', lineHeight: '2.2' }}>
        <li><strong>Skewed distributions</strong> — Most customers cluster at low values, 
        but a few extreme outliers (one customer spent £280,000) would distort the entire 
        model. We applied a <strong>log transformation</strong> to compress these extremes 
        without losing the differences between customers.</li>
        <li><strong>Different scales</strong> — Recency is measured in days (0–300), 
        Frequency in orders (1–209), and Monetary in pounds (£3–£280,000). If we used 
        raw numbers, Monetary would completely dominate the clustering simply because its 
        values are larger. We applied <strong>standardization</strong> to put all three 
        metrics on the same scale — each with a mean of 0 and standard deviation of 1.</li>
      </ul>

      {/* Elbow Method */}
      <h3 style={{ marginTop: '40px' }}>Step 3 — Choosing the Right Number of Clusters</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        K-Means requires us to specify the number of clusters upfront. We used the 
        <strong> Elbow Method</strong> — running K-Means for K=1 through K=10 and measuring 
        inertia (total distance of every customer from their cluster center) at each step. 
        The key drops: K=2 reduces inertia by 50.2%, K=3 by a further 24.9%, K=4 by 19.1%. 
        After K=4 improvements slow below 17% — diminishing returns begin. We selected 
        <strong> K=4</strong> as the sweet spot between fit and interpretability. 
        The red line marks our selection.
      </p>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'lines+markers',
          x: elbowData.map(d => d.k),
          y: elbowData.map(d => d.inertia),
          marker: { color: '#4299e1' },
          line: { color: '#4299e1' }
        }]}
        layout={{
          title: 'Elbow Method — How We Chose K=4',
          xaxis: { title: 'Number of Clusters (K)', dtick: 1 ,showgrid: false},
          yaxis: { showticklabels: false , showgrid: false},
          height: 400,
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
          shapes: [{
            type: 'line',
            x0: 4, x1: 4,
            y0: 0, y1: 14000,
            line: { color: 'red', dash: 'dash' }
          }],
          annotations: [{
            x: 4.1,
            y: 13000,
            text: 'K=4 selected',
            showarrow: false,
            xanchor: 'left',
            font: { color: 'red' }
          }]
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Cluster Profiles Table */}
      <h3 style={{ marginTop: '40px' }}>Step 4 — What the Algorithm Found</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        After running K-Means with K=4, each customer was assigned to one of four clusters. 
        The table below shows the average RFM values per cluster — notice how distinctly 
        different each group is, confirming that K-Means found real structure in the data.
      </p>
      <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Cluster</th>
            <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Customers</th>
            <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Avg Recency (days)</th>
            <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Avg Frequency (orders)</th>
            <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Avg Spend (£)</th>
          </tr>
        </thead>
        <tbody>
          {clusterProfiles.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>Cluster {row.Cluster}</td>
              <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.Customers.toLocaleString()}</td>
              <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.Avg_Recency}</td>
              <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.Avg_Frequency}</td>
              <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>£{row.Avg_Monetary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

      {/* Naming the Clusters */}
      <h3 style={{ marginTop: '40px' }}>Step 5 — Naming the Segments</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        Raw cluster numbers are meaningless without interpretation. By reading the RFM profiles 
        above, we assigned each cluster a business-meaningful name:
      </p>
      <ul style={{ color: '#666', lineHeight: '2.2' }}>
        <li><strong>Cluster 0 → Recent Light Buyers</strong> — Low recency (18 days) means 
        they bought recently, but low frequency (2 orders) and modest spend (£552) suggest 
        they are new or occasional customers not yet converted to loyalty.</li>
        <li><strong>Cluster 1 → Champions</strong> — The best customers. Most recent purchases 
        (12 days), highest frequency (13.7 orders), highest spend (£8,074). These are loyal, 
        engaged, high-value customers.</li>
        <li><strong>Cluster 2 → At Risk</strong> — Decent frequency (4 orders) and spend 
        (£1,803) but recency of 71 days signals they are drifting away. These customers 
        used to engage but are becoming inactive — prime candidates for win-back campaigns.</li>
        <li><strong>Cluster 3 → Lost/Inactive</strong> — The largest group (1,612 customers). 
        High recency (183 days), very low frequency (1.3 orders), lowest spend (£344). 
        These are one-time or very occasional buyers who have gone quiet.</li>
      </ul>

      {/* Segment Cards */}
      <h3 style={{ marginTop: '40px' }}>Segment Profiles</h3>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {segmentSummary.map((seg, i) => {
          const colors = {
            'Champions': '#48bb78',
            'At Risk': '#ed8936',
            'Recent Light Buyers': '#4299e1',
            'Lost/Inactive': '#fc8181'
          };
          return (
            <div key={i} style={{
              padding: '24px',
              borderRadius: '8px',
              border: `2px solid ${colors[seg.Segment] || '#ddd'}`,
              backgroundColor: '#fafafa'
            }}>
              <h4 style={{ color: colors[seg.Segment], fontSize: '1.2rem', marginBottom: '12px' }}>
                {seg.Segment}
              </h4>
              <p style={{ margin: '4px 0', color: '#444' }}>👥 {seg.Customers.toLocaleString()} customers</p>
              <p style={{ margin: '4px 0', color: '#444' }}>📅 Last purchase: {seg.Avg_Recency} days ago on average</p>
              <p style={{ margin: '4px 0', color: '#444' }}>🔄 Average orders placed: {seg.Avg_Frequency}</p>
              <p style={{ margin: '4px 0', color: '#444' }}>💰 Average lifetime spend: £{seg.Avg_Monetary.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Bar Charts */}
     <Plot
        data={[{
          type: 'bar',
          x: segmentSummary.map(d => d.Segment),
          y: segmentSummary.map(d => d.Customers),
          marker: { color: ['#ed8936', '#48bb78', '#fc8181', '#4299e1'] },
          text: segmentSummary.map(d => d.Customers.toLocaleString()),
          textposition: 'outside',
          textfont: { size: 14 }
        }]}
        layout={{
          title: { text: 'Customers per segment', font: { size: 20 } },
          xaxis: { title: '', tickfont: { size: 14 } },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

        <Plot
        data={[{
          type: 'bar',
          x: segmentSummary.map(d => d.Segment),
          y: segmentSummary.map(d => d.Avg_Monetary),
          marker: { color: ['#ed8936', '#48bb78', '#fc8181', '#4299e1'] },
          text: segmentSummary.map(d => `£${d.Avg_Monetary.toLocaleString()}`),
          textposition: 'outside',
          textfont: { size: 14 }
        }]}
        layout={{
          title: { text: 'Average lifetime spend per segment', font: { size: 20 } },
          xaxis: { title: '', tickfont: { size: 14 } },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* 3D Scatter Plot */}
      <h3 style={{ marginTop: '40px' }}>Visualizing the Segments in 3D RFM Space</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Each point below represents one customer, plotted across all three RFM dimensions 
        simultaneously. Rotate the chart to explore how naturally the four segments separate — 
        Champions cluster in the low Recency, high Frequency, high Monetary corner, 
        while Lost/Inactive customers occupy the opposite corner. The clean separation 
        confirms that K-Means found genuine structure in the data, not arbitrary divisions.
      </p>
      <Plot
        data={['Champions', 'At Risk', 'Recent Light Buyers', 'Lost/Inactive'].map(segment => {
          const filtered = segments.filter(d => d.Segment === segment);
          const colors = {
            'Champions': '#48bb78',
            'At Risk': '#ed8936',
            'Recent Light Buyers': '#4299e1',
            'Lost/Inactive': '#fc8181'
          };
          return {
            type: 'scatter3d',
            mode: 'markers',
            name: segment,
            x: filtered.map(d => d.Recency),
            y: filtered.map(d => d.Frequency),
            z: filtered.map(d => d.Monetary),
            marker: { size: 7, color: colors[segment], opacity: 0.7 }
          };
        })}
        layout={{
   title: { 
  text: isMobile ? '' : 'Customer Segments in RFM Space — Rotate to Explore', 
  font: { size: 20 }
},

          legend: { 
            font: { size: isMobile ? 10 : 14 },
            orientation: isMobile ? 'h' : 'v',
            x: isMobile ? 0 : 1,
            y: isMobile ? -0.2 : 1
          },
          margin: isMobile ? { l: 0, r: 0, t: 40, b: 100 } : { l: 0, r: 0, t: 60, b: 0 },
          scene: {
  camera: {
    eye: isMobile ? { x: 1.35, y: 1.35, z: 1.35 } : { x: 1.35, y: 1.35, z: 1.35 }
  },
            xaxis: { title: { text: isMobile ? 'Recency' : 'Recency (days since last purchase)', font: { size: 10 } }},
            yaxis: { title: { text: isMobile ? 'Frequency' : 'Frequency (number of orders)', font: { size: 10 } }},
            zaxis: { title: { text: isMobile ? 'Monetary' : 'Monetary (total spend £)', font: { size: 10 } }}
          },
          height: isMobile ? 400 : 650
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />
{/* Section 5 - Business Recommendations */}
      <h2 id="recommendations" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Business Recommendations
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
        Data without action has no value. Based on the four segments identified, here are 
        concrete recommendations a business could implement immediately. Each segment 
        requires a fundamentally different strategy — which is precisely why treating all 
        customers identically leaves revenue on the table.
      </p>

      {[
        {
          segment: 'Champions',
          color: '#48bb78',
          icon: '🏆',
          customers: 716,
          avgSpend: 8074,
          priority: 'High',
          action: 'Reward & Retain',
          recommendations: [
            'Enroll in a VIP loyalty program with exclusive perks and early product access',
            'Request referrals — they love the brand and will bring high-quality new customers',
            'Avoid heavy discounting — they already buy at full price, discounts only hurt margin',
            'Assign a dedicated account manager for top spenders'
          ],
          insight: 'These 716 customers generate a disproportionate share of revenue. Losing even 10% of them would have a significant financial impact.'
        },
        {
          segment: 'At Risk',
          color: '#ed8936',
          icon: '⚠️',
          customers: 1173,
          avgSpend: 1803,
          priority: 'Highest',
          action: 'Win-Back Campaign',
          recommendations: [
            'Launch a targeted win-back email campaign immediately — personalized, not generic',
            'Use messaging that acknowledges the gap: "We haven\'t seen you in a while..."',
            'Offer a time-limited incentive to create urgency',
            'If you recover just 20% of At Risk customers, that is 234 customers × £1,803 = £422,000 in potential recovered revenue'
          ],
          insight: 'This is the highest priority segment. They have demonstrated value but are drifting — every day without action increases the chance they become Lost/Inactive permanently.'
        },
        {
          segment: 'Recent Light Buyers',
          color: '#4299e1',
          icon: '🌱',
          customers: 837,
          avgSpend: 552,
          priority: 'Medium',
          action: 'Nurture to Loyalty',
          recommendations: [
            'Send follow-up emails after their first or second purchase with product recommendations',
            'Offer a small incentive on their next order to encourage a third purchase — habit formation begins here',
            'Educate them about the product range — they may not know the full catalogue',
            'Track which ones are trending toward Champions and prioritize those'
          ],
          insight: 'These customers are engaged but not yet loyal. The goal is to increase their frequency and spend over time — today\'s Recent Light Buyers are tomorrow\'s Champions.'
        },
        {
          segment: 'Lost/Inactive',
          color: '#fc8181',
          icon: '💤',
          customers: 1612,
          avgSpend: 344,
          priority: 'Low',
          action: 'Light Re-engagement',
          recommendations: [
            'Send a single low-cost re-engagement email — "We miss you" with a modest offer',
            'Do not invest heavily — the ROI is low compared to At Risk customers',
            'Accept that a significant portion of this group will not return',
            'Use this segment to inform acquisition strategy — avoid acquiring customers with similar profiles'
          ],
          insight: 'The largest segment but the lowest priority. Focus resources on At Risk and Recent Light Buyers first — the potential return is far higher.'
        }
      ].map((seg, i) => (
        <div key={i} style={{
          border: `2px solid ${seg.color}`,
          borderRadius: '8px',
          padding: '28px',
          marginBottom: '24px',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: seg.color, fontSize: '1.4rem', margin: 0 }}>
              {seg.icon} {seg.segment}
            </h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ backgroundColor: seg.color, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
                Priority: {seg.priority}
              </span>
              <span style={{ backgroundColor: '#eee', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', color: '#444' }}>
                {seg.action}
              </span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            <p style={{ margin: 0, color: '#444' }}>👥 {seg.customers.toLocaleString()} customers</p>
            <p style={{ margin: 0, color: '#444' }}>💰 Avg spend: £{seg.avgSpend.toLocaleString()}</p>
          </div>
          <ul style={{ color: '#555', lineHeight: '2', marginBottom: '16px' }}>
            {seg.recommendations.map((rec, j) => (
              <li key={j}>{rec}</li>
            ))}
          </ul>
          <div style={{
            backgroundColor: 'white',
            border: `1px solid ${seg.color}`,
            borderRadius: '6px',
            padding: '12px 16px',
            color: '#555',
            fontSize: '0.95rem',
            fontStyle: 'italic'
          }}>
            💡 {seg.insight}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;