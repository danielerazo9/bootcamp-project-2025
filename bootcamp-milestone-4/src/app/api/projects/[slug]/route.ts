// src/app/api/projects/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

export async function POST(req: NextRequest, context: any) {
  try {
    await connectDB();

    // Read slug from the dynamic route: /api/projects/[slug]
    const slug = context?.params?.slug as string;
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

    // Make sure comments is always an array
    if (!Array.isArray(project.comments)) {
      project.comments = [];
    }

    project.comments.push({
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date(),
    });

    await project.save();

    // Send back plain JSON comments (no Mongoose objects)
    const plainComments = project.comments.map((c: any) => ({
      _id: c._id?.toString?.() ?? "",
      name: c.name,
      text: c.text,
      createdAt: c.createdAt?.toISOString?.() ?? "",
    }));

    return NextResponse.json({ comments: plainComments }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/projects/[slug]", error);
    return NextResponse.json(
      { message: "Server error while saving project comment" },
      { status: 500 }
    );
  }
}
