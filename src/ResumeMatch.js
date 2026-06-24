import React, { useState } from 'react';
import ResumeGame from './ResumeGame';

const API = 'https://tcharkow-resume-match-api.hf.space';
const COLOR = '#4299e1';

function ResumeMatch() {
  const [resume, setResume] = useState('');
  const [jobPosting, setJobPosting] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiReady, setApiReady] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const isMobile = window.innerWidth < 768;

  const handleScore = async () => {
    if (!resume.trim() || !jobPosting.trim()) return;
    setLoading(true);
    setResult(null);
    setShowGame(true);

    try {
      const response = await fetch(`${API}/api/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, job_posting: jobPosting })
      });
      const data = await response.json();
      setResult(data);
      setApiReady(true);
      setShowGame(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (showGame && !result) {
    return <ResumeGame apiReady={apiReady} />;
  }

  const scoreColor = result
    ? result.score >= 70 ? '#38a169'
    : result.score >= 50 ? '#d69e2e'
    : '#e53e3e'
    : COLOR;

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: isMobile ? '20px 12px' : '20px 40px',
      fontFamily: 'sans-serif',
      animation: 'fadeIn 0.1s ease'
    }}>

      {/* Title */}
      <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', marginBottom: '10px' }}>
        Resume-Job Match Scorer
      </h1>
      <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
        Paste your resume and a job posting below. The scorer computes a semantic similarity
        score using sentence-transformers and identifies which required skills you have —
        and which ones are missing.
      </p>

      {/* Input area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '24px',
        marginBottom: '24px'
      }}>
        <div>
          <label style={{ fontWeight: 'bold', color: '#333', display: 'block', marginBottom: '8px' }}>
            📄 Your Resume
          </label>
          <textarea
            value={resume}
            onChange={e => setResume(e.target.value)}
            placeholder="Paste your resume here..."
            style={{
              width: '100%',
              height: '300px',
              padding: '12px',
              borderRadius: '8px',
              border: `2px solid ${COLOR}`,
              fontSize: '0.9rem',
              fontFamily: 'sans-serif',
              resize: 'vertical',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 'bold', color: '#333', display: 'block', marginBottom: '8px' }}>
            💼 Job Posting
          </label>
          <textarea
            value={jobPosting}
            onChange={e => setJobPosting(e.target.value)}
            placeholder="Paste the job posting here..."
            style={{
              width: '100%',
              height: '300px',
              padding: '12px',
              borderRadius: '8px',
              border: `2px solid ${COLOR}`,
              fontSize: '0.9rem',
              fontFamily: 'sans-serif',
              resize: 'vertical',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Score button */}
      <button
        onClick={handleScore}
        disabled={loading || !resume.trim() || !jobPosting.trim()}
        style={{
          padding: '12px 32px',
          backgroundColor: resume.trim() && jobPosting.trim() ? COLOR : '#cbd5e0',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: resume.trim() && jobPosting.trim() ? 'pointer' : 'not-allowed',
          marginBottom: '40px'
        }}
      >
        {loading ? 'Scoring...' : '🎯 Score My Resume'}
      </button>

      {/* Results */}
      {result && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>

          {/* Score */}
          <div style={{
            textAlign: 'center',
            padding: '40px',
            borderRadius: '12px',
            border: `3px solid ${scoreColor}`,
            backgroundColor: '#fafafa',
            marginBottom: '32px'
          }}>
            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: scoreColor }}>
              {result.score}
            </div>
            <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '8px' }}>
              out of 100
            </div>
            <div style={{ color: scoreColor, fontWeight: 'bold', fontSize: '1.1rem' }}>
              {result.score >= 70 ? '✅ Strong Match' : result.score >= 50 ? '⚠️ Partial Match' : '❌ Weak Match'}
            </div>
            <div style={{ color: '#999', fontSize: '0.9rem', marginTop: '8px' }}>
              {result.job_skills_found} skills detected in job posting
            </div>
          </div>

          {/* Skill breakdown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '24px'
          }}>

            {/* Matched */}
            <div style={{
              padding: '24px',
              borderRadius: '8px',
              border: '2px solid #38a169',
              backgroundColor: '#fafafa'
            }}>
              <h3 style={{ color: '#38a169', marginTop: 0 }}>
                ✅ Matched Skills ({result.matched_skills.length})
              </h3>
              {result.matched_skills.length === 0 ? (
                <p style={{ color: '#999' }}>No matching skills found.</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {result.matched_skills.map((skill, i) => (
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
              )}
            </div>

            {/* Missing */}
            <div style={{
              padding: '24px',
              borderRadius: '8px',
              border: '2px solid #e53e3e',
              backgroundColor: '#fafafa'
            }}>
              <h3 style={{ color: '#e53e3e', marginTop: 0 }}>
                ❌ Missing Skills ({result.missing_skills.length})
              </h3>
              {result.missing_skills.length === 0 ? (
                <p style={{ color: '#999' }}>No missing skills — perfect match!</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {result.missing_skills.map((skill, i) => (
                    <span key={i} style={{
                      padding: '5px 14px',
                      backgroundColor: '#fff5f5',
                      color: '#c53030',
                      borderRadius: '20px',
                      fontSize: '0.85rem'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* How it works */}
          <div style={{
            marginTop: '40px',
            padding: '24px',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#333', marginTop: 0 }}>How the score is calculated</h3>
            <p style={{ color: '#666', lineHeight: '1.8', margin: 0 }}>
              The match score uses <strong>semantic similarity</strong> via sentence-transformers
              (<code>paraphrase-multilingual-MiniLM-L12-v2</code>). Both texts are encoded as 384-dimensional vectors
              and cosine similarity measures how closely they align in meaning — not just shared
              keywords. A score of 70+ indicates strong alignment; 50–70 is partial; below 50
              suggests significant gaps. The skill breakdown uses word-boundary matching against
              a curated list of data science and engineering skills.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default ResumeMatch;