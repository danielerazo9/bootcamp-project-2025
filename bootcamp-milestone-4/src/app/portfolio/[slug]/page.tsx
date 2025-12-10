// src/app/portfolio/[slug]/page.tsx
import Link from "next/link";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";
import ProjectCommentSection from "@/components/ProjectComment";

type ProjectComment = {
  _id?: string;
  name: string;
  text: string;
  createdAt: string;
};

type ProjectPageData = {
  _id: string;
  slug: string;
  title: string;
  date: string | null;
  description: string;
  tech: string[];
  image: string;
  comments: ProjectComment[];
};

async function getProject(slug: string): Promise<ProjectPageData | null> {
  await connectDB();

  const doc = await Project.findOne({ slug }).lean();
  if (!doc) {
    console.log("No project found for slug:", slug);
    return null;
  }

  return {
    _id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    date: doc.date ? doc.date.toISOString().split("T")[0] : null,
    description: doc.description,
    tech: doc.tech ?? [],
    image: doc.image,
    comments: (doc.comments ?? []).map((c: any) => ({
      _id: c._id?.toString?.(),
      name: c.name,
      text: c.text,
      createdAt: c.createdAt ? c.createdAt.toISOString?.() : "",
    })),
  };
}

// Note: params is a Promise in Next 16 app router when the component is async
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "1.5rem" }}>
        <h1 className="max-w-3xl mx-auto">Project not found</h1>
        <p style={{ marginTop: "0.5rem" }}>
          We couldn&apos;t find a project with that slug.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <Link href="/portfolio">&larr; Back to Portfolio</Link>
        </p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "1.5rem" }}>
      <h1>{project.title}</h1>

      {project.date && (
        <p style={{ marginTop: "0.5rem" }}>
          <time dateTime={project.date}>{project.date}</time>
        </p>
      )}

      <p style={{ marginTop: "0.5rem" }}>{project.description}</p>

      {project.tech.length > 0 && (
        <p style={{ marginTop: "0.5rem" }}>
          <strong>Technologies:</strong> {project.tech.join(", ")}
        </p>
      )}

      <p style={{ marginTop: "1rem" }}>
        <Link href="/portfolio">&larr; Back to Portfolio</Link>
      </p>

      <ProjectCommentSection
        slug={project.slug}
        initialComments={project.comments}
      />
    </main>
  );
}
