import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ date: -1 }); // newest first
    return NextResponse.json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
