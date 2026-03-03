'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QUICK_SKILLS = ['python', 'javascript', 'react', 'sql',
    'java', 'figma', 'docker', 'aws', 'communication', 'leadership']

const APTITUDE_DIMS = [
    'Logical', 'Analytical', 'Technical',
    'Creative', 'Communication', 'Leadership', 'Mathematical'
]

export default function AssessmentPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [cgpa, setCgpa] = useState(3.0)
    const [education, setEducation] = useState("Bachelor's")
    const [skillInput, setSkillInput] = useState('')
    const [skills, setSkills] = useState([])
    const [aptitude, setAptitude] = useState(
        Object.fromEntries(APTITUDE_DIMS.map(d => [d, 50]))
    )

    const addSkill = (s) => {
        const val = s.trim().toLowerCase()
        if (val && !skills.includes(val)) setSkills([...skills, val])
        setSkillInput('')
    }

    const removeSkill = (s) => setSkills(skills.filter(x => x !== s))

    const complete = () => {
        localStorage.setItem('skillgap-assessment', JSON.stringify({
            cgpa, education, skills, aptitude
        }))
        router.push('/results')
    }

    const progress = step === 1 ? 33 : step === 2 ? 66 : 100

    return (
        <div style={{
            minHeight: '100vh',
            background: '#070b16',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px 48px',
            position: 'relative',
        }}>
            {/* Blue glow */}
            <div style={{
                position: 'fixed',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '600px',
                height: '400px',
                background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Card */}
            <div style={{
                width: '100%',
                maxWidth: '620px',
                background: '#0d1526',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                animation: 'fadeIn 0.4s ease',
                position: 'relative',
                zIndex: 1,
            }}>

                {/* Progress */}
                <div style={{ marginBottom: '32px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                    }}>
                        <span style={{ color: '#94a3b8', fontSize: '14px' }}>
                            Step {step} of 3
                        </span>
                        <span style={{ color: '#3b82f6', fontSize: '14px', fontWeight: 600 }}>
                            {progress}% Complete
                        </span>
                    </div>
                    <div style={{
                        height: '6px',
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: '999px',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                            borderRadius: '999px',
                            transition: 'width 0.5s ease',
                        }} />
                    </div>
                </div>

                {/* ── STEP 1 ── */}
                {step === 1 && (
                    <div style={{ animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎓</div>
                            <h2 style={{
                                fontFamily: 'Syne, sans-serif',
                                fontSize: '28px',
                                fontWeight: 800,
                                color: 'white',
                                marginBottom: '8px',
                            }}>Academic Background</h2>
                            <p style={{ color: '#94a3b8', fontSize: '15px' }}>
                                Tell us about your education
                            </p>
                        </div>

                        {/* CGPA */}
                        <div style={{ marginBottom: '28px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px',
                            }}>
                                <label style={{ color: '#e2e8f0', fontWeight: 600 }}>
                                    CGPA / GPA (out of 4.0)
                                </label>
                                <span style={{
                                    fontSize: '24px',
                                    fontWeight: 800,
                                    color: '#3b82f6',
                                    fontFamily: 'Syne, sans-serif',
                                }}>
                                    {cgpa.toFixed(1)}
                                </span>
                            </div>
                            <input
                                type="range" min="0" max="4" step="0.1"
                                value={cgpa}
                                onChange={e => setCgpa(parseFloat(e.target.value))}
                                style={{ width: '100%', accentColor: '#3b82f6', height: '6px' }}
                            />
                        </div>

                        {/* Education */}
                        <div style={{ marginBottom: '32px' }}>
                            <label style={{
                                display: 'block',
                                color: '#e2e8f0',
                                fontWeight: 600,
                                marginBottom: '10px',
                            }}>
                                Education Level
                            </label>
                            <select
                                value={education}
                                onChange={e => setEducation(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: '#111827',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '10px',
                                    padding: '12px 16px',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                }}
                            >
                                {["High School", "Bachelor's", "Master's", "PhD"].map(o => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            style={{
                                width: '100%',
                                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '14px',
                                fontSize: '16px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Next →
                        </button>
                    </div>
                )}

                {/* ── STEP 2 ── */}
                {step === 2 && (
                    <div style={{ animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>💡</div>
                            <h2 style={{
                                fontFamily: 'Syne, sans-serif',
                                fontSize: '28px',
                                fontWeight: 800,
                                color: 'white',
                                marginBottom: '8px',
                            }}>Your Skills</h2>
                            <p style={{ color: '#94a3b8', fontSize: '15px' }}>
                                Add your technical and soft skills
                            </p>
                        </div>

                        {/* Input */}
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '16px',
                        }}>
                            <input
                                value={skillInput}
                                onChange={e => setSkillInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addSkill(skillInput)}
                                placeholder="Type a skill and press Enter..."
                                style={{
                                    flex: 1,
                                    background: '#111827',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '10px',
                                    padding: '12px 16px',
                                    fontSize: '15px',
                                    outline: 'none',
                                }}
                            />
                            <button
                                onClick={() => addSkill(skillInput)}
                                style={{
                                    background: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '12px 20px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                }}
                            >
                                Add
                            </button>
                        </div>

                        {/* Quick add */}
                        <div style={{ marginBottom: '20px' }}>
                            <p style={{
                                color: '#64748b',
                                fontSize: '13px',
                                marginBottom: '10px',
                            }}>
                                Quick Add:
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {QUICK_SKILLS.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => addSkill(s)}
                                        style={{
                                            background: skills.includes(s)
                                                ? 'rgba(59,130,246,0.3)'
                                                : 'rgba(255,255,255,0.05)',
                                            color: skills.includes(s) ? '#60a5fa' : '#94a3b8',
                                            border: `1px solid ${skills.includes(s)
                                                ? 'rgba(59,130,246,0.4)'
                                                : 'rgba(255,255,255,0.08)'}`,
                                            borderRadius: '999px',
                                            padding: '6px 14px',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        + {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Added skills */}
                        {skills.length > 0 && (
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '24px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px',
                            }}>
                                {skills.map(s => (
                                    <span key={s} style={{
                                        background: 'rgba(59,130,246,0.15)',
                                        color: '#60a5fa',
                                        border: '1px solid rgba(59,130,246,0.3)',
                                        borderRadius: '999px',
                                        padding: '4px 12px',
                                        fontSize: '13px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        {s}
                                        <span
                                            onClick={() => removeSkill(s)}
                                            style={{ cursor: 'pointer', opacity: 0.7 }}
                                        >×</span>
                                    </span>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setStep(1)}
                                style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.05)',
                                    color: '#94a3b8',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                }}
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                style={{
                                    flex: 2,
                                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                                }}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 3 ── */}
                {step === 3 && (
                    <div style={{ animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧠</div>
                            <h2 style={{
                                fontFamily: 'Syne, sans-serif',
                                fontSize: '28px',
                                fontWeight: 800,
                                color: 'white',
                                marginBottom: '8px',
                            }}>Aptitude Assessment</h2>
                            <p style={{ color: '#94a3b8', fontSize: '15px' }}>
                                Rate yourself on each dimension (0–100)
                            </p>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            {APTITUDE_DIMS.map(dim => (
                                <div key={dim} style={{ marginBottom: '20px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '8px',
                                    }}>
                                        <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
                                            {dim}
                                        </span>
                                        <span style={{
                                            color: '#3b82f6',
                                            fontWeight: 700,
                                            fontSize: '16px',
                                            minWidth: '36px',
                                            textAlign: 'right',
                                        }}>
                                            {aptitude[dim]}
                                        </span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100" step="1"
                                        value={aptitude[dim]}
                                        onChange={e => setAptitude({
                                            ...aptitude,
                                            [dim]: parseInt(e.target.value)
                                        })}
                                        style={{
                                            width: '100%',
                                            accentColor: '#3b82f6',
                                            height: '6px',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setStep(2)}
                                style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.05)',
                                    color: '#94a3b8',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                }}
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={complete}
                                style={{
                                    flex: 2,
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
                                }}
                            >
                                ✓ Complete Assessment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}