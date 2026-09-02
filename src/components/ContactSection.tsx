import React, { useState } from 'react';
import { Send, Mail, Github, CheckCircle2, Copy, Sparkles, MessageSquare, FileText, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Application / Dashboard',
    message: '',
    budget: '$500 - $1,500'
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Check if custom Formspree/EmailJS endpoint is defined in environment variables
    const customEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    if (customEndpoint) {
      try {
        await fetch(customEndpoint, {
          method: 'POST',
          headers: { 'Content-[#Type]': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (err) {
        console.error('Failed to dispatch via endpoint:', err);
      }
    } else {
      // Fallback: Trigger default mailto client link
      const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} from ${formData.name}`);
      const body = encodeURIComponent(`Hi Farhan,\n\n${formData.message}\n\nProject Type: ${formData.projectType}\nBudget Range: ${formData.budget}\n\nContact Email: ${formData.email}\nName: ${formData.name}`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
    }

    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#050505] border-t border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-xs font-mono text-[#4DA3FF]">
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Have an idea worth building?
          </h2>
          <p className="text-lg text-zinc-300 font-normal">
            I'm interested in building useful web applications, dashboards, and AI-powered tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Let's Work Together
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                Whether you have a specific project scope, an upcoming web application, or need frontend engineering assistance, feel free to drop a message or reach out via email.
              </p>
            </div>

            {/* Email Copy Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-mono text-white font-medium truncate">
                  {personalInfo.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 border border-white/10 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {onOpenResume && (
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Need a copy of my resume?</span>
                  <button
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4DA3FF] hover:text-[#70B7FF] transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Resume PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Profiles & Repositories
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white transition-all text-sm font-medium group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                    <span>GitHub Profile</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-white">View Repos →</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{personalInfo.availability}</span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    Thank you for reaching out. Farhan usually reviews project inquiries within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', projectType: 'Web Application / Dashboard', message: '', budget: '$500 - $1,500' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-all"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-2">
                    <MessageSquare className="w-4 h-4 text-[#4DA3FF]" />
                    <span className="text-sm font-bold text-white">Project Inquiry Form</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#4DA3FF]/60 focus:ring-1 focus:ring-[#4DA3FF]/30 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-300">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#4DA3FF]/60 focus:ring-1 focus:ring-[#4DA3FF]/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-300">Project Type</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4DA3FF]/60 focus:ring-1 focus:ring-[#4DA3FF]/30 transition-colors"
                      >
                        <option value="Web Application / Dashboard">Web Application / Dashboard</option>
                        <option value="AI Integration & Features">AI Integration & Features</option>
                        <option value="Frontend Development / Redesign">Frontend Development / Redesign</option>
                        <option value="Custom Contract Work">Custom Contract Work</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-300">Estimated Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4DA3FF]/60 focus:ring-1 focus:ring-[#4DA3FF]/30 transition-colors"
                      >
                        <option value="< $500">&lt; $500</option>
                        <option value="$500 - $1,500">$500 - $1,500</option>
                        <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                        <option value="$3,000+">$3,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-300">Project Overview & Scope *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe what you want to build, key features, or any technical requirements..."
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#4DA3FF]/60 focus:ring-1 focus:ring-[#4DA3FF]/30 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#4DA3FF] hover:bg-[#70B7FF] text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-[#4DA3FF]/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
