import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Project } from './types';

// Code-split Case Studies & Modals to slash initial bundle weight
const ProjectDetailModal = lazy(() => import('./components/ProjectDetailModal').then(m => ({ default: m.ProjectDetailModal })));
const ResumeModal = lazy(() => import('./components/ResumeModal').then(m => ({ default: m.ResumeModal })));
const AtlasCaseStudyPage = lazy(() => import('./components/AtlasCaseStudyPage').then(m => ({ default: m.AtlasCaseStudyPage })));
const HscAiCaseStudyPage = lazy(() => import('./components/HscAiCaseStudyPage').then(m => ({ default: m.HscAiCaseStudyPage })));
const AgentHqCaseStudyPage = lazy(() => import('./components/AgentHqCaseStudyPage').then(m => ({ default: m.AgentHqCaseStudyPage })));
const AurenCaseStudyPage = lazy(() => import('./components/AurenCaseStudyPage').then(m => ({ default: m.AurenCaseStudyPage })));
const WatchvaultCaseStudyPage = lazy(() => import('./components/WatchvaultCaseStudyPage').then(m => ({ default: m.WatchvaultCaseStudyPage })));

const CaseStudyFallback = () => (
  <div className="min-h-screen bg-[#07080c] flex items-center justify-center p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#4DA3FF] border-t-transparent animate-spin" />
      <span className="text-xs font-mono text-zinc-400 tracking-wider">Loading System Architecture...</span>
    </div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'portfolio' | 'agent-hq-case-study' | 'auren-case-study' | 'watchvault-case-study' | 'atlas-case-study' | 'hsc-ai-case-study'>('portfolio');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#agent-hq-case-study') {
        setViewMode('agent-hq-case-study');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#auren-case-study') {
        setViewMode('auren-case-study');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#watchvault-case-study') {
        setViewMode('watchvault-case-study');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#atlas-case-study') {
        setViewMode('atlas-case-study');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#hsc-ai-case-study') {
        setViewMode('hsc-ai-case-study');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (viewMode !== 'portfolio' && !window.location.hash.includes('case-study')) {
        setViewMode('portfolio');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== 'portfolio') return;

    const handleScroll = () => {
      const sections = ['home', 'work', 'services', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const handleNavigate = (sectionId: string) => {
    if (viewMode !== 'portfolio') {
      setViewMode('portfolio');
      window.location.hash = '';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenResume = () => {
    setIsResumeModalOpen(true);
  };

  const handleOpenAgentHqCaseStudy = () => {
    setIsModalOpen(false);
    setViewMode('agent-hq-case-study');
    window.location.hash = 'agent-hq-case-study';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAurenCaseStudy = () => {
    setIsModalOpen(false);
    setViewMode('auren-case-study');
    window.location.hash = 'auren-case-study';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWatchvaultCaseStudy = () => {
    setIsModalOpen(false);
    setViewMode('watchvault-case-study');
    window.location.hash = 'watchvault-case-study';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAtlasCaseStudy = () => {
    setIsModalOpen(false);
    setViewMode('atlas-case-study');
    window.location.hash = 'atlas-case-study';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHscCaseStudy = () => {
    setIsModalOpen(false);
    setViewMode('hsc-ai-case-study');
    window.location.hash = 'hsc-ai-case-study';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setViewMode('portfolio');
    if (window.location.hash.includes('case-study')) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'auren-case-study') {
    return (
      <div className="min-h-screen bg-[#07080c] text-neutral-100 selection:bg-cyan-400 selection:text-black">
        <Navbar activeSection="work" onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <Suspense fallback={<CaseStudyFallback />}>
          <AurenCaseStudyPage onBack={handleBackToPortfolio} />
        </Suspense>
        <Footer onNavigate={handleNavigate} />
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        </Suspense>
      </div>
    );
  }

  if (viewMode === 'watchvault-case-study') {
    return (
      <div className="min-h-screen bg-[#08090d] text-neutral-100 selection:bg-rose-500 selection:text-white">
        <Navbar activeSection="work" onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <Suspense fallback={<CaseStudyFallback />}>
          <WatchvaultCaseStudyPage onBack={handleBackToPortfolio} />
        </Suspense>
        <Footer onNavigate={handleNavigate} />
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        </Suspense>
      </div>
    );
  }

  if (viewMode === 'agent-hq-case-study') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-neutral-100 selection:bg-cyan-400 selection:text-black">
        <Navbar activeSection="work" onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <Suspense fallback={<CaseStudyFallback />}>
          <AgentHqCaseStudyPage onBack={handleBackToPortfolio} />
        </Suspense>
        <Footer onNavigate={handleNavigate} />
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        </Suspense>
      </div>
    );
  }

  if (viewMode === 'atlas-case-study') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-neutral-100 selection:bg-[#4DA3FF] selection:text-black">
        <Navbar activeSection="work" onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <Suspense fallback={<CaseStudyFallback />}>
          <AtlasCaseStudyPage onBack={handleBackToPortfolio} />
        </Suspense>
        <Footer onNavigate={handleNavigate} />
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        </Suspense>
      </div>
    );
  }

  if (viewMode === 'hsc-ai-case-study') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-neutral-100 selection:bg-indigo-500 selection:text-white">
        <Navbar activeSection="work" onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <Suspense fallback={<CaseStudyFallback />}>
          <HscAiCaseStudyPage onBack={handleBackToPortfolio} />
        </Suspense>
        <Footer onNavigate={handleNavigate} />
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 selection:bg-[#4DA3FF] selection:text-black">
      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} onOpenResume={handleOpenResume} />

      {/* Main Sections */}
      <main>
        <Hero onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <SelectedWork
          onSelectProject={handleOpenProjectModal}
          onOpenAgentHqCaseStudy={handleOpenAgentHqCaseStudy}
          onOpenAurenCaseStudy={handleOpenAurenCaseStudy}
          onOpenWatchvaultCaseStudy={handleOpenWatchvaultCaseStudy}
          onOpenAtlasCaseStudy={handleOpenAtlasCaseStudy}
          onOpenHscCaseStudy={handleOpenHscCaseStudy}
        />
        <ServicesSection onNavigate={handleNavigate} />
        <AboutSection onOpenResume={handleOpenResume} />
        <SkillsSection />
        <ContactSection onOpenResume={handleOpenResume} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Deep Dive Project Detail Modal */}
      <Suspense fallback={null}>
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseProjectModal}
          onOpenAgentHqCaseStudy={handleOpenAgentHqCaseStudy}
          onOpenAurenCaseStudy={handleOpenAurenCaseStudy}
          onOpenWatchvaultCaseStudy={handleOpenWatchvaultCaseStudy}
          onOpenAtlasCaseStudy={handleOpenAtlasCaseStudy}
          onOpenHscCaseStudy={handleOpenHscCaseStudy}
        />

        {/* Resume Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </Suspense>
    </div>
  );
}

