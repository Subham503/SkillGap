'use client';

import { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';

// ─── Matrix Background Canvas ─────────────────────────────
function MatrixBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Characters to display
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF{}[]<>/\\|;:'.split('');

        const fontSize = 13;
        let columns, drops;

        function init() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        }

        function draw() {
            // Fade effect — very subtle trail
            ctx.fillStyle = 'rgba(7, 11, 22, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Character color — very dim blue/teal
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, i) => {
                // Leading char slightly brighter
                const isHead = Math.random() > 0.97;
                ctx.fillStyle = isHead
                    ? 'rgba(99, 179, 237, 0.25)'  // bright blue head
                    : 'rgba(59, 130, 246, 0.06)'; // very dim blue body

                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, y * fontSize);

                // Reset drop randomly near bottom
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        }

        init();
        const interval = setInterval(draw, 55);
        const onResize = () => { init(); };
        window.addEventListener('resize', onResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
}

// ─── Google "G" SVG Icon ──────────────────────────────────
function GoogleIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

// ─── Login Page ───────────────────────────────────────────
export default function LoginPage() {
    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/dashboard' });
    };

    return (
        <div
            style={{
                minHeight: '100dvh',
                background: '#070b16',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '1.5rem',
            }}
        >
            {/* Subtle matrix background */}
            <MatrixBackground />

            {/* Ambient glow */}
            <div
                aria-hidden
                style={{
                    position: 'fixed',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '400px',
                    background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            {/* Login Card */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    maxWidth: '420px',
                    background: 'rgba(13, 21, 38, 0.85)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                    borderRadius: '1.5rem',
                    padding: 'clamp(2rem, 5vw, 2.75rem)',
                    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.03)',
                    animation: 'fadeIn 0.5s ease both',
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚡</span>
                    <span
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1.125rem',
                            background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Skill Gap
                    </span>
                </div>

                {/* Heading */}
                <h1
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: '#f1f5f9',
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                    }}
                >
                    Welcome to Skill Gap
                </h1>

                {/* Subtext */}
                <p
                    style={{
                        fontSize: '0.9375rem',
                        color: 'var(--text-muted)',
                        marginBottom: '2rem',
                        lineHeight: 1.6,
                    }}
                >
                    Sign in to discover your career path
                </p>

                {/* Divider */}
                <div
                    style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)',
                        marginBottom: '2rem',
                    }}
                />

                {/* Google Sign In Button */}
                <button
                    onClick={handleGoogleSignIn}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        background: '#fff',
                        color: '#1a1a2e',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        padding: '0.8125rem 1.5rem',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 150ms ease, box-shadow 150ms ease, transform 250ms cubic-bezier(0.34,1.56,0.64,1)',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f1f5f9';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,130,246,0.25)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <GoogleIcon />
                    Continue with Google
                </button>

                {/* Legal text */}
                <p
                    style={{
                        marginTop: '1.25rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-faint)',
                        textAlign: 'center',
                        lineHeight: 1.6,
                    }}
                >
                    By continuing, you agree to our{' '}
                    <a href="#" style={{ color: 'var(--color-blue-light)', textDecoration: 'underline' }}>
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" style={{ color: 'var(--color-blue-light)', textDecoration: 'underline' }}>
                        Privacy Policy
                    </a>
                    .
                </p>

                {/* Back to home */}
                <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
                    <a
                        href="/"
                        style={{
                            fontSize: '0.8125rem',
                            color: 'var(--text-faint)',
                            textDecoration: 'none',
                            transition: 'color 150ms',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = 'var(--text-muted)')}
                        onMouseLeave={(e) => (e.target.style.color = 'var(--text-faint)')}
                    >
                        ← Back to home
                    </a>
                </div>
            </div>
        </div>
    );
}
