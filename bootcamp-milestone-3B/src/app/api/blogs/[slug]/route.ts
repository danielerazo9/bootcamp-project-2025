import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

// GET /api/blogs/:slug  -> return a single blog
export async function GET(
  _req: NextRequest,
  { params }: RouteParams
) {
  await connectDB();

  // ✅ unwrap the params promise
  const { slug } = await params;
  console.log("DEBUG /api/blogs/[slug] requestedSlug =", slug);

  try {
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      console.log(
        "DEBUG available slugs in DB =",
        await Blog.find().distinct("slug")
      );
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err) {
    console.error("Error in GET /api/blogs/[slug]", err);
    return NextResponse.json(
      { message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// POST /api/blogs/:slug  -> add a comment to that blog
export async function POST(
  req: NextRequest,
  { params }: RouteParams
) {
  await connectDB();

  const { slug } = await params; // ✅ unwrap again

  try {
    const { name, text } = await req.json();

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json(
        { message: "Name and comment are required" },
        { status: 400 }
      );
    }

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    blog.comments.push({
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date(),
    });

    await blog.save();

    // return the updated blog (with comments)
    return NextResponse.json(blog);
  } catch (err) {
    console.error("Error in POST /api/blogs/[slug]", err);
    return NextResponse.json(
      { message: "Failed to post comment" },
      { status: 500 }
    );
  }
}


