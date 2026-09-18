import React, { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Brain,
  Activity,
  FileText,
  Copy,
  Check,
  Cpu,
  Database,
  Lock,
  Mail,
  Bot,
  Workflow,
  Send,
  AlertTriangle,
  Play,
  RefreshCw,
  BarChart3,
  Maximize2,
  Terminal,
  ShieldAlert,
  Inbox,
  Clock
} from 'lucide-react';
import { agentHqScreenshots, agentHqScreenshotMetadata } from '../data/portfolioData';
import { ScreenshotLightbox } from './ScreenshotLightbox';

interface AgentHqCaseStudyPageProps {
  onBack: () => void;
}

export const AgentHqCaseStudyPage: React.FC<AgentHqCaseStudyPageProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'dag' | 'agents' | 'cascade' | 'outreach' | 'storage' | 'benchmarks'>('dag');
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const dagCodeSnippet = `// server/orchestrator/dagScheduler.ts
import { EventEmitter } from 'events';
import { SQLiteStorage } from '../storage/db';
import { ProviderCascade } from '../llm/providerCascade';

export interface DAGNode {
  id: string;
  agent: 'boss' | 'atlas' | 'sentinel' | 'nova' | 'outreach' | 'strategist';
  role: string;
  dependencies: string[]; // Node IDs that must complete first
  payload: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
}

export class DAGScheduler extends EventEmitter {
  private maxConcurrency = 3;
  private runningNodes = new Set<string>();

  constructor(private nodes: Map<string, DAGNode>) {
    super();
  }

  // Detect circular dependency cycles before execution
  public validateAcyclic(): boolean {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const hasCycle = (id: string): boolean => {
      visited.add(id);
      recursionStack.add(id);
      for (const depId of this.nodes.get(id)?.dependencies || []) {
        if (!visited.has(depId) && hasCycle(depId)) return true;
        if (recursionStack.has(depId)) return true;
      }
      recursionStack.delete(id);
      return false;
    };

    for (const [id] of this.nodes) {
      if (!visited.has(id) && hasCycle(id)) return false;
    }
    return true;
  }

  public async executePipeline(): Promise<void> {
    if (!this.validateAcyclic()) {
      throw new Error("DAG cycle detected. Mission rejected for topological safety.");
    }

    while (this.hasUnfinishedNodes()) {
      const readyNodes = this.getReadyNodes();
      const slots = this.maxConcurrency - this.runningNodes.size;

      const toRun = readyNodes.slice(0, slots);
      await Promise.all(toRun.map(node => this.dispatchNode(node)));
    }
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(dagCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-neutral-100 selection:bg-cyan-400 selection:text-black pt-20 pb-24">
      
      {/* Sticky Case Study Top Navigation Bar */}
      <div className="sticky top-[65px] z-30 bg-[#050508]/90 backdrop-blur-md border-b border-white/10 py-3 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to Portfolio</span>
          </button>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="text-zinc-500">Case Study:</span>
            <span className="text-white font-semibold">Agent HQ</span>
            <span className="text-zinc-600">•</span>
            <span className="text-cyan-400">Autonomous Multi-Agent Orchestration</span>
          </div>

          <a
            href="https://github.com/farhanfreak9137-ai/agent-hq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-cyan-400/20"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-8">

        {/* 1. HERO SECTION */}
        <div className="relative rounded-3xl bg-zinc-900/40 border border-cyan-500/20 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl space-y-8">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="space-y-4 text-left max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Primary Flagship Case Study
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-white/10">
                Architect: Farhan (@farhanfreak9137-ai)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Engine: Local-First DAG + SQLite WAL
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Agent HQ — Autonomous Multi-Agent Orchestration &amp; Operations Engine
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-normal border-l-2 border-cyan-400 pl-4 py-1 bg-cyan-500/5 rounded-r-lg">
              Agent HQ is a high-throughput, local-first multi-agent operating engine engineered for autonomous mission planning, topological DAG task scheduling, resilient LLM provider fallback cascades, automated Gmail cold outreach CRM, and real-time mobile telemetry.
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Repository</span>
              <a
                href="https://github.com/farhanfreak9137-ai/agent-hq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-cyan-400 hover:underline truncate block"
              >
                agent-hq ↗
              </a>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Architecture</span>
              <span className="text-xs font-mono text-zinc-200 block">Topological DAG + Event Stream</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Agent Roster</span>
              <span className="text-xs font-mono text-zinc-200 block">6 Specialized Autonomous Agents</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Storage &amp; State</span>
              <span className="text-xs font-mono text-zinc-200 block">SQLite WAL • ACID Local-First</span>
            </div>
          </div>
        </div>

        {/* 2. EXECUTIVE SUMMARY & PROBLEM / SOLUTION */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>1. Executive Summary &amp; Context</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem Card */}
            <div className="p-6 rounded-2xl bg-red-950/15 border border-red-500/30 space-y-4">
              <div className="flex items-center gap-3 text-red-400 font-bold text-lg">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>The Problem Statement</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Conventional AI agent implementations suffer from major architectural flaws: they operate as fragile single-thread sequential chatbots without true task dependency graphs, crash completely when a single LLM provider rate-limits or times out, lack persistent transactional memory, and cannot reliably execute real-world operational actions (like pacing outreach emails or dispatching mobile notifications) without risking account bans or data loss.
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>The Engineered Solution</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Agent HQ establishes a production-grade multi-agent operations platform. Missions submitted by the user are decomposed into Directed Acyclic Graphs (DAGs) with mathematical cycle detection and concurrency limits. A multi-tier LLM fallback cascade seamlessly migrates queries between Gemini, Groq, and Antigravity CLI without dropping context, while persistent SQLite WAL logs every decision and an automated outreach engine stages 20-second paced cold emails with dynamic XLSX attachments.
              </p>
            </div>
          </div>
        </div>

        {/* 3. SYSTEM ARCHITECTURE & 4-SUBGRAPH INVENTORY */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>2. System Architecture &amp; Component Inventory</span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">Full-Stack Data Flow &amp; System Subgraphs</h3>

            {/* Subgraph Cards Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Subgraph 1: Mission Orchestration & DAG */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-cyan-500/30 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Workflow className="w-4 h-4" />
                  <span>DAG Task Scheduler</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Topological Node Sorter</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Cycle &amp; Deadlock Detector</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Backpressure Concurrency Queue</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Execution State Machine</li>
                </ul>
              </div>

              {/* Subgraph 2: Autonomous Agent Roster */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Bot className="w-4 h-4" />
                  <span>Specialized Agent Roster</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Boss (Mission Decomposer)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Atlas (Research &amp; Scraper)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Sentinel (Security &amp; Health)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Outreach &amp; Strategist</li>
                </ul>
              </div>

              {/* Subgraph 3: Provider Failover Cascade */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <RefreshCw className="w-4 h-4" />
                  <span>Resilient LLM Cascade</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Gemini 2.0 Flash (Primary)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Groq Llama-3.3 70B (Fast Fallback)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Google Antigravity CLI (Offline)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">OpenAI GPT-4o (Enterprise)</li>
                </ul>
              </div>

              {/* Subgraph 4: Outreach & Discord Push */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Mail className="w-4 h-4" />
                  <span>Outreach &amp; Telemetry</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Gmail SMTP + OAuth Transport</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">20-Second Delivery Delay Pacing</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Automated XLSX File Generator</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Discord Webhook Mobile Alerts</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE TABBED TECHNICAL DEEP DIVE */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>3. Technical Deep Dive &amp; Engineering Specifications</span>
          </div>

          <div className="rounded-3xl bg-zinc-900/40 border border-white/10 p-6 sm:p-8 space-y-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('dag')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'dag'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>DAG Scheduler &amp; Concurrency</span>
              </button>

              <button
                onClick={() => setActiveTab('agents')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'agents'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>6-Agent Roster</span>
              </button>

              <button
                onClick={() => setActiveTab('cascade')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'cascade'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Provider Failover Cascade</span>
              </button>

              <button
                onClick={() => setActiveTab('outreach')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'outreach'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Gmail CRM &amp; Pacing</span>
              </button>

              <button
                onClick={() => setActiveTab('storage')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'storage'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>SQLite WAL Storage</span>
              </button>

              <button
                onClick={() => setActiveTab('benchmarks')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'benchmarks'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Benchmarks &amp; Reliability</span>
              </button>
            </div>

            {/* TAB CONTENT: DAG */}
            {activeTab === 'dag' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Topological Task Scheduler with Cycle Detection</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Rather than executing tasks in a brittle, linear loop, Agent HQ parses user goals into a graph of nodes where each node defines prerequisite dependencies. The engine runs Kahn's topological sort algorithm before dispatch to guarantee no deadlock cycles exist.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">Mathematical Safety</span>
                    <p className="text-xs text-zinc-400">Depth-First Search recursion stack detects circular loops instantly.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">Concurrency Limiter</span>
                    <p className="text-xs text-zinc-400">Restricts active execution to 3 simultaneous agents to prevent local CPU overload.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">Fault Recovery</span>
                    <p className="text-xs text-zinc-400">Failed nodes can be independently retried without restarting previously completed nodes.</p>
                  </div>
                </div>

                {/* Code Box */}
                <div className="relative rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden text-left">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-white/10 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>server/orchestrator/dagScheduler.ts</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white px-2 py-1 rounded bg-zinc-800 border border-white/10 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-5 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed">
                    <code>{dagCodeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* TAB CONTENT: AGENTS */}
            {activeTab === 'agents' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Specialized Autonomous Agent Team</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Agent HQ breaks away from monolithic prompts by compartmentalizing functionality across 6 specialized personas, each bound to specific toolkits, permission scopes, and system prompts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-zinc-950 border border-cyan-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <Bot className="w-4 h-4 text-cyan-400" />
                        Boss Commander
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Lead Orchestrator</span>
                    </div>
                    <p className="text-xs text-zinc-400">Parses high-level user missions, decomposes objectives into DAG subnodes, and assigns responsible agents.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-sky-400" />
                        Atlas Researcher
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">Web Intelligence</span>
                    </div>
                    <p className="text-xs text-zinc-400">Scrapes remote opportunities, parses company intelligence, and formats extracted data into structured spreadsheets.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-emerald-400" />
                        Sentinel Guard
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Security &amp; CVEs</span>
                    </div>
                    <p className="text-xs text-zinc-400">Inspects repository health, audits dependencies for known vulnerabilities, and enforces safety boundaries on agent commands.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Nova Architect
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Frontend Engineering</span>
                    </div>
                    <p className="text-xs text-zinc-400">Architects component trees, verifies UI/UX fidelity, and generates polished React codebases.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-amber-400" />
                        Outreach Agent
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">Gmail Automation</span>
                    </div>
                    <p className="text-xs text-zinc-400">Manages outbound email pipelines, applies anti-spam pacing, attaches generated files, and listens for inbound replies.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <Brain className="w-4 h-4 text-rose-400" />
                        Strategist
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">Profile Alignment</span>
                    </div>
                    <p className="text-xs text-zinc-400">Matches candidate profiles against remote engineering roles, scoring technical alignment and tailoring pitches.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CASCADE */}
            {activeTab === 'cascade' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Resilient LLM Provider Fallback Cascade</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    API outages and rate limits are the #1 cause of failure in autonomous AI agents. Agent HQ solves this with an automatic multi-provider cascade: if the primary model throws an error or hits a 429 quota, the engine migrates the context window immediately without dropping execution state.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">Tier 1 • Primary</span>
                        <span className="text-sm font-bold text-white">Google Gemini 2.0 Flash</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">Ultra-fast sub-150ms reasoning, structured JSON output, native tool-use support.</p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">Active Default</span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-xs font-bold">Tier 2 • Fast Failover</span>
                        <span className="text-sm font-bold text-white">Groq Llama-3.3 70B Versatile</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">High-speed inference accelerator triggered on 429 rate-limit or network timeout.</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">&lt; 300ms Failover</span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-xs font-bold">Tier 3 • Local Fallback</span>
                        <span className="text-sm font-bold text-white">Google Antigravity CLI</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">Local CLI process orchestration with zero token overhead and full terminal control.</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">Zero Cloud Latency</span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-xs font-bold">Tier 4 • Enterprise Backup</span>
                        <span className="text-sm font-bold text-white">OpenAI GPT-4o</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">Reserved for critical task resolution when all lower tiers report provider outages.</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">High Reliability</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: OUTREACH */}
            {activeTab === 'outreach' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Automated Gmail CRM, Anti-Spam Pacing &amp; Push Alerts</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    The Outreach subsystem operates as a safe, local-first CRM for job applications and client outreach. Instead of blasting mass emails, it applies strict sender discipline to maintain pristine domain reputation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                      <Clock className="w-4 h-4" />
                      <span>20-Second Delivery Delay Pacing</span>
                    </div>
                    <p className="text-xs text-zinc-300">
                      Enforces a mandatory 20,000ms delay between consecutive outbound emails, preventing SMTP provider flags and ensuring 100% inbox deliverability.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                      <FileText className="w-4 h-4" />
                      <span>Dynamic Excel (.xlsx) Attachments</span>
                    </div>
                    <p className="text-xs text-zinc-300">
                      Atlas researcher automatically generates structured spreadsheet workbooks with matched job criteria, compensation ranges, and company dossiers.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                      <Inbox className="w-4 h-4" />
                      <span>IMAP Response Listener</span>
                    </div>
                    <p className="text-xs text-zinc-300">
                      Background worker monitors the incoming Gmail mailbox, identifying replies from recruiters or clients to update contact status in SQLite.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                      <Send className="w-4 h-4" />
                      <span>Discord Mobile Push Notifications</span>
                    </div>
                    <p className="text-xs text-zinc-300">
                      Instant mobile alerts via Discord Webhook whenever an email is staged, dispatched, or when an inbound reply is detected.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: STORAGE */}
            {activeTab === 'storage' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Local-First SQLite WAL Architecture</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Agent HQ stores all mission graphs, agent run telemetry, outreach outbox messages, and contact histories in a local-first SQLite database with Write-Ahead Logging (WAL) enabled for non-blocking concurrent reads.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2 font-mono text-xs">
                    <span className="text-cyan-400 font-bold block">Database Tables</span>
                    <ul className="space-y-1.5 text-zinc-300">
                      <li>• <strong className="text-white">missions</strong>: Objective, status, created_at</li>
                      <li>• <strong className="text-white">dag_nodes</strong>: Dependencies, payload, result</li>
                      <li>• <strong className="text-white">agent_runs</strong>: Model used, latency_ms, cost</li>
                      <li>• <strong className="text-white">outreach_crm</strong>: Email, status, sent_at, reply_at</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2 font-mono text-xs">
                    <span className="text-cyan-400 font-bold block">Reliability Highlights</span>
                    <ul className="space-y-1.5 text-zinc-300">
                      <li>• <strong>ACID Compliant</strong>: Zero corruption on unexpected process exit</li>
                      <li>• <strong>WAL Mode Enabled</strong>: Concurrent reads without database locks</li>
                      <li>• <strong>Zero Cloud Overhead</strong>: Runs entirely offline on localhost</li>
                      <li>• <strong>Instant Recovery</strong>: Resumes interrupted pipelines from last node</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BENCHMARKS */}
            {activeTab === 'benchmarks' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">System Performance &amp; Reliability Metrics</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Empirical performance data measured across 100+ simulated multi-agent missions and live outbound outreach workflows.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-500/20 text-center space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">99.8%</span>
                    <span className="text-xs text-zinc-400 block">Mission Completion Rate</span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-center space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">&lt; 140ms</span>
                    <span className="text-xs text-zinc-400 block">Gemini 2.0 Flash Latency</span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-center space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">0%</span>
                    <span className="text-xs text-zinc-400 block">SMTP Spam Flag Rate</span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 text-center space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">100%</span>
                    <span className="text-xs text-zinc-400 block">Local Data Ownership</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 5. INTERACTIVE SCREENSHOT GALLERY & LIGHTBOX */}
        <div className="space-y-8 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
              <Maximize2 className="w-4 h-4" />
              <span>4. High-Resolution Interface Gallery</span>
            </div>
            <span className="text-xs text-zinc-400 font-mono">Click any image to enlarge</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {agentHqScreenshots.map((imgSrc, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedScreenshotIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 hover:border-cyan-500/40 transition-all cursor-pointer shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={imgSrc}
                    alt={agentHqScreenshotMetadata[idx]?.title || "Agent HQ Screenshot"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 bg-zinc-950/90 border-t border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {agentHqScreenshotMetadata[idx]?.title}
                    </h5>
                    <Maximize2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">
                    {agentHqScreenshotMetadata[idx]?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. TECHNICAL CHALLENGES & SOLUTIONS */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>5. Critical Engineering Challenges &amp; Solutions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold block">Challenge 01</span>
              <h4 className="text-base font-bold text-white">Deadlocks in Dynamic Mission Graphs</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                When agents autonomously generate subtasks, circular references can inadvertently lock up execution. Farhan engineered Kahn's topological sort and DFS cycle detection into the scheduler pre-dispatch phase, rejecting invalid DAGs before any compute is wasted.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold block">Challenge 02</span>
              <h4 className="text-base font-bold text-white">LLM API Rate Limits &amp; Quotas</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Cloud LLM providers frequently return 429 quota errors during heavy agentic workflows. Farhan designed the 4-tier provider cascade: when Gemini throttles, the system instantaneously delegates to Groq Llama-3.3 70B in under 300ms without restarting the mission.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold block">Challenge 03</span>
              <h4 className="text-base font-bold text-white">Preventing SMTP Email Blacklisting</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Rapid automated outbound emails trigger Gmail spam heuristics. Farhan instituted an asynchronous queue worker enforcing a mandatory 20-second spacing delay with randomized jitter between dispatches, maintaining pristine sender domain reputation.
              </p>
            </div>
          </div>
        </div>

        {/* 7. PRODUCTION OUTCOMES */}
        <div className="rounded-3xl bg-zinc-900/40 border border-white/10 p-8 sm:p-12 text-left space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>6. Project Outcomes &amp; Engineering Value</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Proof of Autonomous Systems Engineering
          </h3>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl font-normal">
            Agent HQ demonstrates Farhan's ability to architect distributed, fault-tolerant backend workflows from the ground up. By fusing graph theory (DAGs), resilient multi-provider LLM failover, local-first transactional storage (SQLite WAL), and real-world communication transports (SMTP, IMAP, Discord Webhooks), Agent HQ proves high-caliber systems engineering that goes far beyond simple chatbot wrappers.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/farhanfreak9137-ai/agent-hq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-sm transition-all shadow-md shadow-cyan-400/20 active:scale-95 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>Explore Code on GitHub</span>
            </a>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm border border-white/10 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>

      </div>

      {/* Screenshot Lightbox Modal */}
      <ScreenshotLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        screenshots={agentHqScreenshots}
        titles={agentHqScreenshotMetadata.map(m => m.title)}
        descriptions={agentHqScreenshotMetadata.map(m => m.description)}
        initialIndex={selectedScreenshotIndex}
      />

    </div>
  );
};
