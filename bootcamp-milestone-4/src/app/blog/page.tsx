// src/app/blog/page.tsx
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";
import BlogPreview from "@/components/BlogPreview";

export const dynamic = "force-dynamic";

async function getBlogs() {
  await connectDB();

  // Get all blogs from MongoDB
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

  // Normalize data for React
  return blogs.map((b: any) => ({
    _id: b._id.toString(),
    title: b.title,
    slug: b.slug,
    description: b.description,
    author: b.author,
    date: b.date instanceof Date ? b.date.toISOString() : b.date,
    image: b.image,
  }));
}

export default async function BlogIndex() {
  const blogs = await getBlogs();

  if (!blogs || blogs.length === 0) {
    return (
      <main style={{ width: "80%", margin: "24px auto" }}>
        <h1>Blogs</h1>
        <p>No blog posts found.</p>
      </main>
    );
  }

  return (
    <main style={{ width: "80%", margin: "24px auto" }}>
      <h1>Blogs</h1>

      <div
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {blogs.map((b: any) => (
          <BlogPreview key={b.slug} blog={b} />
        ))}
      </div>
    </main>
  );
}
