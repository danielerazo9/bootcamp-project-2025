import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { slug } = await context.params;
    console.log("API POST /api/projects slug =", slug);

    const { name, text } = await req.json();

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json(
        { message: "Name and comment are required" },
        { status: 400 }
      );
    }

    const project = await Project.findOne({ slug });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    project.comments.push({
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date(),
    });

    await project.save();

    // send back updated comments
    return NextResponse.json({ comments: project.comments });
  } catch (error) {
    console.error("Error in POST /api/projects/[slug]", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}



