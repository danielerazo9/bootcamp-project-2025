// src/app/portfolio/page.tsx

type Project = {
  _id: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
};

async function getProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects", {
  cache: "no-store",
});


  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Portfolio</h1>
      <p>Projects loaded from my MongoDB database.</p>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          marginTop: "1.5rem",
        }}
      >
        {projects.map((project) => (
          <article
            key={project._id}
            style={{
              border: "1px solid #444",
              padding: "1rem",
              borderRadius: "0.5rem",
              background: "#111",
            }}
          >
            <h2>{project.title}</h2>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              {new Date(project.date).toLocaleDateString()}
            </p>

            <p style={{ marginTop: "0.5rem" }}>{project.description}</p>

            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
              <strong>Tech:</strong> {project.tech.join(" • ")}
            </p>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "0.75rem",
                textDecoration: "underline",
              }}
            >
              View project →
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
