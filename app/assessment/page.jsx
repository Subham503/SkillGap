'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QUICK_SKILLS = [
    'python', 'javascript', 'java', 'c', 'c++', 'c#', 'typescript',
    'kotlin', 'swift', 'go', 'rust', 'php', 'ruby', 'scala', 'r',
    'matlab', 'perl', 'haskell', 'elixir', 'dart', 'lua', 'julia',
    'assembly', 'cobol', 'fortran', 'groovy', 'clojure', 'erlang',
    'react', 'nextjs', 'vue', 'nuxtjs', 'angular', 'svelte',
    'html', 'css', 'sass', 'tailwind', 'bootstrap', 'materialui',
    'jquery', 'redux', 'graphql', 'webpack', 'vite', 'babel',
    'storybook', 'framer-motion', 'threejs', 'webgl', 'pwa',
    'nodejs', 'express', 'nestjs', 'django', 'flask', 'fastapi',
    'spring', 'springboot', 'laravel', 'rails', 'aspnet', 'gin',
    'fiber', 'phoenix', 'strapi', 'hasura', 'graphql-server',
    'react-native', 'flutter', 'android', 'ios', 'swift-ui',
    'jetpack-compose', 'xamarin', 'ionic', 'cordova', 'expo',
    'sql', 'mysql', 'postgresql', 'sqlite', 'mongodb', 'redis',
    'cassandra', 'dynamodb', 'firebase', 'supabase', 'neo4j',
    'elasticsearch', 'couchdb', 'influxdb', 'mariadb', 'oracle-db',
    'snowflake', 'bigquery', 'prisma', 'sequelize', 'mongoose',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
    'ansible', 'jenkins', 'github-actions', 'circleci', 'gitlab-ci',
    'linux', 'bash', 'powershell', 'nginx', 'apache', 'vercel',
    'netlify', 'heroku', 'digitalocean', 'cloudflare', 'pulumi',
    'vagrant', 'prometheus', 'grafana', 'elk-stack', 'istio',
    'machine-learning', 'deep-learning', 'nlp', 'computer-vision',
    'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'opencv',
    'huggingface', 'langchain', 'openai-api', 'stable-diffusion',
    'reinforcement-learning', 'data-science', 'feature-engineering',
    'model-deployment', 'mlops', 'llm', 'rag', 'fine-tuning',
    'pandas', 'numpy', 'matplotlib', 'seaborn', 'plotly',
    'tableau', 'powerbi', 'looker', 'excel', 'google-analytics',
    'statistics', 'data-analysis', 'data-visualization',
    'data-engineering', 'etl', 'apache-spark', 'hadoop', 'kafka',
    'airflow', 'dbt', 'data-warehousing', 'business-intelligence',
    'network-security', 'penetration-testing', 'ethical-hacking',
    'cryptography', 'soc', 'siem', 'vulnerability-assessment',
    'owasp', 'firewalls', 'vpn', 'iam', 'zero-trust',
    'malware-analysis', 'incident-response', 'forensics', 'ctf',
    'figma', 'adobe-xd', 'sketch', 'invision', 'zeplin',
    'photoshop', 'illustrator', 'indesign', 'after-effects',
    'premiere-pro', 'blender', 'cinema4d', 'canva',
    'ui-design', 'ux-design', 'ux-research', 'wireframing',
    'prototyping', 'design-systems', 'accessibility', 'motion-design',
    'unit-testing', 'integration-testing', 'e2e-testing',
    'jest', 'cypress', 'selenium', 'playwright', 'pytest',
    'junit', 'testng', 'postman', 'k6', 'jmeter', 'tdd', 'bdd',
    'blockchain', 'solidity', 'ethereum', 'web3js', 'ethersjs',
    'smart-contracts', 'nft', 'defi', 'hardhat', 'truffle',
    'ipfs', 'polygon', 'solana', 'rust-blockchain',
    'unity', 'unreal-engine', 'godot', 'game-design',
    'c++-games', 'opengl', 'directx', 'vulkan', 'ar', 'vr',
    'xr', 'game-physics', 'shader-programming',
    'agile', 'scrum', 'kanban', 'jira', 'confluence', 'trello',
    'project-management', 'product-management', 'roadmapping',
    'stakeholder-management', 'risk-management', 'pmp',
    'communication', 'leadership', 'teamwork', 'mentoring',
    'public-speaking', 'technical-writing', 'documentation',
    'problem-solving', 'critical-thinking', 'decision-making',
    'negotiation', 'conflict-resolution', 'emotional-intelligence',
    'business-analysis', 'market-research', 'seo', 'sem',
    'social-media-marketing', 'content-marketing', 'email-marketing',
    'growth-hacking', 'crm', 'salesforce', 'hubspot',
    'financial-modeling', 'excel-advanced', 'powerpoint',
    'tcp-ip', 'dns', 'http', 'rest-api', 'grpc', 'websockets',
    'microservices', 'system-design', 'load-balancing',
    'cdn', 'oauth', 'jwt', 'api-design', 'swagger',
    'arduino', 'raspberry-pi', 'embedded-c', 'rtos',
    'iot', 'mqtt', 'can-bus', 'arm-cortex', 'fpga', 'vhdl',
]

const APTITUDE_DIMS = [
    'Logical', 'Analytical', 'Technical',
    'Creative', 'Communication', 'Leadership', 'Mathematical'
]

export default function AssessmentPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [cgpa, setCgpa] = useState(7.5)
    const [education, setEducation] = useState("Bachelor's")
    const [skillInput, setSkillInput] = useState('')
    const [skills, setSkills] = useState([])
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [skillWarning, setSkillWarning] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [aiAnalysis, setAiAnalysis] = useState(null)
    const [aptitude, setAptitude] = useState(
        Object.fromEntries(APTITUDE_DIMS.map(d => [d, 50]))
    )

    const suggestions = skillInput.trim().length > 0
        ? QUICK_SKILLS
            .filter(s =>
                s.toLowerCase().includes(skillInput.toLowerCase()) &&
                !skills.find(sk => sk.name === s)
            )
            .sort((a, b) => {
                const query = skillInput.toLowerCase()
                const aStarts = a.toLowerCase().startsWith(query)
                const bStarts = b.toLowerCase().startsWith(query)
                if (aStarts && !bStarts) return -1
                if (!aStarts && bStarts) return 1
                return a.localeCompare(b)
            })
            .slice(0, 6)
        : []

    const addSkill = (s) => {
        const val = s.trim().toLowerCase()
        if (val && !skills.find(sk => sk.name === val)) {
            setSkills([...skills, { name: val, level: 'intermediate' }])
        }
        setSkillInput('')
        setHighlightedIndex(-1)
        setSkillWarning(false)
    }

    const removeSkill = (name) =>
        setSkills(skills.filter(x => x.name !== name))

    const updateSkillLevel = (name, level) =>
        setSkills(skills.map(sk =>
            sk.name === name ? { ...sk, level } : sk
        ))

    const analyzeSkills = async () => {
        setAiLoading(true)
        setAiAnalysis(null)
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'Analyze my skills and suggest careers',
                    context: {
                        topCareer: 'unknown',
                        score: 0,
                        skills: skills.map(s => `${s.name} (${s.level})`),
                        mode: 'skill-analysis',
                    }
                })
            })
            const data = await res.json()
            setAiAnalysis(data.reply)
        } catch {
            setAiAnalysis('Could not analyze skills. Please try again.')
        }
        setAiLoading(false)
    }

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

                        <div style={{ marginBottom: '28px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px',
                            }}>
                                <label style={{ color: '#e2e8f0', fontWeight: 600 }}>
                                    CGPA (out of 10)
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
                                type="range" min="0" max="10" step="0.1"
                                value={cgpa}
                                onChange={e => setCgpa(parseFloat(e.target.value))}
                                style={{ width: '100%', accentColor: '#3b82f6', height: '6px' }}
                            />
                        </div>

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

                        {/* Search Input with Autocomplete */}
                        <div style={{ position: 'relative', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    value={skillInput}
                                    onChange={e => {
                                        setSkillInput(e.target.value)
                                        setHighlightedIndex(-1)
                                    }}
                                    onKeyDown={e => {
                                        if (e.key === 'ArrowDown') {
                                            e.preventDefault()
                                            setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1))
                                        } else if (e.key === 'ArrowUp') {
                                            e.preventDefault()
                                            setHighlightedIndex(i => Math.max(i - 1, -1))
                                        } else if (e.key === 'Enter') {
                                            e.preventDefault()
                                            if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
                                                addSkill(suggestions[highlightedIndex])
                                            } else if (skillInput.trim()) {
                                                addSkill(skillInput)
                                            }
                                        } else if (e.key === 'Escape') {
                                            setSkillInput('')
                                            setHighlightedIndex(-1)
                                        }
                                    }}
                                    placeholder="🔍 Search or type any skill..."
                                    style={{
                                        flex: 1,
                                        background: '#111827',
                                        color: 'white',
                                        border: '1px solid rgba(59,130,246,0.3)',
                                        borderRadius: '10px',
                                        padding: '14px 16px',
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
                                        padding: '14px 20px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Add
                                </button>
                            </div>

                            {/* Autocomplete Dropdown */}
                            {suggestions.length > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: '70px',
                                    background: '#0d1526',
                                    border: '1px solid rgba(59,130,246,0.2)',
                                    borderRadius: '10px',
                                    marginTop: '6px',
                                    zIndex: 100,
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                    maxHeight: '220px',
                                    overflowY: 'auto',
                                }}>
                                    {suggestions.map((s, index) => (
                                        <div
                                            key={s}
                                            onClick={() => {
                                                addSkill(s)
                                                setSkillInput('')
                                                setHighlightedIndex(-1)
                                            }}
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            onMouseLeave={() => setHighlightedIndex(-1)}
                                            style={{
                                                padding: '10px 16px',
                                                cursor: 'pointer',
                                                color: highlightedIndex === index ? 'white' : '#e2e8f0',
                                                fontSize: '14px',
                                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                background: highlightedIndex === index
                                                    ? 'rgba(59,130,246,0.2)'
                                                    : 'transparent',
                                                transition: 'background 0.1s',
                                            }}
                                        >
                                            <span style={{ color: '#3b82f6' }}>+</span>
                                            {s}
                                            {highlightedIndex === index && (
                                                <span style={{
                                                    marginLeft: 'auto',
                                                    color: '#64748b',
                                                    fontSize: '11px'
                                                }}>
                                                    ↵ Enter
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                    {!QUICK_SKILLS.some(s => s.toLowerCase() === skillInput.toLowerCase()) && skillInput.trim() && (
                                        <div
                                            onClick={() => { addSkill(skillInput); setSkillInput('') }}
                                            style={{
                                                padding: '10px 16px',
                                                cursor: 'pointer',
                                                color: '#22c55e',
                                                fontSize: '14px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,197,94,0.1)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <span>✨</span>
                                            Add &quot;{skillInput}&quot; as custom skill
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Popular Skills */}
                        {skillInput.trim().length === 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '10px' }}>
                                    Popular skills:
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {['python', 'javascript', 'react', 'sql', 'java',
                                        'figma', 'docker', 'aws', 'machine-learning',
                                        'communication', 'leadership', 'nodejs'].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => addSkill(s)}
                                                disabled={!!skills.find(sk => sk.name === s)}
                                                style={{
                                                    background: skills.find(sk => sk.name === s)
                                                        ? 'rgba(59,130,246,0.2)'
                                                        : 'rgba(255,255,255,0.04)',
                                                    color: skills.find(sk => sk.name === s)
                                                        ? '#60a5fa' : '#94a3b8',
                                                    border: `1px solid ${skills.find(sk => sk.name === s)
                                                        ? 'rgba(59,130,246,0.3)'
                                                        : 'rgba(255,255,255,0.08)'}`,
                                                    borderRadius: '999px',
                                                    padding: '6px 14px',
                                                    fontSize: '13px',
                                                    cursor: skills.find(sk => sk.name === s)
                                                        ? 'default' : 'pointer',
                                                    transition: 'all 0.2s',
                                                }}
                                            >
                                                {skills.find(sk => sk.name === s) ? '✓' : '+'} {s}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Added skills with proficiency */}
                        {skills.length > 0 && (
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '16px',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                }}>
                                    <p style={{ color: '#64748b', fontSize: '13px' }}>
                                        Rate your proficiency for each skill:
                                    </p>
                                    <span style={{
                                        background: 'rgba(59,130,246,0.15)',
                                        color: '#60a5fa',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        padding: '2px 10px',
                                        borderRadius: '999px',
                                    }}>
                                        {skills.length} skill{skills.length !== 1 ? 's' : ''} added
                                    </span>
                                </div>
                                {skills.map(skill => (
                                    <div key={skill.name} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '10px',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
                                            <span
                                                onClick={() => removeSkill(skill.name)}
                                                style={{ cursor: 'pointer', color: '#ef4444', fontSize: '16px' }}
                                            >×</span>
                                            <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 500 }}>
                                                {skill.name}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {[
                                                { level: 'beginner', label: 'Beginner', color: '#94a3b8' },
                                                { level: 'intermediate', label: 'Intermediate', color: '#3b82f6' },
                                                { level: 'advanced', label: 'Advanced', color: '#f59e0b' },
                                                { level: 'expert', label: 'Expert', color: '#22c55e' },
                                            ].map(({ level, label, color }) => (
                                                <button
                                                    key={level}
                                                    onClick={() => updateSkillLevel(skill.name, level)}
                                                    style={{
                                                        padding: '4px 10px',
                                                        borderRadius: '999px',
                                                        border: `1px solid ${skill.level === level ? color : 'rgba(255,255,255,0.1)'}`,
                                                        background: skill.level === level ? `${color}20` : 'transparent',
                                                        color: skill.level === level ? color : '#64748b',
                                                        fontSize: '11px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── AI ANALYZE BUTTON ── */}
                        {skills.length >= 3 && (
                            <button
                                onClick={analyzeSkills}
                                disabled={aiLoading}
                                style={{
                                    width: '100%',
                                    background: aiLoading
                                        ? 'rgba(168,85,247,0.1)'
                                        : 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.2))',
                                    color: '#c084fc',
                                    border: '1px solid rgba(168,85,247,0.3)',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: aiLoading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginBottom: '16px',
                                }}
                            >
                                {aiLoading ? (
                                    <>
                                        <span style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid rgba(168,85,247,0.3)',
                                            borderTop: '2px solid #c084fc',
                                            borderRadius: '50%',
                                            animation: 'spin 0.8s linear infinite',
                                            display: 'inline-block',
                                        }} />
                                        Analyzing your skills...
                                    </>
                                ) : (
                                    <>✨ Analyze My Skills with AI</>
                                )}
                            </button>
                        )}

                        {/* ── AI ANALYSIS RESULT ── */}
                        {aiAnalysis && (
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(59,130,246,0.08))',
                                border: '1px solid rgba(168,85,247,0.2)',
                                borderRadius: '16px',
                                padding: '20px',
                                marginBottom: '16px',
                                animation: 'fadeIn 0.4s ease',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '12px',
                                }}>
                                    <span style={{ fontSize: '20px' }}>🤖</span>
                                    <p style={{ color: '#c084fc', fontWeight: 700, fontSize: '14px' }}>
                                        AI Career Analysis
                                    </p>
                                    <button
                                        onClick={() => setAiAnalysis(null)}
                                        style={{
                                            marginLeft: 'auto',
                                            color: '#64748b',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                        }}
                                    >×</button>
                                </div>
                                <p style={{
                                    color: '#e2e8f0',
                                    fontSize: '14px',
                                    lineHeight: 1.7,
                                    whiteSpace: 'pre-wrap',
                                }}>
                                    {aiAnalysis}
                                </p>
                            </div>
                        )}

                        {/* ── WARNING MESSAGES ── */}
                        {skillWarning === 'empty' && (
                            <div style={{
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.3)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}>
                                <span style={{ fontSize: '20px' }}>⚠️</span>
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: '#f87171', fontWeight: 600, fontSize: '14px' }}>
                                        No skills added!
                                    </p>
                                    <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                                        Please add at least 1 skill to get career matches.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSkillWarning(false)}
                                    style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                                >×</button>
                            </div>
                        )}

                        {skillWarning === 'few' && (
                            <div style={{
                                background: 'rgba(245,158,11,0.1)',
                                border: '1px solid rgba(245,158,11,0.3)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                            }}>
                                <span style={{ fontSize: '20px' }}>💡</span>
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: '#fbbf24', fontWeight: 600, fontSize: '14px' }}>
                                        Only {skills.length} skill{skills.length === 1 ? '' : 's'} added
                                    </p>
                                    <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
                                        Add at least 3 skills for accurate career matching.
                                    </p>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => { setSkillWarning(false); setStep(3) }}
                                            style={{
                                                background: 'rgba(245,158,11,0.2)',
                                                color: '#fbbf24',
                                                border: '1px solid rgba(245,158,11,0.3)',
                                                borderRadius: '8px',
                                                padding: '6px 14px',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Continue anyway
                                        </button>
                                        <button
                                            onClick={() => setSkillWarning(false)}
                                            style={{
                                                background: 'transparent',
                                                color: '#64748b',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px',
                                                padding: '6px 14px',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Add more skills
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
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
                                onClick={() => {
                                    if (skills.length === 0) {
                                        setSkillWarning('empty')
                                        return
                                    }
                                    if (skills.length < 3) {
                                        setSkillWarning('few')
                                        return
                                    }
                                    setStep(3)
                                }}
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