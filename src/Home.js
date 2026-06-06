import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: isMobile ? '40px 16px' : '40x 40px',
      animation: 'fadeIn 0.1s ease'
    }}>

      {/* Hero */}
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '10px' }}>
          Nabil Manzo
        </h1>
        <h2 style={{ 
          fontSize: isMobile ? '1.1rem' : '1.4rem', 
          color: '#4299e1', 
          fontWeight: 'normal',
          marginBottom: '20px' 
        }}>
          Senior Data Analyst & Data Scientist
        </h2>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '680px' }}>
          Senior Data Analyst with 5+ years of experience in SQL, ETL pipelines, BI dashboards, 
          and supply chain analytics. This portfolio represents the data science dimension of my 
          work — end-to-end ML projects built in Python, deployed as interactive web applications. 
          I bridge the gap between business problems and technical solutions, from data cleaning 
          to production deployment.
        </p>
      </div>

      {/* What I bring */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>What I Bring</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: '16px' 
        }}>
          {[
            { 
              icon: '📊', 
              title: 'Business Analytics', 
              desc: 'Power BI, SQL, ETL pipelines, data quality, supply chain analytics — 5+ years at McKesson and Lowe\'s Canada.' 
            },
            { 
              icon: '🤖', 
              title: 'Machine Learning', 
              desc: 'Python, Scikit-learn, clustering, regression, time series forecasting — building models that answer real business questions.' 
            },
            { 
              icon: '🚀', 
              title: 'Full Stack Deployment', 
              desc: 'FastAPI backends, React frontends, deployed on Render and Vercel — analysis that anyone can explore, not just analysts.' 
            },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#333' }}>Tech Stack</h3>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: '#999', marginBottom: '8px', display: 'block' }}>
            Business Analytics
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['SQL (BigQuery)', 'Power BI', 'DAX', 'Alteryx', 'Power Query', 'Excel', 'ETL Pipelines'].map((skill, i) => (
              <span key={i} style={{
                padding: '5px 14px',
                backgroundColor: '#fff5eb',
                color: '#c05621',
                borderRadius: '20px',
                fontSize: '0.85rem'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: '#999', marginBottom: '8px', display: 'block' }}>
            Data Science & ML
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Python', 'Pandas', 'Scikit-learn', 'Plotly', 'K-Means', 'Regression', 'Time Series'].map((skill, i) => (
              <span key={i} style={{
                padding: '5px 14px',
                backgroundColor: '#ebf8ff',
                color: '#2b6cb0',
                borderRadius: '20px',
                fontSize: '0.85rem'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#999', marginBottom: '8px', display: 'block' }}>
            Development & Deployment
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['FastAPI', 'React', 'Git', 'Render', 'Vercel'].map((skill, i) => (
              <span key={i} style={{
                padding: '5px 14px',
                backgroundColor: '#f0fff4',
                color: '#276749',
                borderRadius: '20px',
                fontSize: '0.85rem'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Projects */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#333' }}>Data Science Projects</h3>
        <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px' }}>
          Each project is built end-to-end — data cleaning, ML modeling, API backend, 
          and deployed interactive frontend.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Customer Segmentation */}
          <Link to="/customer-segmentation" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '24px',
              border: '2px solid #4299e1',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ color: '#4299e1', fontSize: '1.2rem', margin: 0 }}>
                  🛒 Customer Segmentation — Clustering
                </h4>
                <span style={{ 
                  backgroundColor: '#c6f6d5', 
                  color: '#276749', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap',
                  marginLeft: '12px'
                }}>
                  ✓ Live
                </span>
              </div>
              <p style={{ color: '#666', margin: '0 0 12px', lineHeight: '1.6' }}>
                Segmenting 4,338 customers into behavioral groups using RFM analysis and K-Means 
                clustering on 541,909 real transactions from a UK retailer. Includes business 
                recommendations for each segment.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Python', 'Pandas', 'Scikit-learn', 'K-Means', 'FastAPI', 'React'].map((tag, i) => (
                  <span key={i} style={{ 
                    fontSize: '0.8rem', 
                    color: '#4299e1', 
                    backgroundColor: '#ebf8ff',
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Time Series */}
          <Link to="/time-series" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '24px',
              border: '2px solid #48bb78',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ color: '#48bb78', fontSize: '1.2rem', margin: 0 }}>
                  📈 Time Series Forecasting
                </h4>
                <span style={{ 
                  backgroundColor: '#c6f6d5', 
                  color: '#276749', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap',
                  marginLeft: '12px'
                }}>
                  ✓ Live
                </span>
              </div>
              <p style={{ color: '#666', margin: '0 0 12px', lineHeight: '1.6' }}>
                Analyzing 4 years of minute-level household electricity consumption data 
                to identify daily, weekly and seasonal patterns, then forecasting 12 months 
                ahead using Facebook's Prophet model.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Python', 'Pandas', 'Prophet', 'Plotly', 'FastAPI', 'React'].map((tag, i) => (
                  <span key={i} style={{ 
                    fontSize: '0.8rem', 
                    color: '#48bb78', 
                    backgroundColor: '#f0fff4',
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Coming Soon */}
          {[
           
            { 
              emoji: '🏠', 
              title: 'House Price Prediction — Regression', 
              desc: 'Predicting house prices using multiple regression techniques on the Ames Housing Dataset.', 
              tags: ['Python', 'Regression', 'Feature Engineering', 'FastAPI', 'React'] 
            },
            { 
              emoji: '🗄️', 
              title: 'ETL Pipeline & SQL Analytics', 
              desc: 'Building a production-grade ETL pipeline with SQL transformations and a live analytics dashboard.', 
              tags: ['SQL', 'PostgreSQL', 'Python', 'ETL', 'Power BI'] 
            },
          ].map((project, i) => (
            <div key={i} style={{
              padding: '24px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              opacity: 0.65
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ color: '#666', fontSize: '1.2rem', margin: 0 }}>
                  {project.emoji} {project.title}
                </h4>
                <span style={{ 
                  backgroundColor: '#e2e8f0', 
                  color: '#666', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap',
                  marginLeft: '12px'
                }}>
                  Coming Soon
                </span>
              </div>
              <p style={{ color: '#666', margin: '0 0 12px', lineHeight: '1.6' }}>
                {project.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map((tag, j) => (
                  <span key={j} style={{ 
                    fontSize: '0.8rem', 
                    color: '#999', 
                    backgroundColor: '#f0f0f0',
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>Education</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { year: '2021 – 2024', degree: 'Master\'s in Business Intelligence', school: 'HEC Montréal' },
            { year: '2017 – 2019', degree: 'Master\'s in International Business', school: 'HEC Montréal' },
            { year: '2013 – 2016', degree: 'Bachelor\'s in Economics & Political Science', school: 'Université de Montréal' },
          ].map((edu, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <span style={{ color: '#999', fontSize: '0.85rem', whiteSpace: 'nowrap', minWidth: '90px' }}>{edu.year}</span>
              <div>
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '0.95rem' }}>{edu.degree}</div>
                <div style={{ color: '#666', fontSize: '0.85rem' }}>{edu.school}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{ borderTop: '1px solid #eee', paddingTop: '40px', marginBottom: '10px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#333' }}>Get in Touch</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <a href="https://github.com/tcharkow" target="_blank" rel="noreferrer" 
            style={{ color: '#4299e1', textDecoration: 'none', fontSize: '1rem' }}>
            GitHub →
          </a>
          <a href="mailto:epmanzo@yahoo.fr" 
            style={{ color: '#4299e1', textDecoration: 'none', fontSize: '1rem' }}>
            Email →
          </a>
        </div>
      </div>

    </div>
  );
}

export default Home;