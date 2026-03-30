'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const NAV_LINKS = [
    { label: 'Features', path: '#features' },
    { label: 'AI Coach', path: '/results#coach' },
    { label: 'Resume', path: '/resume' },
    { label: 'Assessment', path: '/assessment' },
];

export default function Navbar() {
    const { data: session, status } = useSession();
    const [hovered, setHovered] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const isLoading = status === 'loading';
    const isLoggedIn = !!session?.user;

    const getLink = (path) => {
        if (path.startsWith('#')) return path; // Anchors
        if (isLoggedIn) return path;
        return `/login?callbackUrl=${encodeURIComponent(path)}`;
    };

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                background: 'rgba(7, 11, 22, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--color-border-muted)',
            }}
        >
            <div
                className="container"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '64px',
                }}
            >
                {/* ── Logo ─────────────────────────────────────── */}
                <a
                    href="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                    }}
                >
                    <span style={{ fontSize: '1.375rem' }}>⚡</span>
                    <span
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1.1875rem',
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Skill Gap
                    </span>
                </a>

                {/* ── Nav Links (desktop) ───────────────────────── */}
                <nav
                    className="hide-mobile"
                    style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
                >
                    {NAV_LINKS.map((item) => (
                        <a
                            key={item.label}
                            href={getLink(item.path)}
                            onMouseEnter={() => setHovered(item.label)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                color: hovered === item.label ? 'var(--text-primary)' : 'var(--text-muted)',
                                textDecoration: 'none',
                                transition: 'color 150ms ease',
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* ── Auth Area ─────────────────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {isLoading ? (
                        /* Skeleton placeholder while session loads */
                        <div
                            className="skeleton"
                            style={{ width: '100px', height: '34px', borderRadius: '9999px' }}
                        />
                    ) : isLoggedIn ? (
                        /* Logged-in: avatar + name + dropdown */
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setMenuOpen((o) => !o)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'var(--color-card)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '9999px',
                                    padding: '0.25rem 0.75rem 0.25rem 0.25rem',
                                    cursor: 'pointer',
                                    transition: 'border-color 150ms',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-blue)')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                            >
                                {/* Avatar */}
                                {session.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name ?? 'User'}
                                        width={28}
                                        height={28}
                                        style={{ borderRadius: '50%', flexShrink: 0 }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            background: 'var(--color-blue)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            color: '#fff',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {(session.user.name ?? 'U')[0].toUpperCase()}
                                    </div>
                                )}
                                {/* Name */}
                                <span
                                    className="hide-mobile"
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: 'var(--text-primary)',
                                        maxWidth: '120px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {session.user.name?.split(' ')[0]}
                                </span>
                                {/* Chevron */}
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    style={{
                                        transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 200ms ease',
                                        flexShrink: 0,
                                    }}
                                >
                                    <path d="M2 4l4 4 4-4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {menuOpen && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 8px)',
                                        right: 0,
                                        minWidth: '180px',
                                        background: 'var(--color-card)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-lg)',
                                        overflow: 'hidden',
                                        animation: 'scaleIn 0.15s ease both',
                                        transformOrigin: 'top right',
                                    }}
                                >
                                    {[
                                        { label: '📊 Dashboard', href: '/dashboard' },
                                        { label: '🎯 Assess Skills', href: '/assessment' },
                                        { label: '📄 Resume', href: '/resume' },
                                    ].map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            style={{
                                                display: 'block',
                                                padding: '0.6875rem 1rem',
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                                textDecoration: 'none',
                                                transition: 'background 100ms, color 100ms',
                                                borderBottom: '1px solid var(--color-border-muted)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--color-blue-glow)';
                                                e.currentTarget.style.color = 'var(--text-primary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.color = 'var(--text-secondary)';
                                            }}
                                        >
                                            {item.label}
                                        </a>
                                    ))}

                                    {/* Sign out */}
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '0.6875rem 1rem',
                                            fontSize: '0.875rem',
                                            color: 'var(--color-red-light)',
                                            textAlign: 'left',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'background 100ms',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-red-glow)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                    >
                                        🚪 Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Not logged in: Sign In button */
                        <a href="/login" className="btn btn-primary btn-sm">
                            Sign In
                        </a>
                    )}
                </div>
            </div>
        </header >
    );
}
