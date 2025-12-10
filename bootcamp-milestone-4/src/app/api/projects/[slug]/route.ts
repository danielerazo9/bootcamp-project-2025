import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

interface RouteParams {
  slug: string;
}

interface RouteContext {
  params: Promise<RouteParams>;
}

export async function POST(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    // ⬅️ THIS is the key difference: await the params
    const { slug } = await context.params;

    console.log("API POST /api/projects/[slug] slug =", slug);

    const { name, text } = await req.json();

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json(
        { message: "Name and comment are required" },
        { status: 400 }
      );
    }

    // case-insensitive exact match on slug
    const project = await Project.findOne({
      slug: { $regex: `^${slug}$`, $options: "i" },
    });

    if (!project) {
      console.log("Project not found in /api/projects/[slug] for slug =", slug);
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    if (!Array.isArray(project.comments)) {
      project.comments = [];
    }

    project.comments.push({
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date(),
    });

    await project.save();

    const plainComments = project.comments.map((c: any) => ({
      _id: c._id.toString(),
      name: c.name,
      text: c.text,
      createdAt: c.createdAt?.toISOString() ?? "",
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

