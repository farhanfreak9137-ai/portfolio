import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Layout, Sparkles, CheckCircle2 } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  title?: string;
  description?: string;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  projectTitle: string;
}

export const ScreenshotLightbox: React.FC<LightboxProps> = ({
  isOpen,
  imageSrc,
  title,
  description,
  currentIndex,
  totalImages,
  onClose,
  onPrev,
  onNext,
  projectTitle,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  const isFallbackImage = imageSrc.startsWith('/projects/');

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
      {/* Lightbox Top Control Bar */}
      <div className="flex items-center justify-between z-10 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <span>{projectTitle}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-white/10">
              Screenshot {currentIndex + 1} of {totalImages}
            </span>
          </h3>
          {title && <p className="text-sm text-zinc-400 mt-0.5">{title}</p>}
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View Area */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Prev Arrow */}
        {totalImages > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-zinc-900/90 border border-white/10 text-white hover:bg-white hover:text-black transition-all shadow-xl"
            aria-label="Previous Screenshot"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Screenshot Content Box */}
        <div className="max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
          {/* We handle both actual image files AND high-fidelity fallback preview card rendering */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Real Image or Styled Fallback Box */}
            <div className="w-full h-full max-h-[70vh] rounded-2xl border border-white/10 bg-[#070707] overflow-hidden flex flex-col shadow-2xl">
              {/* Mock Window Title bar */}
              <div className="px-4 py-2.5 bg-[#050505] border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-zinc-400">{imageSrc}</span>
                </div>
                <span className="text-zinc-300 font-medium">Full Resolution Preview</span>
              </div>

              {/* Main Image Area with Image error fallback */}
              <div className="flex-1 relative bg-[#0a0a0a] p-6 sm:p-10 flex flex-col items-center justify-center text-center overflow-auto">
                <img
                  src={imageSrc}
                  alt={title || `${projectTitle} Screenshot ${currentIndex + 1}`}
                  className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-xl"
                  onError={(e) => {
                    // Fallback to high-fidelity live rendered preview UI if static asset PNG isn't placed yet
                    e.currentTarget.style.display = 'none';
                    const fallbackEl = document.getElementById(`lightbox-fallback-${currentIndex}`);
                    if (fallbackEl) fallbackEl.style.display = 'flex';
                  }}
                />

                {/* High Fidelity Fallback UI Card */}
                <div
                  id={`lightbox-fallback-${currentIndex}`}
                  className="w-full max-w-3xl flex-col items-center justify-center p-8 space-y-6 bg-zinc-900/60 rounded-xl border border-white/10 my-auto"
                  style={{ display: isFallbackImage ? 'flex' : 'none' }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Layout className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white">{title || `Screenshot Slot ${currentIndex + 1}`}</h4>
                    <p className="text-sm text-zinc-300 max-w-lg mx-auto">{description}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 text-xs font-mono text-zinc-300 border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Asset path: {imageSrc}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 text-xs font-mono text-amber-300 border border-white/10">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Ready for custom PNG drop-in
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Arrow */}
        {totalImages > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-zinc-900/90 border border-white/10 text-white hover:bg-white hover:text-black transition-all shadow-xl"
            aria-label="Next Screenshot"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption Footer */}
      {description && (
        <div className="max-w-3xl mx-auto w-full text-center bg-zinc-900/80 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-zinc-300">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
