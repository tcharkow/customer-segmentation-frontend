import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import TrendGame from './TrendGame';

const API = 'https://time-series-api-59ti.onrender.com';

function TimeSeries() {
  const [hourlyPattern, setHourlyPattern] = useState([]);
  const [hourlySplit, setHourlySplit] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [submeter, setSubmeter] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [seasonAccuracy, setSeasonAccuracy] = useState([]);
  const [apiReady, setApiReady] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show game if API takes more than 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!apiReady) setShowGame(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [apiReady]);

  // Fetch all data
  useEffect(() => {
    fetch(`${API}/api/hourly-pattern`)
      .then(r => r.json())
      .then(data => {
        setHourlyPattern(data);
        setApiReady(true);
        setShowGame(false);
      });
    fetch(`${API}/api/hourly-split`).then(r => r.json()).then(setHourlySplit);
    fetch(`${API}/api/daily-consumption`).then(r => r.json()).then(setDailyData);
    fetch(`${API}/api/monthly-consumption`).then(r => r.json()).then(setMonthlyData);
    fetch(`${API}/api/day-of-week`).then(r => r.json()).then(setDayOfWeek);
    fetch(`${API}/api/submeter`).then(r => r.json()).then(setSubmeter);
    fetch(`${API}/api/distribution`).then(r => r.json()).then(setDistribution);
    fetch(`${API}/api/forecast`).then(r => r.json()).then(setForecast);
    fetch(`${API}/api/season-accuracy`).then(r => r.json()).then(setSeasonAccuracy);
  }, []);

  if (showGame && !apiReady) {
    return <TrendGame apiReady={apiReady} />;
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '20px 12px' : '30px 20px',
      fontFamily: 'sans-serif',
      animation: 'fadeIn 0.3s ease'
    }}>

      {/* Title */}
      <h1 style={{ fontSize: isMobile ? '1.5rem' : '2.5rem', marginBottom: '10px' }}>
        Time Series Forecasting — Household Electricity Consumption
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
        Analyzing 4 years of minute-level electricity consumption data from a single French 
        household (2006–2010) to identify behavioral patterns and forecast future consumption 
        using Facebook's Prophet forecasting model.
      </p>
      <p style={{ color: '#666', fontSize: '1rem', marginBottom: '10px' }}>
        Source: <a href="https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption" target="_blank" rel="noreferrer">UCI Machine Learning Repository — Individual Household Electric Power Consumption</a>
      </p>
      <p style={{ color: '#666', fontSize: '1rem', marginBottom: '40px' }}>
        Download: <a href="https://archive.ics.uci.edu/static/public/235/individual+household+electric+power+consumption.zip" target="_blank" rel="noreferrer">household_power_consumption.zip</a>
      </p>

      {/* Table of Contents */}
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '40px'
      }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '16px', color: '#333' }}>
          Analysis pipeline — click any section to jump there:
        </p>
        {[
          { id: 'descriptive', label: '1. Descriptive Analysis — patterns at hourly, daily and monthly level' },
          { id: 'forecasting', label: '2. Prophet Forecasting — 12 month forecast with confidence intervals' },
          { id: 'accuracy', label: '3. Model Accuracy — performance by season' },
          { id: 'recommendations', label: '4. Business Recommendations — utility company perspective' },
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
              borderLeft: '3px solid #4299e1'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ebf8ff'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {item.label}
          </div>
        ))}
      </div>

{/* Tech Stack */}
      <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Tech Stack
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
        This project was built end-to-end — from raw minute-level data to a deployed interactive forecast.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
        gap: '16px', 
        marginBottom: '40px' 
      }}>
        {[
          { name: 'Python', role: 'Data analysis & modeling', color: '#3776ab', emoji: '🐍' },
          { name: 'Pandas', role: 'Data cleaning & resampling', color: '#150458', emoji: '🐼' },
          { name: 'Prophet', role: 'Time series forecasting', color: '#4299e1', emoji: '📈' },
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

      {/* Architecture */}
      <h3 style={{ marginTop: '20px' }}>How It All Connects</h3>
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
          { label: 'UCI Dataset', sublabel: '2M+ minute readings', color: '#718096' },
          { label: '→', arrow: true },
          { label: 'Python & Pandas', sublabel: 'Clean & resample', color: '#3776ab' },
          { label: '→', arrow: true },
          { label: 'Prophet', sublabel: 'Forecast model', color: '#4299e1' },
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

      {/* Data Overview */}
      <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '40px' }}>
        Dataset Overview & Cleaning
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        The raw dataset contains 2,075,259 minute-level readings. Unlike many real-world 
        datasets, missing values were minimal and followed a clear pattern — entire blocks 
        of minutes were missing simultaneously, indicating meter disconnections or transmission 
        failures rather than random data loss.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Step</th>
            <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Rows</th>
            <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Removed</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Reason</th>
          </tr>
        </thead>
        <tbody>
          {[
            { step: 'Raw dataset', rows: '2,075,259', removed: '—', reason: '' },
            { step: 'Remove missing values', rows: '2,049,280', removed: '-25,979 (1.25%)', reason: 'Meter disconnections — all columns missing simultaneously' },
            { step: 'Final clean dataset', rows: '2,049,280', removed: '—', reason: '98.75% of data retained' },
          ].map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{row.step}</td>
              <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>{row.rows}</td>
              <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd', color: row.removed.startsWith('-') ? '#e53e3e' : 'inherit' }}>{row.removed}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd', color: '#666' }}>{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '20px' }}>Analysis Levels</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        The 2 million minute-level readings were resampled into three levels of granularity 
        for analysis. Each level reveals different patterns — from daily behavioral cycles 
        to long-term seasonal trends.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '40px'
      }}>
        {[
          { level: 'Hourly', points: '24', description: 'Average consumption per hour of day across all 4 years — reveals the daily behavioral cycle', color: '#4299e1' },
          { level: 'Daily', points: '1,426', description: 'One row per day from January 2007 to November 2010 — used for Prophet forecasting model', color: '#48bb78' },
          { level: 'Monthly', points: '46', description: '48 months total, excluding incomplete December 2006 and November 2010 — reveals seasonal patterns', color: '#ed8936' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '20px',
            borderRadius: '8px',
            border: `2px solid ${item.color}`,
            backgroundColor: '#fafafa',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: item.color, marginBottom: '4px' }}>{item.points}</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>{item.level} data points</div>
            <div style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.6' }}>{item.description}</div>
          </div>
        ))}
      </div>

      {/* Section 1 - Descriptive Analysis */}
      <h2 id="descriptive" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Descriptive Analysis
      </h2>

      {/* Hourly Pattern */}
      <h3 style={{ marginTop: '30px' }}>Average Consumption by Hour of Day</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Aggregating all minute-level readings by hour reveals the household's daily rhythm. 
        Consumption rises sharply from 5am as the household wakes up, peaks at 7am during 
        the morning rush, drops through the day as occupants leave for work and school, 
        then peaks again between 8-9pm during dinner and evening activities before declining 
        overnight. The lowest consumption period is 1-4am when the household is asleep and 
        only passive devices (refrigerator, router, standby appliances) remain active.
      </p>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'lines+markers',
          x: hourlyPattern.map(d => d.Hour),
          y: hourlyPattern.map(d => d.Global_active_power),
          marker: { color: '#4299e1' },
          line: { color: '#4299e1' }
        }]}
        layout={{
          title: 'What does a typical day look like?',
         xaxis: { 
  title: 'Hour of Day', 
  dtick: isMobile ? 4 : 1 
},
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Weekday vs Weekend */}
      <h3 style={{ marginTop: '40px' }}>Weekday vs Weekend Hourly Pattern</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Splitting the hourly pattern by day type reveals a striking difference. On weekdays 
        the midday dip is pronounced — the house empties as adults go to work and children 
        go to school. On weekends consumption stays elevated throughout the day as the 
        household remains occupied. This confirms that the daily pattern we see is a composite 
        of two very different behavioral modes.
      </p>
      <Plot
        data={['Weekday', 'Weekend'].map(dayType => ({
          type: 'scatter',
          mode: 'lines',
          name: dayType,
          x: hourlySplit.filter(d => d.DayType === dayType).map(d => d.Hour),
          y: hourlySplit.filter(d => d.DayType === dayType).map(d => d.Global_active_power),
          line: { color: dayType === 'Weekday' ? '#4299e1' : '#48bb78' }
        }))}
       layout={{
  title: 'How does the daily pattern differ between weekdays and weekends?',
  xaxis: { title: 'Hour of Day', dtick: isMobile ? 4 : 1 },
  yaxis: { showticklabels: false, showgrid: false },
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
      {/* Day of Week */}
      <h3 style={{ marginTop: '40px' }}>Average Consumption by Day of Week</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Saturday and Sunday show the highest average consumption — consistent with full-day 
        household occupancy. Among weekdays, Wednesday shows slightly elevated consumption 
        possibly consistent with the French school system's traditional half-day, though 
        the hourly breakdown does not show a dramatically different pattern from other weekdays. 
        Thursday is the lowest consumption day — a routine workday with no particular 
        behavioral driver to increase demand.
      </p>
      <Plot
        data={[{
          type: 'bar',
          x: dayOfWeek.map(d => d.DayName),
          y: dayOfWeek.map(d => d.Global_active_power),
          marker: { color: '#4299e1' },
          text: dayOfWeek.map(d => d.Global_active_power.toFixed(3)),
          textposition: 'outside'
        }]}
        layout={{
          title: 'Which day of the week uses the most electricity?',
          xaxis: { categoryorder: 'array', categoryarray: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Monthly */}
      <h3 style={{ marginTop: '40px' }}>Monthly Consumption Over Time</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        The monthly view reveals strong seasonal patterns repeating across all 4 years. 
        Consumption peaks in January-February driven by heating demand and short daylight 
        hours, declines steadily through spring and summer, troughs in August — the hottest 
        month with the longest days — then rises sharply through fall as temperatures drop 
        and heating returns. December 2007 stands out as an anomalously high month — 
        data completeness checks confirm this is a genuine event, likely an unusually 
        cold winter combined with holiday season effects. Incomplete months (December 2006 
        and November 2010) are excluded from this view.
      </p>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'lines+markers',
          x: monthlyData.map(d => d.Month),
          y: monthlyData.map(d => d.Global_active_power),
          marker: { color: '#4299e1' },
          line: { color: '#4299e1' }
        }]}
        layout={{
          title: 'How does consumption vary across seasons?',
          xaxis: { title: '' },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />
{/* Daily Consumption */}
      <h3 style={{ marginTop: '40px' }}>Daily Consumption Over 4 Years</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Plotting daily consumption over the full 4-year period shows the seasonal cycles 
        repeating consistently year after year. The day-to-day noise reflects individual 
        behavioral variation — cold snaps, holidays, guests — while the underlying seasonal 
        pattern remains stable. December 2007 stands out as an anomalously high period, 
        confirmed as a genuine event through data completeness checks.
      </p>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'lines',
          x: dailyData.map(d => d.Date),
          y: dailyData.map(d => d.Global_active_power),
          line: { color: '#4299e1', width: 1 },
          name: 'Daily Consumption'
        }]}
        layout={{
          title: 'Daily electricity consumption — 4 years of data',
          xaxis: { title: '' },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Distribution */}
      <h3 style={{ marginTop: '40px' }}>Distribution of Daily Consumption</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        Daily consumption follows an approximately normal distribution centered around 
        1.2-1.5 kW, with a slight right tail driven by extreme winter days. This near-normal 
        distribution — unlike the heavily skewed revenue distributions common in retail data — 
        means we can use Prophet directly on raw values without log transformation.
      </p>
      <Plot
        data={[
          {
            type: 'histogram',
            x: distribution.map(d => d.Global_active_power),
            nbinsx: 50,
            marker: { color: '#4299e1' },
            name: 'Daily Consumption',
            opacity: 0.7
          },
          {
            type: 'scatter',
            mode: 'lines',
            x: (() => {
              const values = distribution.map(d => d.Global_active_power);
              const min = Math.min(...values);
              const max = Math.max(...values);
              return Array.from({length: 100}, (_, i) => min + (max - min) * i / 99);
            })(),
            y: (() => {
              const values = distribution.map(d => d.Global_active_power);
              const mean = values.reduce((a, b) => a + b, 0) / values.length;
              const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
              const min = Math.min(...values);
              const max = Math.max(...values);
              const binWidth = (max - min) / 50;
              return Array.from({length: 100}, (_, i) => {
                const x = min + (max - min) * i / 99;
                return values.length * binWidth * (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
              });
            })(),
            line: { color: 'red', width: 2 },
            name: 'Normal Distribution'
          }
        ]}
       layout={{
          title: 'How is daily consumption distributed?',
          xaxis: { title: 'Daily Avg Power (kW)' },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400,
          legend: {
            orientation: isMobile ? 'h' : 'v',
            x: isMobile ? 0 : 1,
            y: isMobile ? -0.2 : 1
          },
          margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Sub-metering */}
      <h3 style={{ marginTop: '40px' }}>Where Does the Electricity Go?</h3>
      <p style={{ color: '#666', lineHeight: '1.8' }}>
        The dataset includes sub-metering for three specific circuits — kitchen, laundry room, 
        and water heater/AC. Over half of total consumption (51.2%) is unmetered — lights, 
        computers, TVs, phone chargers, and other devices throughout the house. The water 
        heater and air conditioning system is the largest metered consumer, followed by 
        the kitchen, with laundry consuming the least.
      </p>
      <Plot
        data={[{
          type: 'bar',
          x: isMobile ? submeter.map(d => d.Category) : submeter.map(d => d.Avg_Consumption),
          y: isMobile ? submeter.map(d => d.Avg_Consumption) : submeter.map(d => d.Category),
          orientation: isMobile ? 'v' : 'h',
          marker: { color: ['#fc8181', '#ed8936', '#4299e1', '#48bb78'] },
          text: isMobile ? submeter.map(d => `${d.Avg_Consumption.toFixed(2)}`) : submeter.map(d => `${d.Avg_Consumption.toFixed(2)} Wh/min`),
          textposition: 'outside'
        }]}
        layout={{
          title: 'Where does the electricity actually go?',
          xaxis: isMobile
            ? { title: '', tickangle: -20 }
            : { showticklabels: false, showgrid: false },
          yaxis: isMobile
            ? { title: 'Wh/min', dtick: 2, range: [0, 14] }
            : { title: '' },
          height: isMobile ? 350 : 350,
          margin: isMobile
            ? { l: 50, r: 30, t: 50, b: 80 }
            : { l: 150, r: 200 }
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Section 2 - Forecasting */}
      <h2 id="forecasting" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Prophet Forecasting
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        Prophet is an open-source forecasting library developed by Meta, designed for 
        time series with strong seasonal patterns and trend changes. It decomposes the 
        time series into three components — trend, weekly seasonality, and yearly seasonality 
        — learns each separately, then combines them to generate forecasts with confidence intervals.
      </p>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        We trained Prophet on daily consumption data from January 2007 to November 2010 
        (excluding the incomplete December 2006), then generated a 12-month forecast. 
        The model captures all three seasonality levels simultaneously — daily behavioral 
        cycles encoded in the weekly component, and the annual heating-driven cycle in 
        the yearly component.
      </p>

     <Plot
        data={[
          {
            type: 'scatter',
            mode: 'lines',
            name: 'Forecast',
            x: forecast.map(d => d.ds),
            y: forecast.map(d => d.yhat),
            line: { color: '#4299e1' }
          },
          {
            type: 'scatter',
            mode: 'lines',
            x: forecast.map(d => d.ds),
            y: forecast.map(d => d.yhat_upper),
            line: { width: 0 },
            showlegend: false
          },
          {
            type: 'scatter',
            mode: 'lines',
            x: forecast.map(d => d.ds),
            y: forecast.map(d => d.yhat_lower),
            fill: 'tonexty',
            fillcolor: 'rgba(66, 153, 225, 0.2)',
            line: { width: 0 },
            name: 'Confidence Interval'
          },
          {
            type: 'scatter',
            mode: 'markers',
            name: 'Actual',
            x: dailyData.map(d => d.Date),
            y: dailyData.map(d => d.Global_active_power),
            marker: { size: 3, color: '#ed8936', opacity: 0.6 }
          }
        ]}
       layout={{
            title: '12-Month Electricity Consumption Forecast',
            xaxis: { title: '' },
            yaxis: { showticklabels: false, showgrid: false },
            height: isMobile ? 400 : 500,
            legend: { 
                orientation: isMobile ? 'h' : 'v',
                x: isMobile ? 0 : 1,
                y: isMobile ? -0.2 : 1
            },
            margin: isMobile ? { l: 40, r: 50, t: 50, b: 50 } : {},
}}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Section 3 - Accuracy */}
      <h2 id="accuracy" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Model Accuracy
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        The model achieves a Mean Absolute Error (MAE) of 0.21 kW — reasonable given 
        average daily consumption of ~1.5 kW. The overall MAPE of 26.3% is inflated by 
        low summer consumption values where small absolute errors create large percentage 
        errors. Seasonal breakdown reveals the model performs best in fall where consumption 
        patterns are most stable.
      </p>

      <Plot
        data={[{
          type: 'bar',
          x: seasonAccuracy.map(d => d.Season),
          y: seasonAccuracy.map(d => d.MAPE),
          marker: { color: ['#ed8936', '#48bb78', '#4299e1', '#fc8181'] },
          text: seasonAccuracy.map(d => `${d.MAPE.toFixed(1)}%`),
          textposition: 'outside'
        }]}
        layout={{
          title: 'Model Accuracy by Season (MAPE — lower is better)',
          xaxis: { title: '' },
          yaxis: { showticklabels: false, showgrid: false },
          height: 400
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Section 4 - Recommendations */}
      <h2 id="recommendations" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Business Recommendations
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '30px' }}>
        From a utility company perspective, the patterns identified in this analysis 
        support several concrete operational and strategic decisions.
      </p>

      {[
        {
          icon: '🔋',
          title: 'Demand Planning & Grid Management',
          color: '#4299e1',
          recommendations: [
            'Pre-position generation capacity before October when demand starts rising sharply',
            'Schedule grid maintenance in August — the lowest demand month, minimizing disruption risk',
            'Plan for December-January peak load — the highest risk period for grid overload'
          ]
        },
        {
          icon: '💰',
          title: 'Time-of-Use Pricing',
          color: '#48bb78',
          recommendations: [
            'Charge higher rates during peak hours (6-9am and 6-10pm) to incentivize demand shifting',
            'Offer cheaper off-peak rates during 1-4am when consumption is at its lowest',
            'Apply weekend premium pricing — Saturday and Sunday show sustained high consumption throughout the day'
          ]
        },
        {
          icon: '🌡️',
          title: 'Summer Demand Response',
          color: '#ed8936',
          recommendations: [
            'Implement demand response programs in summer — incentivize households to reduce AC during peak heat',
            'Use forecast confidence intervals to identify days where consumption significantly exceeds forecast — likely heat wave days requiring emergency capacity',
            'Target August as the optimal month for planned outages and infrastructure upgrades'
          ]
        },
        {
          icon: '📊',
          title: 'Forecasting at Scale',
          color: '#9f7aea',
          recommendations: [
            'Deploy household-level forecasting at scale — aggregated across thousands of households, errors cancel out and precision improves dramatically',
            'Use confidence intervals to size reserve capacity — wider intervals signal higher uncertainty days requiring more backup generation',
            'Integrate Prophet forecasts into real-time grid management systems for proactive rather than reactive capacity management'
          ]
        }
      ].map((rec, i) => (
        <div key={i} style={{
          border: `2px solid ${rec.color}`,
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '20px',
          backgroundColor: '#fafafa'
        }}>
          <h3 style={{ color: rec.color, fontSize: '1.2rem', marginBottom: '16px' }}>
            {rec.icon} {rec.title}
          </h3>
          <ul style={{ color: '#555', lineHeight: '2', margin: 0 }}>
            {rec.recommendations.map((r, j) => (
              <li key={j}>{r}</li>
            ))}
          </ul>
        </div>
      ))}

    </div>
  );
}

export default TimeSeries;