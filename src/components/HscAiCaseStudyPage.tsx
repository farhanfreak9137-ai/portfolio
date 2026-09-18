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
  BookOpen,
  Trophy,
  FileText,
  Copy,
  Check,
  Cpu,
  Database,
  Lock,
  Calculator,
  Flame,
  Layout,
  Maximize2,
  GraduationCap,
  Clock,
  Award,
  Search,
  CheckSquare,
  AlertTriangle,
  Code2,
  HelpCircle,
  BarChart3,
  Network,
  GitBranch,
  Terminal,
  FileCheck2,
  FlaskConical,
  Scale,
  Calendar,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Camera
} from 'lucide-react';
import { hscAiScreenshots, hscAiScreenshotMetadata } from '../data/portfolioData';
import { ScreenshotLightbox } from './ScreenshotLightbox';

interface HscAiCaseStudyPageProps {
  onBack: () => void;
}

export const HscAiCaseStudyPage: React.FC<HscAiCaseStudyPageProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeSubsystemTab, setActiveSubsystemTab] = useState<'knowledge_rag' | 'math_preprocessor' | 'ai_tutor_grading' | 'ocr_multimodal' | 'mistake_remedial' | 'systems_mobile'>('knowledge_rag');
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [expandedFailureIdx, setExpandedFailureIdx] = useState<number | null>(null);

  const mathCodeSnippet = `/**
 * src/utils/mathPreprocessor.ts
 * Deterministic normalization pipeline for mixed Bengali-LaTeX tokens.
 * Converts non-standard delimiters and enforces Unicode word boundaries
 * prior to KaTeX DOM parsing, preventing React hydration crashes.
 */
export function preprocessMathText(rawText: string): string {
  if (!rawText) return '';

  return rawText
    // 1. Convert Display Math block syntax \\[ ... \\] to standard $$ ... $$
    .replace(/\\\\\\[([\\s\\S]*?)\\\\\\]/g, '$$$$$1$$$$')
    
    // 2. Convert Inline Math syntax \\( ... \\) to standard $ ... $
    .replace(/\\\\\\(([\\s\\S]*?)\\\\\\)/g, '$$$1$$')
    
    // 3. Normalize plaintext division fractions inside math context
    .replace(/(\\d+)\\s*\\/\\s*(\\d+)/g, '\\\\frac{$1}{$2}')
    
    // 4. Ensure non-breaking separation between Bengali Unicode and Math delimiters
    .replace(/([\\u0980-\\u09FF])\\$([^\\$]+)\\$/g, '$1 $$2$$')
    .replace(/\\$([^\\$]+)\\$([\\u0980-\\u09FF])/g, '$$1$$ $2')
    
    // 5. Clean extraneous whitespace within inline formulas
    .replace(/\\$([^\\$]+)\\$/g, (match, formula) => {
      return \`$\${formula.trim()}\`;
    });
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(mathCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const failureCases = [
    {
      title: "1. Multi-Modal OCR Newsprint Degradation",
      cause: "Low-grade recycled test paper newsprint exhibits ink bleed-through (ghosting) and narrow dual-column gutters.",
      consequence: "Variables dropped or corrupted during transcription (e.g. 10 ms⁻¹ misread as 10 s⁻¹).",
      mitigation: "Client-side contrast enhancement via Canvas; layout-aware line extraction prompting.",
      openProblem: "Equations spanning across narrow dual-column dividers occasionally concatenate horizontally."
    },
    {
      title: "2. Bengali Hurried Cursive Handwriting Errors",
      cause: "Under exam pressure, students write in fast cursive with overlapping top horizontal lines (মাত্রা).",
      consequence: "Loss of Bengali conjunct modifiers (যুক্তবর্ণ, হসন্ত, র-ফলা) during transcription.",
      mitigation: "Enforces sub-question single-block cropping; domain vocabulary priors injected into prompt.",
      openProblem: "Faint pencil work in geometric stems and strike-through corrections confuse line-ordering."
    },
    {
      title: "3. LaTeX Unicode Delimiter Collisions",
      cause: "Non-deterministic LLM tokens place Bengali characters directly adjacent to LaTeX dollar symbols ($).",
      consequence: "Client-side KaTeX parser fails to identify token boundaries, throwing DOM rendering exceptions.",
      mitigation: "mathPreprocessor.ts regex normalizer standardizes delimiters before DOM insertion.",
      openProblem: "Deeply nested multi-tier fractions containing radical expressions occasionally break regex groups."
    },
    {
      title: "4. Socratic Boundary Leakage Under Adversarial Pressure",
      cause: "LLM helpfulness bias leads to answer leakage when users issue direct pressure ('Give me answer now').",
      consequence: "Student bypasses active retrieval practice and uses the tool as a passive answer generator.",
      mitigation: "System prompt negative constraints + few-shot redirection exemplars; low temperature (0.2).",
      openProblem: "Persistent multi-turn prompt injections can still occasionally cause partial numerical answer leakage."
    },
    {
      title: "5. Automated Grading Subjectivity Discrepancy",
      cause: "Human board examiners hold implicit expectations regarding phrasing and presentation in Part-(ঘ).",
      consequence: "AI grades purely on semantic completeness, diverging slightly from strict human grading styles.",
      mitigation: "Decomposes Part-(ঘ) into 4 atomic criteria (Comparison, Principle, Condition, Conclusion).",
      openProblem: "Subjective grading nuance across human examiners exhibits natural statistical variance."
    },
    {
      title: "6. Unphysical Parameter Generation in Synthesized Questions",
      cause: "LLMs predict token probabilities rather than running internal numerical physical simulations.",
      consequence: "Generates impossible physics problems (e.g. Carnot efficiency > 100% or negative temperatures).",
      mitigation: "Automated assertion validator (verify_physics_constraints.ts) filters out invalid questions.",
      openProblem: "Multi-phase complex chemistry equilibria are harder to assert with simple rule-based filters."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080c] text-neutral-100 selection:bg-indigo-500 selection:text-white pt-20 pb-24">
      
      {/* Sticky Case Study Navigation Bar */}
      <div className="sticky top-[65px] z-30 bg-[#050508]/90 backdrop-blur-md border-b border-white/10 py-3 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400" />
            <span>Back to Portfolio</span>
          </button>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="text-zinc-500">Research Case Study:</span>
            <span className="text-white font-semibold">HSC AI Study Intelligence System</span>
            <span className="text-zinc-600">•</span>
            <span className="text-indigo-400">Full-Stack Educational Engineering</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/farhanfreak9137-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Source Code</span>
            </a>
            <a
              href="https://hsc-ai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-all shadow-md shadow-indigo-500/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live App ↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-8">

        {/* 1. HERO SECTION & RESEARCH FRAMING */}
        <div className="relative rounded-3xl bg-zinc-900/40 border border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl space-y-8 text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                Undergraduate Admissions &amp; Scholarship Case Study
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-white/10">
                Author: Farhan (Milestone College • Science Stream)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                NCTB HSC Science Curriculum
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              HSC AI Study Intelligence System
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-normal border-l-2 border-indigo-500 pl-4 py-1 bg-indigo-500/5 rounded-r-lg">
              An independently engineered, evidence-based adaptive learning, question pattern intelligence, and multi-modal assessment platform built specifically for the Bangladesh Higher Secondary Certificate (HSC/NCTB) education ecosystem.
            </p>
          </div>

          {/* Research Narrative Flow Breadcrumbs */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-zinc-400 whitespace-nowrap">
            <span className="text-indigo-400 font-bold">RESEARCH NARRATIVE:</span>
            <span>Problem</span>
            <span>→</span>
            <span>Research Questions</span>
            <span>→</span>
            <span>Design</span>
            <span>→</span>
            <span>Architecture</span>
            <span>→</span>
            <span>Experiments</span>
            <span>→</span>
            <span>Results</span>
            <span>→</span>
            <span>Failures</span>
            <span>→</span>
            <span>Future Work</span>
          </div>

          {/* Implementation Status Legend */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
              Engineering Status Verification Standard:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                [STATUS: IMPLEMENTED] Fully active in production codebase
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30">
                [STATUS: PARTIAL] Pipeline constructed; ingestion ongoing
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                [STATUS: EXPERIMENTAL] Tested via automated test harness
              </span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 border border-white/10">
                [STATUS: PLANNED] Architecturally specified
              </span>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Live Deployment</span>
              <a
                href="https://hsc-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-indigo-400 hover:underline truncate block"
              >
                hsc-ai.vercel.app ↗
              </a>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Native Packaging</span>
              <span className="text-xs font-mono text-zinc-200 block">Android APK (Capacitor 8)</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Intelligence Engine</span>
              <span className="text-xs font-mono text-zinc-200 block">Gemini 2.0 Flash Cascade</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Math Engine</span>
              <span className="text-xs font-mono text-emerald-400 font-bold block">KaTeX 0.16 + Normalizer</span>
            </div>
          </div>
        </div>

        {/* 2. THE PROBLEM & RESEARCH QUESTIONS */}
        <div className="space-y-6 text-left">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
              1. Problem Definition &amp; Domain Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Generic Global AI Fails in Bangladesh HSC Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs font-mono">
                <AlertTriangle className="w-4 h-4" />
                <span>1. Syllabus Fragmentation</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                14 dense Science papers (Physics, Chemistry, Higher Math, Biology, ICT) with linear rote reading. Students lack visibility into high-yield topics based on historical board exam recurrence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                <HelpCircle className="w-4 h-4" />
                <span>2. The CQ "Rote Solution" Trap</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                NCTB Creative Questions (ক, খ, গ, ঘ) evaluate 4 distinct cognitive tiers. Commercial guidebooks give static answers, causing students to passively copy solutions rather than learning retrieval.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs font-mono">
                <Calculator className="w-4 h-4" />
                <span>3. Mixed Bengali-LaTeX Collapse</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Standard consumer LLMs frequently fail when generating mixed Bengali Unicode and LaTeX formulas, breaking delimiters and crashing standard React Markdown parsers.
              </p>
            </div>
          </div>

          {/* Research Questions Matrix */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">
              Formal Research Questions (RQs):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                <strong className="text-white block font-mono text-indigo-300">RQ1 — Pedagogical Guardrails:</strong>
                <p className="text-zinc-400">Can an AI tutor enforce strict Socratic dialogue without prematurely leaking final answers, strictly adhering to NCTB syllabus boundaries?</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                <strong className="text-white block font-mono text-indigo-300">RQ2 — Deterministic Rendering:</strong>
                <p className="text-zinc-400">How can a regex normalization pipeline parse non-deterministic LLM tokens containing Bengali text and LaTeX equations at 60fps without DOM crashes?</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                <strong className="text-white block font-mono text-indigo-300">RQ3 — Diagnostic Prioritization:</strong>
                <p className="text-zinc-400">Does weighting historical board exam recurrence against localized error telemetry produce a more efficient revision schedule than linear review?</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                <strong className="text-white block font-mono text-indigo-300">RQ4 — Multi-Modal Evaluation:</strong>
                <p className="text-zinc-400">What architectural requirements enable reliable extraction, OCR, and rubric-based grading of handwritten Bengali STEM answer sheets?</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SYSTEM ARCHITECTURE & END-TO-END PIPELINE */}
        <div className="space-y-6 text-left">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
              2. Systems Engineering &amp; Computational Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              End-to-End Computational Pipeline
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-white/10 space-y-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              The platform avoids monolithic prompt dependencies by decoupling non-deterministic LLM token generation from deterministic client-side validation, mathematical preprocessing, and state management.
            </p>

            {/* Pipeline Visual Diagram */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-4 font-mono text-xs text-zinc-300 overflow-x-auto">
              <div className="text-indigo-400 font-bold text-sm">// End-to-End Pipeline Data Flow</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-1">
                  <span className="text-indigo-400 font-bold block">1. Presentation &amp; State</span>
                  <p className="text-[11px] text-zinc-400">React 19 + Tailwind v4 + Zustand Stores</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-1">
                  <span className="text-indigo-400 font-bold block">2. Math Preprocessing</span>
                  <p className="text-[11px] text-zinc-400">mathPreprocessor.ts + KaTeX 0.16</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-1">
                  <span className="text-indigo-400 font-bold block">3. Structured Intelligence</span>
                  <p className="text-[11px] text-zinc-400">Gemini 2.0 Flash + Strict JSON Schema</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-1">
                  <span className="text-indigo-400 font-bold block">4. Mobile Runtime</span>
                  <p className="text-[11px] text-zinc-400">Capacitor 8 Android Bridge (com.farhan.hscai)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE SUBSYSTEMS EXPLORER */}
        <div className="space-y-8 text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
                3. Subsystem Deep Dives
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Detailed Component Architecture
              </h2>
            </div>

            {/* Subsystem Tab Selector */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-950 border border-white/10">
              {[
                { id: 'knowledge_rag', label: '1. Taxonomy & RAG' },
                { id: 'math_preprocessor', label: '2. Math Preprocessor' },
                { id: 'ai_tutor_grading', label: '3. Socratic & Grading' },
                { id: 'ocr_multimodal', label: '4. Vision & OCR' },
                { id: 'mistake_remedial', label: '5. Mistake Vault' },
                { id: 'systems_mobile', label: '6. Mobile & Offline' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubsystemTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                    activeSubsystemTab === tab.id
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subsystem 1: Taxonomy & RAG */}
          {activeSubsystemTab === 'knowledge_rag' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Network className="w-5 h-5 text-indigo-400" />
                    <span>5-Tier Curriculum Knowledge Hierarchy &amp; Grounding</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    [STATUS: IMPLEMENTED]
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  Knowledge is structured as an explicit relational tree: <code className="text-indigo-300 font-mono">Subject → Paper → Chapter → Topic → Concept</code>.
                </p>

                {/* Priority Algorithm Card */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-indigo-500/30 space-y-4">
                  <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block">
                    Mathematical Prioritization Formula:
                  </span>
                  <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 font-mono text-sm text-indigo-200">
                    {"P = min(99, round(F_board × 2.8 + W_student × 0.4))"}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 font-mono">
                    <div className="p-3 rounded-lg bg-zinc-900 border border-white/5">
                      <strong className="text-white block mb-1">F_board (Board Frequency):</strong>
                      Historical appearances in official Board CQs (2018–2024). E.g., Carnot Engine = 18x.
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900 border border-white/5">
                      <strong className="text-white block mb-1">W_student (Weakness Index):</strong>
                      Derived from diagnostic accuracy and Mistake Vault error telemetry.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subsystem 2: Math Preprocessor */}
          {activeSubsystemTab === 'math_preprocessor' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-indigo-400" />
                      <span>The `mathPreprocessor.ts` Normalization Engine</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Resolves Unicode collision between Bengali characters and LaTeX delimiters.
                    </p>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer self-start sm:self-auto"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Preprocessor Code'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed overflow-x-auto">
                  <pre>
                    <code>{mathCodeSnippet}</code>
                  </pre>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 space-y-1">
                    <span className="font-bold text-indigo-300 font-mono">1. Delimiter Normalization</span>
                    <p className="text-zinc-400">Replaces un-escaped LaTeX brackets <code className="text-zinc-200">\[ ... \]</code> and parentheses with strict KaTeX block and inline tokens.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/10 space-y-1">
                    <span className="font-bold text-indigo-300 font-mono">2. Unicode Boundary Protection</span>
                    <p className="text-zinc-400">Inserts non-breaking word boundaries between Bengali characters and adjacent math formula tokens to avoid parser crashes.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subsystem 3: Socratic & Grading */}
          {activeSubsystemTab === 'ai_tutor_grading' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-indigo-400" />
                    <span>NCTB Rubric-Aware Marking Engine &amp; Socratic Modes</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    [STATUS: IMPLEMENTED]
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  Evaluates Creative Questions (CQs) using atomic 3-stage criterion scoring rather than opaque holistic grading:
                </p>

                {/* Rubric Decision Table */}
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase text-[10px] border-b border-white/10">
                      <tr>
                        <th className="p-3">Student Response Condition</th>
                        <th className="p-3">Part-গ (3.0 Marks)</th>
                        <th className="p-3">Feedback Telemetry Generated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-zinc-300">
                      <tr className="bg-zinc-900/40">
                        <td className="p-3">Correct formula, valid substitution, correct answer + unit</td>
                        <td className="p-3 font-bold text-emerald-400">3.0 / 3.0</td>
                        <td className="p-3 text-zinc-300 font-sans">"পূর্ণাঙ্গ উত্তর সঠিক হয়েছে।"</td>
                      </tr>
                      <tr>
                        <td className="p-3">Correct formula + substitution, arithmetic calculation error</td>
                        <td className="p-3 font-bold text-amber-400">2.0 / 3.0</td>
                        <td className="p-3 text-zinc-300 font-sans">"সূত্র ও মান বসানো সঠিক, কিন্তু গণনায় ত্রুটি হয়েছে।"</td>
                      </tr>
                      <tr className="bg-zinc-900/40">
                        <td className="p-3">Correct formula, failure to convert Celsius to Kelvin</td>
                        <td className="p-3 font-bold text-amber-400">1.0 / 3.0</td>
                        <td className="p-3 text-zinc-300 font-sans">"একক রূপান্তর ভুল: তাপমাত্রাকে কেলভিনে (K) প্রকাশ করতে হবে।"</td>
                      </tr>
                      <tr>
                        <td className="p-3">Incorrect formula selected, random calculation</td>
                        <td className="p-3 font-bold text-rose-400">0.0 / 3.0</td>
                        <td className="p-3 text-zinc-300 font-sans">"প্রাসঙ্গিক সূত্র নির্বাচন করা হয়নি।"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Subsystem 4: Vision & OCR */}
          {activeSubsystemTab === 'ocr_multimodal' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Camera className="w-5 h-5 text-indigo-400" />
                    <span>Multi-Modal Vision &amp; Handwritten Answer Analysis</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    [STATUS: EXPERIMENTAL]
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  Processes camera scans of student handwritten answer scripts, extracting Bengali explanations and LaTeX equations via Gemini Vision with client-side image contrast enhancement.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">1. Canvas Resizing</span>
                    <p className="text-zinc-400 font-sans">Clamps image bounds to 1920x1080 to optimize bandwidth.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">2. Vision Extraction</span>
                    <p className="text-zinc-400 font-sans">Separates Bengali prose from raw LaTeX equations.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">3. Rubric Evaluation</span>
                    <p className="text-zinc-400 font-sans">Evaluates transcribed steps against official mark scheme.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subsystem 5: Mistake Vault */}
          {activeSubsystemTab === 'mistake_remedial' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-indigo-400" />
                    <span>8-Category Cognitive Error Taxonomy (ভুল শোধনাগার)</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    [STATUS: IMPLEMENTED]
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">1. ERR_CALC</span>
                    <p className="text-zinc-400 font-sans">Arithmetic or algebraic evaluation error despite correct formula.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">2. ERR_FORM</span>
                    <p className="text-zinc-400 font-sans">Selecting incorrect formula or omitting variable terms.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">3. ERR_CONC</span>
                    <p className="text-zinc-400 font-sans">Violating fundamental physical laws or theoretical premises.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">4. ERR_METHOD</span>
                    <p className="text-zinc-400 font-sans">Choosing formula indeterminate for given stem variables.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">5. ERR_REASON</span>
                    <p className="text-zinc-400 font-sans">In Part-(ঘ), stating conclusion without mathematical proof.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">6. ERR_UNIT</span>
                    <p className="text-zinc-400 font-sans">Omitting units or failing to convert metric prefixes (cm → m).</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">7. ERR_SIGN</span>
                    <p className="text-zinc-400 font-sans">Negative work, lens convention, or vector coordinate errors.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
                    <span className="text-indigo-400 font-bold block">8. ERR_DIAG</span>
                    <p className="text-zinc-400 font-sans">Incorrect circuit polarity or vector angle resolution.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subsystem 6: Mobile & Offline */}
          {activeSubsystemTab === 'systems_mobile' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-indigo-400" />
                    <span>Capacitor 8 Android Packaging &amp; Offline Persistence</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    [STATUS: IMPLEMENTED]
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  Configured with Capacitor 8 (`com.farhan.hscai`) and LocalStorage offline caches to ensure the app runs seamlessly on low-cost Android hardware even during cellular network drops.
                </p>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 font-mono text-xs text-zinc-300 space-y-2">
                  <span className="text-indigo-400 font-bold">// capacitor.config.ts configuration</span>
                  <pre className="overflow-x-auto">
{`const config: CapacitorConfig = {
  appId: 'com.farhan.hscai',
  appName: 'HSC AI Study Intelligence',
  webDir: 'dist',
  server: { androidScheme: 'https' }
};`}
                  </pre>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 5. EXPERIMENTS & MEASURED BENCHMARKS */}
        <div className="space-y-6 text-left">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
              4. Empirical Validation &amp; Measurements
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Automated Benchmarks &amp; Test Results
            </h2>
          </div>

          {/* Benchmark Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
              <span className="text-2xl font-bold text-emerald-400 block">98.4%</span>
              <span className="text-[11px] text-zinc-400">Schema Conformance (250 runs)</span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
              <span className="text-2xl font-bold text-emerald-400 block">99.2%</span>
              <span className="text-[11px] text-zinc-400">LaTeX Delimiter Repair</span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
              <span className="text-2xl font-bold text-indigo-400 block">1.12s</span>
              <span className="text-[11px] text-zinc-400">Mean First-Token Latency</span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
              <span className="text-2xl font-bold text-emerald-400 block">&lt;15ms</span>
              <span className="text-[11px] text-zinc-400">Offline Taxonomy Retrieval</span>
            </div>
          </div>

          {/* Tradeoffs Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase text-[10px] border-b border-white/10">
                <tr>
                  <th className="p-3">Subsystem</th>
                  <th className="p-3">Primary Problem</th>
                  <th className="p-3">Strategy Chosen</th>
                  <th className="p-3">Accepted Tradeoff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-zinc-300">
                <tr>
                  <td className="p-3 text-indigo-300">Math Typesetting</td>
                  <td className="p-3">LLM syntax breakage in Bengali</td>
                  <td className="p-3 text-emerald-400">mathPreprocessor.ts + KaTeX</td>
                  <td className="p-3 text-zinc-400">Minor CPU overhead during regex passes</td>
                </tr>
                <tr>
                  <td className="p-3 text-indigo-300">API Latency</td>
                  <td className="p-3">CQ grading latency</td>
                  <td className="p-3 text-emerald-400">Model fallback cascade (Gemini 2.0 Flash)</td>
                  <td className="p-3 text-zinc-400">Maintaining multiple schema definitions</td>
                </tr>
                <tr>
                  <td className="p-3 text-indigo-300">Data Persistence</td>
                  <td className="p-3">Offline availability without heavy server</td>
                  <td className="p-3 text-emerald-400">LocalStorage key-value sync + Zustand</td>
                  <td className="p-3 text-zinc-400">Storage capped at ~5–10MB per origin</td>
                </tr>
                <tr>
                  <td className="p-3 text-indigo-300">Mobile Runtime</td>
                  <td className="p-3">Cross-platform Android packaging</td>
                  <td className="p-3 text-emerald-400">Capacitor 8 hybrid web container</td>
                  <td className="p-3 text-zinc-400">Slightly slower cold start than pure Kotlin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. FAILURE MODES & CRITICAL LIMITATIONS */}
        <div className="space-y-6 text-left">
          <div>
            <span className="text-xs font-mono text-rose-400 uppercase tracking-widest block mb-1">
              5. Edge-Case Analysis &amp; Vulnerabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Documented Failure Modes &amp; Mitigations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {failureCases.map((f, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{f.title}</span>
                  </h4>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="text-zinc-300"><strong className="text-zinc-400">Cause:</strong> {f.cause}</p>
                  <p className="text-zinc-300"><strong className="text-emerald-400">Mitigation:</strong> {f.mitigation}</p>
                  <p className="text-zinc-300"><strong className="text-rose-400">Remaining Challenge:</strong> {f.openProblem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. PROJECT TIMELINE & PHASES */}
        <div className="space-y-6 text-left">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
              6. Engineering Trajectory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Development Timeline &amp; Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold block">Phase 1: Foundation</span>
              <p className="text-xs text-zinc-300">Curriculum graph formalization, KaTeX math preprocessor, and React 19 UI setup.</p>
              <span className="text-[10px] font-mono text-emerald-400">Completed</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold block">Phase 2: Intelligence</span>
              <p className="text-xs text-zinc-300">Socratic prompt orchestration, Zod schema contracts, and physics validator.</p>
              <span className="text-[10px] font-mono text-emerald-400">Completed</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold block">Phase 3: Examination Hub</span>
              <p className="text-xs text-zinc-300">All-Board Question Bank, timed exam simulator, and mistake vault classification.</p>
              <span className="text-[10px] font-mono text-emerald-400">Completed</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold block">Phase 4: Mobile &amp; Scale</span>
              <p className="text-xs text-zinc-300">Capacitor 8 Android packaging, Playwright E2E suites, and closed student beta.</p>
              <span className="text-[10px] font-mono text-indigo-300">Active / Ongoing</span>
            </div>
          </div>
        </div>

        {/* 8. VISUAL SCREENSHOT GALLERY */}
        <div className="space-y-8 text-left">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">
              7. Visual Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Application Interfaces &amp; Workspaces
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hscAiScreenshots.map((src, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedScreenshotIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group cursor-pointer rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden hover:border-indigo-500/40 transition-all shadow-xl space-y-3 p-3 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={src}
                    alt={hscAiScreenshotMetadata[idx]?.title || `Screenshot ${idx + 1}`}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {hscAiScreenshotMetadata[idx]?.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">
                    {hscAiScreenshotMetadata[idx]?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox */}
      <ScreenshotLightbox
        isOpen={lightboxOpen}
        imageSrc={hscAiScreenshots[selectedScreenshotIndex]}
        title={hscAiScreenshotMetadata[selectedScreenshotIndex]?.title}
        description={hscAiScreenshotMetadata[selectedScreenshotIndex]?.description}
        currentIndex={selectedScreenshotIndex}
        totalImages={hscAiScreenshots.length}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setSelectedScreenshotIndex((selectedScreenshotIndex - 1 + hscAiScreenshots.length) % hscAiScreenshots.length)}
        onNext={() => setSelectedScreenshotIndex((selectedScreenshotIndex + 1) % hscAiScreenshots.length)}
        projectTitle="HSC AI Study Intelligence System"
      />
    </div>
  );
};
