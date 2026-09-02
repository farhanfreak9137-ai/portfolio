import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Send, Briefcase, User, Wrench, FileText } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Code },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none focus:ring-1 focus:ring-zinc-400 rounded-lg p-1 transition-all"
            aria-label={`${personalInfo.name} Portfolio Home`}
          >
            {personalInfo.avatarUrl ? (
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/20 group-hover:border-white/40 transition-all bg-zinc-900 shrink-0">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-white/25 transition-all">
                <span className="font-mono font-bold text-base text-white">D</span>
              </div>
            )}
            <div>
              <span className="text-base font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
                {personalInfo.name}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for projects</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#4DA3FF] bg-[#4DA3FF]/10 border border-[#4DA3FF]/30 shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-2">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-[#4DA3FF]/40 rounded-lg transition-all active:scale-95 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#4DA3FF]" />
                <span>Resume</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-[#4DA3FF] hover:bg-[#70B7FF] rounded-lg transition-all shadow-md shadow-[#4DA3FF]/20 active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let's Talk</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#050505]/95 border-b border-white/10 backdrop-blur-xl px-4 py-6 shadow-2xl transition-all duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-[#4DA3FF]/15 text-[#4DA3FF] border border-[#4DA3FF]/30 font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4DA3FF]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 px-4 rounded-xl bg-white text-black font-semibold text-center hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Contact Farhan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
