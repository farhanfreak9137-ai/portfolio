import React from 'react';
import { Layout, Sparkles, Code2, Check, ArrowRight, Wrench } from 'lucide-react';
import { services } from '../data/portfolioData';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#4DA3FF]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-teal-400" />;
      default:
        return <Layout className="w-6 h-6 text-[#4DA3FF]" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-grid-pattern border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Heading */}
        <div className="space-y-3 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-xs font-mono text-[#4DA3FF]">
            <Wrench className="w-3.5 h-3.5" />
            <span>Freelance Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What I Can Build
          </h2>
          <p className="text-lg text-zinc-400">
            Tailored frontend engineering and intelligent web app solutions for clients and teams.
          </p>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const iconBgs = [
              'bg-[#4DA3FF]/10 border-[#4DA3FF]/25',
              'bg-sky-500/10 border-sky-500/25',
              'bg-teal-500/10 border-teal-500/25'
            ];
            const iconBg = iconBgs[index % iconBgs.length];

            return (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover rounded-2xl p-8 space-y-6 flex flex-col justify-between border border-white/10 hover:border-[#4DA3FF]/30 transition-all relative group"
              >
                <div className="space-y-6">
                  {/* Header Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-105 transition-transform ${iconBg}`}>
                      {getIcon(service.icon)}
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#4DA3FF]/10 text-[#4DA3FF] border border-[#4DA3FF]/20">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Service Title */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables Bullet Points */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      Key Deliverables
                    </span>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="w-4 h-4 text-[#4DA3FF] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-[#4DA3FF]/30 text-zinc-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#4DA3FF]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contract Assurance Banner */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Need a custom web application or frontend fix?</h4>
            <p className="text-xs text-zinc-400">
              Open for contract engagements on Upwork, Fiverr, or direct invoices with clean code handoff.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 font-semibold text-xs whitespace-nowrap transition-all cursor-pointer shadow-md shadow-[#4DA3FF]/20"
          >
            Start a Conversation
          </button>
        </div>

      </div>
    </section>
  );
};
