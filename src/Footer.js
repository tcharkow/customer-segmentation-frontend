import React from 'react';

function Footer() {
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{
      borderTop: '1px solid #eee',
      padding: '32px 24px',
      textAlign: 'center',
      marginTop: '60px',
      backgroundColor: 'white'
    }}>
      <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '16px' }}>
        Nabil Manzo — Data Analyst & Data Scientist
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '16px' : '32px',
        flexWrap: 'wrap'
      }}>
        <a href="https://www.linkedin.com/in/nabilmanzo" target="_blank" rel="noreferrer"
          style={{ color: '#4299e1', textDecoration: 'none', fontSize: '1rem' }}>
          LinkedIn →
        </a>
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
  );
}

export default Footer;