/**
 * constants/careers.js
 *
 * Master career catalog for the SkillGap app.
 * Each career defines the skill requirements used for gap analysis.
 *
 * Skill level scale (same as skills.js):
 *   0 = None  1 = Beginner  2 = Intermediate  3 = Advanced  4 = Expert
 */

// ─── Career Domains ───────────────────────────────────────────────────────────
export const CAREER_DOMAINS = {
    SOFTWARE: { id: 'software', label: 'Software Engineering', icon: '💻', color: '#3b82f6' },
    DATA: { id: 'data', label: 'Data & Analytics', icon: '📊', color: '#8b5cf6' },
    AI_ML: { id: 'ai_ml', label: 'AI & Machine Learning', icon: '🤖', color: '#6366f1' },
    CLOUD: { id: 'cloud', label: 'Cloud & DevOps', icon: '☁️', color: '#06b6d4' },
    SECURITY: { id: 'security', label: 'Cybersecurity', icon: '🔒', color: '#ef4444' },
    MOBILE: { id: 'mobile', label: 'Mobile Development', icon: '📱', color: '#22c55e' },
    DESIGN: { id: 'design', label: 'Design & Product', icon: '🎨', color: '#f59e0b' },
    MANAGEMENT: { id: 'management', label: 'Engineering Management', icon: '📋', color: '#ec4899' },
};

// ─── Experience Levels ─────────────────────────────────────────────────────────
export const EXPERIENCE_LEVELS = {
    JUNIOR: { id: 'junior', label: 'Junior', years: '0–2 yrs', color: '#22c55e' },
    MID: { id: 'mid', label: 'Mid-level', years: '2–5 yrs', color: '#3b82f6' },
    SENIOR: { id: 'senior', label: 'Senior', years: '5–8 yrs', color: '#f59e0b' },
    LEAD: { id: 'lead', label: 'Lead / Staff', years: '8+ yrs', color: '#a855f7' },
    PRINCIPAL: { id: 'principal', label: 'Principal', years: '10+ yrs', color: '#ef4444' },
};

// ─── Master Career List ───────────────────────────────────────────────────────
export const CAREERS = [

    // ══════════════════════════════════════════════════════════
    // SOFTWARE ENGINEERING
    // ══════════════════════════════════════════════════════════
    {
        id: 'frontend_engineer',
        title: 'Frontend Engineer',
        domain: 'software',
        level: 'mid',
        icon: '🎨',
        salary: { min: 70000, max: 130000, currency: 'USD' },
        demandTrend: 'rising',        // 'rising' | 'stable' | 'declining'
        description:
            'Build user-facing web experiences using modern JavaScript frameworks, performance optimization, and accessibility best practices.',
        tags: ['react', 'javascript', 'web', 'ui'],
        requiredSkills: {
            html_css: 3,
            javascript: 3,
            typescript: 2,
            react: 3,
            nextjs: 2,
            tailwind: 2,
            graphql: 2,
            git: 3,
            communication: 2,
            problem_solving: 3,
        },
    },

    {
        id: 'backend_engineer',
        title: 'Backend Engineer',
        domain: 'software',
        level: 'mid',
        icon: '⚙️',
        salary: { min: 80000, max: 140000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Design and maintain server-side systems, APIs, databases, and scalable services that power modern applications.',
        tags: ['api', 'databases', 'servers', 'scalability'],
        requiredSkills: {
            javascript: 2,
            nodejs: 3,
            python: 2,
            rest_api: 3,
            postgresql: 3,
            mongodb: 2,
            redis: 2,
            docker: 2,
            git: 3,
            system_design: 2,
            problem_solving: 3,
        },
    },

    {
        id: 'fullstack_engineer',
        title: 'Full Stack Engineer',
        domain: 'software',
        level: 'mid',
        icon: '🌐',
        salary: { min: 85000, max: 150000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Own the entire product layer — from polished UIs to well-architected backends and databases.',
        tags: ['frontend', 'backend', 'react', 'node'],
        requiredSkills: {
            html_css: 3,
            javascript: 3,
            typescript: 2,
            react: 3,
            nextjs: 2,
            nodejs: 3,
            rest_api: 3,
            postgresql: 2,
            mongodb: 2,
            docker: 2,
            git: 3,
            problem_solving: 3,
        },
    },

    {
        id: 'senior_software_engineer',
        title: 'Senior Software Engineer',
        domain: 'software',
        level: 'senior',
        icon: '🏆',
        salary: { min: 130000, max: 200000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Lead technical decisions, mentor junior engineers, and deliver high-impact features with reliable architecture.',
        tags: ['leadership', 'architecture', 'mentoring'],
        requiredSkills: {
            javascript: 4,
            typescript: 3,
            react: 4,
            nodejs: 4,
            rest_api: 4,
            postgresql: 3,
            docker: 3,
            kubernetes: 2,
            system_design: 3,
            agile_scrum: 3,
            communication: 3,
            tech_leadership: 2,
        },
    },

    // ══════════════════════════════════════════════════════════
    // DATA & ANALYTICS
    // ══════════════════════════════════════════════════════════
    {
        id: 'data_analyst',
        title: 'Data Analyst',
        domain: 'data',
        level: 'junior',
        icon: '📊',
        salary: { min: 55000, max: 100000, currency: 'USD' },
        demandTrend: 'stable',
        description:
            'Transform raw data into actionable insights using SQL, Python, and visualization tools to support business decisions.',
        tags: ['sql', 'excel', 'dashboards', 'reporting'],
        requiredSkills: {
            sql: 3,
            python: 2,
            pandas: 2,
            statistics: 2,
            data_visualization: 3,
            power_bi: 2,
            communication: 3,
            problem_solving: 2,
        },
    },

    {
        id: 'data_scientist',
        title: 'Data Scientist',
        domain: 'data',
        level: 'mid',
        icon: '🔬',
        salary: { min: 90000, max: 160000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Build predictive models, run experiments, and extract deep insights from complex datasets to drive strategy.',
        tags: ['ml', 'python', 'statistics', 'modeling'],
        requiredSkills: {
            python: 4,
            sql: 3,
            pandas: 3,
            numpy: 3,
            scikit_learn: 3,
            statistics: 4,
            data_visualization: 3,
            communication: 3,
            problem_solving: 4,
        },
    },

    {
        id: 'data_engineer',
        title: 'Data Engineer',
        domain: 'data',
        level: 'mid',
        icon: '🔧',
        salary: { min: 95000, max: 160000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Build and maintain robust data pipelines, warehouses, and infrastructure that make data accessible and reliable.',
        tags: ['pipelines', 'etl', 'spark', 'sql'],
        requiredSkills: {
            python: 3,
            sql: 4,
            spark: 3,
            postgresql: 3,
            mongodb: 2,
            aws: 2,
            docker: 2,
            git: 3,
            problem_solving: 3,
        },
    },

    // ══════════════════════════════════════════════════════════
    // AI & MACHINE LEARNING
    // ══════════════════════════════════════════════════════════
    {
        id: 'ml_engineer',
        title: 'Machine Learning Engineer',
        domain: 'ai_ml',
        level: 'mid',
        icon: '🤖',
        salary: { min: 110000, max: 180000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Build, train, and deploy production-grade ML systems at scale, bridging the gap between research and real-world impact.',
        tags: ['pytorch', 'python', 'mlops', 'deployment'],
        requiredSkills: {
            python: 4,
            pytorch: 3,
            scikit_learn: 3,
            sql: 2,
            docker: 3,
            mlops: 3,
            aws: 2,
            statistics: 3,
            problem_solving: 4,
        },
    },

    {
        id: 'ai_researcher',
        title: 'AI Research Scientist',
        domain: 'ai_ml',
        level: 'senior',
        icon: '🧠',
        salary: { min: 140000, max: 250000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Advance the field by publishing novel research, running experiments with large models, and innovating on algorithms.',
        tags: ['research', 'deep-learning', 'nlp', 'llms'],
        requiredSkills: {
            python: 4,
            pytorch: 4,
            tensorflow: 3,
            nlp: 4,
            computer_vision: 3,
            statistics: 4,
            llm_prompting: 3,
            communication: 3,
            problem_solving: 4,
        },
    },

    {
        id: 'ai_product_engineer',
        title: 'AI Product Engineer',
        domain: 'ai_ml',
        level: 'mid',
        icon: '⚡',
        salary: { min: 100000, max: 165000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Integrate LLMs and AI APIs into user-facing products, fine-tune prompts, and optimize AI-driven features.',
        tags: ['llm', 'prompt-engineering', 'api', 'product'],
        requiredSkills: {
            python: 3,
            javascript: 3,
            llm_prompting: 4,
            rest_api: 3,
            nodejs: 2,
            react: 2,
            problem_solving: 3,
            communication: 3,
        },
    },

    // ══════════════════════════════════════════════════════════
    // CLOUD & DEVOPS
    // ══════════════════════════════════════════════════════════
    {
        id: 'devops_engineer',
        title: 'DevOps Engineer',
        domain: 'cloud',
        level: 'mid',
        icon: '🔄',
        salary: { min: 90000, max: 155000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Automate infrastructure, build reliable CI/CD pipelines, and ensure systems scale smoothly in production.',
        tags: ['ci-cd', 'docker', 'kubernetes', 'automation'],
        requiredSkills: {
            linux: 3,
            docker: 3,
            kubernetes: 3,
            ci_cd: 4,
            aws: 3,
            terraform: 3,
            python: 2,
            git: 4,
            problem_solving: 3,
        },
    },

    {
        id: 'cloud_architect',
        title: 'Cloud Architect',
        domain: 'cloud',
        level: 'senior',
        icon: '☁️',
        salary: { min: 140000, max: 220000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Design enterprise cloud strategies, multi-region architectures, and cost-optimized infrastructure that is secure and resilient.',
        tags: ['aws', 'azure', 'architecture', 'enterprise'],
        requiredSkills: {
            aws: 4,
            gcp: 3,
            azure: 3,
            kubernetes: 4,
            terraform: 4,
            linux: 3,
            docker: 3,
            system_design: 4,
            communication: 3,
            tech_leadership: 3,
        },
    },

    {
        id: 'sre',
        title: 'Site Reliability Engineer',
        domain: 'cloud',
        level: 'mid',
        icon: '🛡️',
        salary: { min: 100000, max: 170000, currency: 'USD' },
        demandTrend: 'stable',
        description:
            'Ensure reliability, availability, and performance of production systems through SLOs, observability, and incident management.',
        tags: ['reliability', 'monitoring', 'kubernetes', 'slo'],
        requiredSkills: {
            linux: 3,
            python: 3,
            kubernetes: 3,
            aws: 3,
            docker: 3,
            ci_cd: 3,
            git: 3,
            problem_solving: 4,
            communication: 3,
        },
    },

    // ══════════════════════════════════════════════════════════
    // CYBERSECURITY
    // ══════════════════════════════════════════════════════════
    {
        id: 'security_engineer',
        title: 'Security Engineer',
        domain: 'security',
        level: 'mid',
        icon: '🔐',
        salary: { min: 95000, max: 160000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Protect systems and data by designing secure architectures, responding to threats, and conducting security reviews.',
        tags: ['appsec', 'encryption', 'cloud-security'],
        requiredSkills: {
            network_security: 3,
            crypto: 3,
            linux: 3,
            python: 2,
            aws: 2,
            problem_solving: 3,
            communication: 2,
        },
    },

    {
        id: 'penetration_tester',
        title: 'Penetration Tester',
        domain: 'security',
        level: 'mid',
        icon: '🎩',
        salary: { min: 85000, max: 145000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Simulate real-world attacks to uncover vulnerabilities in systems, networks, and applications before malicious actors do.',
        tags: ['offensive', 'bug-bounty', 'hacking'],
        requiredSkills: {
            ethical_hacking: 4,
            network_security: 3,
            linux: 4,
            python: 3,
            crypto: 2,
            problem_solving: 4,
            communication: 3,
        },
    },

    // ══════════════════════════════════════════════════════════
    // MOBILE DEVELOPMENT
    // ══════════════════════════════════════════════════════════
    {
        id: 'react_native_dev',
        title: 'React Native Developer',
        domain: 'mobile',
        level: 'mid',
        icon: '📱',
        salary: { min: 80000, max: 140000, currency: 'USD' },
        demandTrend: 'stable',
        description:
            'Build cross-platform iOS and Android apps using React Native, ensuring native-like performance and UX.',
        tags: ['cross-platform', 'ios', 'android', 'javascript'],
        requiredSkills: {
            javascript: 3,
            typescript: 2,
            react: 3,
            react_native: 4,
            rest_api: 2,
            git: 3,
            problem_solving: 3,
        },
    },

    {
        id: 'flutter_developer',
        title: 'Flutter Developer',
        domain: 'mobile',
        level: 'mid',
        icon: '🦋',
        salary: { min: 80000, max: 140000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Develop beautiful, high-performance cross-platform applications using Flutter and the Dart language.',
        tags: ['flutter', 'dart', 'cross-platform'],
        requiredSkills: {
            flutter: 4,
            rest_api: 2,
            firebase: 2,
            git: 3,
            problem_solving: 3,
        },
    },

    {
        id: 'ios_developer',
        title: 'iOS Developer',
        domain: 'mobile',
        level: 'mid',
        icon: '🍎',
        salary: { min: 100000, max: 165000, currency: 'USD' },
        demandTrend: 'stable',
        description:
            'Create polished, high-quality native iOS applications for Apple platforms using Swift and SwiftUI.',
        tags: ['swift', 'swiftui', 'apple', 'native'],
        requiredSkills: {
            swift: 4,
            ios_swift: 4,
            rest_api: 2,
            git: 3,
            problem_solving: 3,
        },
    },

    // ══════════════════════════════════════════════════════════
    // DESIGN & PRODUCT
    // ══════════════════════════════════════════════════════════
    {
        id: 'ui_ux_designer',
        title: 'UI/UX Designer',
        domain: 'design',
        level: 'mid',
        icon: '✏️',
        salary: { min: 65000, max: 120000, currency: 'USD' },
        demandTrend: 'stable',
        description:
            'Craft intuitive, beautiful digital experiences through user research, wireframing, prototyping, and testing.',
        tags: ['figma', 'research', 'prototyping', 'accessibility'],
        requiredSkills: {
            figma: 4,
            ux_research: 3,
            design_systems: 3,
            html_css: 2,
            communication: 3,
            problem_solving: 3,
        },
    },

    {
        id: 'product_manager',
        title: 'Product Manager',
        domain: 'design',
        level: 'mid',
        icon: '📋',
        salary: { min: 90000, max: 160000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Define product vision, prioritize the roadmap, and align engineering, design, and business teams to ship impactful products.',
        tags: ['roadmap', 'strategy', 'agile', 'stakeholders'],
        requiredSkills: {
            product_management: 4,
            agile_scrum: 3,
            communication: 4,
            problem_solving: 3,
            data_visualization: 2,
            figma: 2,
        },
    },

    // ══════════════════════════════════════════════════════════
    // ENGINEERING MANAGEMENT
    // ══════════════════════════════════════════════════════════
    {
        id: 'engineering_manager',
        title: 'Engineering Manager',
        domain: 'management',
        level: 'lead',
        icon: '👨‍💼',
        salary: { min: 150000, max: 250000, currency: 'USD' },
        demandTrend: 'stable',
        description:
            'Lead engineering teams, drive organizational alignment, remove blockers, and grow engineers to achieve business goals.',
        tags: ['leadership', 'people-management', 'strategy'],
        requiredSkills: {
            tech_leadership: 4,
            system_design: 3,
            agile_scrum: 4,
            communication: 4,
            problem_solving: 3,
            product_management: 3,
            javascript: 2,
        },
    },

    {
        id: 'staff_engineer',
        title: 'Staff Engineer',
        domain: 'management',
        level: 'lead',
        icon: '⭐',
        salary: { min: 170000, max: 280000, currency: 'USD' },
        demandTrend: 'rising',
        description:
            'Drive cross-team technical strategy, establish engineering standards, and solve the organization\'s hardest technical problems.',
        tags: ['architecture', 'influence', 'strategy'],
        requiredSkills: {
            system_design: 4,
            tech_leadership: 4,
            javascript: 3,
            python: 3,
            communication: 4,
            agile_scrum: 3,
            docker: 3,
            kubernetes: 3,
            problem_solving: 4,
        },
    },
];

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

/** Career lookup map by id */
export const CAREER_MAP = Object.fromEntries(CAREERS.map((c) => [c.id, c]));

/** Returns all careers in a given domain */
export const getCareersByDomain = (domainId) =>
    CAREERS.filter((c) => c.domain === domainId);

/** Returns all careers for a given experience level */
export const getCareersByLevel = (levelId) =>
    CAREERS.filter((c) => c.level === levelId);

/**
 * Filter careers by search query (title + tags + domain).
 * @param {string} query
 * @param {{ domain?: string, level?: string }} filters
 */
export const filterCareers = (query = '', filters = {}) => {
    const q = query.toLowerCase().trim();

    return CAREERS.filter((c) => {
        const matchesQuery =
            !q ||
            c.title.toLowerCase().includes(q) ||
            c.tags.some((t) => t.includes(q)) ||
            c.domain.includes(q);

        const matchesDomain = !filters.domain || filters.domain === 'all' || c.domain === filters.domain;
        const matchesLevel = !filters.level || filters.level === 'all' || c.level === filters.level;

        return matchesQuery && matchesDomain && matchesLevel;
    });
};

/**
 * Returns salary range as a human-readable string.
 * @param {{ min: number, max: number, currency: string }} salary
 */
export const formatSalary = ({ min, max, currency }) => {
    const fmt = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    });
    return `${fmt.format(min)} – ${fmt.format(max)}`;
};

/**
 * Returns demand trend badge props.
 * @param {'rising'|'stable'|'declining'} trend
 */
export const getDemandTrendBadge = (trend) => {
    const map = {
        rising: { label: '↑ Rising', className: 'badge-green' },
        stable: { label: '→ Stable', className: 'badge-blue' },
        declining: { label: '↓ Declining', className: 'badge-amber' },
    };
    return map[trend] ?? map.stable;
};

export default CAREERS;
