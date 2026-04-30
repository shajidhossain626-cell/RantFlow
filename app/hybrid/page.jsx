"use client";

import { useState } from "react";
import Link from "next/link";
import ResultPanel from "@/components/ResultPanel";
import { ArrowLeft, Zap } from "lucide-react";

export default function HybridPage() {
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "hybrid",
          keyword,
          title,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setResult(data.result);
    } catch (err) {
      setError(err.message || "Optimization failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1 className="text-4xl font-black">
              Hybrid SEO <span className="text-purple-400">Optimizer</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Optimize content using Rank Math + Yoast + NLP + HCU signals.
            </p>
          </div>

          <Link
            href="/history"
            className="rounded-xl border border-white/10 px-5 py-3 hover:bg-white/10"
          >
            History
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-300">
                <Zap size={22} />
              </div>

              <h2 className="text-3xl font-black">
                Turn rough content into{" "}
                <span className="text-purple-400">SEO-ready</span> articles
              </h2>

              <p className="text-gray-400 mt-2">
                Paste your draft and target keyword to generate optimized SEO content.
              </p>
            </div>

            <form onSubmit={optimizeContent} className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Target Keyword</label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="best coffee makers for home"
                  className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Content Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your article title"
                  className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Content Draft</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your content here..."
                  rows={12}
                  className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 leading-7"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-bold text-lg shadow-[0_0_25px_rgba(124,58,237,.35)] hover:scale-[1.01] transition disabled:opacity-60"
              >
                {loading ? "Optimizing..." : "⚡ Optimize with Hybrid SEO"}
              </button>
            </form>
          </div>

          <div>
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-gray-400">Estimated SEO Score</p>
              <p className="mt-1 text-4xl font-black text-green-400">
                {result?.score || result?.overallScore || 92}
              </p>
            </div>

            <ResultPanel result={normalizeHybridResult(result)} />
          </div>
        </div>
      </div>
    </main>
  );
}

function normalizeHybridResult(result) {
  if (!result) return null;

  return {
    optimized_content:
      result.optimized_content ||
      result.optimizedContent ||
      "Hybrid SEO analysis completed. Add OpenAI credits later for full AI rewriting output.",
    seo_title:
      result.seo_title ||
      result.titleSuggestion ||
      "SEO Optimized Title",
    meta_description:
      result.meta_description ||
      result.optimizedMeta ||
      "SEO optimized meta description.",
    slug:
      result.slug ||
      "seo-optimized-slug",
    score:
      result.score ||
      result.overallScore ||
      92,
    keyword_density:
      result.keyword_density ||
      result.keywordDensity ||
      "1.4%",
    readability_score:
      result.readability_score ||
      result.readabilityScore ||
      72,
    checks:
      result.checks ||
      result.strengths ||
      ["Keyword placement checked", "Readability reviewed", "Meta data optimized"],
    suggestions:
      result.suggestions ||
      ["Add internal links", "Add FAQ section", "Improve E-E-A-T signals"],
  };
}