"use client";

import { useState } from "react";
import Link from "next/link";
import ResultPanel from "@/components/ResultPanel";
import { ArrowLeft, History, Sparkles, Zap } from "lucide-react";

export default function DashboardPage() {
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("Professional");
  const [contentType, setContentType] = useState("Blog Article");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function optimizeContent(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "hybrid",
          keyword,
          title,
          content,
          tone,
          contentType,
        }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Server returned non-JSON:", text);
        throw new Error("Server error. Check VS Code terminal for details.");
      }

      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 hover:bg-white/10">
              <ArrowLeft size={18} />
            </Link>
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black shadow-[0_0_30px_rgba(124,58,237,.45)]">
              RF
            </div>
            <div>
              <h1 className="font-black text-lg">RankForge AI</h1>
              <p className="text-xs text-gray-400">Hybrid SEO Optimizer</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/history" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10">
              <History size={16} /> History
            </Link>
            <button className="px-4 py-2 rounded-xl bg-purple-600 font-bold hover:bg-purple-500">Upgrade</button>
          </div>
        </div>

        <div className="mb-8 rounded-[2rem] border border-white/10 bg-gradient-to-r from-purple-600/15 to-blue-600/10 p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
            <Sparkles size={16} /> Version 1: Hybrid SEO Mode Active
          </div>
          <h2 className="mt-5 max-w-3xl text-4xl md:text-5xl font-black leading-tight">
            Create SEO-ready content with Hybrid AI optimization.
          </h2>
          <p className="mt-4 max-w-2xl text-gray-300">
            Paste your draft, set your keyword, and generate optimized content, metadata, score, and report. Mock mode can be used until OpenAI credits are added.
          </p>
        </div>

        <div className="grid lg:grid-cols-[.95fr_1.05fr] gap-6 items-start">
          <form onSubmit={optimizeContent} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-6">
            <div className="mb-6">
              <p className="text-sm font-bold text-purple-300">New Optimization</p>
              <h3 className="mt-2 text-3xl font-black">Optimize Content</h3>
              <p className="mt-2 text-sm text-gray-400">Hybrid SEO uses Rank Math + Yoast + NLP + HCU style signals.</p>
            </div>

            <div className="space-y-4">
              <Field label="Target Keyword">
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="best coffee makers for home" className="input-premium" required />
              </Field>

              <Field label="Content Title">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your article title" className="input-premium" />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Tone">
                  <select value={tone} onChange={(e) => setTone(e.target.value)} className="input-premium">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Expert</option>
                    <option>Persuasive</option>
                  </select>
                </Field>
                <Field label="Content Type">
                  <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="input-premium">
                    <option>Blog Article</option>
                    <option>Landing Page</option>
                    <option>Product Description</option>
                    <option>Service Page</option>
                  </select>
                </Field>
              </div>

              <Field label="Content Draft">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} placeholder="Paste your rough content here..." className="input-premium leading-7 resize-y" required />
              </Field>

              {error && <p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</p>}

              <button disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-black text-lg shadow-[0_0_30px_rgba(124,58,237,.35)] hover:scale-[1.01] transition disabled:opacity-60">
                {loading ? "Optimizing..." : "⚡ Optimize with Hybrid SEO"}
              </button>
            </div>
          </form>

          <div>
            <div className="mb-4 grid sm:grid-cols-3 gap-4">
              <Metric label="Estimated Score" value={result?.score || 92} color="text-green-400" />
              <Metric label="Mode" value="Hybrid" />
              <Metric label="Status" value={loading ? "Running" : result ? "Saved" : "Ready"} />
            </div>
            <ResultPanel result={result} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-300">{label}</span>
      {children}
    </label>
  );
}

function Metric({ label, value, color = "text-white" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className={`mt-2 text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}
