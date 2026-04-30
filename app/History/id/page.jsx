import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HistoryDetailPage({ params }) {
  const item = await prisma.optimization.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    return (
      <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p>Optimization not found.</p>
          <Link href="/history" className="text-purple-400">
            Back to history
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/history" className="text-purple-400">
          ← Back to History
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-black">{item.keyword}</h1>
              <p className="text-gray-400 mt-1">
                {item.title || "Untitled content"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-green-400 text-5xl font-black">
                {item.score || 0}
              </p>
              <p className="text-gray-500 text-sm">SEO Score</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Info title="SEO Title" value={item.seoTitle} />
            <Info title="Meta Description" value={item.metaDescription} />
            <Info title="Slug" value={item.slug} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h2 className="text-xl font-bold mb-4">Optimized Content</h2>
            <p className="whitespace-pre-line leading-8 text-gray-300">
              {item.optimizedContent}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-2 text-gray-200">{value || "N/A"}</p>
    </div>
  );
}