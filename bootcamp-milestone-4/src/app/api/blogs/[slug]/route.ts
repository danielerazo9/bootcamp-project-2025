// app/api/blogs/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { slug } = await params;
    console.log("API POST /api/blogs slug =", slug);

    const { name, text } = await req.json();

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json(
        { message: "Name and comment are required" },
        { status: 400 }
      );
    }

    // 🔹 Push the comment without using blog.save()
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        $push: {
          comments: {
            name: name.trim(),
            text: text.trim(),
            createdAt: new Date(),
          },
        },
      },
      {
        new: true,          // return the updated document
        runValidators: false, // extra safety: don't validate whole blog
      }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    // return updated blog (including comments)
    return NextResponse.json(updatedBlog);
  } catch (err) {
    console.error("Error in POST /api/blogs/[slug]", err);
    return NextResponse.json(
      { message: "Something went wrong on the server" },
      { status: 500 }
    );
  }
}







