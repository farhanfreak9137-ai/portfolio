import React, { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle2,
  Brain,
  Activity,
  Dumbbell,
  BookOpen,
  Trophy,
  FileText,
  Copy,
  Check,
  Cpu,
  Database,
  Lock,
  Camera,
  Flame,
  Layout,
  Maximize2
} from 'lucide-react';
import { atlasScreenshots, atlasScreenshotMetadata } from '../data/portfolioData';
import { ScreenshotLightbox } from './ScreenshotLightbox';

interface AtlasCaseStudyPageProps {
  onBack: () => void;
}

export const AtlasCaseStudyPage: React.FC<AtlasCaseStudyPageProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'ai' | 'vision' | 'modules' | 'android' | 'testing'>('architecture');
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const javaCodeSnippet = `@CapacitorPlugin(name = "AtlasPhoneControl")
public class AtlasPhoneControlPlugin extends Plugin {
    // 1. Checks Usage Access & Overlay permissions
    @PluginMethod
    public void checkPermissions(PluginCall call) { ... }

    // 2. Opens Android Settings for Usage Access
    @PluginMethod
    public void requestUsageAccess(PluginCall call) { ... }

    // 3. Opens System Alert Window Settings for Overlay Lockscreen
    @PluginMethod
    public void requestOverlayPermission(PluginCall call) { ... }

    // 4. Queries UsageStatsManager for daily foreground app screen time
    @PluginMethod
    public void getTodayScreenTimeMinutes(PluginCall call) { ... }

    // 5. Queries PackageManager for launchable installed app packages
    @PluginMethod
    public void getInstalledApps(PluginCall call) { ... }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(javaCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-neutral-100 selection:bg-[#4DA3FF] selection:text-black pt-20 pb-24">
      
      {/* Sticky Case Study Top Navigation Bar */}
      <div className="sticky top-[65px] z-30 bg-[#050508]/90 backdrop-blur-md border-b border-white/10 py-3 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#4DA3FF]" />
            <span>Back to Portfolio</span>
          </button>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="text-zinc-500">Case Study:</span>
            <span className="text-white font-semibold">Atlas OS</span>
            <span className="text-zinc-600">•</span>
            <span className="text-[#4DA3FF]">Next.js 16 + React 19 + Android</span>
          </div>

          <a
            href="https://atlas-aa7q.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 font-bold text-xs transition-all shadow-md shadow-[#4DA3FF]/20"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Web Deployment</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-8">

        {/* 1. HERO SECTION */}
        <div className="relative rounded-3xl bg-zinc-900/40 border border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl space-y-8">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DA3FF]/10 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="space-y-4 text-left max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#4DA3FF]/15 text-[#4DA3FF] border border-[#4DA3FF]/30">
                Flagship Case Study
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-white/10">
                Developer: Farhan (@farhanfreak9137-ai)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Android Package ID: com.farhan.atlas
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Atlas — Personal AI Operating System & Digital Discipline Platform
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-normal border-l-2 border-[#4DA3FF] pl-4 py-1 bg-[#4DA3FF]/5 rounded-r-lg">
              Atlas is a cross-platform personal AI operating system and life management ecosystem built to combat digital distraction, optimize daily productivity, and enforce screen-time discipline using real-time AI camera motion tracking.
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Live Deployment</span>
              <a
                href="https://atlas-aa7q.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-[#4DA3FF] hover:underline truncate block"
              >
                atlas-aa7q.vercel.app ↗
              </a>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Native Target</span>
              <span className="text-xs font-mono text-zinc-200 block">Android (Capacitor 8)</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Frontend Stack</span>
              <span className="text-xs font-mono text-zinc-200 block">Next.js 16 • React 19 • TS 5</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">State & Storage</span>
              <span className="text-xs font-mono text-zinc-200 block">Zustand 5 • Supabase • Firestore</span>
            </div>
          </div>
        </div>

        {/* 2. EXECUTIVE SUMMARY & PROBLEM / SOLUTION */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4DA3FF] uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>1. Executive Summary & Context</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem Card */}
            <div className="p-6 rounded-2xl bg-red-950/15 border border-red-500/30 space-y-4">
              <div className="flex items-center gap-3 text-red-400 font-bold text-lg">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>The Problem Statement</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Personal productivity was breaking down due to fragmented life-tracking tools and pervasive smartphone addiction ("doom scrolling"). Existing app blockers were easily bypassed, lacking meaningful friction or personal context to curb digital distractions.
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>The Engineered Solution</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Atlas unifies daily task execution, habit building, goal progress, study sessions, gym workouts, and sports performance into a single dark glassmorphism dashboard. To solve doom scrolling, Atlas pairs native Android screen-time limits with an <strong className="text-emerald-300">AI-powered physical barrier</strong>: users must perform verified camera pushups to unlock temporary phone time.
              </p>
            </div>
          </div>
        </div>

        {/* 3. SYSTEM ARCHITECTURE */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4DA3FF] uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>2. System Architecture & Component Inventory</span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">Full-Stack Data Flow & System Subgraphs</h3>

            {/* Subgraph Cards Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Subgraph 1: Frontend Application */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-sky-500/30 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Layout className="w-4 h-4" />
                  <span>Frontend Application</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Next.js 16 App Router</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">React 19 + Tailwind CSS 4</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Zustand 5 (15 Domain Stores)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Domain Service Layer</li>
                </ul>
              </div>

              {/* Subgraph 2: Intelligence & AI Layer */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Brain className="w-4 h-4" />
                  <span>Intelligence & AI Layer</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Atlas Context Ingestion</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">OpenRouter AI API Cascade</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Gemini 2.0 / Llama 3.3</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">WebRTC AI Pushup Engine</li>
                </ul>
              </div>

              {/* Subgraph 3: Storage & Persistence */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Database className="w-4 h-4" />
                  <span>Storage & Persistence</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">BaseRepository Pattern</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">LocalStorage Cache</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Supabase PostgreSQL</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Firebase Firestore</li>
                </ul>
              </div>

              {/* Subgraph 4: Native Android Layer */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Smartphone className="w-4 h-4" />
                  <span>Native Android Layer</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Capacitor Native Bridge</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">AtlasPhoneControlPlugin.java</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">UsageStatsManager</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">SYSTEM_ALERT_WINDOW</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* 4. CORE FEATURE DEEP DIVE */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4DA3FF] uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>3. Core Feature Deep Dive</span>
          </div>

          <div className="grid grid-cols-1 gap-6">

            {/* Feature A: Personal AI Companion */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">🤖 A. Personal AI Companion ("Atlas AI")</h3>
                  <p className="text-xs text-zinc-400">Intelligent life assistant with dynamic profile context ingestion</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                  <h4 className="text-sm font-semibold text-purple-300">Dynamic System Context Ingestion</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Compiles user bio, physical metrics, DOB, and location along with live task counts, habit completions, goal progress, study hours, gym workouts, and journal entries into the AI prompt window.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                  <h4 className="text-sm font-semibold text-purple-300">Configurable Prompt Controls</h4>
                  <ul className="text-xs text-zinc-400 space-y-1.5">
                    <li>• <strong>Verbosity Slider</strong>: 1-2 sentence replies to comprehensive deep dives.</li>
                    <li>• <strong>Creative vs. Precise Mode</strong>: Temperature tuning (0.9 vs. 0.3).</li>
                    <li>• <strong>Memory Window</strong>: 10-turn sliding context retention.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                  <h4 className="text-sm font-semibold text-purple-300">Resilient Model Cascade</h4>
                  <ol className="text-xs text-zinc-400 space-y-1 font-mono">
                    <li>1. openrouter/free</li>
                    <li>2. google/gemini-2.0-flash-lite-001</li>
                    <li>3. meta-llama/llama-3.3-70b-instruct:free</li>
                    <li>4. google/gemini-flash-1.5:free</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Feature B: Physical Screen Time Enforcement */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">🏋️ B. Physical Screen Time Enforcement & AI Motion Tracking</h3>
                  <p className="text-xs text-zinc-400">Hardware-level app locking unlocked via computer vision exercise verification</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-zinc-950 border border-white/5 space-y-3">
                  <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Native Android Discipline</span>
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                    <li>• Configurable daily limit (minimum 15 mins) & wake timeout controls.</li>
                    <li>• Category presets (Social Media, Games, Streaming, Short Video Reels) & custom package blacklisting (<code className="text-emerald-300 font-mono">customBlockedPackages</code>).</li>
                    <li>• Bedtime quiet-hours schedule locking.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-zinc-950 border border-white/5 space-y-3">
                  <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>Computer Vision Pushup Counter</span>
                  </h4>
                  <ul className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                    <li>• Built directly in browser/webview using HTML5 WebRTC <code className="text-emerald-300 font-mono">&lt;video&gt;</code> and high-frequency <code className="text-emerald-300 font-mono">&lt;canvas&gt;</code> frame processing.</li>
                    <li>• Performs top-region luminance variance analysis to detect body lowering and rising phases.</li>
                    <li>• Grants strict 15-minute emergency phone window only upon completing the rep target (e.g., 20 pushups).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature C: Unified Life Management Modules */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">📊 C. Unified Life Management Modules</h3>
                  <p className="text-xs text-zinc-400">Integrated suite of daily tracking and productivity tools</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Task Management</span>
                  </h4>
                  <p className="text-xs text-zinc-400">Priority matrix (<code className="text-zinc-300 font-mono">high</code>, <code className="text-zinc-300 font-mono">normal</code>, <code className="text-zinc-300 font-mono">low</code>), due dates, categories, and completion analytics.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Habit Tracking</span>
                  </h4>
                  <p className="text-xs text-zinc-400">Daily completion logs, streak calculations, and overall productivity index contribution.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span>Goal Management</span>
                  </h4>
                  <p className="text-xs text-zinc-400">Sub-goal milestones, completion percentages, and target deadlines.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Study Hub</span>
                  </h4>
                  <p className="text-xs text-zinc-400">Subject organizer, timed study sessions with 1-5 focus ratings, exam grade logger, GPA & streak analytics.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-red-400" />
                    <span>Gym Logger</span>
                  </h4>
                  <p className="text-xs text-zinc-400">Default & custom exercise library, set/rep/weight tracking, PR max weight, weekly volume (<code className="text-zinc-300 font-mono">sets × reps × weight</code>).</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>Football Performance Tracker</span>
                  </h4>
                  <p className="text-xs text-zinc-400">Match logger (goals, assists, 1-10 rating, result), training duration logs, win rate analytics.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 5. ANDROID NATIVE PLUGIN IMPLEMENTATION */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4DA3FF] uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>4. Android Native Plugin Implementation</span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Capacitor Native Bridge Implementation</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Atlas bridges the web interface with native Android system APIs via Capacitor:
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2 transition-all cursor-pointer"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Plugin Code'}</span>
              </button>
            </div>

            {/* Java Snippet Box */}
            <div className="rounded-xl border border-white/10 bg-[#040406] p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
                {javaCodeSnippet}
              </pre>
            </div>

            {/* Android Manifest Permissions */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-semibold text-white">Configured Android Manifest Permissions:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-zinc-950 border border-white/5 text-xs">
                  <code className="text-sky-400 font-mono font-bold block mb-1">PACKAGE_USAGE_STATS</code>
                  <span className="text-zinc-400">Read daily foreground application usage time.</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-white/5 text-xs">
                  <code className="text-purple-400 font-mono font-bold block mb-1">SYSTEM_ALERT_WINDOW</code>
                  <span className="text-zinc-400">Render full-screen lockout overlay window.</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-white/5 text-xs">
                  <code className="text-amber-400 font-mono font-bold block mb-1">FOREGROUND_SERVICE</code>
                  <span className="text-zinc-400">Enable persistent background monitoring service.</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950 border border-white/5 text-xs">
                  <code className="text-emerald-400 font-mono font-bold block mb-1">INTERNET</code>
                  <span className="text-zinc-400">Sync data with OpenRouter and Supabase services.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. TESTING & DEPLOYMENT CONFIGURATION */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4DA3FF] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>5. Testing & Deployment Configuration</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <h3 className="text-base font-bold text-white">Next.js Static Export</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Configured with <code className="text-[#4DA3FF] font-mono">output: "export"</code> and <code className="text-[#4DA3FF] font-mono">images: &#123; unoptimized: true &#125;</code> in <code className="text-zinc-400 font-mono">next.config.ts</code> to produce static assets for Vercel edge deployment and Capacitor Android packaging.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <h3 className="text-base font-bold text-white">Playwright E2E Testing</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Automated browser tests (<code className="text-emerald-400 font-mono">tests/atlas.spec.ts</code> and <code className="text-emerald-400 font-mono">e2e/chat.spec.ts</code>) verify route integrity, console error freedom, and UI element stability across desktop and mobile viewports.
              </p>
            </div>
          </div>
        </div>

        {/* 7. VISUAL SCREENSHOT GALLERY */}
        <div className="space-y-8 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#4DA3FF] uppercase tracking-wider">
              <Layout className="w-4 h-4" />
              <span>6. Visual Screenshot Gallery</span>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {atlasScreenshots.length} High-Res Viewports
            </span>
          </div>

          {/* Featured Screenshot */}
          <div className="relative rounded-2xl border border-white/10 bg-[#050505] overflow-hidden shadow-2xl group">
            <div className="px-4 py-3 bg-[#08080a] border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>{atlasScreenshotMetadata[selectedScreenshotIndex]?.title || `Screen #${selectedScreenshotIndex + 1}`}</span>
              <span className="text-[#4DA3FF]">Click screenshot for Fullscreen Lightbox</span>
            </div>

            <div
              onClick={() => setLightboxOpen(true)}
              className="cursor-pointer relative aspect-video bg-zinc-950 flex items-center justify-center p-4 group"
            >
              <img
                src={atlasScreenshots[selectedScreenshotIndex]}
                alt={atlasScreenshotMetadata[selectedScreenshotIndex]?.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-zinc-900/90 text-white font-medium text-xs border border-white/20 shadow-xl flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#4DA3FF]" />
                  Click to Expand Fullscreen
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {atlasScreenshots.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScreenshotIndex(idx)}
                className={`relative rounded-xl border p-2 text-left transition-all overflow-hidden cursor-pointer ${
                  selectedScreenshotIndex === idx
                    ? 'border-[#4DA3FF] bg-[#4DA3FF]/15 shadow-lg'
                    : 'border-white/10 bg-zinc-900/40 hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-mono text-zinc-400 truncate mb-1">
                  {atlasScreenshotMetadata[idx]?.title || `View #${idx + 1}`}
                </div>
                <div className="aspect-video bg-zinc-950 rounded flex items-center justify-center overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 8. IMPACT & LESSONS LEARNED */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4DA3FF] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>7. Impact & Lessons Learned</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <h3 className="text-base font-bold text-white">Behavioral Impact</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Physical pushup verification created the ideal friction barrier—requiring physical effort before spending time on distracting apps dramatically curbed impulse phone usage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <h3 className="text-base font-bold text-white">Friend Group Validation</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Initially built for personal discipline, the app is currently utilized by the creator and their inner circle of friends as a daily accountability tool.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <h3 className="text-base font-bold text-white">Key Takeaway</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Combining personal life context with AI intelligence transforms a standard utility app into an active "companion OS" that keeps users accountable to their personal goals.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA BAR */}
        <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Explore Atlas Live</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Experience the deployed web application at <code className="text-[#4DA3FF]">https://atlas-aa7q.vercel.app/</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              Back to Portfolio
            </button>
            <a
              href="https://atlas-aa7q.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 text-xs font-bold transition-all shadow-md shadow-[#4DA3FF]/20 flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Deployed Web App</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <ScreenshotLightbox
        isOpen={lightboxOpen}
        imageSrc={atlasScreenshots[selectedScreenshotIndex]}
        title={atlasScreenshotMetadata[selectedScreenshotIndex]?.title}
        description={atlasScreenshotMetadata[selectedScreenshotIndex]?.description}
        currentIndex={selectedScreenshotIndex}
        totalImages={atlasScreenshots.length}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setSelectedScreenshotIndex((selectedScreenshotIndex - 1 + atlasScreenshots.length) % atlasScreenshots.length)}
        onNext={() => setSelectedScreenshotIndex((selectedScreenshotIndex + 1) % atlasScreenshots.length)}
        projectTitle="Atlas Personal OS"
      />
    </div>
  );
};
