'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QUICK_SKILLS = [
    // Programming Languages
    'python', 'javascript', 'java', 'c', 'c++', 'c#', 'typescript',
    'kotlin', 'swift', 'go', 'rust', 'php', 'ruby', 'scala', 'r',
    'matlab', 'perl', 'haskell', 'elixir', 'dart', 'lua', 'julia',
    'assembly', 'cobol', 'fortran', 'groovy', 'clojure', 'erlang',

    // Frontend
    'react', 'nextjs', 'vue', 'nuxtjs', 'angular', 'svelte',
    'html', 'css', 'sass', 'tailwind', 'bootstrap', 'materialui',
    'jquery', 'redux', 'graphql', 'webpack', 'vite', 'babel',
    'storybook', 'framer-motion', 'threejs', 'webgl', 'pwa',

    // Backend
    'nodejs', 'express', 'nestjs', 'django', 'flask', 'fastapi',
    'spring', 'springboot', 'laravel', 'rails', 'aspnet', 'gin',
    'fiber', 'phoenix', 'strapi', 'hasura', 'graphql-server',

    // Mobile
    'react-native', 'flutter', 'android', 'ios', 'swift-ui',
    'jetpack-compose', 'xamarin', 'ionic', 'cordova', 'expo',

    // Database
    'sql', 'mysql', 'postgresql', 'sqlite', 'mongodb', 'redis',
    'cassandra', 'dynamodb', 'firebase', 'supabase', 'neo4j',
    'elasticsearch', 'couchdb', 'influxdb', 'mariadb', 'oracle-db',
    'snowflake', 'bigquery', 'prisma', 'sequelize', 'mongoose',

    // Cloud & DevOps
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
    'ansible', 'jenkins', 'github-actions', 'circleci', 'gitlab-ci',
    'linux', 'bash', 'powershell', 'nginx', 'apache', 'vercel',
    'netlify', 'heroku', 'digitalocean', 'cloudflare', 'pulumi',
    'vagrant', 'prometheus', 'grafana', 'elk-stack', 'istio',

    // AI & Machine Learning
    'machine-learning', 'deep-learning', 'nlp', 'computer-vision',
    'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'opencv',
    'huggingface', 'langchain', 'openai-api', 'stable-diffusion',
    'reinforcement-learning', 'data-science', 'feature-engineering',
    'model-deployment', 'mlops', 'llm', 'rag', 'fine-tuning',

    // Data & Analytics
    'pandas', 'numpy', 'matplotlib', 'seaborn', 'plotly',
    'tableau', 'powerbi', 'looker', 'excel', 'google-analytics',
    'statistics', 'data-analysis', 'data-visualization',
    'data-engineering', 'etl', 'apache-spark', 'hadoop', 'kafka',
    'airflow', 'dbt', 'data-warehousing', 'business-intelligence',

    // Cybersecurity
    'network-security', 'penetration-testing', 'ethical-hacking',
    'cryptography', 'soc', 'siem', 'vulnerability-assessment',
    'owasp', 'firewalls', 'vpn', 'iam', 'zero-trust',
    'malware-analysis', 'incident-response', 'forensics', 'ctf',

    // Design & Creative
    'figma', 'adobe-xd', 'sketch', 'invision', 'zeplin',
    'photoshop', 'illustrator', 'indesign', 'after-effects',
    'premiere-pro', 'blender', 'cinema4d', 'canva',
    'ui-design', 'ux-design', 'ux-research', 'wireframing',
    'prototyping', 'design-systems', 'accessibility', 'motion-design',

    // Testing & QA
    'unit-testing', 'integration-testing', 'e2e-testing',
    'jest', 'cypress', 'selenium', 'playwright', 'pytest',
    'junit', 'testng', 'postman', 'k6', 'jmeter', 'tdd', 'bdd',

    // Blockchain & Web3
    'blockchain', 'solidity', 'ethereum', 'web3js', 'ethersjs',
    'smart-contracts', 'nft', 'defi', 'hardhat', 'truffle',
    'ipfs', 'polygon', 'solana', 'rust-blockchain',

    // Game Development
    'unity', 'unreal-engine', 'godot', 'game-design',
    'c++-games', 'opengl', 'directx', 'vulkan', 'ar', 'vr',
    'xr', 'game-physics', 'shader-programming',

    // Project Management & Soft Skills
    'agile', 'scrum', 'kanban', 'jira', 'confluence', 'trello',
    'project-management', 'product-management', 'roadmapping',
    'stakeholder-management', 'risk-management', 'pmp',

    // Communication & Leadership
    'communication', 'leadership', 'teamwork', 'mentoring',
    'public-speaking', 'technical-writing', 'documentation',
    'problem-solving', 'critical-thinking', 'decision-making',
    'negotiation', 'conflict-resolution', 'emotional-intelligence',

    // Business & Marketing
    'business-analysis', 'market-research', 'seo', 'sem',
    'social-media-marketing', 'content-marketing', 'email-marketing',
    'growth-hacking', 'crm', 'salesforce', 'hubspot',
    'financial-modeling', 'excel-advanced', 'powerpoint',

    // Networking
    'tcp-ip', 'dns', 'http', 'rest-api', 'grpc', 'websockets',
    'microservices', 'system-design', 'load-balancing',
    'cdn', 'oauth', 'jwt', 'api-design', 'swagger',

    // Embedded & IoT
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
    const [cgpa, setCgpa] = useState(3.0)
    const [education, setEducation] = useState("Bachelor's")
    const [skillInput, setSkillInput] = useState('')
    const [skills, setSkills] = useState([])
    // skills is now array of { name, level }
    // e.g. [{ name: 'python', level: 'intermediate' }]
    const [aptitude, setAptitude] = useState(
        Object.fromEntries(APTITUDE_DIMS.map(d => [d, 50]))
    )

    const addSkill = (s) => {
        const val = s.trim().toLowerCase()
        if (val && !skills.find(sk => sk.name === val)) {
            setSkills([...skills, { name: val, level: 'intermediate' }])
        }
        setSkillInput('')
    }

    const removeSkill = (name) =>
        setSkills(skills.filter(x => x.name !== name))

    const updateSkillLevel = (name, level) =>
        setSkills(skills.map(sk =>
            sk.name === name ? { ...sk, level } : sk
        ))

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
                        {/* Search Input with Autocomplete */}
                        <div style={{ position: 'relative', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    value={skillInput}
                                    onChange={e => setSkillInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && skillInput.trim()) addSkill(skillInput)
                                        if (e.key === 'Escape') setSkillInput('')
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
                            {skillInput.trim().length > 0 && (
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
                                    {QUICK_SKILLS
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
                                        .map(s => (
                                            <div
                                                key={s}
                                                onClick={() => { addSkill(s); setSkillInput('') }}
                                                style={{
                                                    padding: '10px 16px',
                                                    cursor: 'pointer',
                                                    color: '#e2e8f0',
                                                    fontSize: '14px',
                                                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                                                    transition: 'background 0.15s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <span style={{ color: '#3b82f6' }}>+</span>
                                                {s}
                                            </div>
                                        ))
                                    }
                                    {/* Allow custom skill if not in list */}
                                    {!QUICK_SKILLS.some(s => s.toLowerCase() === skillInput.toLowerCase()) && (
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

                        {/* Popular Skills — show only when input is empty */}
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
                                                    background: skills.find(sk => sk.name === s) ? 'rgba(59,130,246,0.2)'
                                                        : 'rgba(255,255,255,0.04)',
                                                    color: skills.find(sk => sk.name === s) ? '#60a5fa' : '#94a3b8',
                                                    border: `1px solid skills.find(sk => sk.name === s) ?
                                                         'rgba(59,130,246,0.3)'
                                                        : 'rgba(255,255,255,0.08)'}`,
                                                    borderRadius: '999px',
                                                    padding: '6px 14px',
                                                    fontSize: '13px',
                                                    cursor: skills.includes(s) ? 'default' : 'pointer',
                                                    transition: 'all 0.2s',
                                                }}
                                            >
                                                {skills.includes(s) ? '✓' : '+'} {s}
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
                                marginBottom: '24px',
                            }}>
                                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>
                                    Rate your proficiency for each skill:
                                </p>
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