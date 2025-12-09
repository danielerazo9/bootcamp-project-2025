// src/components/Comment.tsx
"use client";

import { useState, FormEvent } from "react";

type CommentType = {
  _id?: string;
  name: string;
  text: string;
  createdAt: string | Date;
};

type CommentProps = {
  slug: string;
  initialComments: CommentType[];
};

export default function Comment({ slug, initialComments }: CommentProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !text.trim()) {
      setError("Please fill out both fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, text }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      const updatedBlog = await res.json();
      setComments(updatedBlog.comments || []);
      setName("");
      setText("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-10 space-y-6">
      <h2 className="text-xl font-semibold">Comments</h2>

      <div className="space-y-3">
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        )}

        {comments.map((c) => (
          <div key={c._id ?? c.createdAt.toString()} className="border p-3 rounded">
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-gray-500 mb-1">
              {new Date(c.createdAt).toLocaleString()}
            </p>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea
            className="w-full border rounded px-3 py-2 text-sm min-h-[80px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your comment..."
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white border border-black disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </section>
  );
}
