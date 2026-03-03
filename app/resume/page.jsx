'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOCK_ANALYSIS = {
    atsScore: 72,
    skills: ['React', 'JavaScript', 'Python', 'SQL', 'Node.js', 'Git'],
    certifications: ['AWS Cloud Practitioner', 'Google Analytics'],
    education: { degree: "Bachelor's in Computer Science", school: 'State University', year: '2024', gpa: '3.2' },
    tools: ['VS Code', 'Docker', 'Figma', 'Postman', 'GitHub'],
    suggestions: [
        { type: 'Missing Skill', text: 'Add Machine Learning to boost Data Scientist match by 28%', points: 8, color: '#3b82f6' },
        { type: 'Weak Bullet', text: '"Worked on React" → "Built 15+ reusable components, reducing dev time by 40%"', points: 6, color: '#f59e0b' },
        { type: 'Formatting', text: 'Add LinkedIn URL to contact section for better ATS ranking', points: 4, color: '#a855f7' },
        { type: 'Achievement', text: 'Quantify your internship impact with specific metrics', points: 5, color: '#f59e0b' },
        { type: 'Missing Skill', text: 'Add TypeScript — required in 78% of frontend job postings', points: 7, color: '#3b82f6' },
    ],
    careerMatches: [
        { career: 'Software Engineer', match: 78, missing: ['System Design', 'Algorithms'] },
        { career: 'Data Scientist', match: 45, missing: ['ML', 'Statistics', 'TensorFlow'] },
        { career: 'Product Manager', match: 38, missing: ['Leadership', 'Analytics'] },
    ]
}

export default function ResumePage() {
    const [state, setState] = useState('idle') // idle → uploading → parsing → done
    const [progress, setProgress] = useState(0)
    const [fileName, setFileName] = useState('')
    const [analysis, setAnalysis] = useState(null)
    const [activeTab, setActiveTab] = useState('overview')
    const [dragOver, setDragOver] = useState(false)

    const handleFile = (file) => {
        if (!file) return
        const valid = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if (!valid.includes(file.type)) {
            alert('Please upload a PDF or DOCX file only!')
            return
        }
        setFileName(file.name)
        setState('uploading')
        setProgress(0)

        // Simulate upload progress
        let p = 0
        const uploadInterval = setInterval(() => {
            p += Math.random() * 15
            if (p >= 100) {
                p = 100
                clearInterval(uploadInterval)
                setProgress(100)
                setState('parsing')

                // Simulate parsing
                setTimeout(() => {
                    setAnalysis(MOCK_ANALYSIS)
                    setState('done')
                }, 3000)
            }
            setProgress(Math.min(p, 100))
        }, 200)
    }

    const PARSING_STEPS = [
        'Extracting text content...',
        'Analyzing writing quality...',
        'Running ATS simulation...',
        'Matching career profiles...',
        'Generating suggestions...',
    ]

    const [parsingStep, setParsingStep] = useState(0)

    // Advance parsing steps
    if (state === 'parsing' && parsingStep < PARSING_STEPS.length) {
        setTimeout(() => setParsingStep(s => Math.min(s + 1, PARSING_STEPS.length - 1)), 600)
    }

    const ATSColor = analysis?.atsScore >= 80 ? '#22c55e' : analysis?.atsScore >= 60 ? '#f59e0b' : '#ef4444'

    return (
        <div style={{ minHeight: '100vh', background: '#070b16', paddingTop: '80px', padding: '80px 24px 48px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                        📄 Resume Intelligence
                    </h1>
                    <p style={{ color: '#94a3b8' }}>Upload your resume for AI-powered analysis and ATS scoring</p>
                </div>

                {/* IDLE — Drop Zone */}
                {state === 'idle' && (
                    <div
                        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
                        style={{
                            border: `2px dashed ${dragOver ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '20px',
                            padding: '80px 40px',
                            textAlign: 'center',
                            background: dragOver ? 'rgba(59,130,246,0.05)' : '#0d1526',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{ fontSize: '56px', marginBottom: '16px' }}>📤</div>
                        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', color: 'white', marginBottom: '8px' }}>
                            Drop your resume here
                        </h2>
                        <p style={{ color: '#64748b', marginBottom: '24px' }}>
                            Supports PDF and DOCX • Max 10MB
                        </p>
                        <label style={{
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            color: 'white',
                            padding: '12px 28px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 700,
                            boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                        }}>
                            Browse Files
                            <input
                                type="file"
                                accept=".pdf,.docx"
                                style={{ display: 'none' }}
                                onChange={e => handleFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                )}

                {/* UPLOADING */}
                {state === 'uploading' && (
                    <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📤</div>
                        <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '8px' }}>Uploading {fileName}</h3>
                        <p style={{ color: '#64748b', marginBottom: '24px' }}>{Math.round(progress)}%</p>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: '999px', transition: 'width 0.2s' }} />
                        </div>
                    </div>
                )}

                {/* PARSING */}
                {state === 'parsing' && (
                    <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
                        <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '24px' }}>AI Analyzing Your Resume...</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px', margin: '0 auto' }}>
                            {PARSING_STEPS.map((step, i) => (
                                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '16px' }}>
                                        {i < parsingStep ? '✅' : i === parsingStep ? '⏳' : '⬜'}
                                    </span>
                                    <span style={{ color: i <= parsingStep ? '#e2e8f0' : '#334155', fontSize: '14px', textAlign: 'left' }}>
                                        {step}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* DONE — Results */}
                {state === 'done' && analysis && (
                    <div>
                        {/* File info bar */}
                        <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#94a3b8', fontSize: '14px' }}>📄 {fileName}</span>
                            <button onClick={() => { setState('idle'); setParsingStep(0) }} style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 16px', cursor: 'pointer', fontSize: '13px' }}>
                                New Upload
                            </button>
                        </div>

                        {/* ATS Score + Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            {/* ATS Meter */}
                            <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', textAlign: 'center', minWidth: '140px' }}>
                                <svg width="100" height="100" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke={ATSColor} strokeWidth="8"
                                        strokeDasharray={`${2 * Math.PI * 40}`}
                                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysis.atsScore / 100)}`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 50 50)"
                                        style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                                    />
                                    <text x="50" y="45" textAnchor="middle" fill={ATSColor} fontSize="18" fontWeight="bold">{analysis.atsScore}</text>
                                    <text x="50" y="62" textAnchor="middle" fill="#64748b" fontSize="9">ATS Score</text>
                                </svg>
                            </div>
                            {[
                                { label: 'Skills Found', value: analysis.skills.length, color: '#3b82f6' },
                                { label: 'Certifications', value: analysis.certifications.length, color: '#22c55e' },
                                { label: 'Suggestions', value: analysis.suggestions.length, color: '#f59e0b' },
                            ].map(s => (
                                <div key={s.label} style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                                    <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>{s.label}</p>
                                    <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: s.color }}>{s.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                            {['overview', 'suggestions', 'careers'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                                    padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
                                    background: activeTab === tab ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                                    color: activeTab === tab ? 'white' : '#94a3b8',
                                    transition: 'all 0.2s',
                                }}>
                                    {tab === 'overview' ? '📋 Overview' : tab === 'suggestions' ? '💡 Suggestions' : '🎯 Career Match'}
                                </button>
                            ))}
                        </div>

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {/* Skills */}
                                <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                                    <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>💼 Extracted Skills</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {analysis.skills.map(s => (
                                            <span key={s} style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '999px', padding: '4px 12px', fontSize: '13px' }}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* Certifications */}
                                <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                                    <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>🏆 Certifications</h3>
                                    {analysis.certifications.map(c => (
                                        <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                            <span style={{ color: '#22c55e' }}>✓</span>
                                            <span style={{ color: '#e2e8f0', fontSize: '14px' }}>{c}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Education */}
                                <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                                    <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>🎓 Education</h3>
                                    <p style={{ color: 'white', fontWeight: 600 }}>{analysis.education.degree}</p>
                                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>{analysis.education.school} • {analysis.education.year}</p>
                                    <span style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', borderRadius: '999px', padding: '3px 10px', fontSize: '12px', marginTop: '8px', display: 'inline-block' }}>
                                        GPA: {analysis.education.gpa}
                                    </span>
                                </div>
                                {/* Tools */}
                                <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                                    <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>🛠️ Tools & Technologies</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {analysis.tools.map(t => (
                                            <span key={t} style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '999px', padding: '4px 12px', fontSize: '13px' }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Suggestions Tab */}
                        {activeTab === 'suggestions' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {analysis.suggestions.map((s, i) => (
                                    <div key={i} style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '24px' }}>
                                            {s.type === 'Missing Skill' ? '🎯' : s.type === 'Weak Bullet' ? '✍️' : s.type === 'Formatting' ? '📐' : '📊'}
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            <span style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40`, borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: 600, marginBottom: '8px', display: 'inline-block' }}>
                                                {s.type}
                                            </span>
                                            <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: 1.6 }}>{s.text}</p>
                                        </div>
                                        <span style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', borderRadius: '999px', padding: '4px 10px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                            +{s.points} pts
                                        </span>
                                    </div>
                                ))}
                                {/* Tip box */}
                                <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                                    <p style={{ color: '#60a5fa', fontSize: '14px' }}>
                                        💡 Implementing all suggestions could raise your ATS score from <strong>{analysis.atsScore}</strong> to <strong>91+</strong>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Career Match Tab */}
                        {activeTab === 'careers' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {analysis.careerMatches.map((c, i) => (
                                    <div key={c.career} style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <h3 style={{ color: 'white', fontWeight: 700 }}>{c.career}</h3>
                                            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800, color: i === 0 ? '#22c55e' : '#3b82f6' }}>{c.match}%</span>
                                        </div>
                                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', marginBottom: '12px' }}>
                                            <div style={{ height: '100%', width: `${c.match}%`, background: i === 0 ? '#22c55e' : '#3b82f6', borderRadius: '999px' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {c.missing.map(s => (
                                                <span key={s} style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '999px', padding: '3px 10px', fontSize: '12px' }}>
                                                    missing: {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}