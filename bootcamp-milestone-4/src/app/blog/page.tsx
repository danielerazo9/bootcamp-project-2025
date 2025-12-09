// bootcamp-milestone-4/src/app/blog/page.tsx

import connectDB from "@/database/db";          // your DB connection helper
import Blog from "@/database/blogSchema";       // your Mongoose Blog model
import BlogPreview from "@/components/blogPreview"; // note: lower-case "blogPreview"

export const dynamic = "force-dynamic";

type BlogPreviewProps = {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  author?: string;
  date?: string;
  image?: string;
};

// Fetch all blogs directly from MongoDB (no fetch, no localhost)
async function getBlogs(): Promise<BlogPreviewProps[]> {
  await connectDB();

  const docs = await Blog.find({})
    .sort({ createdAt: -1 })
    .lean();

  return docs.map((doc: any) => ({
    _id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? "",
    author: doc.author ?? "",
    date: doc.date ? new Date(doc.date).toISOString() : "",
    image: doc.image ?? "",
  }));
}

export default async function BlogIndexPage() {
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
          <BlogPreview key={blog.slug} blog={blog} />
        ))}
      </div>
    </main>
  );
}

