import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { AtlasCaseStudyPage } from './components/AtlasCaseStudyPage';
import { HscAiCaseStudyPage } from './components/HscAiCaseStudyPage';
import { AgentHqCaseStudyPage } from './components/AgentHqCaseStudyPage';
import { AurenCaseStudyPage } from './components/AurenCaseStudyPage';
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'portfolio' | 'agent-hq-case-study' | 'auren-case-study' | 'atlas-case-study' | 'hsc-ai-case-study'>('portfolio');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#agent-hq-case-study') {
        setViewMode('agent-hq-case-study');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#auren-case-study') {
        setViewMode('auren-case-study');
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
        <AurenCaseStudyPage onBack={handleBackToPortfolio} />
        <Footer onNavigate={handleNavigate} />
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    );
  }

  if (viewMode === 'agent-hq-case-study') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-neutral-100 selection:bg-cyan-400 selection:text-black">
        <Navbar activeSection="work" onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <AgentHqCaseStudyPage onBack={handleBackToPortfolio} />
        <Footer onNavigate={handleNavigate} />
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    );
  }

  if (viewMode === 'atlas-case-study') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-neutral-100 selection:bg-[#4DA3FF] selection:text-black">
        <Navbar activeSection="work" onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <AtlasCaseStudyPage onBack={handleBackToPortfolio} />
        <Footer onNavigate={handleNavigate} />
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    );
  }

  if (viewMode === 'hsc-ai-case-study') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-neutral-100 selection:bg-indigo-500 selection:text-white">
        <Navbar activeSection="work" onNavigate={handleNavigate} onOpenResume={handleOpenResume} />
        <HscAiCaseStudyPage onBack={handleBackToPortfolio} />
        <Footer onNavigate={handleNavigate} />
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
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
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseProjectModal}
        onOpenAgentHqCaseStudy={handleOpenAgentHqCaseStudy}
        onOpenAurenCaseStudy={handleOpenAurenCaseStudy}
        onOpenAtlasCaseStudy={handleOpenAtlasCaseStudy}
        onOpenHscCaseStudy={handleOpenHscCaseStudy}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

