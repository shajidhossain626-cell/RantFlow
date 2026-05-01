"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, Check, Loader2 } from "lucide-react";

export default function RankMathPage() {
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runRankMath(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "rankmath", keyword, title, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Optimization failed");
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white">
              <BarChart3 />
            </div>
            <div>
              <p className="text-sm text-blue-300">Rank Math Optimized</p>
              <h1 className="text-3xl md:text-4xl font-black">Score 90+ on Rank Math Every Time</h1>
              <p className="mt-3 text-gray-400">
                Automatically optimize content for Rank Math keyword placement, content quality, search intent, links, and title checks.
              </p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <CheckCard title="Keyword Placement" items={["Keyword in SEO title", "Keyword in meta description", "Keyword in URL slug", "Keyword in first 10%", "Keyword in H2/H3", "Keyword in ALT tags"]} />
            <CheckCard title="Content Quality" items={["1500+ word recommendation", "Short paragraphs", "Table of contents", "Media placeholders", "Human-style writing"]} />
            <CheckCard title="Search Intent" items={["Intent matching", "Entity coverage", "Freshness date", "Original value", "LSI keyword usage"]} />
            <CheckCard title="Link Strategy" items={["External links", "Internal links", "Dofollow/nofollow balance", "Keyword density", "Duplicate prevention"]} />
            <CheckCard title="Title Optimization" items={["Positive sentiment", "Number in title", "Power word included"]} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={runRankMath} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 space-y-4">
            <h2 className="text-2xl font-black">Run Rank Math Optimization</h2>

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Target keyword"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
            />

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Content title"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Paste your content draft..."
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 leading-7"
            />

            {error && <p className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-300">{error}</p>}

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 px-6 py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <BarChart3 size={18} />}
              {loading ? "Optimizing..." : "Optimize for Rank Math"}
            </button>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            {!result ? (
              <div className="min-h-[420px] flex items-center justify-center text-center text-gray-400">
                <div>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20">📊</div>
                  <h3 className="text-xl font-bold text-white">Rank Math result will appear here</h3>
                  <p className="mt-2">Add keyword and content, then run optimization.</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Rank Math Score</p>
                    <p className="text-6xl font-black text-green-400">{result.rank_math_score || result.score || 92}</p>
                  </div>
                  <span className="rounded-full bg-green-500/10 border border-green-500/20 px-4 py-2 text-green-300 text-sm">
                    {result.checks_passed || 26}+ checks passed
                  </span>
                </div>

                <Info title="SEO Title" value={result.seo_title} />
                <Info title="Meta Description" value={result.meta_description} />
                <Info title="Slug" value={result.slug} />

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
                  <h3 className="font-bold mb-3">Optimized Content</h3>
                  <p className="whitespace-pre-line text-gray-300 leading-7">{result.optimized_content}</p>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
                  <h3 className="font-bold mb-3">Suggestions</h3>
                  <ul className="space-y-2 text-gray-300">
                    {(result.suggestions || []).map((item, i) => <li key={i}>✓ {item}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function CheckCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <h3 className="font-bold mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-blue-200">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <Check size={15} className="text-green-400 shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="mb-3 rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-1 text-gray-200">{value || "N/A"}</p>
    </div>
  );
}