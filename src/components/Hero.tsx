import React, { useState } from 'react';
import { ArrowDown, Github, Mail, Sparkles, Terminal, Check, Copy, ExternalLink, Code2, FileText } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenResume }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'agent-hq' | 'auren' | 'config' | 'atlas' | 'hsc' | 'stack'>('agent-hq');

  const codeSnippets = {
    'agent-hq': `// AgentHQOrchestrator.ts
import { DAGPlanner, ProviderCascade, SQLiteStorage } from '@/agent-hq';

export async function executeMission(prompt: string) {
  const dag = await DAGPlanner.decompose(prompt, {
    agents: ["boss", "atlas", "outreach", "sentinel"]
  });

  const stream = await ProviderCascade.executeWithFallback(dag, {
    primary: "gemini-2.0-flash",
    fallback: ["groq-llama-3.3", "antigravity-cli"]
  });

  return SQLiteStorage.saveRun({ mission: prompt, stream });
}`,
        auren: `// AurenCareerOS.ts
import { CentralAssistant, AgentRegistry, PolicyBoundary } from '@/auren';

export async function processCareerIntent(query: string) {
  // 1. Parse intent & resolve from dynamic registry
  const intent = await CentralAssistant.parse(query);
  const tool = AgentRegistry.resolve(intent.action);

  // 2. Halt at server policy gate if mutation requires human approval
  if (tool.requiresHumanApproval) {
    return PolicyBoundary.requestApproval({ tool, payload: intent.args });
  }

  // 3. Execute with strict SQLite verified memory grounding
  return tool.execute({ grounding: "VERIFIED_MEMORY" });
}`,
    config: `// farhan.config.ts
export const developer = {
  name: "Md Farhan Hossain",
  role: "Software Developer & AI Builder",
  focus: ["Multi-Agent Systems", "React 19", "TypeScript", "Node.js", "SQLite"],
  status: "Available for AI engineering & contracts",
  motto: "Engineering autonomous agent systems and production web apps"
};`,
    atlas: `// AtlasProductivity.tsx
import { TaskBoard, HabitTracker, GeminiAI } from '@/atlas';

export default function Workspace() {
  const { tasks, habits } = useUserWorkspace();
  const aiSubtasks = GeminiAI.decomposeGoal("Build MVP");
  
  return <AtlasDashboard tasks={tasks} habits={habits} ai={aiSubtasks} />;
}`,
    hsc: `// HSCStudyIntelligence.ts
import { SocraticAITutor, PriorityEngine } from '@/hsc-ai';

export async function getNextPhysicsTopic() {
  const priority = PriorityEngine.score({
    chapter: "Thermodynamics",
    boardOccurrences: 18,
    weaknessIndex: 0.60
  });
  
  return SocraticAITutor.solveWithKaTeX({
    concept: "Carnot Engine Efficiency",
    stepByStep: true
  });
}`,
    stack: `// tech-stack.ts
export const coreSkills = [
  "React 19 & Next.js",
  "TypeScript & KaTeX",
  "Tailwind CSS v4",
  "Gemini & Multi-Model APIs",
  "Responsive UI Architecture"
];`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4DA3FF]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#4DA3FF]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Positioning */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Profile Avatar & Positioning Tag */}
            <div className="flex items-center gap-4">
              {personalInfo.avatarUrl && (
                <div className="relative group shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-zinc-900 group-hover:border-[#4DA3FF]/50 transition-all">
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#050505] shadow-md" title="Available for hire" />
                </div>
              )}
              
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-xs font-mono text-zinc-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#4DA3FF]" />
                  <span>{personalInfo.title}</span>
                </div>
                <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{personalInfo.availability}</span>
                </div>
              </div>
            </div>

            {/* Name & Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                {personalInfo.name}
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#4DA3FF]/90">
                {personalInfo.shortPositioning}
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
              {personalInfo.heroSupportingText}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('work')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 font-semibold text-sm transition-all shadow-xl shadow-[#4DA3FF]/20 active:scale-95 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 hover:text-white hover:border-[#4DA3FF]/30 font-medium text-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Contact Me</span>
              </button>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-[#4DA3FF] hover:border-[#4DA3FF]/40 font-medium text-sm transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#4DA3FF]" />
                  <span>View Resume</span>
                </button>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-6">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Connect
              </span>
              <div className="flex items-center gap-4 text-zinc-400">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all hover:scale-105"
                  aria-label="Farhan's GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all hover:scale-105"
                  aria-label="Send Email to Farhan"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Subtle Interactive Developer Code Accent */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0c]">
              {/* Terminal Header */}
              <div className="px-4 py-3 bg-zinc-950 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="ml-2 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-zinc-300" />
                    farhan.dev
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Copy code snippet"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Tabs */}
              <div className="flex items-center border-b border-white/10 bg-zinc-950 px-2 pt-2 text-xs font-mono">
                <button
                  onClick={() => setActiveCodeTab('agent-hq')}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors ${
                    activeCodeTab === 'agent-hq'
                      ? 'bg-[#0a0a0c] text-cyan-400 font-semibold border-t-2 border-cyan-400'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  AgentHQ.ts
                </button>
                                <button
                  onClick={() => setActiveCodeTab('auren')}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors cursor-pointer ${
                    activeCodeTab === 'auren'
                      ? 'bg-zinc-900 text-indigo-400 border-t-2 border-indigo-400'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  auren.ts
                </button>
                <button
                  onClick={() => setActiveCodeTab('config')}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors ${
                    activeCodeTab === 'config'
                      ? 'bg-[#0a0a0c] text-[#4DA3FF] font-semibold border-t-2 border-[#4DA3FF]'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  developer.ts
                </button>
                <button
                  onClick={() => setActiveCodeTab('atlas')}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors ${
                    activeCodeTab === 'atlas'
                      ? 'bg-[#0a0a0c] text-[#4DA3FF] font-semibold border-t-2 border-[#4DA3FF]'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  AtlasDemo.tsx
                </button>
                <button
                  onClick={() => setActiveCodeTab('hsc')}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors ${
                    activeCodeTab === 'hsc'
                      ? 'bg-[#0a0a0c] text-indigo-400 font-semibold border-t-2 border-indigo-400'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  HSC.ai.ts
                </button>
                <button
                  onClick={() => setActiveCodeTab('stack')}
                  className={`px-3 py-1.5 rounded-t-lg transition-colors ${
                    activeCodeTab === 'stack'
                      ? 'bg-[#0a0a0c] text-[#4DA3FF] font-semibold border-t-2 border-[#4DA3FF]'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  tech-stack.ts
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed overflow-x-auto min-h-[220px]">
                <pre className="text-zinc-300">
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>

              {/* Terminal Footer Status Bar */}
              <div className="px-4 py-2.5 bg-zinc-950 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>TypeScript 5.8 | React 19</span>
                </div>
                <button
                  onClick={() => onNavigate('work')}
                  className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1 text-xs"
                >
                  <span>Explore Atlas</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
