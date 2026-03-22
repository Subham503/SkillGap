"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Plus, X, CheckCircle2 } from "lucide-react";

export default function AssessmentPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    // State Step 1
    const [cgpa, setCgpa] = useState(3.0);
    const [education, setEducation] = useState("Bachelor's");

    // State Step 2
    const [currentSkill, setCurrentSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const quickSkills = [
        "python", "javascript", "react", "sql", "java",
        "figma", "docker", "aws", "communication", "leadership"
    ];

    // State Step 3
    const [aptitudes, setAptitudes] = useState({
        Logical: 50,
        Analytical: 50,
        Technical: 50,
        Creative: 50,
        Communication: 50,
        Leadership: 50,
        Mathematical: 50
    });

    const handleAddSkill = (skill) => {
        const s = skill.trim().toLowerCase();
        if (s && !skills.includes(s)) {
            setSkills([...skills, s]);
        }
        setCurrentSkill("");
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleComplete = () => {
        const assessmentData = {
            academic: {
                cgpa: parseFloat(cgpa),
                education
            },
            skills,
            aptitudes
        };
        localStorage.setItem("skillgap-assessment", JSON.stringify(assessmentData));
        router.push("/results");
    };

    return (
        <div className="min-h-screen bg-[#070b16] text-white p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl mt-12">
                {/* Progress Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-4">
                        <h1 className="text-3xl font-bold font-syne">Assessment</h1>
                        <span className="text-sm text-gray-400 font-dm-sans">
                            Step {step} of {totalSteps}
                        </span>
                    </div>
                    <div className="w-full bg-[#0d1526] h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500 ease-out"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-[#0d1526] rounded-2xl p-8 shadow-xl border border-white/5">
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-semibold mb-6">Academic Background</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-300">CGPA (0.0 - 4.0)</label>
                                    <span className="text-blue-500 font-bold text-xl">{cgpa.toFixed(1)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.0"
                                    max="4.0"
                                    step="0.1"
                                    value={cgpa}
                                    onChange={(e) => setCgpa(parseFloat(e.target.value))}
                                    className="w-full accent-blue-500 h-2 bg-[#070b16] rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-gray-300 block">Education Level</label>
                                <select
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                    className="w-full bg-[#070b16] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                                >
                                    <option value="High School">High School</option>
                                    <option value="Bachelor's">Bachelor&apos;s Degree</option>
                                    <option value="Master's">Master&apos;s Degree</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>

                            <div className="pt-6 flex justify-end">
                                <button
                                    onClick={() => setStep(2)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                                >
                                    Next Step <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-semibold mb-6">Your Skills</h2>

                            <div className="space-y-4">
                                <label className="text-gray-300 block">Add technical & soft skills</label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={currentSkill}
                                        onChange={(e) => setCurrentSkill(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(currentSkill)}
                                        placeholder="e.g. React, Docker..."
                                        className="flex-1 bg-[#070b16] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <button
                                        onClick={() => handleAddSkill(currentSkill)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-medium transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="w-5 h-5" /> Add
                                    </button>
                                </div>
                            </div>

                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {skills.map(skill => (
                                        <div key={skill} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-full flex items-center gap-2">
                                            <span className="text-sm font-medium">{skill}</span>
                                            <button onClick={() => handleRemoveSkill(skill)} className="hover:text-blue-300 transition-colors">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <label className="text-sm text-gray-500 block">Quick Add:</label>
                                <div className="flex flex-wrap gap-2">
                                    {quickSkills.map(skill => (
                                        <button
                                            key={skill}
                                            onClick={() => handleAddSkill(skill)}
                                            disabled={skills.includes(skill)}
                                            className="bg-[#070b16] border border-white/5 hover:border-white/20 disabled:opacity-30 disabled:hover:border-white/5 text-gray-400 px-3 py-1.5 rounded-lg text-sm transition-colors"
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 flex justify-between">
                                <button
                                    onClick={() => setStep(1)}
                                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-5 h-5" /> Previous
                                </button>
                                <button
                                    onClick={() => {
                                        if (skills.length === 0) {
                                            alert('Please add at least 1 skill to continue!')
                                            return
                                        }
                                        if (skills.length < 3) {
                                            const confirm = window.confirm(
                                                'You have only ' + skills.length + ' skill(s). Add more skills for accurate career matching. Continue anyway?'
                                            )
                                            if (!confirm) return
                                        }
                                        setStep(3)
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                                >
                                    Next Step <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-semibold mb-6">Aptitude Rating</h2>
                            <p className="text-gray-400 text-sm mb-6">Rate your proficiency in the following areas from 0 to 100.</p>

                            <div className="space-y-6">
                                {Object.keys(aptitudes).map(trait => (
                                    <div key={trait} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-gray-300 text-sm font-medium">{trait}</label>
                                            <span className="text-blue-500 font-bold text-sm bg-blue-500/10 px-2 py-1 rounded-md min-w-[3rem] text-center">
                                                {aptitudes[trait]}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={aptitudes[trait]}
                                            onChange={(e) => setAptitudes({ ...aptitudes, [trait]: parseInt(e.target.value) })}
                                            className="w-full accent-blue-500 h-1.5 bg-[#070b16] rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 flex justify-between border-t border-white/5">
                                <button
                                    onClick={() => setStep(2)}
                                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-5 h-5" /> Previous
                                </button>
                                <button
                                    onClick={handleComplete}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                                >
                                    <CheckCircle2 className="w-5 h-5" /> Complete Assessment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
