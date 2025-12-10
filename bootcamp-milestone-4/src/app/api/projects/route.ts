// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

export async function GET() {
  try {
    await connectDB();

    const docs = await Project.find().sort({ date: -1 }).lean();

    const projects = docs.map((doc: any) => ({
      _id: doc._id.toString(),
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      tech: doc.tech ?? [],
      image: doc.image ?? "",
      date: doc.date ? doc.date.toISOString().split("T")[0] : "",
      comments: (doc.comments ?? []).map((c: any) => ({
        _id: c._id?.toString?.() ?? "",
        name: c.name,
        text: c.text,
        createdAt: c.createdAt?.toISOString?.() ?? "",
      })),
    }));

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error in GET /api/projects", error);
    return NextResponse.json(
      { message: "Server error fetching projects" },
      { status: 500 }
    );
  }
}
