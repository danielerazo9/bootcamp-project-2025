// src/app/api/projects/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

// Note: context typing is just for TS; runtime can still be weird
interface RouteContext {
  params?: { slug?: string };
}

export async function POST(req: NextRequest, context: RouteContext) {
  await connectDB();

  // 1) Get slug from the URL path as a fallback
  const path = req.nextUrl.pathname; // e.g. "/api/projects/typescript-blog-api"
  const pathSlug = path.split("/").pop() || "";

  // 2) Prefer context.params.slug if it exists, otherwise use pathSlug
  const ctxSlug = context.params?.slug;
  const slug = ctxSlug || pathSlug;

  console.log("POST /api/projects, ctxSlug =", ctxSlug, "pathSlug =", pathSlug, "using slug =", slug);

  const { name, text } = await req.json();

  if (!name?.trim() || !text?.trim()) {
    return NextResponse.json(
      { message: "Name and comment are required" },
      { status: 400 }
    );
  }

  // Be a little forgiving with slug (case-insensitive, ignore tiny differences)
  const project = await Project.findOne({
    slug: { $regex: `^${slug}$`, $options: "i" },
  });

  if (!project) {
    console.log("Project not found in /api/projects for slug =", slug);
    return NextResponse.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  // Ensure comments is an array
  if (!Array.isArray(project.comments)) {
    project.comments = [];
  }

  project.comments.push({
    name,
    text,
    createdAt: new Date(),
  });

  await project.save();

  const plainComments = project.comments.map((c: any) => ({
    _id: c._id?.toString?.(),
    name: c.name,
    text: c.text,
    createdAt: c.createdAt?.toISOString?.(),
  }));

  return NextResponse.json({ comments: plainComments }, { status: 200 });
}
