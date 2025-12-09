// src/app/blog/[slug]/page.tsx
import Comment from "@/components/Comment";
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    slug: string;
  };
};

async function getBlog(slug: string) {
  await connectDB();

  const doc = await Blog.findOne({ slug }).lean();
  if (!doc) return null;

  return {
    _id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    content: doc.content,
    author: doc.author,
    date: doc.date instanceof Date ? doc.date.toISOString() : doc.date,
    comments: doc.comments ?? [],
  };
}

export default async function Blog({ params }: Props) {
  const slug = params.slug;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <main style={{ width: "80%", margin: "24px auto" }}>
        <h1 className="max-w-2xl mx-auto">Blog not found</h1>
        <p>We couldn&apos;t find a blog with that slug.</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto mt-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Date & author */}
      <div className="text-sm text-gray-600 mb-4">
        {blog.date && (
          <span>
            {new Date(blog.date).toLocaleDateString()}{" "}
            {blog.author ? `• ${blog.author}` : null}
          </span>
        )}
      </div>

      {/* Description / content */}
      <div className="whitespace-pre-wrap mb-8">
        {blog.content ?? blog.description}
      </div>

      {/* Comments (still using your Comment component + API) */}
      {/* If your Comment component props differ, adjust this line */}
     {/* <Comment slug={blog.slug} initialComments={blog.comments ?? []} /> */}
    </main>
  );
}
