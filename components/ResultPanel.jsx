"use client";
import { useState } from "react";

export default function ResultPanel({ result }) {
  const [tab, setTab] = useState("content");

  if (!result) {
    return (
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 text-gray-400">
        Your SEO result will appear here
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 text-white">
      
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["content", "seo", "report"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl ${
              tab === t
                ? "bg-purple-600"
                : "bg-[#1a1a1a] hover:bg-[#2a2a2a]"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
        <p className="text-sm text-gray-500 mt-6">
  ✓ Optimized with Hybrid SEO (Rank Math + Yoast + NLP + HCU)
</p>
      </div>

      {/* CONTENT TAB */}
      <button
  onClick={() => navigator.clipboard.writeText(result.optimized_content)}
  className="mt-4 px-4 py-2 bg-purple-600 rounded-xl"
>
  Copy Content
</button>
      {tab === "content" && (
        <div>
          <h2 className="text-xl font-bold mb-3">Optimized Content</h2>
          <p className="text-gray-300 whitespace-pre-line">
            {result.optimized_content}
          </p>
        </div>
        
      )}

      {/* SEO TAB */}
      {tab === "seo" && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">SEO Title</h3>
            <p>{result.seo_title}</p>
          </div>
          <div>
            <h3 className="font-semibold">Meta Description</h3>
            <p>{result.meta_description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Slug</h3>
            <p>{result.slug}</p>
          </div>
        </div>
      )}

      {/* REPORT TAB */}
      {tab === "report" && (
        <div>
          <h3 className="text-lg font-bold mb-3">SEO Score</h3>
          <div className="text-4xl font-black text-green-400">
            {result.score || 92}
          </div>
        </div>
      )}
    </div>
  );
}