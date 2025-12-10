// src/app/blog/[slug]/page.tsx
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";
import Comment from "@/components/Comment";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type BlogPageData = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author?: string;
  date?: string | null;
  comments: {
    _id?: string;
    name: string;
    text: string;
    createdAt: string;
  }[];
};

async function getBlog(slug: string): Promise<BlogPageData | null> {
  await connectDB();

  const doc = await Blog.findOne({ slug }).lean();
  if (!doc) {
    console.log("No blog found for slug:", slug);
    return null;
  }

  return {
    _id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    author: doc.author,
    date: doc.date ? doc.date.toISOString() : null,
    comments: (doc.comments ?? []).map((c: any) => ({
      _id: c._id?.toString?.(),
      name: c.name,
      text: c.text,
      createdAt: c.createdAt
        ? c.createdAt.toISOString?.()
        : "", // or new Date().toISOString()
    })),
  };
}


export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  console.log("BlogPage params.slug =", slug);

  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <main className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Blog not found</h1>
        <p>We couldn&apos;t find a blog with that slug.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {blog.date && (
        <p className="text-sm text-gray-600 mb-4">
          {new Date(blog.date).toLocaleDateString()}{" "}
          {blog.author ? " • " + blog.author : ""}
        </p>
      )}

      <div className="whitespace-pre-wrap mb-8">
        {blog.content ?? blog.description}
      </div>

      <Comment slug={blog.slug} initialComments={blog.comments ?? []} />
    </main>
  );
}

