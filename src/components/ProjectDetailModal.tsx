import React, { useState } from 'react';
import { X, ExternalLink, Github, Play, CheckCircle2, Sparkles, Layers, ShieldCheck, Video, Layout, Zap, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { ScreenshotLightbox } from './ScreenshotLightbox';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAgentHqCaseStudy?: () => void;
  onOpenAurenCaseStudy?: () => void;
  onOpenWatchvaultCaseStudy?: () => void;
  onOpenAtlasCaseStudy?: () => void;
  onOpenHscCaseStudy?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose, onOpenAgentHqCaseStudy, onOpenAurenCaseStudy, onOpenWatchvaultCaseStudy, onOpenAtlasCaseStudy, onOpenHscCaseStudy }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'casestudy' | 'screenshots' | 'video'>('overview');
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!isOpen || !project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div
          className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="px-6 py-5 bg-[#050505] border-b border-white/10 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-white/10">
                  {project.category}
                </span>
                <span className="text-xs text-zinc-500">•</span>
                <span className="text-xs text-zinc-400 font-mono">Project Case Study</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Bar inside Modal */}
          <div className="px-6 border-b border-white/10 bg-[#070707] flex items-center gap-2 overflow-x-auto text-sm font-medium text-zinc-400">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-[#4DA3FF] text-[#4DA3FF] font-semibold'
                  : 'border-transparent hover:text-white'
              }`}
            >
              Overview
            </button>
            {project.caseStudy && (
              <button
                onClick={() => setActiveTab('casestudy')}
                className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === 'casestudy'
                    ? 'border-[#4DA3FF] text-[#4DA3FF] font-semibold'
                    : 'border-transparent hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 text-[#4DA3FF]" />
                <span>Case Study & Architecture</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'screenshots'
                  ? 'border-[#4DA3FF] text-[#4DA3FF] font-semibold'
                  : 'border-transparent hover:text-white'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Screenshots Gallery ({project.screenshots.length})</span>
            </button>
            {project.demoVideo && (
              <button
                onClick={() => setActiveTab('video')}
                className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === 'video'
                    ? 'border-[#4DA3FF] text-[#4DA3FF] font-semibold'
                    : 'border-transparent hover:text-white'
                }`}
              >
                <Video className="w-4 h-4 text-[#4DA3FF]" />
                <span>Demo Video</span>
              </button>
            )}
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#0a0a0a]">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Tech Badges & Quick Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400 mr-2">Tech Stack:</span>
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-zinc-900 text-xs text-zinc-200 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.id === 'auren' && onOpenAurenCaseStudy && (
                      <button
                        onClick={onOpenAurenCaseStudy}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-all shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Auren Full Case Study</span>
                      </button>
                    )}
                {project.id === 'watchvault' && onOpenWatchvaultCaseStudy && (
                  <button
                    onClick={onOpenWatchvaultCaseStudy}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-all shadow-md shadow-rose-500/20 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>WatchVault Full Case Study</span>
                  </button>
                )}
                {project.id === 'agent-hq' && onOpenAgentHqCaseStudy && (
                      <button
                        onClick={onOpenAgentHqCaseStudy}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-cyan-400/20 cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Agent HQ Full Case Study</span>
                      </button>
                    )}
                    {project.id === 'atlas' && onOpenAtlasCaseStudy && (
                      <button
                        onClick={onOpenAtlasCaseStudy}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 font-bold text-xs transition-all shadow-md shadow-[#4DA3FF]/20 cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Atlas Case Study</span>
                      </button>
                    )}
                    {project.id === 'hsc-ai-system' && onOpenHscCaseStudy && (
                      <button
                        onClick={onOpenHscCaseStudy}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>HSC AI Case Study</span>
                      </button>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs border border-white/10 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#4DA3FF]" />
                        <span>Live App</span>
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs border border-white/10 transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Problem Card */}
                  <div className="p-5 rounded-xl bg-red-950/10 border border-red-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {project.problem}
                    </p>
                  </div>

                  {/* Solution Card */}
                  <div className="p-5 rounded-xl bg-emerald-950/10 border border-emerald-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>The Solution</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Implemented Key Features Grid */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-zinc-300" />
                    <span>Implemented Platform Features</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all space-y-1.5"
                      >
                        <div className="flex items-center gap-2 text-white font-semibold text-sm">
                          <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0" />
                          <span>{feature.title}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screenshot Gallery Teaser */}
                <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Visual Screenshot Gallery</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Explore all {project.screenshots.length} interface viewports and dashboard features.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('screenshots')}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <span>View Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Case Study & Architecture Tab */}
            {activeTab === 'casestudy' && project.caseStudy && (
              <div className="space-y-8">
                {project.id === 'auren' && onOpenAurenCaseStudy && (
                  <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">Dedicated Engineering Case Study Page Available</span>
                      <p className="text-xs text-zinc-300">Explore in-depth documentation on the 9 unified workspaces, SSRF sandbox, RAG memory grounding, and Playwright computer control.</p>
                    </div>
                    <button
                      onClick={onOpenAurenCaseStudy}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-all shrink-0 cursor-pointer shadow-md shadow-indigo-500/20"
                    >
                      <span>Open Full Case Study Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {project.id === 'watchvault' && onOpenWatchvaultCaseStudy && (
                  <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider block">Dedicated Engineering Case Study Page Available</span>
                      <p className="text-xs text-zinc-300">Explore in-depth documentation on the offline-first Dexie IndexedDB architecture, SeriesGraph episode rating heatmaps, and Supabase cloud sync engine.</p>
                    </div>
                    <button
                      onClick={onOpenWatchvaultCaseStudy}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-all shrink-0 cursor-pointer shadow-md shadow-rose-500/20"
                    >
                      <span>Open Full Case Study Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {project.id === 'agent-hq' && onOpenAgentHqCaseStudy && (
                  <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">Dedicated Engineering Case Study Page Available</span>
                      <p className="text-xs text-zinc-300">Explore in-depth documentation on the topological DAG task scheduler, 6-agent roster, LLM failover cascade, and SQLite WAL storage.</p>
                    </div>
                    <button
                      onClick={onOpenAgentHqCaseStudy}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs transition-all shrink-0 cursor-pointer shadow-md shadow-cyan-400/20"
                    >
                      <span>Open Full Case Study Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Architecture Overview Card */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-[#4DA3FF] font-mono text-xs font-semibold uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>System Architecture Overview</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    {project.caseStudy.architectureOverview}
                  </p>
                </div>

                {/* Component Hierarchy & State Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#4DA3FF]" />
                      <span>Modular Component Hierarchy</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs text-zinc-300 font-mono">
                      {project.caseStudy.componentHierarchy.map((comp, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-zinc-950 p-2.5 rounded-lg border border-white/5">
                          <span className="text-[#4DA3FF] font-bold">{idx + 1}.</span>
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#4DA3FF]" />
                      <span>State Management & Data Strategy</span>
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-white/5">
                      {project.caseStudy.stateStrategy}
                    </p>

                    <div className="pt-2">
                      <h5 className="text-xs font-mono text-zinc-400 uppercase mb-2">Key Measurable Outcomes</h5>
                      <ul className="space-y-2 text-xs text-zinc-300">
                        {project.caseStudy.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA3FF] shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Technical Challenges & Solutions */}
                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4DA3FF]" />
                    <span>Technical Challenges & Solutions</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.caseStudy.technicalChallenges.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                        <span className="text-xs font-mono font-bold text-amber-400 block">
                          Challenge #{idx + 1}: {item.challenge}
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          <strong className="text-[#4DA3FF]">Solution: </strong>
                          {item.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Screenshots Tab (Section 7 Screenshot Gallery) */}
            {activeTab === 'screenshots' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Interface Gallery</h3>
                    <p className="text-xs text-neutral-400">
                      Click any screenshot to open high-resolution fullscreen inspection.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {project.screenshots.length} Screens Configured
                  </span>
                </div>

                {/* Featured Selected Screenshot Viewport */}
                <div className="relative rounded-2xl border border-white/10 bg-[#050505] overflow-hidden group shadow-2xl">
                  <div className="px-4 py-2.5 bg-[#080808] border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>{project.screenshotTitles?.[selectedScreenshotIndex] || `Screenshot ${selectedScreenshotIndex + 1}`}</span>
                    <span className="text-zinc-300">Click to expand</span>
                  </div>

                  <div
                    onClick={() => setLightboxOpen(true)}
                    className="cursor-pointer relative aspect-video bg-[#0a0a0a] flex items-center justify-center overflow-hidden p-4 group"
                  >
                    <img
                      src={project.screenshots[selectedScreenshotIndex]}
                      alt={project.screenshotTitles?.[selectedScreenshotIndex] || `${project.name} Screenshot`}
                      className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const el = document.getElementById('modal-main-fallback');
                        if (el) el.style.display = 'flex';
                      }}
                    />

                    {/* Fallback Viewport Card */}
                    <div
                      id="modal-main-fallback"
                      className="flex flex-col items-center justify-center p-8 text-center space-y-3 bg-zinc-900/80 rounded-xl border border-white/10 max-w-lg hidden"
                    >
                      <Layout className="w-10 h-10 text-white" />
                      <h4 className="text-lg font-bold text-white">
                        {project.screenshotTitles?.[selectedScreenshotIndex] || `Screen ${selectedScreenshotIndex + 1}`}
                      </h4>
                      <p className="text-xs text-zinc-300">
                        {project.screenshotDescriptions?.[selectedScreenshotIndex] || "Interface screenshot demonstration."}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-xl bg-zinc-900/90 text-white font-medium text-xs border border-white/20 shadow-xl flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-zinc-300" />
                        Click to Expand Fullscreen
                      </span>
                    </div>
                  </div>
                </div>

                {/* Screenshot Thumbnails Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.screenshots.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedScreenshotIndex(idx)}
                      className={`relative rounded-xl border p-2 text-left transition-all overflow-hidden cursor-pointer ${
                        selectedScreenshotIndex === idx
                          ? 'border-[#4DA3FF] bg-[#4DA3FF]/10 shadow-lg'
                          : 'border-white/10 bg-zinc-900/50 hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-zinc-400 truncate mb-1">
                        #{idx + 1} {project.screenshotTitles?.[idx]?.split('.')[1] || `View ${idx + 1}`}
                      </div>
                      <div className="aspect-video bg-zinc-950 rounded flex items-center justify-center overflow-hidden">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Video Demo Tab */}
            {activeTab === 'video' && project.demoVideo && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-emerald-400" />
                    <span>Atlas Platform Walkthrough Video</span>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Configurable video asset path: <code className="text-zinc-300 font-mono">{project.demoVideo}</code>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl relative aspect-video flex items-center justify-center">
                  <video
                    controls
                    className="w-full h-full object-contain"
                    poster="/projects/atlas/video-poster.png"
                    onError={(e) => {
                      // Fallback overlay if MP4 video file hasn't been uploaded yet
                      e.currentTarget.style.display = 'none';
                      const fallbackVideo = document.getElementById('video-fallback-msg');
                      if (fallbackVideo) fallbackVideo.style.display = 'flex';
                    }}
                  >
                    <source src={project.demoVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <div
                    id="video-fallback-msg"
                    className="flex-col items-center justify-center p-8 text-center space-y-4 max-w-md bg-zinc-900/90 rounded-2xl border border-white/10"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Video Player Configured</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        The video player is ready. When the developer drops the <code className="text-emerald-300 font-mono">{project.demoVideo}</code> MP4 file into the project assets, it will play directly here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-[#050505] border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-mono">
              Designed & Built by Farhan
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox trigger */}
      <ScreenshotLightbox
        isOpen={lightboxOpen}
        imageSrc={project.screenshots[selectedScreenshotIndex]}
        title={project.screenshotTitles?.[selectedScreenshotIndex]}
        description={project.screenshotDescriptions?.[selectedScreenshotIndex]}
        currentIndex={selectedScreenshotIndex}
        totalImages={project.screenshots.length}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setSelectedScreenshotIndex((selectedScreenshotIndex - 1 + project.screenshots.length) % project.screenshots.length)}
        onNext={() => setSelectedScreenshotIndex((selectedScreenshotIndex + 1) % project.screenshots.length)}
        projectTitle={project.name}
      />
    </>
  );
};
