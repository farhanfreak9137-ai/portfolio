import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Layers, Layout, Sparkles, CheckCircle2, GraduationCap, BrainCircuit, BookOpen, Clock, Award, ShieldAlert } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
  onOpenAtlasCaseStudy?: () => void;
  onOpenHscCaseStudy?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject, onOpenAtlasCaseStudy, onOpenHscCaseStudy }) => {
  const atlasProject = projects.find(p => p.id === 'atlas') || projects[0];
  const hscProject = projects.find(p => p.id === 'hsc-ai-system') || projects[0];
  const gymProject = projects.find(p => p.id === 'gym-tracker') || projects[1];

  const [activeAtlasScreenshotIndex, setActiveAtlasScreenshotIndex] = useState(0);
  const [activeHscScreenshotIndex, setActiveHscScreenshotIndex] = useState(0);

  return (
    <section id="work" className="py-24 relative bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-xs font-mono text-[#4DA3FF]">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured Work
          </h2>
          <p className="text-lg text-zinc-400">
            A selection of AI platforms, full-stack web applications, and productivity tools I've engineered.
          </p>
        </div>

        {/* 1. ATLAS FEATURED SHOWCASE */}
        <div className="relative rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-[#4DA3FF]/30 transition-all shadow-2xl overflow-hidden group">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DA3FF]/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-zinc-200 border border-white/10">
                  {atlasProject.category}
                </span>
                <span className="text-xs text-emerald-400 font-mono font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Flagship Platform
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                  {atlasProject.name}
                </h3>
                <p className="text-zinc-300 font-medium text-sm sm:text-base">
                  {atlasProject.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {atlasProject.description}
              </p>

              {/* Technology Tags */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {atlasProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onOpenAtlasCaseStudy && (
                  <button
                    onClick={onOpenAtlasCaseStudy}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 font-bold text-sm transition-all shadow-md shadow-[#4DA3FF]/20 active:scale-95 cursor-pointer"
                  >
                    <span>Read Atlas Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => onSelectProject(atlasProject)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 text-sm font-medium transition-all cursor-pointer"
                >
                  <span>Quick Preview</span>
                </button>

                {atlasProject.liveUrl && atlasProject.liveUrl !== '#' && (
                  <a
                    href={atlasProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-sm font-medium transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-[#4DA3FF]" />
                    <span>Live App ↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Interactive Screenshot Showcase Column */}
            <div className="lg:col-span-7 space-y-4">
              <div
                onClick={() => onSelectProject(atlasProject)}
                className="group/img cursor-pointer relative rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-white/20"
              >
                {/* Mock Window Title bar */}
                <div className="px-4 py-3 bg-zinc-900 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <span className="ml-2 text-zinc-400 hidden sm:inline">atlas-platform.app</span>
                  </div>
                  <span className="text-[#4DA3FF] font-mono font-medium text-xs">
                    Screenshot #{activeAtlasScreenshotIndex + 1} / {atlasProject.screenshots.length}
                  </span>
                </div>

                {/* Screenshot Display Box */}
                <div className="relative aspect-[16/10] bg-zinc-950 flex items-center justify-center p-4">
                  <img
                    src={atlasProject.screenshots[activeAtlasScreenshotIndex]}
                    alt={`Atlas Screenshot ${activeAtlasScreenshotIndex + 1}`}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-lg transition-transform duration-300 group-hover/img:scale-[1.02]"
                  />

                  {/* Hover Overlay Badge */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-medium text-xs border border-white/20 shadow-xl flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-zinc-300" />
                      Click to View Details &amp; Screenshots
                    </span>
                  </div>
                </div>
              </div>

              {/* Screenshot Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {atlasProject.screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAtlasScreenshotIndex(idx)}
                    className={`px-2 py-2 rounded-xl border text-center transition-all text-xs font-mono cursor-pointer ${
                      activeAtlasScreenshotIndex === idx
                        ? 'bg-[#4DA3FF]/15 text-[#4DA3FF] border-[#4DA3FF]/40 font-bold shadow-sm'
                        : 'bg-zinc-900/60 text-zinc-400 border-white/5 hover:border-white/15 hover:text-white'
                    }`}
                  >
                    View #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 2. HSC AI STUDY INTELLIGENCE SYSTEM (Featured EdTech & AI Flagship) */}
        {hscProject && (
          <div className="relative rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-indigo-500/30 transition-all shadow-2xl overflow-hidden group">
            {/* Subtle Indigo / Purple Glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-12 items-center">
              
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                    {hscProject.category}
                  </span>
                  <span className="text-xs text-indigo-400 font-mono font-medium flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                    AI Study Intelligence
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                    {hscProject.name}
                  </h3>
                  <p className="text-indigo-200/90 font-medium text-sm sm:text-base">
                    {hscProject.tagline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  {hscProject.description}
                </p>

                {/* Key Pillars */}
                <div className="grid grid-cols-2 gap-2.5 py-1">
                  <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5 text-xs text-zinc-300 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Evidence-Based Priority</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5 text-xs text-zinc-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Socratic AI &amp; KaTeX</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5 text-xs text-zinc-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Timed Board Mock Tests</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5 text-xs text-zinc-300 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>All-Board CQ/MCQ Bank</span>
                  </div>
                </div>

                {/* Technology Tags */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {hscProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {onOpenHscCaseStudy && (
                    <button
                      onClick={onOpenHscCaseStudy}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-all shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer"
                    >
                      <span>Read HSC AI Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => onSelectProject(hscProject)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 text-sm font-medium transition-all cursor-pointer"
                  >
                    <span>Quick Preview &amp; Sandbox</span>
                  </button>

                  {hscProject.liveUrl && hscProject.liveUrl !== '#' && (
                    <a
                      href={hscProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-sm font-medium transition-all"
                    >
                      <ExternalLink className="w-4 h-4 text-indigo-400" />
                      <span>Live App ↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Interactive Screenshot Showcase Column */}
              <div className="lg:col-span-7 space-y-4">
                <div
                  onClick={() => onSelectProject(hscProject)}
                  className="group/img cursor-pointer relative rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-indigo-500/40"
                >
                  {/* Mock Window Title bar */}
                  <div className="px-4 py-3 bg-zinc-900 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-zinc-700" />
                      <div className="w-3 h-3 rounded-full bg-zinc-700" />
                      <div className="w-3 h-3 rounded-full bg-zinc-700" />
                      <span className="ml-2 text-zinc-400 hidden sm:inline">hsc.ai/intelligence-system</span>
                    </div>
                    <span className="text-indigo-400 font-mono font-medium text-xs">
                      View #{activeHscScreenshotIndex + 1}: {hscProject.screenshotTitles?.[activeHscScreenshotIndex] || "Screen"}
                    </span>
                  </div>

                  {/* Screenshot Display Box */}
                  <div className="relative aspect-[16/10] bg-zinc-950 flex items-center justify-center p-4">
                    <img
                      src={hscProject.screenshots[activeHscScreenshotIndex]}
                      alt={`HSC AI Screenshot ${activeHscScreenshotIndex + 1}`}
                      className="max-h-full max-w-full object-contain rounded-lg shadow-lg transition-transform duration-300 group-hover/img:scale-[1.02]"
                    />

                    {/* Hover Overlay Badge */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-medium text-xs border border-white/20 shadow-xl flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        Click to View Full Deep Dive &amp; Case Study
                      </span>
                    </div>
                  </div>
                </div>

                {/* Screenshot Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {hscProject.screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHscScreenshotIndex(idx)}
                      className={`px-2 py-2 rounded-xl border text-center transition-all text-xs font-mono cursor-pointer ${
                        activeHscScreenshotIndex === idx
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 font-bold shadow-sm'
                          : 'bg-zinc-900/60 text-zinc-400 border-white/5 hover:border-white/15 hover:text-white'
                      }`}
                    >
                      {idx === 0 ? "1. Dashboard" : idx === 1 ? "2. AI Tutor" : idx === 2 ? "3. Mock Tests" : "4. Question Bank"}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. THIRD PROJECT: GYM TRACKER */}
        <div className="rounded-3xl bg-zinc-900/40 border border-white/10 p-6 sm:p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {gymProject.category}
              </span>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {gymProject.name}
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  {gymProject.tagline}
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {gymProject.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-1">
                {gymProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-xs text-zinc-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action CTA */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectProject(gymProject)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
                </button>
              </div>
            </div>

            {/* Right Graphic Preview Box */}
            <div className="lg:col-span-7">
              <div
                onClick={() => onSelectProject(gymProject)}
                className="cursor-pointer rounded-2xl bg-zinc-950 border border-white/10 p-6 space-y-4 hover:border-white/20 transition-all shadow-xl group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-3">
                  <span>Gym Tracker Interface Preview</span>
                  <span className="text-emerald-400 font-semibold group-hover:underline">Explore Case Study</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Workout Splits</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Custom exercise lists, sets, reps, and target weight goals.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Progressive Overload</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Track strength progression and personal records over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

