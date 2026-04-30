import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId } = await auth();
    const { id } = await req.json();

    await prisma.optimization.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
