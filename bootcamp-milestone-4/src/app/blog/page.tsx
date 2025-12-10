// src/app/blog/page.tsx

import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";
import BlogPreview, { BlogPreviewProps } from "@/components/blogPreview";

export const dynamic = "force-dynamic";

async function getBlogs(): Promise<BlogPreviewProps[]> {
  await connectDB();

  const docs = await Blog.find().sort({ date: -1 }).lean();

  // Normalize Mongo docs into the shape BlogPreview expects
  return docs.map((doc: any) => ({
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    image: doc.image,
    imageAlt: doc.imageAlt,
    // make sure date is a string; if BlogPreview uses string for date
    date: doc.date ? new Date(doc.date).toLocaleDateString() : "",
  }));
}

export default async function BlogPage() {
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
        {blogs.map((blog) => (
          // ✅ DO NOT pass blog={blog}; spread the props instead
          <BlogPreview key={blog.slug} {...blog} />
        ))}
      </div>
    </main>
  );
}


