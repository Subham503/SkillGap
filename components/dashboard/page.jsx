'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    if (status === 'loading') {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#070b16',
            }}>
                <p style={{ color: '#94a3b8' }}>Loading...</p>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#070b16',
            paddingTop: '80px',
            padding: '80px 32px 48px',
            maxWidth: '1100px',
            margin: '0 auto',
        }}>
            {/* Welcome */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '36px',
                    fontWeight: 800,
                    color: 'white',
                    marginBottom: '8px',
                }}>
                    Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '16px' }}>
                    Ready to discover your perfect career path?
                </p>
            </div>

            {/* Quick Action Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '48px',
            }}>
                {[
                    {
                        icon: '🎯',
                        title: 'Start Assessment',
                        desc: 'Discover your career compatibility score',
                        href: '/assessment',
                        color: '#3b82f6',
                    },
                    {
                        icon: '📄',
                        title: 'Resume Analyzer',
                        desc: 'Get your ATS score and improvements',
                        href: '/resume',
                        color: '#22c55e',
                        badge: 'NEW',
                    },
                    {
                        icon: '🤖',
                        title: 'AI Career Coach',
                        desc: 'Chat with your personal AI coach',
                        href: '/results',
                        color: '#a855f7',
                    },
                ].map((card) => (
                    <div
                        key={card.title}
                        onClick={() => router.push(card.href)}
                        style={{
                            background: '#0d1526',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '12px',
                            padding: '24px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = card.color + '40'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                            {card.icon}
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '6px',
                        }}>
                            <h3 style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                color: 'white',
                            }}>
                                {card.title}
                            </h3>
                            {card.badge && (
                                <span style={{
                                    fontSize: '10px',
                                    padding: '2px 8px',
                                    borderRadius: '999px',
                                    background: 'rgba(59,130,246,0.2)',
                                    color: '#60a5fa',
                                    fontWeight: 600,
                                }}>
                                    {card.badge}
                                </span>
                            )}
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                            {card.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* User Info Card */}
            <div style={{
                background: '#0d1526',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
            }}>
                {session?.user?.image && (
                    <img
                        src={session.user.image}
                        alt="avatar"
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                        }}
                    />
                )}
                <div>
                    <p style={{ fontWeight: 700, color: 'white' }}>
                        {session?.user?.name}
                    </p>
                    <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                        {session?.user?.email}
                    </p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <span style={{
                        padding: '4px 12px',
                        borderRadius: '999px',
                        background: 'rgba(34,197,94,0.15)',
                        color: '#22c55e',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: '1px solid rgba(34,197,94,0.3)',
                    }}>
                        ✓ Logged In
                    </span>
                </div>
            </div>
        </div>
    )
}