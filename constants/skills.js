/**
 * constants/skills.js
 *
 * Master skill catalog for the SkillGap app.
 *
 * Proficiency levels (0–4):
 *   0 = None / Not started
 *   1 = Beginner
 *   2 = Intermediate
 *   3 = Advanced
 *   4 = Expert
 */

// ─── Proficiency Level Definitions ───────────────────────────────────────────
export const PROFICIENCY_LEVELS = [
    { value: 0, label: 'None', color: '#64748b', description: 'No experience yet' },
    { value: 1, label: 'Beginner', color: '#ef4444', description: 'Aware of concepts, limited hands-on' },
    { value: 2, label: 'Intermediate', color: '#f59e0b', description: 'Can work independently on most tasks' },
    { value: 3, label: 'Advanced', color: '#3b82f6', description: 'Deep expertise, can mentor others' },
    { value: 4, label: 'Expert', color: '#22c55e', description: 'Industry-recognized mastery' },
];

// ─── Skill Categories ─────────────────────────────────────────────────────────
export const SKILL_CATEGORIES = {
    LANGUAGES: { id: 'languages', label: 'Programming Languages', icon: '💻' },
    FRONTEND: { id: 'frontend', label: 'Frontend Development', icon: '🎨' },
    BACKEND: { id: 'backend', label: 'Backend Development', icon: '⚙️' },
    DATABASE: { id: 'database', label: 'Databases', icon: '🗄️' },
    CLOUD: { id: 'cloud', label: 'Cloud & DevOps', icon: '☁️' },
    AI_ML: { id: 'ai_ml', label: 'AI & Machine Learning', icon: '🤖' },
    DATA: { id: 'data', label: 'Data & Analytics', icon: '📊' },
    SECURITY: { id: 'security', label: 'Cybersecurity', icon: '🔒' },
    MOBILE: { id: 'mobile', label: 'Mobile Development', icon: '📱' },
    SOFT_SKILLS: { id: 'soft_skills', label: 'Soft Skills', icon: '🤝' },
    DESIGN: { id: 'design', label: 'UI/UX Design', icon: '✏️' },
    MANAGEMENT: { id: 'management', label: 'Management & Leadership', icon: '📋' },
};

// ─── Master Skill List ────────────────────────────────────────────────────────
export const SKILLS = [
    // ── Programming Languages ──────────────────────────────────────────────────
    {
        id: 'python',
        label: 'Python',
        category: 'languages',
        icon: '🐍',
        tags: ['scripting', 'automation', 'data', 'backend'],
        resources: ['https://docs.python.org/', 'https://realpython.com'],
    },
    {
        id: 'javascript',
        label: 'JavaScript',
        category: 'languages',
        icon: '🟨',
        tags: ['web', 'frontend', 'backend', 'scripting'],
        resources: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
    },
    {
        id: 'typescript',
        label: 'TypeScript',
        category: 'languages',
        icon: '🔷',
        tags: ['web', 'typed', 'frontend', 'backend'],
        resources: ['https://www.typescriptlang.org/docs/'],
    },
    {
        id: 'java',
        label: 'Java',
        category: 'languages',
        icon: '☕',
        tags: ['enterprise', 'backend', 'android'],
        resources: ['https://docs.oracle.com/javase/'],
    },
    {
        id: 'csharp',
        label: 'C#',
        category: 'languages',
        icon: '🟣',
        tags: ['microsoft', 'backend', 'games', 'enterprise'],
        resources: ['https://learn.microsoft.com/en-us/dotnet/csharp/'],
    },
    {
        id: 'cpp',
        label: 'C++',
        category: 'languages',
        icon: '⚡',
        tags: ['systems', 'performance', 'games', 'embedded'],
        resources: ['https://cppreference.com'],
    },
    {
        id: 'go',
        label: 'Go (Golang)',
        category: 'languages',
        icon: '🐹',
        tags: ['backend', 'systems', 'cloud', 'microservices'],
        resources: ['https://go.dev/doc/'],
    },
    {
        id: 'rust',
        label: 'Rust',
        category: 'languages',
        icon: '🦀',
        tags: ['systems', 'performance', 'safety'],
        resources: ['https://www.rust-lang.org/learn'],
    },
    {
        id: 'kotlin',
        label: 'Kotlin',
        category: 'languages',
        icon: '🟠',
        tags: ['android', 'backend', 'jvm'],
        resources: ['https://kotlinlang.org/docs/'],
    },
    {
        id: 'swift',
        label: 'Swift',
        category: 'languages',
        icon: '🍎',
        tags: ['ios', 'macos', 'apple'],
        resources: ['https://swift.org/documentation/'],
    },
    {
        id: 'sql',
        label: 'SQL',
        category: 'languages',
        icon: '🗃️',
        tags: ['database', 'queries', 'analytics'],
        resources: ['https://www.w3schools.com/sql/'],
    },

    // ── Frontend ───────────────────────────────────────────────────────────────
    {
        id: 'react',
        label: 'React',
        category: 'frontend',
        icon: '⚛️',
        tags: ['spa', 'ui', 'components', 'hooks'],
        resources: ['https://react.dev'],
    },
    {
        id: 'nextjs',
        label: 'Next.js',
        category: 'frontend',
        icon: '▲',
        tags: ['ssr', 'ssg', 'fullstack', 'react'],
        resources: ['https://nextjs.org/docs'],
    },
    {
        id: 'vue',
        label: 'Vue.js',
        category: 'frontend',
        icon: '💚',
        tags: ['spa', 'ui', 'reactive'],
        resources: ['https://vuejs.org/guide/'],
    },
    {
        id: 'angular',
        label: 'Angular',
        category: 'frontend',
        icon: '🅰️',
        tags: ['enterprise', 'spa', 'typescript'],
        resources: ['https://angular.io/docs'],
    },
    {
        id: 'svelte',
        label: 'Svelte',
        category: 'frontend',
        icon: '🔥',
        tags: ['compiler', 'ui', 'reactive'],
        resources: ['https://svelte.dev/docs'],
    },
    {
        id: 'html_css',
        label: 'HTML & CSS',
        category: 'frontend',
        icon: '🌐',
        tags: ['markup', 'styling', 'fundamentals'],
        resources: ['https://developer.mozilla.org/en-US/docs/Web'],
    },
    {
        id: 'tailwind',
        label: 'Tailwind CSS',
        category: 'frontend',
        icon: '💨',
        tags: ['utility-first', 'css', 'styling'],
        resources: ['https://tailwindcss.com/docs'],
    },
    {
        id: 'graphql',
        label: 'GraphQL',
        category: 'frontend',
        icon: '🔴',
        tags: ['api', 'query', 'data-fetching'],
        resources: ['https://graphql.org/learn/'],
    },

    // ── Backend ────────────────────────────────────────────────────────────────
    {
        id: 'nodejs',
        label: 'Node.js',
        category: 'backend',
        icon: '🟢',
        tags: ['runtime', 'javascript', 'api'],
        resources: ['https://nodejs.org/en/docs/'],
    },
    {
        id: 'express',
        label: 'Express.js',
        category: 'backend',
        icon: '🚂',
        tags: ['api', 'rest', 'nodejs'],
        resources: ['https://expressjs.com/'],
    },
    {
        id: 'fastapi',
        label: 'FastAPI',
        category: 'backend',
        icon: '⚡',
        tags: ['python', 'api', 'async'],
        resources: ['https://fastapi.tiangolo.com/'],
    },
    {
        id: 'django',
        label: 'Django',
        category: 'backend',
        icon: '🎯',
        tags: ['python', 'fullstack', 'orm'],
        resources: ['https://docs.djangoproject.com/'],
    },
    {
        id: 'spring_boot',
        label: 'Spring Boot',
        category: 'backend',
        icon: '🍃',
        tags: ['java', 'enterprise', 'microservices'],
        resources: ['https://spring.io/projects/spring-boot'],
    },
    {
        id: 'rest_api',
        label: 'REST API Design',
        category: 'backend',
        icon: '🔗',
        tags: ['api', 'http', 'design'],
        resources: ['https://restfulapi.net/'],
    },
    {
        id: 'microservices',
        label: 'Microservices',
        category: 'backend',
        icon: '🧩',
        tags: ['architecture', 'distributed', 'scalability'],
        resources: ['https://microservices.io/'],
    },

    // ── Databases ─────────────────────────────────────────────────────────────
    {
        id: 'postgresql',
        label: 'PostgreSQL',
        category: 'database',
        icon: '🐘',
        tags: ['relational', 'sql', 'open-source'],
        resources: ['https://www.postgresql.org/docs/'],
    },
    {
        id: 'mysql',
        label: 'MySQL',
        category: 'database',
        icon: '🐬',
        tags: ['relational', 'sql', 'popular'],
        resources: ['https://dev.mysql.com/doc/'],
    },
    {
        id: 'mongodb',
        label: 'MongoDB',
        category: 'database',
        icon: '🍃',
        tags: ['nosql', 'document', 'flexible'],
        resources: ['https://www.mongodb.com/docs/'],
    },
    {
        id: 'redis',
        label: 'Redis',
        category: 'database',
        icon: '🔴',
        tags: ['cache', 'nosql', 'in-memory'],
        resources: ['https://redis.io/docs/'],
    },
    {
        id: 'elasticsearch',
        label: 'Elasticsearch',
        category: 'database',
        icon: '🔍',
        tags: ['search', 'analytics', 'nosql'],
        resources: ['https://www.elastic.co/guide/'],
    },
    {
        id: 'firebase',
        label: 'Firebase',
        category: 'database',
        icon: '🔥',
        tags: ['realtime', 'google', 'baas'],
        resources: ['https://firebase.google.com/docs'],
    },

    // ── Cloud & DevOps ────────────────────────────────────────────────────────
    {
        id: 'aws',
        label: 'AWS',
        category: 'cloud',
        icon: '🟡',
        tags: ['cloud', 'infrastructure', 'services'],
        resources: ['https://docs.aws.amazon.com/'],
    },
    {
        id: 'gcp',
        label: 'Google Cloud',
        category: 'cloud',
        icon: '🔵',
        tags: ['cloud', 'infrastructure', 'google'],
        resources: ['https://cloud.google.com/docs'],
    },
    {
        id: 'azure',
        label: 'Microsoft Azure',
        category: 'cloud',
        icon: '⬡',
        tags: ['cloud', 'microsoft', 'enterprise'],
        resources: ['https://learn.microsoft.com/en-us/azure/'],
    },
    {
        id: 'docker',
        label: 'Docker',
        category: 'cloud',
        icon: '🐳',
        tags: ['containers', 'devops', 'packaging'],
        resources: ['https://docs.docker.com/'],
    },
    {
        id: 'kubernetes',
        label: 'Kubernetes',
        category: 'cloud',
        icon: '⚙️',
        tags: ['orchestration', 'containers', 'scaling'],
        resources: ['https://kubernetes.io/docs/'],
    },
    {
        id: 'ci_cd',
        label: 'CI/CD Pipelines',
        category: 'cloud',
        icon: '🔄',
        tags: ['automation', 'devops', 'github-actions'],
        resources: ['https://docs.github.com/en/actions'],
    },
    {
        id: 'terraform',
        label: 'Terraform',
        category: 'cloud',
        icon: '🌍',
        tags: ['iac', 'infrastructure', 'automation'],
        resources: ['https://developer.hashicorp.com/terraform/docs'],
    },
    {
        id: 'linux',
        label: 'Linux / Bash',
        category: 'cloud',
        icon: '🐧',
        tags: ['os', 'scripting', 'sysadmin'],
        resources: ['https://linuxcommand.org/'],
    },
    {
        id: 'git',
        label: 'Git & Version Control',
        category: 'cloud',
        icon: '🌿',
        tags: ['vcs', 'collaboration', 'devops'],
        resources: ['https://git-scm.com/doc'],
    },

    // ── AI & Machine Learning ─────────────────────────────────────────────────
    {
        id: 'pytorch',
        label: 'PyTorch',
        category: 'ai_ml',
        icon: '🔥',
        tags: ['deep-learning', 'research', 'neural-networks'],
        resources: ['https://pytorch.org/docs/'],
    },
    {
        id: 'tensorflow',
        label: 'TensorFlow',
        category: 'ai_ml',
        icon: '🧠',
        tags: ['deep-learning', 'google', 'production'],
        resources: ['https://www.tensorflow.org/learn'],
    },
    {
        id: 'scikit_learn',
        label: 'Scikit-learn',
        category: 'ai_ml',
        icon: '🔬',
        tags: ['ml', 'classical', 'python'],
        resources: ['https://scikit-learn.org/stable/'],
    },
    {
        id: 'llm_prompting',
        label: 'LLM & Prompt Engineering',
        category: 'ai_ml',
        icon: '🤖',
        tags: ['generative-ai', 'gpt', 'prompts'],
        resources: ['https://platform.openai.com/docs/'],
    },
    {
        id: 'computer_vision',
        label: 'Computer Vision',
        category: 'ai_ml',
        icon: '👁️',
        tags: ['image', 'cnn', 'detection'],
        resources: ['https://opencv.org/learn/'],
    },
    {
        id: 'nlp',
        label: 'Natural Language Processing',
        category: 'ai_ml',
        icon: '📝',
        tags: ['text', 'transformers', 'language'],
        resources: ['https://huggingface.co/learn'],
    },
    {
        id: 'mlops',
        label: 'MLOps',
        category: 'ai_ml',
        icon: '⚙️',
        tags: ['deployment', 'monitoring', 'pipelines'],
        resources: ['https://ml-ops.org/'],
    },

    // ── Data & Analytics ──────────────────────────────────────────────────────
    {
        id: 'pandas',
        label: 'Pandas',
        category: 'data',
        icon: '🐼',
        tags: ['dataframes', 'python', 'analysis'],
        resources: ['https://pandas.pydata.org/docs/'],
    },
    {
        id: 'numpy',
        label: 'NumPy',
        category: 'data',
        icon: '🔢',
        tags: ['arrays', 'math', 'python'],
        resources: ['https://numpy.org/doc/'],
    },
    {
        id: 'data_visualization',
        label: 'Data Visualization',
        category: 'data',
        icon: '📊',
        tags: ['charts', 'matplotlib', 'd3'],
        resources: ['https://matplotlib.org/stable/'],
    },
    {
        id: 'power_bi',
        label: 'Power BI',
        category: 'data',
        icon: '📈',
        tags: ['bi', 'dashboards', 'microsoft'],
        resources: ['https://learn.microsoft.com/en-us/power-bi/'],
    },
    {
        id: 'tableau',
        label: 'Tableau',
        category: 'data',
        icon: '📉',
        tags: ['bi', 'dashboards', 'visual'],
        resources: ['https://help.tableau.com/'],
    },
    {
        id: 'spark',
        label: 'Apache Spark',
        category: 'data',
        icon: '⚡',
        tags: ['big-data', 'distributed', 'streaming'],
        resources: ['https://spark.apache.org/docs/latest/'],
    },
    {
        id: 'statistics',
        label: 'Statistics & Probability',
        category: 'data',
        icon: '📐',
        tags: ['math', 'probability', 'inference'],
        resources: ['https://www.khanacademy.org/math/statistics-probability'],
    },

    // ── Cybersecurity ─────────────────────────────────────────────────────────
    {
        id: 'network_security',
        label: 'Network Security',
        category: 'security',
        icon: '🔐',
        tags: ['firewalls', 'protocols', 'defense'],
        resources: ['https://www.ncsc.gov.uk/section/advice-guidance/all-topics'],
    },
    {
        id: 'ethical_hacking',
        label: 'Ethical Hacking / Pentesting',
        category: 'security',
        icon: '🎩',
        tags: ['offensive', 'vulnerability', 'tools'],
        resources: ['https://www.hackthebox.com/'],
    },
    {
        id: 'crypto',
        label: 'Cryptography',
        category: 'security',
        icon: '🔑',
        tags: ['encryption', 'hashing', 'tls'],
        resources: ['https://www.cloudflare.com/learning/ssl/what-is-cryptography/'],
    },
    {
        id: 'soc_analysis',
        label: 'SOC & Incident Response',
        category: 'security',
        icon: '🚨',
        tags: ['monitoring', 'forensics', 'siem'],
        resources: ['https://www.sans.org/resources/'],
    },

    // ── Mobile Development ────────────────────────────────────────────────────
    {
        id: 'react_native',
        label: 'React Native',
        category: 'mobile',
        icon: '📱',
        tags: ['cross-platform', 'ios', 'android'],
        resources: ['https://reactnative.dev/docs/getting-started'],
    },
    {
        id: 'flutter',
        label: 'Flutter',
        category: 'mobile',
        icon: '🦋',
        tags: ['cross-platform', 'dart', 'google'],
        resources: ['https://docs.flutter.dev/'],
    },
    {
        id: 'ios_swift',
        label: 'iOS (Swift/SwiftUI)',
        category: 'mobile',
        icon: '🍎',
        tags: ['native', 'apple', 'swiftui'],
        resources: ['https://developer.apple.com/documentation/'],
    },
    {
        id: 'android_kotlin',
        label: 'Android (Kotlin)',
        category: 'mobile',
        icon: '🤖',
        tags: ['native', 'google', 'jetpack'],
        resources: ['https://developer.android.com/develop'],
    },

    // ── UI/UX Design ─────────────────────────────────────────────────────────
    {
        id: 'figma',
        label: 'Figma',
        category: 'design',
        icon: '🎨',
        tags: ['design', 'prototyping', 'collaboration'],
        resources: ['https://help.figma.com/'],
    },
    {
        id: 'ux_research',
        label: 'UX Research',
        category: 'design',
        icon: '🔍',
        tags: ['user-testing', 'interviews', 'personas'],
        resources: ['https://www.nngroup.com/articles/'],
    },
    {
        id: 'design_systems',
        label: 'Design Systems',
        category: 'design',
        icon: '🎛️',
        tags: ['components', 'tokens', 'consistency'],
        resources: ['https://designsystemsrepo.com/'],
    },

    // ── Soft Skills ───────────────────────────────────────────────────────────
    {
        id: 'communication',
        label: 'Communication',
        category: 'soft_skills',
        icon: '💬',
        tags: ['verbal', 'written', 'presentation'],
        resources: [],
    },
    {
        id: 'problem_solving',
        label: 'Problem Solving',
        category: 'soft_skills',
        icon: '🧩',
        tags: ['analytical', 'critical-thinking', 'debugging'],
        resources: [],
    },
    {
        id: 'teamwork',
        label: 'Teamwork & Collaboration',
        category: 'soft_skills',
        icon: '🤝',
        tags: ['agile', 'cross-functional', 'pair-programming'],
        resources: [],
    },
    {
        id: 'time_management',
        label: 'Time Management',
        category: 'soft_skills',
        icon: '⌛',
        tags: ['productivity', 'prioritization', 'agile'],
        resources: [],
    },

    // ── Management & Leadership ───────────────────────────────────────────────
    {
        id: 'agile_scrum',
        label: 'Agile & Scrum',
        category: 'management',
        icon: '🔄',
        tags: ['sprint', 'ceremonies', 'product'],
        resources: ['https://www.scrum.org/resources'],
    },
    {
        id: 'system_design',
        label: 'System Design',
        category: 'management',
        icon: '🏗️',
        tags: ['architecture', 'scalability', 'interviews'],
        resources: ['https://github.com/donnemartin/system-design-primer'],
    },
    {
        id: 'product_management',
        label: 'Product Management',
        category: 'management',
        icon: '📋',
        tags: ['roadmap', 'stakeholders', 'strategy'],
        resources: ['https://www.productplan.com/learn/'],
    },
    {
        id: 'tech_leadership',
        label: 'Technical Leadership',
        category: 'management',
        icon: '🏆',
        tags: ['architecture', 'mentoring', 'decision-making'],
        resources: [],
    },
];

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

/** Skill lookup map by id */
export const SKILL_MAP = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

/** Returns all skills in a given category */
export const getSkillsByCategory = (categoryId) =>
    SKILLS.filter((s) => s.category === categoryId);

/** Returns readable label for a proficiency level number */
export const getProficiencyLabel = (level) =>
    PROFICIENCY_LEVELS[level]?.label ?? 'Unknown';

/** Returns color for a proficiency level number */
export const getProficiencyColor = (level) =>
    PROFICIENCY_LEVELS[level]?.color ?? '#64748b';

/** Filter skills by search query (label + tags) */
export const searchSkills = (query) => {
    const q = query.toLowerCase().trim();
    if (!q) return SKILLS;
    return SKILLS.filter(
        (s) =>
            s.label.toLowerCase().includes(q) ||
            s.tags.some((t) => t.includes(q)) ||
            s.category.includes(q)
    );
};

export default SKILLS;
