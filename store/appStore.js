import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const defaultProfile = {
    name: '', email: '', avatarUrl: '',
    currentRole: '', experienceYears: 0, location: '',
};

const defaultAssessment = {
    skills: {},           // { [skillId]: { level: 0-4, selfRated, lastUpdated } }
    completionPercent: 0,
    lastCompletedAt: null,
};

const defaultGapAnalysis = {
    gaps: {},             // { [skillId]: { required, current, gap } }
    overallScore: null,
    topPriorities: [],
    analyzedAt: null,
};

const defaultLearningPlan = {
    items: [],            // [{ id, skillId, resourceTitle, resourceUrl, type, durationHours, completed, completedAt }]
    generatedAt: null,
};

const useAppStore = create(
    persist(
        (set, get) => ({
            // ── UI State ─────────────────────────────────────────
            onboardingStep: 0,
            isOnboarded: false,
            activeSection: 'dashboard', // 'dashboard' | 'assess' | 'careers' | 'plan' | 'profile'
            isLoading: false,
            error: null,

            // ── Data ─────────────────────────────────────────────
            profile: { ...defaultProfile },
            targetCareerId: null,
            currentCareerId: null,
            assessment: { ...defaultAssessment },
            gapAnalysis: { ...defaultGapAnalysis },
            learningPlan: { ...defaultLearningPlan },

            // ── Filters ───────────────────────────────────────────
            careerFilters: { domain: 'all', level: 'all', searchQuery: '' },
            skillFilters: { category: 'all', searchQuery: '' },

            // ── UI Actions ────────────────────────────────────────
            setActiveSection: (section) => set({ activeSection: section }),
            setIsLoading: (bool) => set({ isLoading: bool }),
            setError: (msg) => set({ error: msg }),
            clearError: () => set({ error: null }),

            // ── Onboarding ────────────────────────────────────────
            nextOnboardingStep: () =>
                set((s) => ({ onboardingStep: s.onboardingStep + 1 })),
            prevOnboardingStep: () =>
                set((s) => ({ onboardingStep: Math.max(0, s.onboardingStep - 1) })),
            completeOnboarding: () =>
                set({ isOnboarded: true, onboardingStep: 0, activeSection: 'dashboard' }),
            resetOnboarding: () =>
                set({ isOnboarded: false, onboardingStep: 0 }),

            // ── Profile ───────────────────────────────────────────
            updateProfile: (fields) =>
                set((s) => ({ profile: { ...s.profile, ...fields } })),
            resetProfile: () => set({ profile: { ...defaultProfile } }),

            // ── Career ───────────────────────────────────────────
            setTargetCareer: (careerId) =>
                set({
                    targetCareerId: careerId,
                    gapAnalysis: { ...defaultGapAnalysis },
                    learningPlan: { ...defaultLearningPlan },
                }),
            setCurrentCareer: (careerId) => set({ currentCareerId: careerId }),
            setCareerFilters: (filters) =>
                set((s) => ({ careerFilters: { ...s.careerFilters, ...filters } })),
            resetCareerFilters: () =>
                set({ careerFilters: { domain: 'all', level: 'all', searchQuery: '' } }),

            // ── Skill Assessment ──────────────────────────────────
            rateSkill: (skillId, level) =>
                set((s) => ({
                    assessment: {
                        ...s.assessment,
                        skills: {
                            ...s.assessment.skills,
                            [skillId]: { level, selfRated: true, lastUpdated: new Date().toISOString() },
                        },
                    },
                })),

            bulkRateSkills: (ratingsMap) =>
                set((s) => {
                    const now = new Date().toISOString();
                    const newEntries = Object.fromEntries(
                        Object.entries(ratingsMap).map(([id, level]) => [
                            id, { level, selfRated: true, lastUpdated: now },
                        ])
                    );
                    return {
                        assessment: {
                            ...s.assessment,
                            skills: { ...s.assessment.skills, ...newEntries },
                        },
                    };
                }),

            updateAssessmentCompletion: (totalSkills) =>
                set((s) => {
                    const rated = Object.keys(s.assessment.skills).length;
                    const pct = totalSkills > 0 ? Math.round((rated / totalSkills) * 100) : 0;
                    return { assessment: { ...s.assessment, completionPercent: pct } };
                }),

            completeAssessment: () =>
                set((s) => ({
                    assessment: { ...s.assessment, lastCompletedAt: new Date().toISOString() },
                })),

            resetAssessment: () => set({ assessment: { ...defaultAssessment } }),

            setSkillFilters: (filters) =>
                set((s) => ({ skillFilters: { ...s.skillFilters, ...filters } })),

            // ── Gap Analysis ──────────────────────────────────────
            /**
             * @param {Object} careerRequirements - { skillId: requiredLevel }
             */
            runGapAnalysis: (careerRequirements) =>
                set((s) => {
                    const currentSkills = s.assessment.skills;
                    const gaps = {};
                    let totalGap = 0;
                    let totalPossible = 0;
                    const priorities = [];

                    Object.entries(careerRequirements).forEach(([skillId, required]) => {
                        const current = currentSkills[skillId]?.level ?? 0;
                        const gap = Math.max(0, required - current);
                        gaps[skillId] = { required, current, gap };
                        totalGap += gap;
                        totalPossible += required;
                        if (gap > 0) priorities.push({ skillId, gap });
                    });

                    priorities.sort((a, b) => b.gap - a.gap);
                    const overallScore = totalPossible > 0
                        ? Math.round(((totalPossible - totalGap) / totalPossible) * 100)
                        : 100;

                    return {
                        gapAnalysis: {
                            gaps,
                            overallScore,
                            topPriorities: priorities.slice(0, 5).map((p) => p.skillId),
                            analyzedAt: new Date().toISOString(),
                        },
                    };
                }),

            resetGapAnalysis: () => set({ gapAnalysis: { ...defaultGapAnalysis } }),

            // ── Learning Plan ─────────────────────────────────────
            setLearningPlan: (items) =>
                set({ learningPlan: { items, generatedAt: new Date().toISOString() } }),

            togglePlanItem: (itemId, completed) =>
                set((s) => ({
                    learningPlan: {
                        ...s.learningPlan,
                        items: s.learningPlan.items.map((item) =>
                            item.id === itemId
                                ? { ...item, completed, completedAt: completed ? new Date().toISOString() : null }
                                : item
                        ),
                    },
                })),

            resetLearningPlan: () => set({ learningPlan: { ...defaultLearningPlan } }),

            // ── Full Reset ────────────────────────────────────────
            resetAll: () =>
                set({
                    onboardingStep: 0, isOnboarded: false,
                    activeSection: 'dashboard', isLoading: false, error: null,
                    profile: { ...defaultProfile },
                    targetCareerId: null, currentCareerId: null,
                    assessment: { ...defaultAssessment },
                    gapAnalysis: { ...defaultGapAnalysis },
                    learningPlan: { ...defaultLearningPlan },
                    careerFilters: { domain: 'all', level: 'all', searchQuery: '' },
                    skillFilters: { category: 'all', searchQuery: '' },
                }),

            // ── Selectors ─────────────────────────────────────────
            getSkillLevel: (skillId) => get().assessment.skills[skillId]?.level ?? 0,
            getSkillGap: (skillId) => get().gapAnalysis.gaps[skillId] ?? null,
            getLearningPlanProgress: () => {
                const { items } = get().learningPlan;
                const total = items.length;
                const done = items.filter((i) => i.completed).length;
                return { total, done, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
            },
        }),

        {
            name: 'skillgap-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (s) => ({
                isOnboarded: s.isOnboarded,
                onboardingStep: s.onboardingStep,
                activeSection: s.activeSection,
                profile: s.profile,
                targetCareerId: s.targetCareerId,
                currentCareerId: s.currentCareerId,
                assessment: s.assessment,
                gapAnalysis: s.gapAnalysis,
                learningPlan: s.learningPlan,
                careerFilters: s.careerFilters,
                skillFilters: s.skillFilters,
            }),
            version: 1,
        }
    )
);

export default useAppStore;
