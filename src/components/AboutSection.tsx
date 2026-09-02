import React, { useState } from 'react';
import { User, Code, Cpu, ShieldCheck, HeartHandshake, FileText, GraduationCap, Sparkles, MapPin, Layers, Terminal, CheckCircle2, Award, Zap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'education' | 'principles' | 'stack'>('story');

  const principles = [
    {
      title: "Turning Ideas Into Reality",
      description: "Taking concepts from rough sketches or product notes and translating them into production-ready web interfaces with clean execution.",
      icon: Code
    },
    {
      title: "Clean Frontend Engineering",
      description: "Writing structured, maintainable TypeScript & React code with reusable component architectures and reliable state management.",
      icon: Cpu
    },
    {
      title: "Practical AI Functionality",
      description: "Integrating modern LLM APIs to create helpful, user-facing automated features without unneeded complexity or noise.",
      icon: ShieldCheck
    },
    {
      title: "User-Centered Design",
      description: "Focusing on intuitive visual layout, responsive performance, clear typography, and sub-100ms interaction feedback.",
      icon: HeartHandshake
    }
  ];

  const quickStats = [
    {
      label: "Education",
      value: "Milestone College",
      sub: "Science Stream (SSC 2025)",
      icon: GraduationCap
    },
    {
      label: "Primary Role",
      value: "Frontend & AI Builder",
      sub: "React • Next.js • Gemini",
      icon: Code
    },
    {
      label: "Specialization",
      value: "Productivity & AI Tools",
      sub: "Atlas & HSC AI System",
      icon: Sparkles
    },
    {
      label: "Location",
      value: "Dhaka",
      sub: "Bangladesh (GMT+6)",
      icon: MapPin
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-xs font-mono text-[#4DA3FF]">
            <User className="w-3.5 h-3.5" />
            <span>About {personalInfo.name}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {personalInfo.bioHeading}
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed">
            Get to know my background, education history, engineering principles, and technology stack.
          </p>
        </div>

        {/* Quick Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#4DA3FF]/30 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">{stat.label}</span>
                  <Icon className="w-4 h-4 text-[#4DA3FF] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-sm font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Profile Details Box with Suit Portrait Hero Card */}
        <div className="relative pt-8 sm:pt-12">
          {/* Main Details Card */}
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-zinc-900/40 border border-white/10 space-y-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DA3FF]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Details & Portrait Hero Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-white/10 relative z-10">
              
              {/* Suit Portrait Standout Display */}
              <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-start">
                <div className="relative group max-w-xs sm:max-w-sm w-full">
                  {/* Outer Ambient Glow Effect */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#4DA3FF]/30 via-sky-500/10 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Portrait Card Container */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/15 bg-zinc-950 shadow-2xl">
                    <div className="aspect-[3/4] w-full relative overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-950">
                      <img
                        src={personalInfo.suitPhotoUrl || personalInfo.avatarUrl}
                        alt={`${personalInfo.name} - Executive Suit Portrait`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Gradient Bottom Fade for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                      {/* Top Corner Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#4DA3FF] flex items-center gap-1.5 shadow-lg">
                        <Sparkles className="w-3 h-3 text-[#4DA3FF]" />
                        <span>Professional Portrait</span>
                      </div>

                      {/* Bottom Overlay Label inside image */}
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-white/10 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-white">{personalInfo.name}</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online & Available" />
                        </div>
                        <span className="text-[11px] font-mono text-[#4DA3FF] block">{personalInfo.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details & Headline */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-6 text-left">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Open for Web Application &amp; AI Projects</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {personalInfo.name}
                  </h3>

                  <p className="text-base sm:text-lg font-medium text-[#4DA3FF]">
                    {personalInfo.title} • Science Graduate &amp; AI Builder
                  </p>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                    {personalInfo.shortPositioning} {personalInfo.heroSupportingText}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-zinc-400">
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/10 flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#4DA3FF] shrink-0" />
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Location</span>
                      <span className="text-zinc-200 font-semibold">{personalInfo.location}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/10 flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#4DA3FF] shrink-0" />
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Education</span>
                      <span className="text-zinc-200 font-semibold">Milestone College (Science)</span>
                    </div>
                  </div>
                </div>

                {/* Resume Callout CTA */}
                {onOpenResume && (
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={onOpenResume}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 font-bold text-xs transition-all shadow-lg shadow-[#4DA3FF]/20 active:scale-95 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Official Resume PDF</span>
                    </button>

                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 text-xs font-medium transition-all cursor-pointer"
                    >
                      <Terminal className="w-4 h-4 text-[#4DA3FF]" />
                      <span>{personalInfo.email}</span>
                    </a>
                  </div>
                )}
              </div>

            </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs sm:text-sm font-medium border-b border-white/10">
            <button
              onClick={() => setActiveTab('story')}
              className={`py-2.5 px-4 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'story'
                  ? 'bg-[#4DA3FF] text-zinc-950 font-bold shadow-md shadow-[#4DA3FF]/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Background &amp; Story</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`py-2.5 px-4 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-[#4DA3FF] text-zinc-950 font-bold shadow-md shadow-[#4DA3FF]/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education History &amp; Journey</span>
            </button>

            <button
              onClick={() => setActiveTab('principles')}
              className={`py-2.5 px-4 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'principles'
                  ? 'bg-[#4DA3FF] text-zinc-950 font-bold shadow-md shadow-[#4DA3FF]/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Engineering Principles</span>
            </button>

            <button
              onClick={() => setActiveTab('stack')}
              className={`py-2.5 px-4 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'stack'
                  ? 'bg-[#4DA3FF] text-zinc-950 font-bold shadow-md shadow-[#4DA3FF]/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Tech Stack &amp; Workflow</span>
            </button>
          </div>

          {/* Tab 1: Background & Story */}
          {activeTab === 'story' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal text-left">
                {personalInfo.bioParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="bg-zinc-950/60 p-4 sm:p-5 rounded-2xl border border-white/5">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4 text-left">
                  <div className="flex items-center gap-2 text-[#4DA3FF] font-mono text-xs font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Quick Profile Summary</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <span className="text-zinc-500 font-mono block">Current Education:</span>
                      <span className="text-white font-bold">Milestone College (Science Stream)</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-zinc-500 font-mono block">Academic Stream:</span>
                      <span className="text-zinc-200">Science &amp; Analytical Foundations</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-zinc-500 font-mono block">Core Specialization:</span>
                      <span className="text-zinc-200">Frontend React, Next.js, Gemini AI SDK</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-zinc-500 font-mono block">Flagship Applications:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 font-mono">Atlas OS</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 font-mono">Gym Tracker</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Education & Journey */}
          {activeTab === 'education' && (
            <div className="space-y-6 pt-2 text-left">
              {/* Education History Cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <GraduationCap className="w-4 h-4 text-[#4DA3FF]" />
                  <span>Academic History</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {personalInfo.education.map((edu, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#4DA3FF]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-base font-bold text-white group-hover:text-[#4DA3FF] transition-colors">
                            {edu.institution}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-[#4DA3FF] text-xs font-mono font-medium">
                            {edu.degree}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-mono">
                            {edu.field}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 flex items-center gap-2">
                          <span className="text-emerald-400 font-medium">{edu.result}</span>
                        </p>
                      </div>

                      <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 self-start sm:self-auto shrink-0">
                        {edu.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Evolution Timeline */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-[#4DA3FF]" />
                  <span>Software Engineering Path</span>
                </div>

                <div className="space-y-4 relative pl-4 border-l-2 border-white/10 text-xs">
                  <div className="space-y-1 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF] absolute -left-[21px] top-1" />
                    <span className="font-mono text-[#4DA3FF] font-semibold">Phase 1 • Scientific &amp; Algorithmic Foundations</span>
                    <p className="text-zinc-300">Grounded in rigorous science and mathematical problem-solving, transitioned to computational logic, modern JavaScript (ES6+), TypeScript, and component-based React architecture.</p>
                  </div>

                  <div className="space-y-1 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF] absolute -left-[21px] top-1" />
                    <span className="font-mono text-[#4DA3FF] font-semibold">Phase 2 • AI Force-Multiplication &amp; Full-Stack Tooling</span>
                    <p className="text-zinc-300">Incorporated Artificial Intelligence into the development workflow to accelerate coding, solve complex state logic, and integrate Gemini API services.</p>
                  </div>

                  <div className="space-y-1 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF] absolute -left-[21px] top-1" />
                    <span className="font-mono text-[#4DA3FF] font-semibold">Phase 3 • Production Web Applications</span>
                    <p className="text-zinc-300">Built flagship projects like <strong>Atlas</strong> (Personal Productivity OS) and <strong>Gym Tracker</strong> (Fitness Analytics) with sub-100ms state responsiveness and zero fluff.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Engineering Principles */}
          {activeTab === 'principles' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-left">
              {principles.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#4DA3FF]/30 transition-all space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 flex items-center justify-center text-[#4DA3FF] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#4DA3FF]" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 4: Tech Stack & Workflow */}
          {activeTab === 'stack' && (
            <div className="space-y-6 pt-2 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Code className="w-4 h-4 text-[#4DA3FF]" />
                    <span>Frontend Frameworks &amp; Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">React 19</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Next.js</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">TypeScript</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">JavaScript ES6+</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">HTML5 / CSS3</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Zap className="w-4 h-4 text-[#4DA3FF]" />
                    <span>Styling, UI &amp; Animation</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Tailwind CSS</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Framer Motion</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Lucide Icons</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Responsive Mobile-First</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-[#4DA3FF]" />
                    <span>AI Engineering &amp; APIs</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Google Gemini API</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">@google/genai SDK</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Structured JSON Output</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">REST APIs</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Terminal className="w-4 h-4 text-[#4DA3FF]" />
                    <span>Tools &amp; Infrastructure</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Vite</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Git / GitHub</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Node.js</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200">Local Persistence</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  </section>
);
};
