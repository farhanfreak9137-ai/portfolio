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
  Film,
  Tv,
  Database,
  BarChart3,
  Clock,
  Heart,
  Star,
  RefreshCw,
  Copy,
  Check,
  TrendingUp,
  SlidersHorizontal,
  Dices,
  Maximize2,
  Code2,
  Layout,
  DollarSign,
  Grid3X3,
  Share2,
  Lock,
  Search,
  Cpu
} from 'lucide-react';
import { watchvaultScreenshots, watchvaultScreenshotMetadata } from '../data/portfolioData';
import { ScreenshotLightbox } from './ScreenshotLightbox';

interface WatchvaultCaseStudyPageProps {
  onBack: () => void;
}

export const WatchvaultCaseStudyPage: React.FC<WatchvaultCaseStudyPageProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'seriesgraph' | 'sync' | 'discovery' | 'mobile'>('architecture');
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCodeSnippet, setActiveCodeSnippet] = useState<'dexie' | 'seriesgraph' | 'sync' | 'financials'>('dexie');

  const dexieCodeSnippet = `// src/lib/db/index.ts
import Dexie, { type Table } from 'dexie';
import { LibraryItem, EpisodeProgress, CachedMetadata, AppSetting } from '../types';

export class WatchVaultDatabase extends Dexie {
  library_items!: Table<LibraryItem, string>;
  episode_progress!: Table<EpisodeProgress, string>;
  cached_metadata!: Table<CachedMetadata, string>;
  app_settings!: Table<AppSetting, string>;

  constructor() {
    super('WatchVaultDB');

    this.version(1).stores({
      library_items: 'id, tmdb_id, media_type, status, is_favorite, rating, release_year, updated_at, is_deleted, [media_type+status]',
      episode_progress: 'id, library_item_id, [library_item_id+season_number], is_watched',
      cached_metadata: 'key, expires_at',
      app_settings: 'key',
    });

    // v2: Cloud sync indexing by updated_at with sub-5ms reactive live queries
    this.version(2).stores({
      episode_progress: 'id, library_item_id, [library_item_id+season_number], is_watched, updated_at',
    });
  }
}

export const db = new WatchVaultDatabase();

// Reentrancy guard preventing sync echo loops during remote pull
let remoteApplyDepth = 0;
export async function runAsRemoteApply<T>(fn: () => Promise<T>): Promise<T> {
  remoteApplyDepth++;
  try {
    return await fn();
  } finally {
    remoteApplyDepth--;
  }
}`;

  const seriesgraphCodeSnippet = `// src/components/details/EpisodeTracker.tsx
// SeriesGraph authentic high-contrast rating color binning
export function getSeriesGraphColor(rating?: number | null): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  if (rating === undefined || rating === null || rating <= 0) {
    return { bg: 'bg-zinc-800/80', text: 'text-zinc-500', border: 'border-zinc-700/50', label: 'Unrated' };
  }
  if (rating >= 9.0) {
    return { bg: 'bg-emerald-600', text: 'text-white font-bold', border: 'border-emerald-400', label: 'Masterpiece' };
  }
  if (rating >= 8.0) {
    return { bg: 'bg-green-600', text: 'text-white font-semibold', border: 'border-green-400', label: 'Great' };
  }
  if (rating >= 7.0) {
    return { bg: 'bg-lime-600', text: 'text-zinc-950 font-semibold', border: 'border-lime-400', label: 'Good' };
  }
  if (rating >= 6.0) {
    return { bg: 'bg-amber-500', text: 'text-zinc-950 font-medium', border: 'border-amber-300', label: 'Mixed' };
  }
  if (rating >= 5.0) {
    return { bg: 'bg-orange-600', text: 'text-white', border: 'border-orange-400', label: 'Subpar' };
  }
  return { bg: 'bg-rose-700', text: 'text-white', border: 'border-rose-500', label: 'Weak' };
}`;

  const syncCodeSnippet = `// src/lib/sync/syncEngine.ts
/**
 * Offline-first cloud sync engine backed by Supabase.
 * Dual-phase Push / Pull with Last-Write-Wins (LWW) conflict handling.
 */
class SyncEngine {
  public async triggerSync(): Promise<SyncResult> {
    // 1. PUSH: Local items updated since push watermark -> sync_records table
    const watermark = await getSetting('sync_push_watermark');
    const unsynced = await db.library_items
      .where('updated_at').above(watermark || '')
      .limit(PUSH_BATCH)
      .toArray();

    if (unsynced.length > 0) {
      await supabase.from('sync_records').upsert(unsynced);
      await setSetting('sync_push_watermark', unsynced[unsynced.length - 1].updated_at);
    }

    // 2. PULL: Server records newer than pull cursor -> applied locally via runAsRemoteApply
    const pullCursor = await getSetting('sync_pull_cursor');
    const { data: remoteRows } = await supabase
      .from('sync_records')
      .select('*')
      .gt('server_updated_at', pullCursor || '')
      .order('server_updated_at', { ascending: true })
      .limit(PULL_PAGE);

    if (remoteRows?.length) {
      await runAsRemoteApply(async () => {
        for (const record of remoteRows) {
          const local = await db.library_items.get(record.id);
          // Apply if server has higher or equal version / newer updated_at
          if (!local || record.updated_at >= local.updated_at) {
            await db.library_items.put(record);
          }
        }
      });
      await setSetting('sync_pull_cursor', remoteRows[remoteRows.length - 1].server_updated_at);
    }
  }
}`;

  const financialsCodeSnippet = `// src/lib/metadata/financials.ts
export function calculateMovieFinancials(budget = 0, revenue = 0, rating = 0) {
  // Industry standard theatrical rule: ~2.5x production budget for break-even
  const breakEven = budget * 2.5;
  const netProfit = revenue - breakEven;
  const roiMultiplier = budget > 0 ? revenue / budget : 0;

  let verdict: 'Mega Blockbuster' | 'Box Office Hit' | 'Moderate Success' | 'Flop' = 'Flop';
  if (roiMultiplier >= 4.0 && revenue > 200_000_000) verdict = 'Mega Blockbuster';
  else if (roiMultiplier >= 2.5) verdict = 'Box Office Hit';
  else if (roiMultiplier >= 1.8) verdict = 'Moderate Success';

  return { breakEven, netProfit, roiMultiplier, verdict };
}`;

  const currentSnippetCode = 
    activeCodeSnippet === 'dexie' ? dexieCodeSnippet :
    activeCodeSnippet === 'seriesgraph' ? seriesgraphCodeSnippet :
    activeCodeSnippet === 'sync' ? syncCodeSnippet : financialsCodeSnippet;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippetCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-neutral-100 selection:bg-rose-500 selection:text-white pt-20 pb-24">
      
      {/* Sticky Case Study Top Navigation Bar */}
      <div className="sticky top-[65px] z-30 bg-[#05060a]/90 backdrop-blur-md border-b border-white/10 py-3 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" />
            <span>Back to Portfolio</span>
          </button>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="text-zinc-500">Case Study:</span>
            <span className="text-white font-semibold">WatchVault</span>
            <span className="text-zinc-600">•</span>
            <span className="text-rose-400">Offline-First Dexie + Supabase Sync</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/farhanfreak9137-ai/moviewatchlist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-200 hover:text-white transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>WatchVault.apk Built</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-8">

        {/* 1. HERO SECTION */}
        <div className="relative rounded-3xl bg-zinc-900/40 border border-rose-500/20 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl space-y-8">
          {/* Background Crimson Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="space-y-4 text-left max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                Cinematic Media Vault Case Study
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-white/10">
                Developer: Farhan (@farhanfreak9137-ai)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Zero Mock Data Guarantee
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              WatchVault — Personal Movie &amp; TV Vault with SeriesGraph Heatmaps &amp; Offline Sync
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-normal border-l-2 border-rose-500 pl-4 py-1 bg-rose-500/5 rounded-r-lg">
              A private, authentic personal movie and TV/web-series archive featuring Netflix-grade cinematic discovery, Letterboxd-depth personal tracking, IMDb/SeriesGraph-style episode rating heatmaps, offline-first IndexedDB storage, and multi-device cloud synchronization.
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Primary Storage</span>
              <span className="text-xs font-mono font-bold text-rose-400 block truncate">Dexie.js IndexedDB</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Cloud Sync Engine</span>
              <span className="text-xs font-mono text-zinc-200 block truncate">Supabase Realtime + LWW</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Episode Analytics</span>
              <span className="text-xs font-mono text-zinc-200 block truncate">SeriesGraph Rating Matrix</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Native Android</span>
              <span className="text-xs font-mono text-emerald-400 block truncate">Capacitor 8 APK + PWA</span>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE SCREENSHOT GALLERY */}
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
              <Layout className="w-4 h-4" />
              <span>Production Interface Gallery</span>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Screenshot {selectedScreenshotIndex + 1} of {watchvaultScreenshots.length}
            </span>
          </div>

          <div
            onClick={() => setLightboxOpen(true)}
            className="group cursor-pointer relative rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-rose-500/40"
          >
            {/* Mock Window Top Bar */}
            <div className="px-4 py-3 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <span className="ml-2 text-zinc-400 hidden sm:inline">watchvault.app/vault-command</span>
              </div>
              <span className="text-rose-400 font-mono font-medium text-xs flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Click to Expand Lightbox</span>
              </span>
            </div>

            {/* Display Image Box */}
            <div className="relative aspect-[16/10] bg-zinc-950 flex items-center justify-center p-4">
              <img
                src={watchvaultScreenshots[selectedScreenshotIndex]}
                alt={`WatchVault Screenshot ${selectedScreenshotIndex + 1}`}
                className="max-h-full max-w-full object-contain rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-4 py-2 rounded-xl bg-zinc-900/90 text-white font-medium text-xs border border-white/20 shadow-xl flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  Click to View Full-Res Lightbox
                </span>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="bg-zinc-900/90 border-t border-white/10 p-4 text-left">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">
                  {watchvaultScreenshotMetadata[selectedScreenshotIndex]?.title}
                </span>
              </h4>
              <p className="text-xs text-zinc-300 mt-1 font-normal leading-relaxed">
                {watchvaultScreenshotMetadata[selectedScreenshotIndex]?.description}
              </p>
            </div>
          </div>

          {/* Screenshot Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {watchvaultScreenshots.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScreenshotIndex(idx)}
                className={`px-2 py-2 rounded-xl border text-center transition-all text-xs font-mono cursor-pointer ${
                  selectedScreenshotIndex === idx
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold shadow-sm'
                    : 'bg-zinc-900/60 text-zinc-400 border-white/5 hover:border-white/15 hover:text-white'
                }`}
              >
                {idx === 0 ? "1. Discovery" :
                 idx === 1 ? "2. Details" :
                 idx === 2 ? "3. SeriesGraph" :
                 idx === 3 ? "4. Library" :
                 idx === 4 ? "5. Mobile" : "6. Cloud Sync"}
              </button>
            ))}
          </div>
        </div>

        {/* 3. EXECUTIVE SUMMARY & PROBLEM / SOLUTION */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>1. Executive Summary &amp; Design Rationale</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem Card */}
            <div className="p-6 rounded-2xl bg-red-950/15 border border-red-500/30 space-y-4">
              <div className="flex items-center gap-3 text-red-400 font-bold text-lg">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>The Problem in Existing Media Trackers</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Popular platforms like Letterboxd, IMDb, and TV Time suffer from intrusive ads, lack true offline access when traveling, clutter personal libraries with unwanted social feeds, and force mock or pre-seeded data onto new accounts. Furthermore, none provide integrated episode-by-episode rating heatmaps (SeriesGraph style) or private financial box-office analytics in a private vault.
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>The WatchVault Engineered Solution</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                WatchVault enforces a <strong className="text-emerald-300">strict zero-mock-data guarantee</strong>: your library starts completely pristine (0 items, 0 stats), and every metric is computed from authentic IndexedDB entries. Offline-first local storage via Dexie ensures sub-5ms queries with zero internet dependency, while a background Supabase sync engine resolves two-device sync with Last-Write-Wins and soft-deletion tombstones.
              </p>
            </div>
          </div>
        </div>

        {/* 4. SYSTEM ARCHITECTURE & FULL-STACK DATA FLOW */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>2. System Architecture &amp; Data Pipeline</span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">Full-Stack Data Flow &amp; Subsystem Architecture</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Subgraph 1: Discovery & TMDB Proxy */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Film className="w-4 h-4" />
                  <span>Discovery &amp; Metadata</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">TMDB API Proxy Cache</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">3-Day TTL Dexie Store</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Library Seed Recommender</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Debounced Multi-Search</li>
                </ul>
              </div>

              {/* Subgraph 2: Offline-First Dexie Storage */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Database className="w-4 h-4" />
                  <span>Offline Dexie Storage</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">WatchVaultDatabase (v2)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Compound Key Indexes</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Sub-5ms Live Queries</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Zero Mock Data Stores</li>
                </ul>
              </div>

              {/* Subgraph 3: Supabase Sync Engine */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <RefreshCw className="w-4 h-4" />
                  <span>Cloud Sync Engine</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Push Watermark Outbox</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Pull Cursor Synchronizer</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Last-Write-Wins (LWW)</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Tombstone Soft Deletions</li>
                </ul>
              </div>

              {/* Subgraph 4: SeriesGraph & UI Engine */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-sky-500/30 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Grid3X3 className="w-4 h-4" />
                  <span>SeriesGraph &amp; Mobile UI</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Rating Heatmap Matrix</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">High-Contrast Color Binning</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Capacitor 8 Android Shell</li>
                  <li className="p-2 rounded bg-zinc-900 border border-white/5">Haptic Touch Navigation</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* 5. CORE FEATURE DEEP DIVES */}
        <div className="space-y-8 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>3. Core Architectural Subsystems</span>
            </div>
            
            {/* Tabs */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'architecture' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Dexie Storage
              </button>
              <button
                onClick={() => setActiveTab('seriesgraph')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'seriesgraph' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                SeriesGraph Matrix
              </button>
              <button
                onClick={() => setActiveTab('sync')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'sync' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Cloud Sync
              </button>
              <button
                onClick={() => setActiveTab('discovery')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'discovery' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Discovery &amp; Financials
              </button>
              <button
                onClick={() => setActiveTab('mobile')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'mobile' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Android &amp; PWA
              </button>
            </div>
          </div>

          {/* Subsystem Details */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-6">
            
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Offline-First IndexedDB Architecture (Dexie.js)</h3>
                    <p className="text-xs text-zinc-400">Zero mock data, compound indices, and sub-5ms reactive live queries</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-amber-300">Client-Authoritative Truth</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      All UI reads, filters, sort orders, and watch statuses are executed locally against IndexedDB tables. The app functions seamlessly with zero latency and 100% functionality without internet.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-amber-300">Compound Query Indices</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Optimized indices such as <code className="text-zinc-200">[media_type+status]</code> and <code className="text-zinc-200">[library_item_id+season_number]</code> allow multi-thousand title collections to filter and sort within single-digit milliseconds.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-amber-300">Authentic Math &amp; Empty States</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Launches with genuine empty states rather than fake mock records. Statistics (runtime hours, rating distribution, genre percentages) are calculated dynamically from authentic user entries only.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seriesgraph' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Grid3X3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">SeriesGraph Episode Rating Heatmap &amp; Trendline Engine</h3>
                    <p className="text-xs text-zinc-400">Instant visual evaluation of TV series trajectory across all seasons</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-emerald-300">High-Contrast Color Binning</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Custom color tiers dynamically categorize episode scores: 9.0+ Masterpiece (Emerald), 8.0+ Great (Green), 7.0+ Good (Lime), 6.0+ Mixed (Amber), 5.0+ Subpar (Orange), and &lt;5.0 Weak (Rose).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-emerald-300">Season Averages &amp; Outliers</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Computes season averages side-by-side with individual episode cards, allowing viewers to instantly identify filler episodes, season peaks, and series finale drops.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-emerald-300">Interactive Trendline Graphs</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Generates dynamic SVG trajectory curves mapping episode scores from the series premiere to the finale, with interactive hover cards revealing title, air date, and vote counts.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sync' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Bidirectional Cloud Sync &amp; Conflict Resolution</h3>
                    <p className="text-xs text-zinc-400">Supabase Realtime, Last-Write-Wins, and tombstone deletion guarantees</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-rose-300">Outbox Watermark PUSH</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Local writes to Dexie trigger a debounced event (1500ms). The engine queries rows modified since <code className="text-zinc-200">sync_push_watermark</code> and upserts them to Supabase in batches of 200.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-rose-300">Cursor-Based PULL &amp; LWW</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Changes from other devices are downloaded using a high-watermark pull cursor with a 10s overlap window. Incoming records overwrite local rows only if the server timestamp is newer (Last-Write-Wins).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-rose-300">Tombstones Prevent Resurrection</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Deleting a title creates a tombstone (<code className="text-zinc-200">is_deleted: true</code>) that synchronizes to all paired devices before local cleanup, preventing deleted records from resurrecting.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'discovery' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Seed-Based Recommender &amp; Box-Office Financials</h3>
                    <p className="text-xs text-zinc-400">Algorithmic feeds derived from library taste seeds and theatrical profitability</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-sky-300">Library Seed Recommender</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Queries TMDB recommendations using randomly sampled high-interest seeds from the user's personal vault (favorites and 8+ rated titles), dynamically generating "Because you watched..." rows.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-sky-300">Theatrical Box Office ROI</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Applies the industry standard 2.5x theatrical multiplier rule against production budget to determine true break-even points, displaying net profit margins and commercial verdicts.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-sky-300">Random 'Dice Roll' Picker</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Features a smart dice roll modal that picks a random unwatched or planned title from the user's library with runtime and genre filtering to solve indecision.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mobile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Android Capacitor 8 Shell &amp; PWA Experience</h3>
                    <p className="text-xs text-zinc-400">Native mobile integration, safe-area support, and touch haptic feedback</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-purple-300">Capacitor 8 APK</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Packaged into a standalone Android APK (<code className="text-zinc-200">WatchVault.apk</code>) with native splash screen, hardware back button support, and safe-area notch insets.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-purple-300">PWA Offline Shell</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Equipped with a standard Web App Manifest and Service Worker caching the entire Next.js application shell, enabling installability on Chrome, Edge, and iOS Safari.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-purple-300">Bottom Navigation &amp; Haptics</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Ergonomic bottom navigation bar tailored for one-thumb mobile usage, combined with subtle haptic vibration triggers during rating clicks and dice rolls.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 6. INTERACTIVE CODE ARCHITECTURE VIEWER */}
        <div className="space-y-8 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>4. Production Source Implementation</span>
            </div>

            {/* Code Tab Switcher */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setActiveCodeSnippet('dexie')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCodeSnippet === 'dexie' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  DexieSchema.ts
                </button>
                <button
                  onClick={() => setActiveCodeSnippet('seriesgraph')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCodeSnippet === 'seriesgraph' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  SeriesGraph.ts
                </button>
                <button
                  onClick={() => setActiveCodeSnippet('sync')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCodeSnippet === 'sync' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  SyncEngineLWW.ts
                </button>
                <button
                  onClick={() => setActiveCodeSnippet('financials')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCodeSnippet === 'financials' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  FinancialROI.ts
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                title="Copy code snippet"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copiedCode ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-950 border border-white/10 p-6 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-white/5 pb-3 mb-4">
              <span className="text-rose-400">
                {activeCodeSnippet === 'dexie' ? "src/lib/db/index.ts (Dexie Database & Reentrancy Guard)" :
                 activeCodeSnippet === 'seriesgraph' ? "src/components/details/EpisodeTracker.tsx (High-Contrast Color Binning)" :
                 activeCodeSnippet === 'sync' ? "src/lib/sync/syncEngine.ts (Dual-Phase Push/Pull with LWW)" :
                 "src/lib/metadata/financials.ts (Theatrical 2.5x Break-Even Rule)"}
              </span>
              <span>TypeScript 5.8 • Strict Null Checks</span>
            </div>
            <pre className="font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed whitespace-pre selection:bg-rose-500/30">
              <code>{currentSnippetCode}</code>
            </pre>
          </div>
        </div>

        {/* 7. TECHNICAL CHALLENGES & ENGINEERED SOLUTIONS */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>5. Technical Challenges &amp; Engineered Solutions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Challenge 1 */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm">
                <RefreshCw className="w-4 h-4 shrink-0" />
                <h4>1. Infinite Sync Echo Loops</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Problem:</strong> Dexie database hooks listen to table modifications to schedule background push sync passes. When remote records were downloaded during pull sync, writing them to Dexie re-triggered the change hook, initiating an infinite upload/download loop.
              </p>
              <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                <strong>Solution:</strong>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Engineered a reentrancy-safe <code className="text-emerald-400 font-mono">runAsRemoteApply</code> function maintaining a depth counter (<code className="text-emerald-400 font-mono">remoteApplyDepth</code>). When &gt; 0, local change event emissions are completely suppressed.
                </p>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <h4>2. Cross-Device Data Resurrection</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Problem:</strong> When a user deleted a movie on desktop and later turned on their offline phone, a naive sync engine would see the movie exists on the phone and re-upload it to the cloud, resurrecting the deleted item.
              </p>
              <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                <strong>Solution:</strong>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Adopted soft-deletion tombstones (<code className="text-emerald-400 font-mono">is_deleted: true</code>, <code className="text-emerald-400 font-mono">deleted_at: timestamp</code>) with monotonic version increments. Deletions propagate as tombstones before physical purge.
                </p>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm">
                <Grid3X3 className="w-4 h-4 shrink-0" />
                <h4>3. Mobile Heatmap DOM Jitter</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Problem:</strong> Long-running television series (e.g. 10 seasons with 24 episodes each = 240+ cards) caused heavy re-renders and mobile horizontal scroll lag when switching between season tabs.
              </p>
              <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                <strong>Solution:</strong>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Memoized season ratings and pre-computed color bins into flat lookup arrays. Integrated pure CSS grid layout with memoized episode cells, maintaining solid 60fps scrolling on budget Android devices.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 8. MEASURABLE OUTCOMES & METRICS */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>6. Measurable Outcomes &amp; System Metrics</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono block">0</span>
              <span className="text-xs font-semibold text-rose-400 block">Mock Data Guarantee</span>
              <p className="text-[11px] text-zinc-400">
                100% genuine statistics calculated strictly from user IndexedDB collection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono block">&lt;5ms</span>
              <span className="text-xs font-semibold text-emerald-300 block">Read Latency</span>
              <p className="text-[11px] text-zinc-400">
                Instantaneous query execution across indexed local library tables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono block">100%</span>
              <span className="text-xs font-semibold text-rose-400 block">Offline Usability</span>
              <p className="text-[11px] text-zinc-400">
                Complete library browsing, rating editing, and episode checklists without Wi-Fi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono block">2-Way</span>
              <span className="text-xs font-semibold text-amber-300 block">Cloud Sync Engine</span>
              <p className="text-[11px] text-zinc-400">
                Supabase Realtime channels with Last-Write-Wins and soft deletion tombstones.
              </p>
            </div>
          </div>
        </div>

        {/* 9. BOTTOM CALL TO ACTION & GITHUB BADGE */}
        <div className="rounded-3xl bg-zinc-900/40 border border-rose-500/20 p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Exploration</span>
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore the WatchVault Source Code &amp; Implementation
            </h3>
            <p className="text-sm text-zinc-400">
              Inspect the Dexie database schemas, Supabase sync engine, and SeriesGraph heatmap visualizations on GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com/farhanfreak9137-ai/moviewatchlist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm transition-all shadow-lg shadow-rose-500/20 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white font-semibold text-sm transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-rose-400" />
              <span>Back to Portfolio Overview</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <ScreenshotLightbox
        isOpen={lightboxOpen}
        imageSrc={watchvaultScreenshots[selectedScreenshotIndex]}
        title={watchvaultScreenshotMetadata[selectedScreenshotIndex]?.title}
        description={watchvaultScreenshotMetadata[selectedScreenshotIndex]?.description}
        currentIndex={selectedScreenshotIndex}
        totalImages={watchvaultScreenshots.length}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setSelectedScreenshotIndex((selectedScreenshotIndex - 1 + watchvaultScreenshots.length) % watchvaultScreenshots.length)}
        onNext={() => setSelectedScreenshotIndex((selectedScreenshotIndex + 1) % watchvaultScreenshots.length)}
        projectTitle="WatchVault Platform"
      />

    </div>
  );
};
