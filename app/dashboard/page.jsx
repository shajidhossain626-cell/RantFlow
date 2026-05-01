"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold">
              RF
            </div>
            <div>
              <h1 className="font-bold text-lg">RankForge AI</h1>
              <p className="text-xs text-gray-400">SEO Optimization Dashboard</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/history"
              className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10"
            >
              History
            </Link>

            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-purple-600"
            >
              Home
            </Link>
          </div>
        </div>

        {/* TITLE */}
        <div className="mb-10">
          <h2 className="text-4xl font-black">
            Choose Your <span className="text-purple-400">SEO Mode</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Select the optimization strategy based on your goal.
          </p>
        </div>

        {/* MODES GRID */}

        <Link
  href="/yoast"
  className="block rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-orange-500 transition"
>
  <div className="text-3xl mb-4">🎯</div>
  <p className="text-green-400 text-sm mb-2">Active</p>
  <h3 className="text-xl font-black">Yoast SEO Optimized</h3>
  <p className="mt-3 text-gray-400 text-sm">
    Get green lights for Yoast keyphrase usage, readability, structure, links, images, and meta checks.
  </p>
</Link>
        <div className="grid md:grid-cols-2 gap-6">
          <Link
  href="/rank-math"
  className="block rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-green-500 transition"
>
  <div className="text-3xl mb-4">📊</div>
  <p className="text-green-400 text-sm mb-2">Active</p>
  <h3 className="text-xl font-black">Rank Math Optimized</h3>
  <p className="mt-3 text-gray-400 text-sm">
    Optimize content to pass Rank Math keyword placement, content quality, link strategy, and title checks.
  </p>
</Link>

          {/* HYBRID MODE */}
          <Link
            href="/hybrid"
            className="block rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-purple-500 transition"
          >
            <div className="text-3xl mb-4">⚡</div>

            <p className="text-green-400 text-sm mb-2">Active</p>

            <h3 className="text-xl font-black">Hybrid SEO</h3>

            <p className="mt-3 text-gray-400 text-sm">
              Combines keyword density, on-page SEO, meta optimization, and readability into one powerful score.
            </p>
          </Link>

          {/* SEMANTIC NLP MODE */}
          <Link
            href="/semantic-nlp"
            className="block rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-purple-500 transition"
          >
            <div className="text-3xl mb-4">🧠</div>

            <p className="text-green-400 text-sm mb-2">Active</p>

            <h3 className="text-xl font-black">Semantic NLP SEO</h3>

            <p className="mt-3 text-gray-400 text-sm">
              Uses NLP to extract entities, topic clusters, LSI keywords, and optimize content based on how Google understands meaning.
            </p>
          </Link>

          {/* RANK MATH */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 opacity-50">
            <div className="text-3xl mb-4">📐</div>

            <p className="text-yellow-400 text-sm mb-2">Coming Soon</p>

            <h3 className="text-xl font-black">Rank Math Mode</h3>

            <p className="mt-3 text-gray-500 text-sm">
              Simulates Rank Math SEO scoring and recommendations.
            </p>
          </div>

          {/* YOAST */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 opacity-50">
            <div className="text-3xl mb-4">🟢</div>

            <p className="text-yellow-400 text-sm mb-2">Coming Soon</p>

            <h3 className="text-xl font-black">Yoast SEO Mode</h3>

            <p className="mt-3 text-gray-500 text-sm">
              Optimize content based on Yoast readability and SEO checks.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}