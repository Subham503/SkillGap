import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

// ─── Google Fonts ──────────────────────────────────────────
const syne = Syne({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-syne',
    display: 'swap',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-dm-sans',
    display: 'swap',
});

// ─── Metadata ──────────────────────────────────────────────
export const metadata = {
    title: 'Skill Gap | AI Career Intelligence',
    description:
        'Discover your skill gaps, match with ideal careers, and get an AI-powered personalized learning plan.',
    keywords: ['skill gap', 'career intelligence', 'AI career', 'learning plan', 'career match'],
    openGraph: {
        title: 'Skill Gap | AI Career Intelligence',
        description: 'AI-powered career intelligence for students.',
        type: 'website',
    },
};

// ─── Root Layout ───────────────────────────────────────────
export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
            <body style={{ background: 'var(--color-bg)' }}>
                <Providers>
                    <Navbar />
                    <main style={{ paddingTop: '64px' }}>
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
