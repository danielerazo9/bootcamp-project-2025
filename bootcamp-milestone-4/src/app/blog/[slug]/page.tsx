import Comment from "@/components/Comment";

type Props = {
  params: { slug: string };
};

// Fetch a single blog by slug (relative URL → works on Vercel)
async function getBlog(slug: string) {
  const res = await fetch(`/api/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

export default async function BlogPage({ params }: Props) {
  const { slug } = params;

  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Blog not found.</h1>
        <p>We couldn’t find a blog with that slug.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Date */}
      {blog.date && (
        <p className="text-gray-600 mb-4">
          {new Date(blog.date).toLocaleDateString()}
        </p>
      )}

      {/* Description / Content */}
      <div className="whitespace-pre-wrap mb-8">
        {blog.description}
      </div>

      {/* Comments */}
      <Comment slug={slug} initialComments={blog.comments ?? []} />
    </div>
  );
}

