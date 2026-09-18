import React, { useState } from 'react';
import { X, Download, Copy, Printer, Check, FileText, Mail, MapPin, ExternalLink, GraduationCap, Briefcase, Code, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const eduText = personalInfo.education
      .map((edu, i) => `${i + 1}. ${edu.institution} | ${edu.field} · ${edu.degree} · ${edu.result} (${edu.duration})`)
      .join('\n');

    const resumeText = `
${personalInfo.name} - ${personalInfo.title}
Location: ${personalInfo.location}
Email: ${personalInfo.email}
GitHub: ${personalInfo.githubUrl}

SUMMARY:
${personalInfo.shortPositioning} ${personalInfo.heroSupportingText}

EDUCATION:
${eduText}

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3
- Styling & UI: Tailwind CSS, Framer Motion, Responsive Design, Dark Mode UI
- AI & Tools: Google Gemini API, REST APIs, Git, GitHub, Vite

FEATURED PROJECTS:
1. Agent HQ - Autonomous Multi-Agent Operations & Orchestration Platform
   Local-first multi-agent engine with DAG task scheduling, persistent SQLite memory, provider fallback cascade (Gemini, Groq, Antigravity CLI), and automated Gmail outreach CRM.
2. Atlas - Personal Productivity OS
   Centralized workspace for tasks, habits, goals, and daily planning with Gemini AI task decomposition.
3. HSC AI Study Intelligence System
   Evidence-based study prioritization and Socratic AI tutoring engine with KaTeX LaTeX math rendering.
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/90 border-b border-white/10 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <FileText className="w-4 h-4 text-[#4DA3FF]" />
            <span>Resume Preview — {personalInfo.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/10 transition-colors cursor-pointer"
              title="Copy plain text resume to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/10 transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href="/resume.pdf"
              download="Md_Farhan_Hossain_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 font-semibold text-xs transition-colors shadow-md shadow-[#4DA3FF]/20 cursor-pointer"
              title="Download PDF File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 space-y-8 text-zinc-300 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Header Section */}
          <div className="border-b border-white/10 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#4DA3FF] mt-0.5">
                  {personalInfo.title}
                </p>
              </div>

              <div className="space-y-1 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#4DA3FF]" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#4DA3FF]" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-white underline decoration-zinc-700">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2">
              {personalInfo.shortPositioning} {personalInfo.heroSupportingText}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase">
              <GraduationCap className="w-4 h-4 text-[#4DA3FF]" />
              <span>Education History</span>
            </div>
            <div className="space-y-2.5">
              {personalInfo.education.map((edu, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{edu.institution}</h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/10">
                        {edu.degree}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      {edu.field} • {edu.result}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-[#4DA3FF] bg-[#4DA3FF]/10 px-2.5 py-1 rounded-md border border-[#4DA3FF]/20 self-start sm:self-auto shrink-0">
                    {edu.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase">
              <Code className="w-4 h-4 text-[#4DA3FF]" />
              <span>Technical Skills</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-white block">Frontend Frameworks</span>
                <p className="text-xs text-zinc-300">React 19, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-white block">Styling & UI</span>
                <p className="text-xs text-zinc-300">Tailwind CSS, Framer Motion, Responsive Mobile First, Lucide Icons</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-white block">AI & Development Tools</span>
                <p className="text-xs text-zinc-300">Google Gemini API SDK, REST APIs, Git, GitHub, Vite, Local Storage</p>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#4DA3FF]" />
              <span>Featured Projects</span>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Agent HQ — Autonomous Multi-Agent Operations Platform</h3>
                  <span className="text-xs font-mono text-cyan-300">React 19 • TypeScript • SQLite • LLM DAG Engine</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Local-first multi-agent orchestration engine with DAG task scheduling, persistent SQLite memory, provider fallback cascade (Gemini 2.0 Flash, Groq Llama-3.3, Antigravity CLI), and automated Gmail outreach CRM.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Atlas — Personal Productivity AI OS</h3>
                  <span className="text-xs font-mono text-zinc-400">Next.js 16 • React 19 • Gemini API • Capacitor 8</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Cross-platform personal AI operating system with real-time screen-time discipline, browser-based motion-tracking camera pushup counter, and dynamic context-injected AI companion.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">HSC AI Study Intelligence System</h3>
                  <span className="text-xs font-mono text-indigo-400">React 19 • TypeScript • KaTeX • Gemini 2.0 API</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Evidence-based study prioritization and Socratic AI tutoring engine for HSC Science. Features board question recurrence scoring, KaTeX LaTeX math preprocessing, model exam generators, and past board question bank.
                </p>
              </div>
            </div>
          </div>

          {/* Freelance & Collaboration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase">
              <Briefcase className="w-4 h-4 text-[#4DA3FF]" />
              <span>Services & Availability</span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2 text-xs">
              <p className="text-zinc-300">
                Open for contract work, web application builds, dashboard engineering, and AI feature integration.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-white/10 font-mono">Multi-Agent Systems & DAGs</span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-white/10 font-mono">Web Apps & Dashboards</span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-white/10 font-mono">AI Feature Integration</span>
              </div>
            </div>
          </div>

          {/* Footer note inside resume */}
          <div className="text-center pt-4 border-t border-white/10 text-xs text-zinc-500 font-mono">
            <span>GitHub: {personalInfo.githubUrl} • Email: {personalInfo.email}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
