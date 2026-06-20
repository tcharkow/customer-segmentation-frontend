import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import NorthwindGame from './NorthwindGame';

const API = 'https://northwind-api-om5r.onrender.com';
const COLOR = '#4299e1';

function Northwind() {
  const [revenueData, setRevenueData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [ltvData, setLtvData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) setShowGame(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/revenue-by-month`).then(r => r.json()),
      fetch(`${API}/api/product-performance`).then(r => r.json()),
      fetch(`${API}/api/customer-ltv`).then(r => r.json()),
    ]).then(([revenue, products, ltv]) => {
      setRevenueData(revenue);
      setProductData(products);
      setLtvData(ltv);
      setLoaded(true);
    });
  }, []);

  if (showGame && !loaded) return <NorthwindGame apiReady={loaded} />;
  if (!loaded) return null;

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
        From Raw Data to Dashboard: A Production ELT Pipeline
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
        Most data science projects start with a clean CSV. This one doesn't. This project 
        builds a production-grade ELT pipeline from scratch — loading raw Northwind sales 
        data into PostgreSQL, transforming it through dbt staging and mart models, serving 
        it via FastAPI, and visualizing the results in this dashboard. The charts below are 
        proof that the pipeline works end-to-end.
      </p>
      <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
        The Northwind dataset contains 830 orders, 91 customers, and 77 products spanning 
        1996–1998 — a classic sales database used here to demonstrate real data engineering 
        patterns at a manageable scale.
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
          What this case study covers:
        </p>
        {[
          { id: 'architecture', label: '1. Pipeline architecture — how the layers connect' },
          { id: 'stack', label: '2. Tech stack — PostgreSQL, dbt, FastAPI, React' },
          { id: 'dbt', label: '3. dbt models — staging and mart layer design' },
          { id: 'revenue', label: '4. Revenue trends — powered by revenue_by_month mart' },
          { id: 'products', label: '5. Product performance — powered by product_performance mart' },
          { id: 'ltv', label: '6. Customer LTV — powered by customer_ltv mart' },
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
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#faf5ff'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Architecture */}
      <h2 id="architecture" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Pipeline Architecture
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '24px' }}>
        The pipeline follows the ELT pattern — Extract, Load, Transform. Raw CSV files are 
        loaded directly into PostgreSQL first, then transformed in place using dbt. This is 
        the modern data engineering approach: load raw data as-is, then apply transformations 
        as SQL models that are versioned, testable, and reproducible.
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
          { label: 'Northwind CSVs', sublabel: '7 source tables', color: '#718096' },
          { arrow: true },
          { label: 'PostgreSQL 16', sublabel: 'Raw seeds loaded via dbt', color: '#336791' },
          { arrow: true },
          { label: 'dbt Staging', sublabel: 'Clean & rename columns', color: COLOR },
          { arrow: true },
          { label: 'dbt Marts', sublabel: 'Business KPIs', color: COLOR },
          { arrow: true },
          { label: 'FastAPI', sublabel: 'REST API on Render', color: '#009688' },
          { arrow: true },
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

      {/* Tech Stack */}
      <h2 id="stack" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Tech Stack
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '24px' }}>
        Each tool was chosen for a specific role in the pipeline — not interchangeable, 
        not redundant.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '40px'
      }}>
        {[
          { name: 'PostgreSQL 16', role: 'Data warehouse', color: '#336791', emoji: '🗄️' },
          { name: 'dbt 1.8', role: 'SQL transformation layer', color: COLOR, emoji: '🔧' },
          { name: 'FastAPI', role: 'REST API backend', color: '#009688', emoji: '⚡' },
          { name: 'React + Plotly', role: 'Interactive dashboard', color: '#61dafb', emoji: '⚛️' },
          { name: 'Render', role: 'API & DB deployment', color: '#46e3b7', emoji: '🚀' },
          { name: 'Vercel', role: 'Frontend deployment', color: '#000', emoji: '▲' },
          { name: 'Python', role: 'API runtime', color: '#3776ab', emoji: '🐍' },
          { name: 'SQL', role: 'All transformations', color: '#f29111', emoji: '📊' },
        ].map((tool, i) => (
          <div key={i} style={{
            padding: '16px',
            borderRadius: '8px',
            border: `2px solid ${tool.color}`,
            backgroundColor: '#fafafa',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{tool.emoji}</div>
            <div style={{ fontWeight: 'bold', color: tool.color, marginBottom: '4px', fontSize: '0.9rem' }}>{tool.name}</div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>{tool.role}</div>
          </div>
        ))}
      </div>

      {/* dbt Models */}
      <h2 id="dbt" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        dbt Model Design
      </h2>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '24px' }}>
        dbt organizes SQL transformations into a DAG (Directed Acyclic Graph) — each model 
        depends on the ones before it. We use the standard three-layer pattern: seeds → 
        staging → marts. Every model is a <code>.sql</code> file under version control, 
        which means transformations are reproducible, testable, and documented.
      </p>

      <h3 style={{ color: '#333', marginBottom: '16px' }}>Staging Layer — One Model Per Source Table</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '16px' }}>
        Staging models do one thing: clean and standardize raw seed data. Column names are 
        renamed to <code>snake_case</code>, date strings are cast to proper <code>date</code> types, 
        and foreign keys are renamed for clarity. No business logic here — that belongs in marts.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
        {[
          { model: 'stg_orders', desc: 'Renamed columns, cast date fields' },
          { model: 'stg_order_details', desc: 'Line items with price & quantity' },
          { model: 'stg_products', desc: 'Product catalog' },
          { model: 'stg_customers', desc: 'Customer details' },
          { model: 'stg_suppliers', desc: 'Supplier details' },
        ].map((m, i) => (
          <div key={i} style={{
            padding: '14px 18px',
            borderRadius: '8px',
            border: `1px solid #e2e8f0`,
            borderLeft: `4px solid ${COLOR}`,
            backgroundColor: '#fafafa',
            minWidth: '200px',
            flex: '1'
          }}>
            <div style={{ fontWeight: 'bold', color: COLOR, fontFamily: 'monospace', marginBottom: '4px' }}>{m.model}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{m.desc}</div>
          </div>
        ))}
      </div>

      <h3 style={{ color: '#333', marginBottom: '16px' }}>Mart Layer — Business KPIs</h3>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '16px' }}>
        Mart models join staging models and apply business logic — aggregations, revenue 
        calculations, and customer metrics. These are what the API queries directly. 
        Revenue is calculated as <code>unit_price × quantity × (1 - discount)</code> to 
        account for line-item discounts.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
        {[
          { model: 'revenue_by_month', desc: 'Monthly revenue from orders + order_details join' },
          { model: 'product_performance', desc: 'Revenue & units sold per product' },
          { model: 'customer_ltv', desc: 'Lifetime revenue & order count per customer' },
        ].map((m, i) => (
          <div key={i} style={{
            padding: '14px 18px',
            borderRadius: '8px',
            border: `1px solid #e2e8f0`,
            borderLeft: `4px solid ${COLOR}`,
            backgroundColor: '#fafafa',
            minWidth: '200px',
            flex: '1'
          }}>
            <div style={{ fontWeight: 'bold', color: COLOR, fontFamily: 'monospace', marginBottom: '4px' }}>{m.model}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{m.desc}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <h2 id="revenue" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Revenue Trends
      </h2>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#faf5ff',
        border: `1px solid ${COLOR}`,
        borderRadius: '6px',
        padding: '6px 14px',
        marginBottom: '16px',
        fontSize: '0.85rem',
        color: COLOR,
        fontFamily: 'monospace'
      }}>
        dbt mart → revenue_by_month
      </div>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        Monthly revenue from July 1996 to May 1998, computed by joining <code>stg_orders</code> and 
        <code> stg_order_details</code>. Revenue grew steadily from ~$28K/month in mid-1996 to a peak 
        of ~$124K in April 1998 — a 4x increase over 22 months. The sharp drop in May 1998 
        reflects an incomplete month in the dataset, not a real decline.
      </p>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'lines+markers',
          x: revenueData.map(d => d.month),
          y: revenueData.map(d => d.revenue),
          line: { color: COLOR, width: 2 },
          marker: { color: COLOR, size: 6 },
          fill: 'tozeroy',
          fillcolor: 'rgba(128, 90, 213, 0.1)',
        }]}
        layout={{
          title: 'Monthly Revenue — Northwind 1996–1998',
          xaxis: { title: 'Month' },
          yaxis: { title: 'Revenue ($)', showgrid: false },
          height: 400,
          margin: isMobile ? { l: 60, r: 20, t: 50, b: 50 } : {},
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Product Performance Chart */}
      <h2 id="products" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Product Performance
      </h2>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#faf5ff',
        border: `1px solid ${COLOR}`,
        borderRadius: '6px',
        padding: '6px 14px',
        marginBottom: '16px',
        fontSize: '0.85rem',
        color: COLOR,
        fontFamily: 'monospace'
      }}>
        dbt mart → product_performance
      </div>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        Top 20 products by total revenue, joining <code>stg_order_details</code> and <code>stg_products</code>. 
        Côte de Blaye dominates at $141K — nearly double the second-place product. Notably, 
        high revenue doesn't always mean high volume: Côte de Blaye sold only 623 units 
        compared to Raclette Courdavault's 1,496 units at a lower price point.
      </p>
      <Plot
        data={[{
          type: 'bar',
          orientation: 'h',
          x: productData.slice(0, 20).map(d => d.revenue).reverse(),
          y: productData.slice(0, 20).map(d => d.product_name).reverse(),
          marker: { color: COLOR, opacity: 0.85 },
          text: productData.slice(0, 20).map(d => `$${d.revenue.toLocaleString()}`).reverse(),
          textposition: 'outside',
          textfont: { size: 10 }
        }]}
        layout={{
          title: 'Top 20 Products by Revenue',
          xaxis: { title: 'Total Revenue ($)', showgrid: false },
          yaxis: { autorange: true },
          height: 600,
          margin: isMobile ? { l: 140, r: 80, t: 50, b: 50 } : { l: 180, r: 100, t: 50, b: 50 },
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

      {/* Customer LTV Chart */}
      <h2 id="ltv" style={{ fontSize: '1.8rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>
        Customer Lifetime Value
      </h2>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#faf5ff',
        border: `1px solid ${COLOR}`,
        borderRadius: '6px',
        padding: '6px 14px',
        marginBottom: '16px',
        fontSize: '0.85rem',
        color: COLOR,
        fontFamily: 'monospace'
      }}>
        dbt mart → customer_ltv
      </div>
      <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
        Lifetime revenue per customer, joining all three staging models. The top 3 customers 
        — QUICK-Stop, Ernst Handel, and Save-a-lot Markets — each exceeded $100K in lifetime 
        spend. The long tail reveals typical B2B concentration: a small number of accounts 
        drive the majority of revenue.
      </p>
      <Plot
        data={[{
          type: 'bar',
          orientation: 'h',
          x: ltvData.slice(0, 20).map(d => d.lifetime_revenue).reverse(),
          y: ltvData.slice(0, 20).map(d => d.company_name).reverse(),
          marker: { color: COLOR, opacity: 0.85 },
          text: ltvData.slice(0, 20).map(d => `$${d.lifetime_revenue.toLocaleString()}`).reverse(),
          textposition: 'outside',
          textfont: { size: 10 }
        }]}
        layout={{
          title: 'Top 20 Customers by Lifetime Revenue',
          xaxis: { title: 'Lifetime Revenue ($)', showgrid: false },
          yaxis: { autorange: true },
          height: 600,
          margin: isMobile ? { l: 140, r: 80, t: 50, b: 50 } : { l: 180, r: 100, t: 50, b: 50 },
        }}
        useResizeHandler={true}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />

    </div>
  );
}

export default Northwind;