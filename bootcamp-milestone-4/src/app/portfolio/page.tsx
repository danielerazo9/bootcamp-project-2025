// src/app/portfolio/page.tsx
import Link from "next/link";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

type ProjectListItem = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  date: string;
};

async function getProjects(): Promise<ProjectListItem[]> {
  await connectDB();

  const docs = await Project.find().sort({ date: -1 }).lean();

  return docs.map((doc: any) => ({
    _id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    tech: doc.tech ?? [],
    image: doc.image,
    date: doc.date ? doc.date.toISOString().slice(0, 10) : "",
  }));
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "1.5rem" }}>
      <h1>Portfolio</h1>
      <p>Here are some of the projects I&apos;ve worked on.</p>

      <section style={{ marginTop: "1.5rem" }}>
        {projects.map((project) => (
          <article
            key={project._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h2>
              <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
            </h2>

            <p style={{ marginTop: "0.5rem" }}>{project.date}</p>

            <p style={{ marginTop: "0.5rem" }}>{project.description}</p>

            {project.tech.length > 0 && (
              <p style={{ marginTop: "0.5rem" }}>
                <strong>Tech:</strong> {project.tech.join(", ")}
              </p>
            )}

            <p style={{ marginTop: "0.5rem" }}>
              <Link href={`/portfolio/${project.slug}`}>Read more &rarr;</Link>
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

