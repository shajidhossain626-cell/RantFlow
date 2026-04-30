"use client";

import { useState } from "react";
import {
  Brain,
  Zap,
  Target,
  Layers,
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  BarChart3,
  BookOpen,
  Shield,
} from "lucide-react";
import Link from "next/link";

// ─── Score Ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 120, label }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color =
    score >= 80 ? "#22c55e" : score >= 60 ? "#f5c451" : score >= 40 ? "#f97316" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1a1a2e" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <text x="50" y="46" textAnchor="middle" fill={color} fontSize="20" fontWeight="700" fontFamily="monospace">
          {score}
        </text>
        <text x="50" y="62" textAnchor="middle" fill="#6b7280" fontSize="10">
          /100
        </text>
      </svg>
      {label && <span className="text-xs text-gray-400 text-center">{label}</span>}
    </div>
  );
}

// ─── Mini Bar ──────────────────────────────────────────────────────────────────
function MiniBar({ value, label, color = "#f5c451" }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5">
        <div
          className="h-1.5 rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Priority Badge ────────────────────────────────────────────────────────────
function PriorityBadge({ priority }) {
  const styles = {
    high: "bg-red-500/15 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    low: "bg-green-500/15 text-green-400 border-green-500/30",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${styles[priority]}`}>
      {priority}
    </span>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SemanticNLPPage() {
  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");
  const [intent, setIntent] = useState("informational");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMock, setIsMock] = useState(false);

  async function handleAnalyze() {
    if (!keyword.trim() || !content.trim()) {
      setError("Please enter both a target keyword and your content.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "semantic-nlp", keyword, content, intent }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
      setIsMock(data.mock);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const gradeColor = (g) => {
    if (!g) return "#f5c451";
    if (g.startsWith("A")) return "#22c55e";
    if (g.startsWith("B")) return "#f5c451";
    if (g.startsWith("C")) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="min-h-screen bg-ink text-white" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors">
              <ArrowLeft size={14} />
              Back
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">RankForge AI</p>
                <h1 className="text-sm font-semibold text-white leading-tight">Semantic NLP SEO</h1>
              </div>
            </div>
          </div>
          <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2.5 py-1 rounded-full font-semibold uppercase tracking-widest">
            Mode Active
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">

        {/* Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400">
            <Brain size={12} className="text-gold" />
            Powered by NLP + Entity Analysis + E-E-A-T Scoring
          </div>
          <h2 className="text-4xl font-bold tracking-tight">
            Understand Your Content{" "}
            <span className="text-gold">Like Google Does</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Go beyond keywords. Extract entities, map topic clusters, score semantic depth, and identify the NLP gaps keeping your content off page one.
          </p>
        </div>

        {/* Input Panel */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Keyword */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Target size={11} />
                Target Keyword / Topic
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. semantic SEO strategy"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 transition-colors"
              />
            </div>
            {/* Intent */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Search size={11} />
                Search Intent
              </label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/40 transition-colors appearance-none"
              >
                <option value="informational">Informational — Learn about a topic</option>
                <option value="navigational">Navigational — Find a specific page</option>
                <option value="transactional">Transactional — Complete a purchase/action</option>
                <option value="commercial">Commercial — Compare before buying</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen size={11} />
              Content to Analyze
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your article, blog post, or page content here. Minimum 100 words recommended for accurate NLP analysis."
              rows={8}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 transition-colors resize-none leading-relaxed"
            />
            <p className="text-[11px] text-gray-600 text-right">{content.trim().split(/\s+/).filter(Boolean).length} words</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
              <AlertTriangle size={14} />
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gold text-ink font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full" />
                Running NLP Analysis…
              </>
            ) : (
              <>
                <Brain size={15} />
                Analyze Semantic Depth
              </>
            )}
          </button>
        </div>

        {/* ── Results ── */}
        {result && (
          <div className="space-y-8 animate-fade-in">

            {/* Mock banner */}
            {isMock && (
              <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-sm text-yellow-400">
                <Sparkles size={13} />
                Demo mode — add your OpenAI API key to <code className="bg-black/30 px-1 rounded">.env</code> for real NLP analysis.
              </div>
            )}

            {/* Overview Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Semantic Score */}
              <div className="col-span-2 md:col-span-1 bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col items-center justify-center gap-3">
                <ScoreRing score={result.semanticScore} />
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Semantic Score</p>
                  <p className="font-bold text-2xl" style={{ color: gradeColor(result.grade) }}>{result.grade}</p>
                </div>
              </div>

              {/* Intent Match */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Search size={12} className="text-gold" />
                  Intent Match
                </div>
                <p className="text-3xl font-bold text-white">{result.searchIntent?.intentMatch}<span className="text-base text-gray-500">/100</span></p>
                <p className="text-xs text-gray-500 capitalize">{result.searchIntent?.detected} intent</p>
              </div>

              {/* Content Depth */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Layers size={12} className="text-gold" />
                  Content Depth
                </div>
                <p className="text-3xl font-bold text-white">{result.contentDepth?.score}<span className="text-base text-gray-500">/100</span></p>
                <p className="text-xs text-gray-500 capitalize">{result.contentDepth?.assessment} · {result.contentDepth?.wordCount} words</p>
              </div>

              {/* E-E-A-T */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Shield size={12} className="text-gold" />
                  E-E-A-T Overall
                </div>
                <p className="text-3xl font-bold text-white">{result.eeatSignals?.overallEEAT}<span className="text-base text-gray-500">/100</span></p>
                <p className="text-xs text-gray-500">{result.contentDepth?.uniqueConceptCount} unique concepts</p>
              </div>
            </div>

            {/* Row 2: Entities + LSI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Entities */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Brain size={14} className="text-gold" />
                  Detected Entities
                </h3>
                <div className="space-y-3">
                  {result.entities?.map((e, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-white font-medium truncate">{e.name}</span>
                          <span className="text-[9px] bg-white/5 text-gray-500 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">{e.type}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5">
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${e.prominence}%`,
                              background: e.seoValue === "high" ? "#22c55e" : e.seoValue === "medium" ? "#f5c451" : "#6b7280"
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-xs shrink-0" style={{ color: e.seoValue === "high" ? "#22c55e" : e.seoValue === "medium" ? "#f5c451" : "#6b7280" }}>
                        {e.seoValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LSI Keywords */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp size={14} className="text-gold" />
                  LSI Keyword Coverage
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Detected ✓</p>
                    <div className="flex flex-wrap gap-2">
                      {result.lsiKeywords?.detected?.map((kw, i) => (
                        <span key={i} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Missing — Add These</p>
                    <div className="flex flex-wrap gap-2">
                      {result.lsiKeywords?.missing?.map((kw, i) => (
                        <span key={i} className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{result.lsiKeywords?.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Row 3: Topic Clusters + E-E-A-T bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Topic Clusters */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <BarChart3 size={14} className="text-gold" />
                  Topic Cluster Coverage
                </h3>
                <div className="space-y-5">
                  {result.topicClusters?.map((tc, i) => (
                    <div key={i} className="space-y-2">
                      <MiniBar value={tc.coverage} label={tc.cluster} />
                      {tc.missingSubtopics?.length > 0 && (
                        <div className="pl-2 border-l border-white/5 space-y-1">
                          {tc.missingSubtopics.map((s, j) => (
                            <p key={j} className="text-[11px] text-gray-600 flex items-center gap-1.5">
                              <span className="text-red-500">↳</span> missing: {s}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* E-E-A-T breakdown */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Shield size={14} className="text-gold" />
                  E-E-A-T Signal Breakdown
                </h3>
                <div className="space-y-4">
                  <MiniBar value={result.eeatSignals?.experience} label="Experience" color="#a78bfa" />
                  <MiniBar value={result.eeatSignals?.expertise} label="Expertise" color="#60a5fa" />
                  <MiniBar value={result.eeatSignals?.authoritativeness} label="Authoritativeness" color="#34d399" />
                  <MiniBar value={result.eeatSignals?.trustworthiness} label="Trustworthiness" color="#f5c451" />
                </div>
                {result.eeatSignals?.improvements?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {result.eeatSignals.improvements.map((imp, i) => (
                      <p key={i} className="text-xs text-gray-500 flex items-start gap-2">
                        <AlertTriangle size={11} className="text-yellow-500 mt-0.5 shrink-0" />
                        {imp}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Semantic Gaps */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle size={14} className="text-gold" />
                Semantic Gaps Detected
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {result.semanticGaps?.map((gap, i) => (
                  <div key={i} className="bg-red-500/5 border border-red-500/15 rounded-xl p-4 text-sm text-gray-400 leading-relaxed">
                    <span className="text-red-400 font-semibold block mb-1">Gap {i + 1}</span>
                    {gap}
                  </div>
                ))}
              </div>
            </div>

            {/* Optimization Actions */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Zap size={14} className="text-gold" />
                Optimization Action Plan
              </h3>
              <div className="space-y-3">
                {result.optimizationActions?.map((action, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-gold/20 transition-colors">
                    <PriorityBadge priority={action.priority} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white leading-relaxed">{action.action}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <TrendingUp size={10} className="text-green-400" />
                        {action.impact}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-gray-600 shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Intent Recommendation */}
            {result.searchIntent?.recommendation && (
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-blue-400">
                  <Search size={14} />
                  Search Intent Recommendation
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{result.searchIntent.recommendation}</p>
              </div>
            )}

            {/* Rewritten Intro */}
            {result.rewrittenIntro && (
              <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-gold">
                  <Sparkles size={14} />
                  AI-Rewritten Intro (Semantically Enriched)
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed italic">{result.rewrittenIntro}</p>
                <p className="text-[11px] text-gray-600">Replace your opening paragraph with this version for improved entity density and semantic clarity.</p>
              </div>
            )}

            {/* Re-analyze */}
            <div className="text-center pt-4">
              <button
                onClick={() => { setResult(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-sm text-gray-500 hover:text-gold transition-colors flex items-center gap-1.5 mx-auto"
              >
                <ArrowLeft size={13} />
                Analyze different content
              </button>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease forwards; }
        select option { background: #0f0f1a; color: white; }
      `}</style>
    </div>
  );
}
