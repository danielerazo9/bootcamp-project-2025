import Comment from "@/components/Comment";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getBlog(slug: string) {
  const res = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

export default async function Blog({ params }: Props) {
  // ✅ unwrap the params promise
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Blog not found</h1>
        <p>We couldn&apos;t find a blog with that slug.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {blog.date && (
        <p className="text-sm text-gray-600 mb-4">
          {new Date(blog.date).toLocaleDateString()}
        </p>
      )}

      <div className="whitespace-pre-wrap mb-8">
        {blog.content ?? blog.description}
      </div>

      {/* Commenting Feature */}
      <Comment slug={slug} initialComments={blog.comments ?? []} />
    </div>
  );
}


