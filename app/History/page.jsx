import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";

export default async function HistoryPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="min-h-screen bg-[#050814] text-white p-10">
        <h1 className="text-3xl font-bold">Please login first</h1>
        <Link href="/login" className="text-purple-400">
          Go to login
        </Link>
      </main>
    );
  }

  const optimizations = await prisma.optimization.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#050814] text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-sm text-purple-400">
              ← Back to Dashboard
            </Link>
            <h1 className="mt-4 text-4xl font-black">Optimization History</h1>
            <p className="mt-2 text-gray-400">
              View your saved SEO optimization results.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-xl bg-purple-600 px-5 py-3 font-semibold"
            >
              New Optimization
            </Link>
            <UserButton />
          </div>
        </div>

        {optimizations.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-gray-400">
            No history yet. Create one optimization first.
          </div>
        ) : (
          <div className="grid gap-4">
            {optimizations.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex items-center justify-between gap-5">
                  <Link href={`/history/${item.id}`} className="flex-1">
                    <p className="text-sm text-purple-300">
                      {item.mode || "hybrid"}
                    </p>
                    <h2 className="mt-1 text-xl font-black">{item.keyword}</h2>
                    <p className="mt-1 text-gray-400">
                      {item.title || "Untitled content"}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </Link>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-4xl font-black text-green-400">
                        {item.score || 0}
                      </p>
                      <p className="text-xs text-gray-500">Score</p>
                    </div>

                    <DeleteButton id={item.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}