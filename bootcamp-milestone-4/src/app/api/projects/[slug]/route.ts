// src/app/api/projects/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

type RouteParams = { slug: string };

interface RouteContext {
  // 👈 IMPORTANT: params is a *Promise* in Next 16 prod builds
  params: Promise<RouteParams>;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    // 👇 THIS is the key line – we must await context.params
    const { slug } = await context.params;
    console.log("API POST /api/projects/[slug] slug =", slug);

    const { name, text } = await req.json();

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json(
        { message: "Name and comment are required" },
        { status: 400 }
      );
    }

    const project = await Project.findOne({ slug });

    if (!project) {
      console.log(
        "Project not found in /api/projects/[slug] for slug =",
        slug
      );
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Always treat comments as an array
    if (!Array.isArray(project.comments)) {
      project.comments = [];
    }

    project.comments.push({
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date(),
    });

    await project.save();

    // Return plain JSON-friendly comments
    const plainComments = project.comments.map((c: any) => ({
      _id: c._id.toString(),
      name: c.name,
      text: c.text,
      createdAt: c.createdAt?.toISOString?.() ?? "",
    }));

    return NextResponse.json({ comments: plainComments }, { status: 200 });
  } catch (err) {
    console.error("Error in POST /api/projects/[slug]", err);
    return NextResponse.json(
      { message: "Server error while saving project comment" },
      { status: 500 }
    );
  }
}

