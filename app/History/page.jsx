import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Clock, FileText, Plus, Search, Sparkles } from "lucide-react";

export default async function HistoryPage() {
  const { userId } = await auth();

  const optimizations = await prisma.optimization.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <Link href="/dashboard" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black md:text-5xl">Optimization History</h1>
            <p className="mt-3 text-gray-400">Only your saved SEO optimization results are shown here.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-bold sm:inline-flex">
              <Plus size={18} /> New Optimization
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <Stat title="Total Optimizations" value={optimizations.length} />
          <Stat title="Average Score" value={getAverageScore(optimizations)} />
          <Stat title="Active Mode" value="Hybrid SEO" />
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Saved Results</h2>
              <p className="mt-1 text-sm text-gray-400">Click any item to view the full optimized content.</p>
            </div>
            <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-gray-400 md:flex">
              <Search size={17} />
              <span className="text-sm">Search coming soon</span>
            </div>
          </div>

          {optimizations.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-black/20 p-12 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/20">
                <Sparkles className="text-purple-300" />
              </div>
              <h3 className="text-2xl font-black">No history yet</h3>
              <p className="mt-2 text-gray-400">Create your first SEO optimization and it will appear here.</p>
              <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500">
                <Plus size={18} /> Create Optimization
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {optimizations.map((item) => (
                <div key={item.id} className="group rounded-3xl border border-white/10 bg-black/25 p-5 transition hover:border-purple-500/70 hover:bg-purple-500/[0.06]">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <Link href={`/history/${item.id}`} className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-300">
                          <FileText size={22} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black group-hover:text-purple-300">{item.keyword}</h3>
                          <p className="mt-1 text-gray-400">{item.title || "Untitled content"}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span className="rounded-full bg-white/5 px-3 py-1">{item.mode || "hybrid"}</span>
                            <span className="inline-flex items-center gap-1"><Clock size={13} />{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-4xl font-black text-green-400">{item.score || 0}</p>
                        <p className="text-xs text-gray-500">SEO Score</p>
                      </div>
                      <form action="/api/delete" method="POST">
                        <button
                          type="button"
                          onClick={async () => {
                            await fetch("/api/delete", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ id: item.id }),
                            });
                            location.reload();
                          }}
                          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
    </div>
  );
}

function getAverageScore(items) {
  if (!items.length) return 0;
  const total = items.reduce((sum, item) => sum + Number(item.score || 0), 0);
  return Math.round(total / items.length);
}
