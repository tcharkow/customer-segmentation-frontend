import ScrollToTop from './ScrollToTop';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';
import TimeSeries from './TimeSeries';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-segmentation" element={<App />} />
        <Route path="/time-series" element={<TimeSeries />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();