import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import BlogModel from "@/database/blogSchema";

type RouteParams = {
  slug: string;
};

// Next 15+ passes `params` as a *Promise*, so we have to `await` it
export async function GET(
  req: NextRequest,
  context: { params: Promise<RouteParams> }
) {
  await connectDB();

  // unwrap the Promise and grab the slug
  const { slug: rawSlug } = await context.params;
  const slug = decodeURIComponent(rawSlug ?? "").trim();

  try {
    // Get ALL blogs
    const allBlogs = await BlogModel.find().lean();

    // Try to match by slug (plain string compare)
    const blog = allBlogs.find((b: any) => (b.slug ?? "").trim() === slug);

    if (!blog) {
      // helpful debug info
      return NextResponse.json(
        {
          message: "Blog not found",
          slugFromUrl: slug,
          allSlugsInDB: allBlogs.map((b: any) => (b.slug ?? "").trim()),
        },
        { status: 404 }
      );
    }

    // Success
    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    console.error("Error in GET /api/blogs/[slug]:", err);
    return NextResponse.json(
      { message: "Server error while fetching blog" },
      { status: 500 }
    );
  }
}
