'use client'

import { useState, useRef } from 'react'

const PARSING_STEPS = [
  'Extracting text from document...',
  'Identifying skills and experience...',
  'Running ATS simulation...',
  'Matching against career profiles...',
  'Generating improvement suggestions...',
]

function ATSMeter({ score }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ position: 'relative', width: '140px', height: '140px' }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color }}>{score}</span>
        <span style={{ fontSize: '11px', color: '#64748b' }}>ATS Score</span>
      </div>
    </div>
  )
}

export default function ResumePage() {
  const [state, setState] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [parseStep, setParseStep] = useState(0)
  const [fileName, setFileName] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [dragOver, setDragOver] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [file, setFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const fileRef = useRef()

  const handleFile = async (file) => {
    if (!file) return
    const valid = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!valid.includes(file.type)) {
      alert('Please upload a PDF or DOCX file only!')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be under 10MB!')
      return
    }
    setFileName(file.name)
    setFile(file)
    startUpload(file)
  }

  const startUpload = (file) => {
    setState('uploading')
    setProgress(0)
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 15
      if (p >= 100) {
        p = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => startParsing(file), 300)
      } else {
        setProgress(Math.round(p))
      }
    }, 150)
  }

  const startParsing = async (file) => {
    setState('parsing')
    setParseStep(0)

    let step = 0
    const stepInterval = setInterval(() => {
      step++
      setParseStep(step)
      if (step >= PARSING_STEPS.length - 1) {
        clearInterval(stepInterval)
      }
    }, 800)

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const res = await fetch('/api/resume', {
        method: 'POST',
        body: formData,
      })

      let data
      try {
        data = await res.json()
      } catch (parseError) {
        throw new Error('Failed to parse server response')
      }

      if (data.error) {
        clearInterval(stepInterval)
        setState('error')
        setErrorMessage(
          data.error.includes('quota')
            ? '⚠️ AI service is busy. Please try again in a moment.'
            : data.error.includes('extract')
            ? '📄 Could not read your PDF. Make sure it has selectable text (not scanned).'
            : '❌ ' + data.error
        )
        return
      }

      clearInterval(stepInterval)
      setParseStep(PARSING_STEPS.length)
      setAnalysis(data)
      setTimeout(() => setState('done'), 600)

    } catch (error) {
      console.error('[resume/page] startParsing error:', error)
      clearInterval(stepInterval)
      setState('error')
      setErrorMessage(
        error.message?.includes('quota')
          ? '⚠️ AI service is busy. Please try again in a moment.'
          : error.message?.includes('extract')
          ? '📄 Could not read your PDF. Make sure it has selectable text (not scanned).'
          : '❌ Analysis failed. Please try uploading again.'
      )
    }
  }

  const typeColor = (type) => {
    if (type === 'Missing Skill') return { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'rgba(59,130,246,0.2)' }
    if (type === 'Weak Bullet') return { bg: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: 'rgba(245,158,11,0.2)' }
    if (type === 'Formatting') return { bg: 'rgba(168,85,247,0.1)', color: '#c084fc', border: 'rgba(168,85,247,0.2)' }
    return { bg: 'rgba(34,197,94,0.1)', color: '#4ade80', border: 'rgba(34,197,94,0.2)' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070b16', paddingTop: '80px', padding: '80px 24px 48px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
            📄 Resume Analyzer
          </h1>
          <p style={{ color: '#94a3b8' }}>Upload your resume and get AI-powered insights instantly</p>
        </div>

        {/* ── IDLE STATE ── */}
        {state === 'idle' && (
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
            onClick={() => fileRef.current.click()}
            style={{
              border: `2px dashed ${dragOver ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '20px',
              padding: '80px 40px',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? 'rgba(59,130,246,0.05)' : 'rgba(255,255,255,0.02)',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📂</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
              Drop your resume here
            </h2>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
              Supports PDF and DOCX — Max 10MB
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white', border: 'none', borderRadius: '12px',
              padding: '12px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
            }}>
              Browse Files
            </button>
            <p style={{ color: '#475569', fontSize: '13px', marginTop: '16px' }}>
              Your resume is never stored or shared
            </p>
            <input ref={fileRef} type="file" accept=".pdf,.docx" style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files[0])} />
          </div>
        )}

        {/* ── UPLOADING STATE ── */}
        {state === 'uploading' && (
          <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⬆️</div>
            <h2 style={{ color: 'white', fontFamily: 'Syne, sans-serif', fontSize: '22px', marginBottom: '8px' }}>
              Uploading {fileName}
            </h2>
            <p style={{ color: '#64748b', marginBottom: '32px' }}>Please wait...</p>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '999px', height: '8px', marginBottom: '12px' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: '999px', transition: 'width 0.1s' }} />
            </div>
            <p style={{ color: '#3b82f6', fontWeight: 700 }}>{progress}%</p>
          </div>
        )}

        {/* ── PARSING STATE ── */}
        {state === 'parsing' && (
          <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</div>
            <h2 style={{ color: 'white', fontFamily: 'Syne, sans-serif', fontSize: '22px', marginBottom: '32px' }}>
              Analyzing your resume...
            </h2>
            <div style={{ textAlign: 'left', maxWidth: '360px', margin: '0 auto' }}>
              {PARSING_STEPS.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px',
                    background: i < parseStep ? '#22c55e' : i === parseStep ? '#3b82f6' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                  }}>
                    {i < parseStep ? '✓' : i === parseStep ? '⋯' : ''}
                  </div>
                  <span style={{ color: i < parseStep ? '#22c55e' : i === parseStep ? 'white' : '#475569', fontSize: '14px' }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ERROR STATE ── */}
        {state === 'error' && (
          <div style={{
            background: '#0d1526',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '20px',
            padding: '48px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
            <h2 style={{
              color: 'white',
              fontFamily: 'Syne, sans-serif',
              fontSize: '22px',
              marginBottom: '12px',
            }}>
              Something went wrong
            </h2>
            <p style={{
              color: '#94a3b8',
              marginBottom: '24px',
              fontSize: '15px',
              maxWidth: '400px',
              margin: '0 auto 24px',
              lineHeight: 1.6,
            }}>
              {errorMessage}
            </p>
            <button
              onClick={() => { setState('idle'); setErrorMessage('') }}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 32px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── DONE STATE ── */}
        {state === 'done' && analysis && (
          <div>
            {/* File info bar */}
            <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>📄</span>
                <div>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>{fileName}</p>
                  <p style={{ color: '#22c55e', fontSize: '12px' }}>✓ Analysis complete</p>
                </div>
              </div>
              <button
                onClick={() => { setState('idle'); setFileName(''); setAnalysis(null) }}
                style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px' }}
              >
                New Upload
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {['overview', 'suggestions', 'careers'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
                  background: activeTab === tab ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab ? 'white' : '#94a3b8',
                  transition: 'all 0.2s',
                }}>
                  {tab === 'overview' ? '📊 Overview' : tab === 'suggestions' ? '💡 Suggestions' : '🎯 Career Match'}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ATSMeter score={analysis.atsScore} />
                    <p style={{ color: '#64748b', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
                      {analysis.atsScore >= 80 ? '🟢 Excellent' : analysis.atsScore >= 60 ? '🟡 Good — room to improve' : '🔴 Needs work'}
                    </p>
                  </div>
                  {[
                    { label: 'Skills Found', value: analysis.skills?.length || 0, color: '#3b82f6' },
                    { label: 'Certifications', value: analysis.certifications?.length || 0, color: '#a855f7' },
                    { label: 'Suggestions', value: analysis.suggestions?.length || 0, color: '#f59e0b' },
                  ].map(s => (
                    <div key={s.label} style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '48px', fontWeight: 800, color: s.color }}>{s.value}</p>
                      <p style={{ color: '#64748b', fontSize: '13px' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>🛠 Extracted Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {analysis.skills?.length > 0
                        ? analysis.skills.map(s => (
                          <span key={s} style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '999px', padding: '4px 12px', fontSize: '13px' }}>
                            {s}
                          </span>
                        ))
                        : <p style={{ color: '#64748b', fontSize: '13px' }}>No skills found</p>
                      }
                    </div>
                  </div>
                  <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>🎓 Education</h3>
                    {analysis.education ? (
                      <>
                        <p style={{ color: 'white', fontWeight: 600 }}>{analysis.education.degree}</p>
                        <p style={{ color: '#94a3b8', fontSize: '14px' }}>{analysis.education.school}</p>
                        <p style={{ color: '#64748b', fontSize: '13px' }}>
                          {analysis.education.year}
                          {analysis.education.gpa ? ` · GPA ${analysis.education.gpa}` : ''}
                        </p>
                      </>
                    ) : (
                      <p style={{ color: '#64748b', fontSize: '13px' }}>No education found</p>
                    )}
                    <div style={{ marginTop: '16px' }}>
                      <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>📜 Certifications</h4>
                      {analysis.certifications?.length > 0
                        ? analysis.certifications.map(c => (
                          <p key={c} style={{ color: '#22c55e', fontSize: '13px' }}>✓ {c}</p>
                        ))
                        : <p style={{ color: '#64748b', fontSize: '13px' }}>No certifications found</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions Tab */}
            {activeTab === 'suggestions' && (
              <div>
                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
                  <p style={{ color: '#fbbf24', fontSize: '14px' }}>
                    💡 Implementing all suggestions could raise your ATS score from <strong>{analysis.atsScore} → {Math.min(analysis.atsScore + 19, 99)}+</strong>
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {analysis.suggestions?.length > 0
                    ? analysis.suggestions.map((s, i) => {
                      const c = typeColor(s.type)
                      return (
                        <div key={i} style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '24px', flexShrink: 0 }}>{s.icon}</span>
                          <div style={{ flex: 1 }}>
                            <span style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: '999px', padding: '2px 10px', fontSize: '11px', fontWeight: 600 }}>
                              {s.type}
                            </span>
                            <p style={{ color: '#e2e8f0', fontSize: '14px', marginTop: '8px', lineHeight: 1.6 }}>{s.text}</p>
                          </div>
                          <span style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', borderRadius: '999px', padding: '4px 10px', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                            +{s.points} pts
                          </span>
                        </div>
                      )
                    })
                    : <p style={{ color: '#64748b', textAlign: 'center', padding: '32px' }}>No suggestions available</p>
                  }
                </div>
              </div>
            )}

            {/* Career Match Tab */}
            {activeTab === 'careers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {analysis.careerMatches?.length > 0
                  ? analysis.careerMatches.map((c, i) => (
                    <div key={c.career} style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>{c.career}</h3>
                        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: i === 0 ? '#22c55e' : '#3b82f6' }}>
                          {c.match}%
                        </span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', marginBottom: '12px' }}>
                        <div style={{ height: '100%', width: `${c.match}%`, background: i === 0 ? '#22c55e' : '#3b82f6', borderRadius: '999px' }} />
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {c.missing?.map(m => (
                          <span key={m} style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '999px', padding: '3px 10px', fontSize: '12px' }}>
                            missing: {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                  : <p style={{ color: '#64748b', textAlign: 'center', padding: '32px' }}>No career matches available</p>
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}