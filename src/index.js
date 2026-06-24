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
import HousePrice from './HousePrice';
import Northwind from './Northwind';
import FraudDetection from './FraudDetection';
import Footer from './Footer';
import ResumeMatch from './ResumeMatch';

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
        <Route path="/house-price" element={<HousePrice />} />
        <Route path="/northwind" element={<Northwind />} />
        <Route path="/fraud-detection" element={<FraudDetection />} />
        <Route path="/resume-match" element={<ResumeMatch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();