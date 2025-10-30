import blogs from "../../blogData";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogs.find((b) => b.slug === params.slug);
  if (!post) return <main style={{ width: "80%", margin: "24px auto" }}>Post not found.</main>;

  return (
    <main style={{ width: "80%", margin: "24px auto" }}>
      <nav><a href="/blog">← Back to Blog List</a></nav>
      <h1>{post.title}</h1>
      <p><strong>Date Posted:</strong> {post.date}</p>
      <img src={post.image} alt={post.title} width={500} />
      <p style={{ marginTop: 16 }}>{post.content}</p>
    </main>
  );
}

