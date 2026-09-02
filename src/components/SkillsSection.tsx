import React from 'react';
import { Cpu, Code, Layers } from 'lucide-react';
import { skillGroups } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section className="py-20 bg-grid-pattern relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-xs font-mono text-[#4DA3FF]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Technology
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Core technologies and tools I use to build production-grade web applications.
          </p>
        </div>

        {/* Grouped Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10 hover:border-[#4DA3FF]/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 flex items-center justify-center text-[#4DA3FF]">
                    <Code className="w-4 h-4 text-[#4DA3FF]" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {group.category}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {group.description}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                        skill.highlight
                          ? 'bg-[#4DA3FF]/15 text-[#4DA3FF] border border-[#4DA3FF]/30 font-medium'
                          : 'bg-zinc-900 text-zinc-300 border border-white/10'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
