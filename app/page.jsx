import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, Crown, FileText, Gauge, History, Layers, ShieldCheck, Sparkles, Zap } from "lucide-react";

const modes = [
  {
    title: "Hybrid SEO Optimizer",
    status: "Active",
    checks: "76+ checks",
    desc: "Rank Math + Yoast + NLP + HCU signals in one workflow.",
  },
  {
    title: "Rank Math Optimizer",
    status: "Coming Soon",
    checks: "26 checks",
    desc: "Keyword placement, content quality, links, title and metadata.",
  },
  {
    title: "Yoast SEO Optimizer",
    status: "Coming Soon",
    checks: "50+ checks",
    desc: "Readability, structure, keyphrase distribution and green-light checks.",
  },
  {
    title: "Semantic NLP SEO",
    status: "Coming Soon",
    checks: "12-step NLP",
    desc: "Entity mapping, content gaps, TF-IDF terms and snippet formatting.",
  },
  {
    title: "HCU Optimizer",
    status: "Coming Soon",
    checks: "Helpful Content",
    desc: "Google Helpful Content quality, experience, E-E-A-T and originality signals.",
  },
];

const features = [
  [Gauge, "SEO Scoring", "Instant score cards for optimized content quality."],
  [FileText, "Content Rewrite", "Turn rough drafts into cleaner, structured SEO-ready articles."],
  [Layers, "Modular Modes", "Launch Hybrid now and add Rank Math, Yoast, NLP, and HCU later."],
  [History, "Saved History", "Every optimization can be saved and reviewed from your dashboard."],
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050814] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,.25),transparent_35%),radial-gradient(circle_at_top_right,rgba(37,99,235,.18),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black shadow-[0_0_30px_rgba(124,58,237,.45)]">
              RF
            </div>
            <div>
              <p className="font-black text-lg">RankForge AI</p>
              <p className="text-xs text-gray-400">Premium AI SEO Writing Assistant</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/history" className="hidden sm:inline-flex rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/10">
              History
            </Link>
            <Link href="/dashboard" className="rounded-xl bg-white text-[#050814] px-4 py-2 text-sm font-bold hover:bg-gray-200">
              Open App
            </Link>
          </div>
        </nav>

        <section className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center pt-20 pb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
              <Crown size={16} /> Version 1: Hybrid SEO Mode Active
            </div>
            <a
  href="/semantic-nlp"
  className="block rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-purple-500 transition"
>
  <div className="text-3xl mb-4">🧠</div>
  <p className="text-sm text-green-400 mb-2">Active</p>
  <h3 className="text-xl font-black">Semantic NLP SEO</h3>
  <p className="mt-3 text-gray-400 text-sm">
    Extract entities, topic clusters, LSI keywords, E-E-A-T signals, and semantic gaps.
  </p>
</a>

            <h1 className="mt-7 text-5xl md:text-7xl font-black tracking-tight leading-[1.03]">
              Build SEO-ready content with an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-400">AI writing assistant</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              RankForge AI helps bloggers, agencies, and businesses turn rough drafts into optimized content with Hybrid SEO checks inspired by Rank Math, Yoast, Semantic NLP, and Google Helpful Content signals.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-bold shadow-[0_0_35px_rgba(124,58,237,.4)] hover:scale-[1.02] transition">
                Start Optimizing <ArrowRight size={18} />
              </Link>
              <a href="#modes" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold hover:bg-white/10">
                View Modes
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <div className="grid grid-cols-2 gap-4">
              <HeroStat icon={BarChart3} value="76+" label="SEO Checks" />
              <HeroStat icon={BrainCircuit} value="5" label="Mode System" />
              <HeroStat icon={ShieldCheck} value="HCU" label="Ready Badge" />
              <HeroStat icon={Zap} value="AI" label="Rewrite Engine" />
            </div>
            <div className="mt-5 rounded-3xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-gray-400">Current MVP Focus</p>
              <h3 className="mt-2 text-2xl font-black">Hybrid SEO Optimizer</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                One active engine for content rewriting, SEO metadata, score cards, reports, saved history, and future mode expansion.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mb-8 max-w-2xl">
            <p className="font-bold text-purple-300">Why RankForge AI</p>
            <h2 className="mt-2 text-4xl font-black">Everything your first SEO SaaS needs.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(([Icon, title, desc]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-purple-500/50 transition">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="modes" className="py-14">
          <div className="mb-8 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="font-bold text-purple-300">Modular Mode System</p>
              <h2 className="mt-2 text-4xl font-black">Launch one mode now. Add the rest later.</h2>
            </div>
            <p className="max-w-xl text-gray-400">The platform is structured so Rank Math, Yoast, NLP, and HCU modes can be plugged in as separate engines later.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {modes.map((mode) => (
              <div key={mode.title} className={`rounded-3xl border p-5 ${mode.status === "Active" ? "border-purple-500/50 bg-purple-600/10" : "border-white/10 bg-white/[0.04]"}`}>
                <div className="mb-5 flex items-center justify-between">
                  <Sparkles className={mode.status === "Active" ? "text-purple-300" : "text-gray-500"} />
                  <span className={`rounded-full px-3 py-1 text-xs ${mode.status === "Active" ? "bg-green-500/15 text-green-300" : "bg-white/5 text-gray-400"}`}>{mode.status}</span>
                </div>
                <h3 className="font-black text-lg">{mode.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{mode.desc}</p>
                <p className="mt-4 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">{mode.checks}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black">Ready to test the optimizer?</h2>
              <p className="mt-2 text-gray-300">Open the dashboard, create a mock optimization, and save it to Neon.</p>
            </div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-[#050814] hover:bg-gray-200">
              Open Dashboard <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <footer className="py-8 text-sm text-gray-500">
          RankForge AI MVP — built for future Rank Math, Yoast, NLP, and HCU mode expansion.
        </footer>
      </div>
    </main>
  );
}

function HeroStat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
      <Icon className="text-purple-300" />
      <p className="mt-5 text-4xl font-black">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}
