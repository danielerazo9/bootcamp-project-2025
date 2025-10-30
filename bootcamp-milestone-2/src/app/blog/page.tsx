// src/app/blog/page.tsx
import blogs from "../blogData";
import BlogPreview from "../../components/blogPreview";

export default function BlogIndex() {
  return (
    <main style={{ width: "80%", margin: "0 auto" }}>
      <h1>Blogs</h1>
      <div style={{
        display: "grid",
        gap: "24px",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
      }}>
        {blogs.map((b) => (
          <BlogPreview
            key={b.slug}
            slug={b.slug}
            title={b.title}
            date={b.date}
            image={b.image}
            content={b.content}
          />
          // or simply: <BlogPreview key={b.slug} {...b} />
        ))}
      </div>
    </main>
  );
}
