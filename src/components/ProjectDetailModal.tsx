import React, { useState } from 'react';
import { X, ExternalLink, Github, Play, CheckCircle2, Sparkles, Layers, ShieldCheck, Video, Layout, Plus, Trash2, Zap, ArrowRight, ChevronLeft, ChevronRight, Smartphone, Maximize2, Bot, Workflow, Mail, Bell, Terminal, RefreshCw } from 'lucide-react';
import { Project } from '../types';
import { ScreenshotLightbox } from './ScreenshotLightbox';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAtlasCaseStudy?: () => void;
  onOpenHscCaseStudy?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose, onOpenAtlasCaseStudy, onOpenHscCaseStudy }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'casestudy' | 'screenshots' | 'video' | 'interactive'>('overview');
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Interactive Live Workbench State for Agent HQ
  const [agentHqMissionIndex, setAgentHqMissionIndex] = useState(0);
  const [agentHqRunning, setAgentHqRunning] = useState(false);
  const [agentHqStep, setAgentHqStep] = useState(4); // 4 = all stages completed

  const agentHqMissions = [
    {
      title: "Outreach Campaign Pipeline",
      prompt: "Research remote AI engineering roles, match Farhan's profile, stage 20s-paced SMTP outbox with XLSX attachment, and alert Discord on replies.",
      stages: [
        { agent: "Boss Commander", role: "Mission Decomposition", provider: "Gemini 2.0 Flash", latency: "142ms", detail: "Decomposed mission into 4 DAG dependency nodes with concurrency limits." },
        { agent: "Atlas Researcher", role: "Web Intelligence & Scraping", provider: "Groq Llama-3.3", latency: "288ms", detail: "Scraped 5 remote AI opportunities and generated workspace/remote-job-matches.xlsx." },
        { agent: "Strategist", role: "Profile Matcher & Scoring", provider: "Antigravity CLI", latency: "96ms", detail: "Ranked roles matching Farhan's multi-agent and full-stack expertise." },
        { agent: "Outreach Agent", role: "Gmail SMTP & CRM Outbox", provider: "Nodemailer", latency: "64ms", detail: "Staged 5 personalized applications with 20s anti-spam delivery pacing." },
        { agent: "Discord Alert", role: "Mobile Push Notification", provider: "Discord Webhook", latency: "38ms", detail: "Dispatched formatted status embed card directly to Farhan's mobile device." }
      ]
    },
    {
      title: "Repository Architectural & Security Audit",
      prompt: "Perform deep modular analysis, check provider failover cascades, verify zero CVEs, and confirm SQLite WAL transactional safety.",
      stages: [
        { agent: "Boss Commander", role: "Mission Decomposition", provider: "Gemini 2.0 Flash", latency: "110ms", detail: "Spawned security and architectural audit sub-tasks with strict isolated context." },
        { agent: "Sentinel", role: "Vulnerability & Secret Scanner", provider: "AST Scanner", latency: "195ms", detail: "Verified zero credential leaks in git history; all API keys masked with asterisks." },
        { agent: "Atlas", role: "Dependency Topology Analyzer", provider: "Node.js AST", latency: "220ms", detail: "Mapped all 9 system modules; verified circular dependency index is 0.00%." }
      ]
    }
  ];

  const handleRunAgentHqMission = () => {
    setAgentHqRunning(true);
    setAgentHqStep(0);
    setTimeout(() => setAgentHqStep(1), 400);
    setTimeout(() => setAgentHqStep(2), 900);
    setTimeout(() => setAgentHqStep(3), 1400);
    setTimeout(() => {
      setAgentHqStep(4);
      setAgentHqRunning(false);
    }, 1900);
  };

  // Interactive Live Workbench State for Atlas
  const [sampleTasks, setSampleTasks] = useState([
    { id: 1, text: "Review Atlas quarterly roadmap", done: true, tag: "Goals" },
    { id: 2, text: "Log 30 min morning deep work habit", done: false, tag: "Habit" },
    { id: 3, text: "Integrate Gemini AI subtask assistant", done: true, tag: "AI Feature" },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [aiDecomposing, setAiDecomposing] = useState(false);

  // Interactive Live Workbench State for HSC AI Study System
  const [hscSelectedTopic, setHscSelectedTopic] = useState<'thermo' | 'dynamics' | 'vectors' | 'calculus'>('thermo');
  const [hscWeaknessIndex, setHscWeaknessIndex] = useState<number>(60);
  const [hscRevealedStep, setHscRevealedStep] = useState<number>(1);
  const [hscAiSimulating, setHscAiSimulating] = useState<boolean>(false);

  // Interactive Live Workbench State for Gym Tracker
  const [sampleSets, setSampleSets] = useState([
    { id: 1, exercise: "Bench Press", weight: 185, reps: 8, completed: true },
    { id: 2, exercise: "Bench Press", weight: 195, reps: 6, completed: true },
    { id: 3, exercise: "Bench Press", weight: 205, reps: 4, completed: false },
  ]);

  if (!isOpen || !project) return null;

  const hasInteractiveDemo = ['agent-hq', 'atlas', 'hsc-ai-system', 'gym-tracker'].includes(project.id);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setSampleTasks([
      ...sampleTasks,
      { id: Date.now(), text: newTaskInput.trim(), done: false, tag: "Task" }
    ]);
    setNewTaskInput('');
  };

  const handleToggleTask = (id: number) => {
    setSampleTasks(sampleTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAiBreakdown = () => {
    setAiDecomposing(true);
    setTimeout(() => {
      setSampleTasks([
        ...sampleTasks,
        { id: Date.now() + 1, text: "AI Subtask 1: Define clear priority metrics", done: false, tag: "AI Generated" },
        { id: Date.now() + 2, text: "AI Subtask 2: Schedule 45-min focus block", done: false, tag: "AI Generated" },
      ]);
      setAiDecomposing(false);
    }, 1200);
  };

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
            {hasInteractiveDemo && (
              <button
                onClick={() => setActiveTab('interactive')}
                className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'border-[#4DA3FF] text-[#4DA3FF] font-semibold'
                    : 'border-transparent hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#4DA3FF]" />
                <span>Interactive Live Demo</span>
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

            {/* Interactive Live Demo Tab */}
            {activeTab === 'interactive' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    <strong>Interactive Feature Sandbox:</strong> Experience Farhan's core logic and state architecture directly inside this modal.
                  </span>
                </div>

                {project.id === 'agent-hq' ? (
                  /* Agent HQ Autonomous Multi-Agent DAG Simulation */
                  <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Multi-Agent Execution Engine
                          </span>
                          <h4 className="text-base font-bold text-white">Autonomous DAG Scheduler &amp; Event Stream</h4>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Test Boss mission decomposition, multi-agent delegation, and provider cascade execution.
                        </p>
                      </div>

                      <button
                        onClick={handleRunAgentHqMission}
                        disabled={agentHqRunning}
                        className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg disabled:opacity-50 cursor-pointer self-start sm:self-auto"
                      >
                        {agentHqRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                        <span>{agentHqRunning ? "Executing DAG..." : "Run Mission DAG"}</span>
                      </button>
                    </div>

                    {/* Mission Selector */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Select Mission Scenario:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {agentHqMissions.map((m, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setAgentHqMissionIndex(idx);
                              setAgentHqStep(4);
                            }}
                            className={`p-3 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                              agentHqMissionIndex === idx
                                ? 'bg-cyan-500/20 text-white border-cyan-500/50 shadow-sm'
                                : 'bg-zinc-950/60 text-zinc-400 border-white/5 hover:border-white/20 hover:text-zinc-200'
                            }`}
                          >
                            <div className="font-semibold text-white">{m.title}</div>
                            <div className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{m.prompt}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live Execution Pipeline */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                        <span>Topological DAG Execution Pipeline:</span>
                        <span className="text-cyan-400 font-semibold">
                          {agentHqRunning ? "Running..." : "Pipeline Ready"}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {agentHqMissions[agentHqMissionIndex].stages.map((stage, idx) => {
                          const isDone = agentHqStep >= idx;
                          const isCurrent = agentHqStep === idx && agentHqRunning;

                          return (
                            <div
                              key={idx}
                              className={`p-3.5 rounded-xl border transition-all ${
                                isDone
                                  ? 'bg-zinc-950 border-cyan-500/30'
                                  : 'bg-zinc-950/40 border-white/5 opacity-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                                    isDone ? 'bg-cyan-500/20 text-cyan-300' : 'bg-zinc-800 text-zinc-500'
                                  }`}>
                                    {idx + 1}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-semibold text-white">{stage.agent}</span>
                                      <span className="text-[10px] font-mono text-zinc-400">({stage.role})</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">{stage.detail}</p>
                                  </div>
                                </div>

                                <div className="text-right shrink-0">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-white/10 text-zinc-300">
                                      {stage.provider}
                                    </span>
                                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                                      {stage.latency}
                                    </span>
                                  </div>
                                  <div className="text-[10px] font-mono mt-1">
                                    {isDone ? (
                                      <span className="text-emerald-400 font-medium flex items-center justify-end gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Completed
                                      </span>
                                    ) : isCurrent ? (
                                      <span className="text-cyan-400 font-medium animate-pulse">Running</span>
                                    ) : (
                                      <span className="text-zinc-500">Pending</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : project.id === 'hsc-ai-system' ? (
                  /* HSC AI Study Intelligence Interactive Sandbox */
                  <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Live Logic Sandbox
                          </span>
                          <h4 className="text-base font-bold text-white">Priority Engine &amp; Socratic AI Solver</h4>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Test Farhan's board recurrence algorithm and KaTeX step-by-step mathematical reasoning.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setHscAiSimulating(true);
                          setTimeout(() => {
                            setHscRevealedStep((prev) => Math.min(prev + 1, 3));
                            setHscAiSimulating(false);
                          }, 600);
                        }}
                        disabled={hscAiSimulating || hscRevealedStep >= 3}
                        className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-lg disabled:opacity-50 cursor-pointer self-start sm:self-auto"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{hscAiSimulating ? 'Socratic Reasoning...' : hscRevealedStep >= 3 ? 'Solution Complete' : 'Next Socratic Step'}</span>
                      </button>
                    </div>

                    {/* Topic Selector & Priority Score Live Calculator */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Left: Topic Selector */}
                      <div className="md:col-span-7 space-y-3">
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                          1. Select Curriculum Chapter:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'thermo', name: 'Carnot Engine & Efficiency', subject: 'Physics 1st', boardCount: 18 },
                            { id: 'dynamics', name: 'Moment of Inertia & Torque', subject: 'Physics 1st', boardCount: 15 },
                            { id: 'vectors', name: 'Vector Projection & Work', subject: 'Physics 1st', boardCount: 12 },
                            { id: 'calculus', name: 'Definite Integrals & Area', subject: 'Higher Math 1st', boardCount: 14 }
                          ].map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => {
                                setHscSelectedTopic(topic.id as any);
                                setHscRevealedStep(1);
                              }}
                              className={`p-3 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                                hscSelectedTopic === topic.id
                                  ? 'bg-indigo-500/20 text-white border-indigo-500/50 shadow-sm'
                                  : 'bg-zinc-950/60 text-zinc-400 border-white/5 hover:border-white/20 hover:text-zinc-200'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400 mb-1">
                                <span>{topic.subject}</span>
                                <span>{topic.boardCount}x in Boards</span>
                              </div>
                              <div className="font-semibold text-white line-clamp-1">{topic.name}</div>
                            </button>
                          ))}
                        </div>

                        {/* Weakness Slider */}
                        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10 space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-zinc-300">Simulate Personal Weakness Index:</span>
                            <span className="text-indigo-400 font-bold">{hscWeaknessIndex}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={hscWeaknessIndex}
                            onChange={(e) => setHscWeaknessIndex(Number(e.target.value))}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Right: Calculated Priority Card */}
                      <div className="md:col-span-5 p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-zinc-950 to-zinc-900 border border-indigo-500/30 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                            Algorithm Output
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-white">
                              {Math.min(99, Math.round((hscSelectedTopic === 'thermo' ? 18 : hscSelectedTopic === 'dynamics' ? 15 : hscSelectedTopic === 'vectors' ? 12 : 14) * 2.8 + hscWeaknessIndex * 0.4))}
                            </span>
                            <span className="text-xs text-zinc-400 font-mono">/ 100 Priority Score</span>
                          </div>
                          <p className="text-xs text-indigo-200 leading-relaxed">
                            {hscWeaknessIndex >= 50
                              ? "High Priority: High board frequency paired with unmastered concept."
                              : "Moderate Priority: Good baseline grasp; schedule periodic revision."}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                          <span>Action:</span>
                          <span className="text-emerald-400 font-bold">Recommended First</span>
                        </div>
                      </div>
                    </div>

                    {/* Socratic AI Decomposition Window */}
                    <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-white">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Socratic AI Step-by-Step Problem Breakdown</span>
                        </div>
                        <button
                          onClick={() => setHscRevealedStep(1)}
                          className="text-[11px] font-mono text-zinc-400 hover:text-white underline cursor-pointer"
                        >
                          Reset Steps
                        </button>
                      </div>

                      {/* Problem Statement */}
                      <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/5 text-xs text-zinc-200">
                        <strong>Sample CQ:</strong>{" "}
                        {hscSelectedTopic === 'thermo'
                          ? "A Carnot engine absorbs 1000 J of heat from a source at 500 K and rejects 600 J to the sink. Calculate its thermal efficiency (η) and sink temperature (T₂)."
                          : hscSelectedTopic === 'dynamics'
                          ? "A flywheel of mass 20 kg and radius 0.5 m rotates at 300 rpm. Calculate its moment of inertia (I) and rotational kinetic energy."
                          : hscSelectedTopic === 'vectors'
                          ? "Given vectors A = 2i + 3j - k and B = i - 2j + 4k, calculate the scalar dot product and the work done under force F = A along displacement B."
                          : "Find the area bounded by the curve y = x² and the line y = 4 using definite integration."}
                      </div>

                      {/* Step 1 */}
                      {hscRevealedStep >= 1 && (
                        <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
                          <span className="font-bold text-indigo-300 font-mono">Step 1 — Formula Identification:</span>
                          <p className="font-mono text-zinc-200">
                            {hscSelectedTopic === 'thermo'
                              ? "Efficiency Formula: η = 1 - (Q₂ / Q₁) = 1 - (T₂ / T₁)"
                              : hscSelectedTopic === 'dynamics'
                              ? "Moment of Inertia Formula: I = 1/2 × M × R², Rotational KE = 1/2 × I × ω²"
                              : hscSelectedTopic === 'vectors'
                              ? "Scalar Product: A · B = (A_x × B_x) + (A_y × B_y) + (A_z × B_z)"
                              : "Definite Integral: Area = ∫₋₂² (4 - x²) dx"}
                          </p>
                        </div>
                      )}

                      {/* Step 2 */}
                      {hscRevealedStep >= 2 && (
                        <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
                          <span className="font-bold text-indigo-300 font-mono">Step 2 — Value Substitution:</span>
                          <p className="font-mono text-zinc-200">
                            {hscSelectedTopic === 'thermo'
                              ? "η = 1 - (600 J / 1000 J) = 1 - 0.60 = 0.40 (40%)"
                              : hscSelectedTopic === 'dynamics'
                              ? "I = 0.5 × 20 kg × (0.5 m)² = 2.5 kg·m²; ω = (2π × 300) / 60 = 10π rad/s"
                              : hscSelectedTopic === 'vectors'
                              ? "A · B = (2 × 1) + (3 × -2) + (-1 × 4) = 2 - 6 - 4 = -8 Joules"
                              : "Area = [4x - x³/3]₋₂² = (8 - 8/3) - (-8 + 8/3) = 32/3 = 10.67 sq units"}
                          </p>
                        </div>
                      )}

                      {/* Step 3 */}
                      {hscRevealedStep >= 3 && (
                        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200 space-y-1">
                          <span className="font-bold text-emerald-300 font-mono">Step 3 — Final Answer &amp; Board Exam Insight:</span>
                          <p className="font-mono text-zinc-200">
                            {hscSelectedTopic === 'thermo'
                              ? "Sink Temperature: T₂ = T₁ × (1 - η) = 500 K × 0.60 = 300 K (27°C). [Common Board Trap: Ensure temperature is always in Kelvin!]"
                              : hscSelectedTopic === 'dynamics'
                              ? "Rotational KE = 0.5 × 2.5 × (10π)² = 1.25 × 986.96 = 1233.7 Joules."
                              : hscSelectedTopic === 'vectors'
                              ? "Work Done = -8 J. Negative work indicates force opposes motion direction."
                              : "Total area = 32/3 square units. Verified symmetric across y-axis."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : project.id === 'atlas' ? (
                  <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h4 className="text-base font-bold text-white">Atlas Command Workspace</h4>
                        <p className="text-xs text-zinc-400">Test task addition, habit check-off, and AI decomposition</p>
                      </div>
                      <button
                        onClick={handleAiBreakdown}
                        disabled={aiDecomposing}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-medium text-xs flex items-center gap-2 transition-all shadow-lg disabled:opacity-50"
                      >
                        <Zap className="w-4 h-4 text-amber-600" />
                        <span>{aiDecomposing ? 'AI Thinking...' : 'Trigger AI Subtasks'}</span>
                      </button>
                    </div>

                    {/* Task Creator Form */}
                    <form onSubmit={handleAddTask} className="flex gap-2">
                      <input
                        type="text"
                        value={newTaskInput}
                        onChange={(e) => setNewTaskInput(e.target.value)}
                        placeholder="Add new task to Atlas workspace..."
                        className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Task</span>
                      </button>
                    </form>

                    {/* Sample Task List */}
                    <div className="space-y-2">
                      {sampleTasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => handleToggleTask(t.id)}
                          className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-white/10 hover:border-white/20 cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={t.done}
                              onChange={() => handleToggleTask(t.id)}
                              className="rounded border-zinc-700 bg-zinc-900 text-white focus:ring-white h-4 w-4"
                            />
                            <span className={`text-xs ${t.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                              {t.text}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                            {t.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : project.id === 'gym-tracker' ? (
                  /* Gym Tracker Interactive Demo */
                  <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h4 className="text-base font-bold text-white">Gym Tracker Live Workout Set Logger</h4>
                        <p className="text-xs text-zinc-400">Interactive set and rep logging with live overload volume calculation</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {sampleSets.map((s, idx) => (
                        <div key={s.id} className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 font-mono text-xs flex items-center justify-center font-bold">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="text-xs font-semibold text-white">{s.exercise}</span>
                              <div className="text-[11px] text-zinc-400">
                                {s.weight} lbs × {s.reps} reps ({s.weight * s.reps} lbs volume)
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSampleSets(sampleSets.map(item => item.id === s.id ? { ...item, completed: !item.completed } : item));
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                              s.completed
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {s.completed ? 'Completed' : 'Mark Done'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
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
