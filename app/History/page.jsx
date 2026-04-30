import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">History Page Working</h1>
      <p className="mt-4 text-gray-400">Your history route is now active.</p>
    </main>
  );
}
export default async function HistoryPage() {
  const optimizations = await prisma.optimization.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black">Optimization History</h1>
            <p className="text-gray-400 mt-2">
              View all saved SEO optimization results.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-500"
          >
            New Optimization
          </Link>
        </div>

        {optimizations.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-gray-400">
            No optimization history yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {optimizations.map((item) => (
              <Link
                key={item.id}
                href={`/history/${item.id}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-purple-500 transition"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      {item.keyword}
                    </h2>
                    <p className="text-gray-400 mt-1">
                      {item.title || "Untitled content"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-green-400 text-2xl font-black">
                      {item.score || 0}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}