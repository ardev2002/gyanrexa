import { NextResponse } from "next/server";
import { getPostsWithSections } from "@/utils/lib/getPosts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nextToken = searchParams.get("nextToken") || undefined;

  try {
    const { posts, nextToken: newToken } = await getPostsWithSections(
      10,
      nextToken
    );

    return NextResponse.json({ posts, nextToken: newToken });
  } catch (err) {
    console.error("DynamoDB Fetch Error:", err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}