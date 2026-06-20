import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = window.innerWidth < 768;

  const links = [
    { path: '/', label: 'Home' },
    { path: '/customer-segmentation', label: '🛒 Customer Segmentation' },
    { path: '/time-series', label: '📈 Time Series' },
    { path: '/house-price', label: '🏠 House Price' },
    { path: '/northwind', label: '🗄️ ETL Pipeline' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
    }}>

         {/* Logo */}
      <Link 
        to="/" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ textDecoration: 'none' }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
          Nabil Manzo
        </span>
      </Link>

      {/* Desktop Links */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: '8px' }}>
          {links.map((link, i) => (
            <Link
            key={i}
            to={link.path}
          onClick={() => {
  if (location.pathname === link.path) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}}
            style={{
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                color: location.pathname === link.path ? '#4299e1' : '#555',
                backgroundColor: location.pathname === link.path ? '#ebf8ff' : 'transparent',
                fontWeight: location.pathname === link.path ? '600' : 'normal',
                transition: 'all 0.2s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Hamburger */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#333'
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '12px 24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.06)'
        }}>
          {links.map((link, i) => (
        <Link
          key={i}
          to={link.path}
          onClick={() => {
  setMenuOpen(false);
  if (location.pathname === link.path) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}}
          style={{
            display: 'block',
            textDecoration: 'none',
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0',
            fontSize: '1rem',
            color: location.pathname === link.path ? '#4299e1' : '#555',
            fontWeight: location.pathname === link.path ? '600' : 'normal'
          }}
        >
          {link.label}
        </Link>
      ))}
        </div>
      )}

    </nav>
  );
}

export default Navbar;