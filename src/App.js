import React, { useState, useEffect } from 'react';

function App() {
  const [segmentSummary, setSegmentSummary] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/segment-summary')
      .then(response => response.json())
      .then(data => setSegmentSummary(data));
  }, []);

  return (
    <div>
      <h1>Customer Segmentation Dashboard</h1>
      <pre>{JSON.stringify(segmentSummary, null, 2)}</pre>
    </div>
  );
}

export default App;