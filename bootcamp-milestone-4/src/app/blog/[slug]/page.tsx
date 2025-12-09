// bootcamp-milestone-4/src/app/blog/[slug]/page.tsx

import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";
import Comment from "@/components/Comment";

export const dynamic = "force-dynamic";

type Params = {
  params: {
    slug: string;
  };
};

type BlogDoc = {
  _id: any;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  author?: string;
  date?: Date;
  comments?: any[];
};

// Fetch ONE blog directly from MongoDB
async function getBlog(slug: string) {
  await connectDB();

  const doc = await Blog.findOne({ slug }).lean<BlogDoc | null>();
  if (!doc) return null;

  return {
    _id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? "",
    content: doc.content ?? "",
    author: doc.author ?? "",
    date: doc.date ? new Date(doc.date).toISOString() : "",
    comments: doc.comments ?? [],
  };
}

export default async function BlogPage({ params }: Params) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return (
      <main style={{ width: "80%", margin: "24px auto" }}>
        <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
        <p>We couldn&apos;t find a blog with that slug.</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto mt-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Date + author */}
      <div className="text-sm text-gray-600 mb-4">
        {blog.date && (
          <span>
            {new Date(blog.date).toLocaleDateString()}
            {blog.author ? ` • ${blog.author}` : null}
          </span>
        )}
      </div>

      {/* Description / content */}
      <div className="whitespace-pre-wrap mb-8">
        {blog.content || blog.description}
      </div>

      {/* Comments (uses /api/comments, NOT localhost) */}
      <Comment slug={blog.slug} initialComments={blog.comments ?? []} />
    </main>
  );
}

