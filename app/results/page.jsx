'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'

const CAREER_PROFILES = {
    'Data Scientist': { skills: ['python', 'statistics', 'sql', 'machine-learning'], aptitude: { Analytical: 80, Mathematical: 75 } },
    'Software Engineer': { skills: ['javascript', 'python', 'react', 'java'], aptitude: { Technical: 80, Logical: 75 } },
    'Product Manager': { skills: ['communication', 'leadership', 'analytics'], aptitude: { Communication: 80 } },
    'UX Designer': { skills: ['figma', 'design', 'user-research'], aptitude: { Creative: 80 } },
    'Business Analyst': { skills: ['sql', 'analytics', 'communication'], aptitude: { Analytical: 75 } },
    'DevOps Engineer': { skills: ['docker', 'aws', 'linux'], aptitude: { Technical: 85 } },
}

function calculateResults(assessment) {
    const { skills = [], aptitude = {} } = assessment
    return Object.entries(CAREER_PROFILES).map(([career, profile]) => {
        const skillMatches = skills.filter(s => profile.skills.includes(s.toLowerCase()))
        const skillScore = (skillMatches.length / profile.skills.length) * 50
        const aptScore = Object.entries(profile.aptitude).reduce((sum, [dim, req]) => {
            return sum + Math.min((aptitude[dim] || 50) / req, 1) * 25
        }, 0)
        const score = Math.round(Math.min(25 + skillScore + aptScore, 99))
        return {
            career,
            score,
            skillMatches,
            missingSkills: profile.skills.filter(s => !skills.includes(s))
        }
    }).sort((a, b) => b.score - a.score)
}

export default function ResultsPage() {
    const router = useRouter()
    const [assessment, setAssessment] = useState(null)
    const [results, setResults] = useState([])
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        const saved = localStorage.getItem('skillgap-assessment')
        if (!saved) { router.push('/assessment'); return }
        const data = JSON.parse(saved)
        setAssessment(data)
        setResults(calculateResults(data))
    }, [])

    const sendMessage = async () => {
        if (!input.trim() || loading) return
        const userMsg = input.trim()
        setInput('')
        setMessages(m => [...m, { role: 'user', text: userMsg }])
        setLoading(true)
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    context: {
                        topCareer: results[0]?.career,
                        score: results[0]?.score,
                        skills: assessment?.skills || [],
                    }
                })
            })
            const data = await res.json()
            setMessages(m => [...m, { role: 'ai', text: data.reply }])
        } catch {
            setMessages(m => [...m, { role: 'ai', text: 'Sorry, something went wrong. Please try again.' }])
        }
        setLoading(false)
    }

    if (!results.length) return (
        <div style={{ minHeight: '100vh', background: '#070b16', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#94a3b8' }}>Loading results...</p>
        </div>
    )

    const top = results[0]
    const radarData = assessment?.aptitude
        ? Object.entries(assessment.aptitude).map(([k, v]) => ({ dim: k, value: v }))
        : []
    const barData = results.map(r => ({ career: r.career.split(' ')[0], score: r.score }))

    const tabs = ['overview', 'careers', 'coach']

    return (
        <div style={{ minHeight: '100vh', background: '#070b16', paddingTop: '80px', padding: '80px 24px 48px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                        Your Career Profile
                    </h1>
                    <p style={{ color: '#94a3b8' }}>Based on your assessment results</p>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                    {[
                        { label: 'Top Career Match', value: top.career, color: '#3b82f6' },
                        { label: 'Compatibility Score', value: `${top.score}%`, color: '#22c55e' },
                        { label: 'Skills Identified', value: assessment?.skills?.length || 0, color: '#a855f7' },
                    ].map(card => (
                        <div key={card.label} style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>{card.label}</p>
                            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800, color: card.color }}>{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
                            background: activeTab === tab ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                            color: activeTab === tab ? 'white' : '#94a3b8',
                            transition: 'all 0.2s',
                        }}>
                            {tab === 'overview' ? '📊 Overview' : tab === 'careers' ? '🎯 Careers' : '🤖 AI Coach'}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Bar Chart */}
                        <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '20px' }}>🎯 Career Compatibility</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={barData}>
                                    <XAxis dataKey="career" tick={{ fill: '#64748b', fontSize: 11 }} />
                                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                                    <Tooltip contentStyle={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                    <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Radar Chart */}
                        <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '20px' }}>🧠 Aptitude Profile</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                    <PolarAngleAxis dataKey="dim" tick={{ fill: '#64748b', fontSize: 10 }} />
                                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Careers Tab */}
                {activeTab === 'careers' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {results.map((r, i) => (
                            <div key={r.career} style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <div>
                                        <h3 style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>{r.career}</h3>
                                        <p style={{ color: '#64748b', fontSize: '13px' }}>{r.skillMatches.length} / {CAREER_PROFILES[r.career].skills.length} skills match</p>
                                    </div>
                                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: i === 0 ? '#22c55e' : '#3b82f6' }}>
                                        {r.score}%
                                    </span>
                                </div>
                                {/* Progress bar */}
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', marginBottom: '12px' }}>
                                    <div style={{ height: '100%', width: `${r.score}%`, background: i === 0 ? '#22c55e' : '#3b82f6', borderRadius: '999px', transition: 'width 1s ease' }} />
                                </div>
                                {/* Missing skills */}
                                {r.missingSkills.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {r.missingSkills.map(s => (
                                            <span key={s} style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '999px', padding: '3px 10px', fontSize: '12px' }}>
                                                missing: {s}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* AI Coach Tab */}
                {activeTab === 'coach' && (
                    <div style={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 style={{ color: 'white', fontWeight: 700 }}>🤖 AI Career Coach</h3>
                            <p style={{ color: '#64748b', fontSize: '13px' }}>Powered by GPT-4o — ask anything about your career path</p>
                        </div>

                        {/* Messages */}
                        <div style={{ height: '380px', overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {messages.length === 0 && (
                                <div style={{ textAlign: 'center', margin: 'auto' }}>
                                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
                                    <p style={{ color: '#64748b' }}>Ask me anything about your career path!</p>
                                    {['How do I become a {top.career}?', 'What skills should I learn first?', 'How long to reach my goal?'].map(q => (
                                        <button key={q} onClick={() => setInput(q.replace('{top.career}', top.career))}
                                            style={{ display: 'block', margin: '8px auto', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '999px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px' }}>
                                            {q.replace('{top.career}', top.career)}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{
                                        maxWidth: '80%', padding: '12px 16px', borderRadius: '16px', fontSize: '14px', lineHeight: 1.6,
                                        background: m.role === 'user' ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                    }}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div style={{ display: 'flex', gap: '6px', padding: '12px 16px' }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', animation: `bounce 0.6s ${i * 0.1}s infinite alternate` }} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '12px' }}>
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                placeholder="Ask about your career path..."
                                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', outline: 'none' }}
                            />
                            <button onClick={sendMessage} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 20px', fontWeight: 700, cursor: 'pointer' }}>
                                Send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}