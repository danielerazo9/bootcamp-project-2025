import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import ProjectModel from "@/database/projectSchema";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const projects = await ProjectModel.find().sort({ date: -1 }).lean();

    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.error("Error in GET /api/projects:", err);
    return NextResponse.json(
      { message: "Server error while fetching projects" },
      { status: 500 }
    );
  }
}

