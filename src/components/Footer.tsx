import React from 'react';
import { ArrowUp, Github, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left Brand Identity */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            {personalInfo.avatarUrl ? (
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/20 bg-zinc-900 shrink-0">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white font-mono font-bold text-base">
                D
              </div>
            )}
            <div>
              <h3 className="text-white font-bold text-base tracking-tight">
                {personalInfo.name}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                {personalInfo.title}
              </p>
            </div>
          </div>

          {/* Center Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-[#70B7FF] hover:border-[#4DA3FF]/40 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-[#70B7FF] hover:border-[#4DA3FF]/40 transition-colors cursor-pointer"
              aria-label="Contact Email"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>

          {/* Right Scroll To Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-[#4DA3FF]/40 transition-all flex items-center gap-2 text-xs font-mono cursor-pointer"
            aria-label="Scroll Back To Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-zinc-400" />
          </button>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© 2026 {personalInfo.name}. All rights reserved.</p>
          <p>Built with React 19, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};
