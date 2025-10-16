import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    const post = await prisma.post.create({
      data: { title, content, published: true },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = parseInt(searchParams.get("limit") || "10", 10);

    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
    const limitUnclamped = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 10;
    const limit = Math.min(50, Math.max(1, limitUnclamped));
    const skip = (page - 1) * limit;

    const [total, posts] = await Promise.all([
      prisma.post.count(),
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { comments: true } },
          author: { select: { id: true, name: true, image: true } },
        },
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));
    const hasMore = page < totalPages;

    const payload = { page, limit, total, totalPages, hasMore, items: posts };
    return NextResponse.json(payload, {
      headers: {
        // Cache at the CDN for 60s; allow stale for 5 minutes
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
