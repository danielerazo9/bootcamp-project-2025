"use client";

import { useState } from "react";

type Comment = {
  name: string;
  text: string;
  createdAt: string;
};

export default function CommentSection({
  slug,
  initialComments,
}: {
  slug: string;
  initialComments: Comment[];
}) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments ?? []);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      setIsSubmitting(true);

      const res = await fetch(`/api/blogs/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to post comment");
      }

      // if API returns full blog:
      const updatedComments = data.comments ?? [];
      setComments(updatedComments);
      setName("");
      setText("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet. Be the first!</p>
      ) : (
        <ul>
          {comments.map((c, i) => (
            <li key={i}>
              <strong>{c.name}</strong>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Comment
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </section>
  );
}
