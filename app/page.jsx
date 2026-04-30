'use client';

import { useState } from 'react';
import { ArrowRight, BarChart3, BrainCircuit, Crown, Loader2, ShieldCheck, Zap } from 'lucide-react';
import { seoModes } from '@/lib/modes';
import ModeCard from '@/components/ModeCard';
import ResultPanel from '@/components/ResultPanel';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState('hybrid');
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tone, setTone] = useState('Professional');
  const [contentType, setContentType] = useState('Blog Article');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

 async function optimizeContent(e) {
  e.preventDefault();

  // ✅ USAGE LIMIT (ADD THIS PART)
  const usage = Number(localStorage.getItem("usage") || 0);

  if (usage >= 100) {
    setError("Free limit reached. Upgrade to continue.");
    return;
  }

  localStorage.setItem("usage", usage + 1);

  // EXISTING CODE
  setError('');
  setLoading(true);
  setResult(null);

  try {
    const res = await fetch('/api/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: selectedMode, keyword, title, content, tone, contentType })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    if (data.status === 'coming_soon') throw new Error(data.message);

    setResult(data.result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
  return (
    
    <main className="min-h-screen gradient-bg">
      <nav className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="flex justify-end mb-6">
  <a
    href="/history"
    className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
  >
    History
  </a>
</div>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl premium-button flex items-center justify-center font-black text-white shadow-[0_0_30px_rgba(124,58,237,.35)]">RF</div>
          <div>
            <p className="font-black text-lg text-white">RankForge AI</p>
            <p className="text-xs text-slate-300">Premium AI SEO Writing Assistant</p>
          </div>
        </div>
        <a href="#optimizer" className="hidden sm:inline-flex rounded-full premium-button px-5 py-2 text-sm font-bold">Start Free</a>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pt-12 pb-10">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-100">
              <Crown size={16} className="text-gold" /> Version 1: Hybrid SEO Mode Active
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight leading-[1.03] text-white">
              Turn rough content into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-gold">SEO-ready articles</span>.
            </h1>
            <p className="mt-6 text-lg text-slate-200 leading-8 max-w-2xl">
              RankForge AI is built as a modular SEO SaaS. Hybrid SEO launches first, while Rank Math, Yoast, Semantic NLP, and HCU modes are ready to plug in later.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#optimizer" className="inline-flex items-center gap-2 rounded-2xl premium-button px-6 py-4 font-bold">
                Optimize Content <ArrowRight size={18} />
              </a>
              <a href="#modes" className="inline-flex items-center gap-2 rounded-2xl bg-white/8 border border-white/10 hover:bg-white/12 px-6 py-4 font-bold transition">
                View Modes
              </a>
            </div>
          </div>

          <div className="premium-card rounded-[2rem] p-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                ['76+', 'SEO Checks', BarChart3],
                ['5', 'Mode System', BrainCircuit],
                ['HCU', 'Ready Badge', ShieldCheck],
                ['AI', 'Rewrite Engine', Zap]
              ].map(([value, label, Icon]) => (
                <div key={label} className="rounded-3xl bg-slate-950/70 border border-white/10 p-5 shadow-[0_18px_40px_rgba(0,0,0,.22)]">
                  <Icon className="text-gold" />
                  <p className="mt-5 text-3xl font-black text-white">{value}</p>
                  <p className="text-sm text-slate-300">{label}</p>
                </div>
                
              ))}
            </div>
            <div className="mt-5 rounded-3xl bg-black/35 border border-white/10 p-5">
              <p className="text-sm text-slate-300">Current MVP Focus</p>
              <p className="mt-2 text-xl font-bold text-white">Hybrid SEO Optimizer</p>
              <p className="mt-2 text-sm text-slate-300 leading-6">One engine for content rewriting, SEO data, score cards, checklist reports, and suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="modes" className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-gold font-bold">Modular Mode System</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-white">Launch one mode now. Add the rest later.</h2>
          </div>
          <p className="text-slate-300 max-w-xl">The UI, API, and mode structure are already prepared for future SEO modes.</p>
        </div>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {seoModes.map((mode) => (
            <ModeCard key={mode.id} mode={mode} selected={selectedMode === mode.id} onSelect={setSelectedMode} />
          ))}
        </div>
      </section>

      <section id="optimizer" className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-6 items-start">
          <form onSubmit={optimizeContent} className="premium-card rounded-[2rem] p-6 lg:sticky lg:top-6">
            <p className="text-gold font-bold">Hybrid SEO Optimizer</p>
            <h2 className="mt-2 text-3xl font-black text-white">Create a New Optimization</h2>
            <p className="mt-2 text-slate-300">Paste your draft and target keyword. Add your AI API key when you are ready for real AI results.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-slate-200">Target Keyword</label>
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="best running shoes" className="mt-2 w-full rounded-2xl input-premium px-4 py-3" />
              </div>
              <div>
                <label className="text-sm text-slate-200">Content Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your article title" className="mt-2 w-full rounded-2xl input-premium px-4 py-3" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-200">Tone</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} className="mt-2 w-full rounded-2xl input-premium px-4 py-3">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Expert</option>
                    <option>Persuasive</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-200">Content Type</label>
                  <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="mt-2 w-full rounded-2xl input-premium px-4 py-3">
                    <option>Blog Article</option>
                    <option>Landing Page</option>
                    <option>Product Description</option>
                    <option>Service Page</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-200">Content Draft</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} placeholder="Paste your content draft here..." className="mt-2 w-full rounded-2xl input-premium px-4 py-3 leading-7" />
              </div>
              {error && <p className="rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 p-4 text-sm">{error}</p>}
              <button disabled={loading} className="w-full rounded-2xl premium-button px-6 py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                {loading ? 'Optimizing...' : 'Optimize with Hybrid SEO'}
              </button>
            </div>
          </form>

          <ResultPanel result={result} />
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-400">
        RankForge AI MVP — built for future Rank Math, Yoast, NLP, and HCU mode expansion.
      </footer>
    </main>
  );
}
