import React, { useState } from 'react';
import {
  ArrowLeft,
  RefreshCw,
  Github,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Brain,
  Activity,
  Copy,
  Check,
  Cpu,
  Database,
  Lock,
  Bot,
  Workflow,
  ExternalLink,
  ShieldAlert,
  Compass,
  Briefcase,
  BookOpen,
  Mic,
  Sliders,
  FileCode2,
  Terminal,
  Search,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';
import { aurenScreenshots, aurenScreenshotMetadata } from '../data/portfolioData';
import { ScreenshotLightbox } from './ScreenshotLightbox';

interface AurenCaseStudyPageProps {
  onBack: () => void;
}

export const AurenCaseStudyPage: React.FC<AurenCaseStudyPageProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'workspaces' | 'registry' | 'workflows' | 'computer' | 'rag' | 'security'>('workspaces');
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const registryCodeSnippet = `// src/lib/agents/registry.ts
import { z } from 'zod';
import { AgentExecutionContext, ToolExecutionResult, HumanApprovalPayload } from '@/types/agents';

export interface AgentTool<TInput = any, TOutput = any> {
  name: string;
  description: string;
  agentId?: string;
  inputSchema?: z.ZodType<TInput>;
  parameters?: z.ZodType<TInput>;
  outputSchema?: z.ZodType<TOutput>;
  requiresHumanApproval?: boolean;
  isMutation?: boolean;
  buildApprovalPayload?: (input: TInput, context: AgentExecutionContext) => HumanApprovalPayload;
  execute: (input: TInput, context: AgentExecutionContext) => Promise<ToolExecutionResult>;
}

export class AgentRegistry {
  private static tools = new Map<string, AgentTool>();

  public static registerTool(tool: AgentTool): void {
    if (!tool.name || typeof tool.execute !== 'function') {
      throw new Error(\`Invalid tool definition: \${tool.name}\`);
    }
    this.tools.set(tool.name, tool);
  }

  public static resolve(toolName: string): AgentTool {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(\`Tool '\${toolName}' not found in registered agent capabilities.\`);
    }
    return tool;
  }
}`;

  const workflowCodeSnippet = `// src/lib/workflows/engine.ts
import { db } from '@/lib/db';
import { workflowRuns, workflowSteps } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export class WorkflowEngine {
  public static async advanceStep(workflowId: string, stepName: string, output: unknown) {
    // 1. Commit step output and transition status atomically in SQLite WAL
    await db.update(workflowSteps)
      .set({ status: 'COMPLETED', result: JSON.stringify(output), completedAt: new Date() })
      .where(eq(workflowSteps.id, \`\${workflowId}_\${stepName}\`));

    const nextStep = await this.resolveNextStep(workflowId, stepName);
    if (!nextStep) {
      return db.update(workflowRuns).set({ status: 'COMPLETED' }).where(eq(workflowRuns.id, workflowId));
    }

    // 2. Check if the upcoming step requires human approval (e.g. proposal export)
    if (nextStep.requiresHumanApproval) {
      await db.update(workflowRuns).set({ status: 'PAUSED_FOR_APPROVAL' }).where(eq(workflowRuns.id, workflowId));
      return { status: 'PAUSED', approvalId: nextStep.approvalId };
    }

    return this.executeStep(workflowId, nextStep);
  }
}`;

  const computerCodeSnippet = `// src/lib/agents/computerControl.ts
import { chromium, BrowserContext, Page } from 'playwright';

const STRICT_ALLOWLIST = new Set([
  'indeed.com', 'linkedin.com', 'glassdoor.com', 'wellfound.com', 'github.com'
]);

export function validateTargetUrl(rawUrl: string): { allowed: boolean; reason?: string } {
  try {
    const parsed = new URL(rawUrl);
    const hostname = parsed.hostname.toLowerCase();

    // 1. Reject Loopback & RFC 1918 Private Ranges (SSRF Defense)
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.')) {
      return { allowed: false, reason: 'SSRF Violation: Target resolves to loopback or private subnet.' };
    }

    // 2. Strict Domain Allowlist Enforcement
    const isAllowlisted = Array.from(STRICT_ALLOWLIST).some(domain => hostname === domain || hostname.endsWith('.' + domain));
    if (!isAllowlisted) {
      return { allowed: false, reason: \`Domain '\${hostname}' is not on the approved career allowlist.\` };
    }

    return { allowed: true };
  } catch {
    return { allowed: false, reason: 'Malformed target URL provided.' };
  }
}`;

  const ragCodeSnippet = `// src/lib/memory/groundingEngine.ts
export type SourceTier = 
  | 'PERSONAL_KNOWLEDGE' 
  | 'VERIFIED_MEMORY' 
  | 'LIVE_RESEARCH' 
  | 'MODEL_KNOWLEDGE' 
  | 'INFERENCE' 
  | 'UNKNOWN';

export interface GroundedClaim {
  statement: string;
  sourceTier: SourceTier;
  confidence: number;
  auditRef?: string;
}

export function enforceClaimProvenance(candidateFact: string, verifiedFacts: Map<string, string>): GroundedClaim {
  if (verifiedFacts.has(candidateFact)) {
    return {
      statement: candidateFact,
      sourceTier: 'VERIFIED_MEMORY',
      confidence: 1.0,
      auditRef: 'sqlite://personal_memory/' + candidateFact
    };
  }
  // Anti-hallucination rule: Prohibit speculative assertion of unverified qualifications
  return {
    statement: candidateFact,
    sourceTier: 'UNKNOWN',
    confidence: 0.0
  };
}`;

  const handleCopyCode = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getActiveCode = () => {
    switch (activeTab) {
      case 'workspaces': return registryCodeSnippet;
      case 'registry': return registryCodeSnippet;
      case 'workflows': return workflowCodeSnippet;
      case 'computer': return computerCodeSnippet;
      case 'rag': return ragCodeSnippet;
      case 'security': return computerCodeSnippet;
      default: return registryCodeSnippet;
    }
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
            <span className="text-white font-semibold">Auren</span>
            <span className="text-zinc-600">•</span>
            <span className="text-cyan-400">Personal AI Career Operating System & Desktop Copilot</span>
          </div>

          <a
            href="https://github.com/farhanfreak9137-ai/farhan-ai"
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
                Stack: Next.js 16 • SQLite WAL • Playwright
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Auren — Personal AI Career Operating System & Desktop Copilot
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-normal border-l-2 border-cyan-400 pl-4 py-1 bg-cyan-500/5 rounded-r-lg">
              Auren is an enterprise-grade personal career operating system engineered on Next.js 16 App Router, SQLite/libsql, and Drizzle ORM. It consolidates 9 unified workspaces with dynamic tool orchestration, audited Playwright browser control, dual-tier RAG personal memory, real-time voice synthesis, and immutable cryptographic approval boundaries.
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Repository</span>
              <a
                href="https://github.com/farhanfreak9137-ai/farhan-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-cyan-400 hover:underline truncate block"
              >
                farhan-ai ↗
              </a>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Architecture</span>
              <span className="text-xs font-mono text-zinc-200 block">Decoupled 9-Workspace Shell</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Security & Sandbox</span>
              <span className="text-xs font-mono text-zinc-200 block">SSRF Denylist + Playwright Gate</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Grounding & Memory</span>
              <span className="text-xs font-mono text-zinc-200 block">SQLite WAL • 6 Source Tiers</span>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE SCREENSHOT SHOWCASE */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Production Application Interface
              </h2>
              <p className="text-sm text-zinc-400">
                High-resolution interface captures demonstrating the 9 operational subsystems of Auren.
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-all self-start sm:self-auto cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fullscreen Lightbox</span>
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl group">
            <img
              src={aurenScreenshots[selectedScreenshotIndex] || aurenScreenshots[0]}
              alt={aurenScreenshotMetadata[selectedScreenshotIndex]?.title || 'Auren Interface'}
              className="w-full h-auto object-cover max-h-[580px] transition-transform duration-500 group-hover:scale-[1.008] cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            />

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/80 to-transparent p-6 text-left">
              <div className="max-w-3xl space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Screen {selectedScreenshotIndex + 1} of {aurenScreenshots.length}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {aurenScreenshotMetadata[selectedScreenshotIndex]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-normal">
                  {aurenScreenshotMetadata[selectedScreenshotIndex]?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Screenshot Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {aurenScreenshots.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScreenshotIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedScreenshotIndex === idx
                    ? 'bg-cyan-500/15 border-cyan-400/50 shadow-md text-white'
                    : 'bg-zinc-950/60 border-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                }`}
              >
                <span className="text-[11px] font-mono font-bold block text-cyan-400">
                  0{idx + 1}
                </span>
                <span className="text-xs font-semibold truncate block mt-0.5">
                  {idx === 0 ? "Central Assistant" :
                   idx === 1 ? "Career Center" :
                   idx === 2 ? "Opportunities" :
                   idx === 3 ? "Computer Control" :
                   idx === 4 ? "Knowledge RAG" : "Voice Interface"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. SYSTEM ARCHITECTURE & DATA FLOW */}
        <div className="rounded-3xl bg-zinc-900/30 border border-white/10 p-6 sm:p-10 space-y-8 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
              <Workflow className="w-3.5 h-3.5" />
              <span>Full-Stack Pipeline</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Auren Architectural Subsystems & Policy Engine
            </h3>
            <p className="text-sm text-zinc-400 max-w-3xl">
              From operator intent to audited execution: how the 9 workspaces interact through strict cryptographic approval boundaries and WAL-mode SQLite storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">1. Operator Ingestion Shell</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Consolidates 9 distinct workspaces. Web requests and real-time voice streams are token-authenticated, rate-limited, and dispatched to the Central Assistant.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">2. Registry & Policy Boundary</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tools register with Zod input/output schemas. Every mutating action triggers a cryptographic approval token, halting execution until explicit human confirmation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">3. Persistent SQLite Grounding</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Drizzle ORM over SQLite in WAL mode maintains 8 categories of verified memory, multi-format RAG embeddings, and an immutable audit trail of every system action.
              </p>
            </div>
          </div>
        </div>

        {/* 4. TABBED TECHNICAL DEEP DIVE & CODE ARTIFACTS */}
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Architectural Breakdown & Implementation Code
              </h3>
              <p className="text-sm text-zinc-400">
                Select an architectural layer below to inspect production code snippets and implementation rationale.
              </p>
            </div>

            <button
              onClick={() => handleCopyCode(getActiveCode())}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-all self-start sm:self-auto cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Active Code'}</span>
            </button>
          </div>

          {/* Tab Selection */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
            {[
              { id: 'workspaces', label: '1. 9 Workspaces', icon: Layers },
              { id: 'registry', label: '2. Dynamic Registry', icon: Bot },
              { id: 'workflows', label: '3. Career Pipelines', icon: Workflow },
              { id: 'computer', label: '4. Playwright Sandbox', icon: ShieldCheck },
              { id: 'rag', label: '5. RAG & Memory', icon: Brain },
              { id: 'security', label: '6. Safety & 152+ Tests', icon: Lock },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-zinc-900/60 text-zinc-400 border border-white/5 hover:border-white/15 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Explanation Column */}
            <div className="lg:col-span-5 space-y-4">
              {activeTab === 'workspaces' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">9 Unified Career Workspaces</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Auren unifies all facets of professional advancement into a single product shell, replacing fragmented tools and spreadsheets:
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">1. Assistant:</span> Central conversational brain with tool execution and source provenance.
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">2. Opportunities:</span> Real-time job discovery with deterministic 0–100% skill match scoring.
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">3. Career:</span> Autonomous pipelines, 6-stage Kanban board, STAR mock interview room, and skill gap roadmaps.
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">4. Knowledge:</span> Ingestion of PDF, TXT, MD, JSON docs + 8-category verified SQLite personal memory.
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">5. Computer:</span> Audited Playwright browser automation with SSRF safeguards and Emergency STOP.
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">6. Voice:</span> Hands-free spoken interaction with single-action confirmation safety rules.
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">7. Automation:</span> Autonomous background cron monitors for daily scraping and market updates.
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">8. Activity:</span> Immutable audit ledger tracking every tool execution and approval token.
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5">
                      <span className="font-bold text-cyan-400">9. Settings:</span> Sanitized system health, provider readiness, and SQLite WAL status.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'registry' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">Central Assistant & Dynamic Agent Registry</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Rather than relying on brittle hardcoded dialogue trees, Auren employs a dynamic, typed <strong>Agent Registry</strong>.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside">
                    <li><strong className="text-white">Strict Zod Schemas:</strong> Every tool strictly validates inputs and outputs at the boundary.</li>
                    <li><strong className="text-white">Human Approval Flagging:</strong> Tools declare mutating intent (<code className="text-cyan-300">isMutation: true</code>).</li>
                    <li><strong className="text-white">Context Injection:</strong> Caller identity, approval tokens, and telemetry are bound to execution.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'workflows' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">Autonomous Career Workflow Engine</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Executes complex multi-step career journeys (<code className="text-cyan-300">career_discovery</code>, <code className="text-cyan-300">opportunity_analysis</code>, <code className="text-cyan-300">application_preparation</code>) with state machine transitions.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside">
                    <li><strong className="text-white">Persistent Checkpointing:</strong> Every step output is committed to SQLite, preventing data loss.</li>
                    <li><strong className="text-white">Restart Recovery:</strong> Server restarts resume directly from the latest checkpoint without duplicate side-effects.</li>
                    <li><strong className="text-white">Approval Gates:</strong> Halts automatically at proposal export for operator confirmation.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'computer' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">Audited Playwright Computer Control</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Enables autonomous navigation of career platforms (Indeed, LinkedIn, Glassdoor, Wellfound) under rigid security guarantees.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside">
                    <li><strong className="text-white">SSRF Defense:</strong> Strictly rejects loopback addresses (<code className="text-cyan-300">127.0.0.1</code>) and private subnets (<code className="text-cyan-300">192.168.x</code>, <code className="text-cyan-300">10.x</code>).</li>
                    <li><strong className="text-white">Action Approval Cards:</strong> Mutating browser operations (submitting forms, typing credentials) require manual approval.</li>
                    <li><strong className="text-white">Emergency STOP:</strong> Instant 1-click termination of active Playwright browser contexts.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'rag' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">Dual-Tier RAG & Verified Personal Memory</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Solves the primary flaw of generative AI in career applications: hallucinated credentials and false claims.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside">
                    <li><strong className="text-white">6 Source Provenance Tiers:</strong> Every statement is tagged (<code className="text-cyan-300">[PERSONAL_KNOWLEDGE]</code>, <code className="text-cyan-300">[VERIFIED_MEMORY]</code>, <code className="text-cyan-300">[UNKNOWN]</code>).</li>
                    <li><strong className="text-white">8 Memory Categories:</strong> Identity, Skills, Experience, Education, Preferences, Restrictions, Achievements, Metrics.</li>
                    <li><strong className="text-white">Deterministic Chunking:</strong> Clean vector embedding retrieval over PDF, TXT, MD, and JSON files.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">Security Hardening & 152+ Automated Tests</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Auren was verified against 10 complete end-to-end production user journeys with comprehensive test coverage:
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside">
                    <li><strong className="text-white">152+ Tests:</strong> Unit, agent registry, workflow state, security SSRF, voice safety, and RAG verification.</li>
                    <li><strong className="text-white">Zero Secret Leakage:</strong> Auth tokens and API keys are strictly masked from logs and client telemetry.</li>
                    <li><strong className="text-white">Immutable Ledger:</strong> Every action and approval is written to a tamper-proof SQLite audit table.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Right Code Column */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs font-mono text-zinc-400 ml-2">
                      {activeTab === 'workspaces' || activeTab === 'registry' ? 'src/lib/agents/registry.ts' :
                       activeTab === 'workflows' ? 'src/lib/workflows/engine.ts' :
                       activeTab === 'computer' ? 'src/lib/agents/computerControl.ts' :
                       activeTab === 'rag' ? 'src/lib/memory/groundingEngine.ts' : 'tests/verify-security.test.ts'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">TypeScript</span>
                </div>

                <div className="p-4 overflow-x-auto max-h-[460px] text-xs font-mono text-zinc-300 leading-relaxed">
                  <pre>{getActiveCode()}</pre>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 5. TECHNICAL CHALLENGES & ENGINEERING SOLUTIONS */}
        <div className="space-y-6 text-left">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Rigorous Engineering Challenges & Breakthroughs
            </h3>
            <p className="text-sm text-zinc-400">
              How difficult architectural hurdles were systematically resolved with provable safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Eliminating AI Hallucinations</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Standard LLMs invent accomplishments when prompted. Auren enforces server-side 6-tier classification. Any required skill not in verified SQLite returns <code className="text-red-400 font-mono">[UNKNOWN]</code> and is prohibited from being transmitted to employers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">SSRF Defense in Computer Control</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Browser automation agents could be tricked into scanning internal networks or localhost ports. Auren enforces domain allowlisting with DNS and IP parsing that rejects RFC 1918 private subnets before launching Playwright pages.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Crash-Resilient State Checkpoints</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Multi-stage application workflows could be interrupted by network disconnects or process restarts. Auren serializes step transitions into SQLite WAL transactions, allowing instant resumption from the last valid checkpoint.
              </p>
            </div>
          </div>
        </div>

        {/* 6. VERIFICATION METRICS */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/30 via-zinc-900/50 to-indigo-950/30 border border-cyan-500/20 p-8 sm:p-12 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Production Readiness & Verification Metrics
            </h3>
            <p className="text-sm text-zinc-400">
              Built, verified, and hardened for daily operational execution.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">152+</div>
              <div className="text-xs text-zinc-400 font-mono">Automated Tests</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">9</div>
              <div className="text-xs text-zinc-400 font-mono">Unified Workspaces</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono">6 Tiers</div>
              <div className="text-xs text-zinc-400 font-mono">Source Provenance</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">0</div>
              <div className="text-xs text-zinc-400 font-mono">SSRF Leaks / Exploits</div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/farhanfreak9137-ai/farhan-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-cyan-400/20 active:scale-95"
            >
              <Github className="w-4 h-4" />
              <span>Explore Auren Repository</span>
            </a>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-sm border border-white/10 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Portfolio</span>
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox */}
      <ScreenshotLightbox
        isOpen={lightboxOpen}
        imageSrc={aurenScreenshots[selectedScreenshotIndex]}
        title={aurenScreenshotMetadata[selectedScreenshotIndex]?.title}
        description={aurenScreenshotMetadata[selectedScreenshotIndex]?.description}
        currentIndex={selectedScreenshotIndex}
        totalImages={aurenScreenshots.length}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setSelectedScreenshotIndex((selectedScreenshotIndex - 1 + aurenScreenshots.length) % aurenScreenshots.length)}
        onNext={() => setSelectedScreenshotIndex((selectedScreenshotIndex + 1) % aurenScreenshots.length)}
        projectTitle="Auren"
      />

    </div>
  );
};
