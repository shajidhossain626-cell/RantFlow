import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Copy, FileText, Gauge } from "lucide-react";

export default async function HistoryDetailPage({ params }) {
  const { userId } = await auth();

  const item = await prisma.optimization.findFirst({
    where: {
      id: params.id,
      userId,
    },
  });

  if (!item) {
    return (
      <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p>Optimization not found or you do not have access.</p>
          <Link href="/history" className="text-purple-400">Back to history</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/history" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <ArrowLeft size={16} /> Back to History
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                <FileText size={16} /> Saved Optimization
              </div>
              <h1 className="text-4xl font-black md:text-5xl">{item.keyword}</h1>
              <p className="mt-3 text-gray-400">{item.title || "Untitled content"}</p>
            </div>

            <div className="min-w-[160px] rounded-[2rem] border border-green-500/20 bg-green-500/10 p-6 text-center">
              <Gauge className="mx-auto mb-2 text-green-300" />
              <p className="text-5xl font-black text-green-400">{item.score || 0}</p>
              <p className="mt-1 text-sm text-gray-400">SEO Score</p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <InfoCard title="SEO Title" value={item.seoTitle} />
            <InfoCard title="Meta Description" value={item.metaDescription} />
            <InfoCard title="URL Slug" value={item.slug} />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Optimized Content</h2>
              <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-gray-300">
                <Copy size={16} /> Copy coming soon
              </button>
            </div>

            <div className="max-h-[700px] overflow-y-auto rounded-2xl border border-white/10 bg-[#050814] p-5">
              <p className="whitespace-pre-line leading-8 text-gray-300">{item.optimizedContent}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-3 leading-7 text-gray-200">{value || "N/A"}</p>
    </div>
  );
}
