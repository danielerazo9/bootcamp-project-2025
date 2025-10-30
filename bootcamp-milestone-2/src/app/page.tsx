import blogs from "./blogData";
import BlogPreview from "../components/blogPreview";

export default function Home() {
  return (
    <main style={{ width: "80%", margin: "24px auto" }}>
      <h1>Welcome to Daniel’s Website!</h1>
      <p>This is my Hack4Impact Milestone 2 project.</p>

      <h2 style={{ marginTop: 32 }}>Latest Blog Posts</h2>
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
