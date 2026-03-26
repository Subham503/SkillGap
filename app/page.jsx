'use client';

import { useState, useEffect } from 'react';

// ─── Feature Cards Data ────────────────────────────────────
const FEATURES = [
    {
        icon: '🧠',
        title: 'Smart Assessment',
        description:
            'Rate your proficiency across 70+ in-demand skills. Our adaptive engine builds a precise picture of where you stand today.',
        badge: 'AI-Powered',
        badgeClass: 'badge-blue',
        accentColor: 'var(--color-blue)',
        glowColor: 'rgba(59, 130, 246, 0.08)',
        href: '/login?callbackUrl=/assessment',
    },
    {
        icon: '🎯',
        title: 'Career Match',
        description:
            'Get matched to 20+ career paths based on your actual skill profile. See your compatibility score and exact gaps to bridge.',
        badge: 'Personalized',
        badgeClass: 'badge-green',
        accentColor: 'var(--color-green)',
        glowColor: 'rgba(34, 197, 94, 0.08)',
        href: '/login?callbackUrl=/results',
    },
    {
        icon: '🤖',
        title: 'AI Coach',
        description:
            'Your personal AI career coach crafts a day-by-day learning plan with curated resources tailored to close your gaps fast.',
        badge: 'AI Powered',
        badgeClass: 'badge-purple',
        accentColor: 'var(--color-purple)',
        glowColor: 'rgba(168, 85, 247, 0.08)',
        href: '/login?callbackUrl=/results#coach',
    },
];

// ─── Stat Counter ──────────────────────────────────────────
const STATS = [
    { value: '70+', label: 'Skills Tracked' },
    { value: '20+', label: 'Career Paths' },
    { value: '100%', label: 'Free to Start' },
];

// ─── Animated Number (simple mount animation) ──────────────
function StatItem({ value, label }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(t);
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, var(--color-blue-light), var(--color-purple-light))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
            >
                {value}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {label}
            </div>
        </div>
    );
}

// ─── Landing Page ──────────────────────────────────────────
export default function LandingPage() {
    return (
        <div style={{ overflow: 'hidden' }}>

            {/* ── HERO ──────────────────────────────────────────── */}
            <section
                className="bg-grid"
                style={{
                    minHeight: 'calc(100dvh - 64px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '5rem 1.5rem 4rem',
                    position: 'relative',
                }}
            >
                {/* Ambient glow orbs */}
                <div
                    aria-hidden
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '600px',
                        height: '400px',
                        background:
                            'radial-gradient(ellipse at center, rgba(59,130,246,0.13) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        filter: 'blur(2px)',
                    }}
                />
                <div
                    aria-hidden
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '10%',
                        width: '300px',
                        height: '300px',
                        background:
                            'radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Eyebrow pill */}
                <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                    <span
                        className="badge badge-blue"
                        style={{ fontSize: '0.8125rem', padding: '0.375rem 0.875rem' }}
                    >
                        ✨ AI-Powered Career Intelligence
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="animate-fade-in delay-1"
                    style={{
                        maxWidth: '760px',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                    }}
                >
                    Discover Your{' '}
                    <span
                        style={{
                            background: 'linear-gradient(135deg, var(--color-blue-light) 0%, var(--color-purple-light) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Skill Gap
                    </span>
                </h1>

                {/* Subtext */}
                <p
                    className="animate-fade-in delay-2"
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'var(--text-muted)',
                        maxWidth: '560px',
                        marginBottom: '2.5rem',
                        lineHeight: 1.7,
                    }}
                >
                    AI-powered career intelligence for students.
                    Find your perfect career match, close your gaps, and launch your dream role.
                </p>

                {/* CTA Buttons */}
                <div
                    className="animate-fade-in delay-3"
                    style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    <a
                        href="/login"
                        className="btn btn-primary btn-lg"
                        style={{ boxShadow: '0 4px 24px rgba(59,130,246,0.35)' }}
                    >
                        Get Started Free →
                    </a>
                    <a href="/login?callbackUrl=/resume" className="btn btn-secondary btn-lg">
                        📄 Analyze Resume
                    </a>
                </div>

                {/* Trust note */}
                <p
                    className="animate-fade-in delay-4"
                    style={{
                        marginTop: '2rem',
                        fontSize: '0.8125rem',
                        color: 'var(--text-faint)',
                    }}
                >
                    No credit card required · Free forever plan
                </p>

                {/* Stats row */}
                <div
                    className="animate-fade-in delay-5"
                    style={{
                        display: 'flex',
                        gap: 'clamp(2rem, 6vw, 5rem)',
                        marginTop: '4rem',
                        padding: '2rem 3rem',
                        background: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xl)',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    {STATS.map((s) => (
                        <StatItem key={s.label} {...s} />
                    ))}
                </div>
            </section>

            {/* ── FEATURES ──────────────────────────────────────── */}
            <section
                id="features"
                style={{
                    padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
                    maxWidth: '1280px',
                    margin: '0 auto',
                }}
            >
                {/* Section header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <p className="section-label">How It Works</p>
                    <h2 style={{ marginBottom: '1rem' }}>
                        Everything you need to{' '}
                        <span className="gradient-text">level up</span>
                    </h2>
                    <p
                        style={{
                            fontSize: '1.0625rem',
                            color: 'var(--text-muted)',
                            maxWidth: '480px',
                            margin: '0 auto',
                        }}
                    >
                        Three powerful modules that work together to guide your career journey from where you are to where you want to be.
                    </p>
                </div>

                {/* Cards grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {FEATURES.map((f, i) => (
                        <div
                            key={f.title}
                            className="card animate-fade-in"
                            style={{
                                animationDelay: `${i * 0.12}s`,
                                background: `linear-gradient(135deg, var(--color-card) 60%, ${f.glowColor})`,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            {/* Icon */}
                            <div
                                style={{
                                    width: '52px',
                                    height: '52px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.625rem',
                                    background: `${f.glowColor}`,
                                    border: `1px solid ${f.accentColor}30`,
                                    borderRadius: 'var(--radius-lg)',
                                    flexShrink: 0,
                                }}
                            >
                                {f.icon}
                            </div>

                            {/* Badge */}
                            <span className={`badge ${f.badgeClass}`} style={{ alignSelf: 'flex-start' }}>
                                {f.badge}
                            </span>

                            {/* Content */}
                            <div>
                                <h3
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        marginBottom: '0.625rem',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    {f.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                                    {f.description}
                                </p>
                            </div>

                            {/* Learn more link */}
                            <a
                                href={f.href}
                                style={{
                                    marginTop: 'auto',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: f.accentColor,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.375rem',
                                    transition: 'gap var(--transition-fast)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.gap = '0.625rem')}
                                onMouseLeave={(e) => (e.currentTarget.style.gap = '0.375rem')}
                            >
                                Learn more →
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PROCESS STEPS ─────────────────────────────────── */}
            <section
                style={{
                    padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
                    background: 'var(--color-card)',
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                }}
            >
                <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="section-label">The Journey</p>
                        <h2>
                            From <span className="gradient-text-green">assessment</span> to career
                        </h2>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '2rem',
                            position: 'relative',
                        }}
                    >
                        {[
                            { step: '01', title: 'Rate Your Skills', desc: 'Self-assess 70+ skills across tech, data, design, and soft skills.', color: 'var(--color-blue)' },
                            { step: '02', title: 'Pick a Career', desc: 'Browse 20+ career paths and choose your target destination.', color: 'var(--color-purple)' },
                            { step: '03', title: 'See Your Gaps', desc: 'Get a precise gap score and ranked list of skills to focus on.', color: 'var(--color-green)' },
                            { step: '04', title: 'Follow Your Plan', desc: 'Get a personalized AI learning plan and track your progress.', color: 'var(--color-amber)' },
                        ].map((step, i) => (
                            <div
                                key={step.step}
                                style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', alignItems: 'flex-start' }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '2.5rem',
                                        fontWeight: 800,
                                        color: step.color,
                                        opacity: 0.25,
                                        lineHeight: 1,
                                    }}
                                >
                                    {step.step}
                                </div>
                                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                    {step.title}
                                </h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ────────────────────────────────────── */}
            <section
                style={{
                    padding: 'clamp(4rem, 8vw, 6rem) 1.5rem',
                    maxWidth: '860px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                {/* Decorative border card */}
                <div
                    style={{
                        position: 'relative',
                        padding: 'clamp(2.5rem, 5vw, 4rem)',
                        borderRadius: 'var(--radius-2xl)',
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(168,85,247,0.07) 100%)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        overflow: 'hidden',
                    }}
                >
                    {/* Glow top-right */}
                    <div
                        aria-hidden
                        style={{
                            position: 'absolute',
                            top: '-60px',
                            right: '-60px',
                            width: '240px',
                            height: '240px',
                            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }}
                    />

                    <p className="section-label" style={{ marginBottom: '1rem' }}>Start Today</p>

                    <h2 style={{ marginBottom: '1rem' }}>
                        Ready to find{' '}
                        <span className="gradient-text">your path?</span>
                    </h2>

                    <p
                        style={{
                            fontSize: '1.0625rem',
                            color: 'var(--text-muted)',
                            maxWidth: '440px',
                            margin: '0 auto 2.25rem',
                            lineHeight: 1.7,
                        }}
                    >
                        Join students who are closing their skill gaps and landing roles they love.
                        It takes less than 5 minutes to get started.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
                            href="/login?callbackUrl=/assessment"
                            className="btn btn-primary btn-lg"
                            style={{ boxShadow: '0 4px 24px rgba(59,130,246,0.4)' }}
                        >
                            Start Free Assessment →
                        </a>
                        <a href="#" className="btn btn-secondary btn-lg">
                            See All Careers
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ────────────────────────────────────────── */}
            <footer
                style={{
                    borderTop: '1px solid var(--color-border-muted)',
                    padding: '2rem 1.5rem',
                }}
            >
                <div
                    className="container"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>⚡</span>
                        <span
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: '0.9375rem',
                                color: 'var(--text-muted)',
                            }}
                        >
                            Skill Gap
                        </span>
                    </div>

                    {/* Copyright */}
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-faint)', margin: 0 }}>
                        © {new Date().getFullYear()} Skill Gap. All rights reserved.
                    </p>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy', 'Terms', 'Contact'].map((link) => (
                            <a
                                key={link}
                                href="#"
                                style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--text-faint)',
                                    textDecoration: 'none',
                                    transition: 'color var(--transition-fast)',
                                }}
                                onMouseEnter={(e) => (e.target.style.color = 'var(--text-secondary)')}
                                onMouseLeave={(e) => (e.target.style.color = 'var(--text-faint)')}
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

        </div>
    );
}
