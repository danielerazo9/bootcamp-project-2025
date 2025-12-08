import blogs from "../blogData";
import BlogPreview from "../../components/blogPreview";

export default function BlogIndex() {
  return (
    <main style={{ width: "80%", margin: "24px auto" }}>
      <h1>Blogs</h1>
      <div style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
      }}>
        {blogs.map((b) => <BlogPreview key={b.slug} {...b} />)}
      </div>
    </main>
  );
}
