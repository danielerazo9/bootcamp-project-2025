import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";
import BlogPreview from "@/components/blogPreview";

// Fetch all blogs from MongoDB before rendering the page
async function getBlogs() {
  await connectDB();

  try {
    // return *plain objects* instead of Mongoose documents
    const blogs = await Blog.find().sort({ date: -1 }).lean();
    return blogs;
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    return null;
  }
}


export default async function BlogIndex() {
  const blogs = await getBlogs(); // fetch blogs from MongoDB

  // handle null / no blogs case
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
          <BlogPreview key={b.slug} {...b} />
        ))}
      </div>
    </main>
  );
}

