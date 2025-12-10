// src/components/ProjectComment.tsx
"use client";

import { useState } from "react";

type ProjectComment = {
  _id?: string;
  name: string;
  text: string;
  createdAt: string;
};

interface ProjectCommentSectionProps {
  slug: string;
  initialComments: ProjectComment[];
}

export default function ProjectCommentSection({
  slug,
  initialComments,
}: ProjectCommentSectionProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<ProjectComment[]>(
    initialComments ?? []
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setServerError(null);

    if (!name.trim() || !text.trim()) {
      setServerError("Please enter both your name and a comment.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`/api/projects/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });

      const contentType = res.headers.get("content-type") || "";

      // Avoid crashing if server ever returns HTML
      if (!contentType.includes("application/json")) {
        const body = await res.text();
        console.error("Non-JSON response from /api/projects:", body);
        throw new Error("Server returned an unexpected response.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to post comment.");
      }

      const updatedComments: ProjectComment[] = data.comments ?? [];
      setComments(updatedComments);
      setName("");
      setText("");
    } catch (err: any) {
      console.error(err);
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section style={{ marginTop: "1rem" }}>
      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet. Be the first!</p>
      ) : (
        <ul style={{ marginTop: "0.5rem" }}>
          {comments.map((c) => (
            <li key={c._id ?? `${c.name}-${c.createdAt}`}>
              <strong>{c.name}</strong>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <div>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ display: "block", marginTop: "0.25rem" }}
            />
          </label>
        </div>

        <div style={{ marginTop: "0.75rem" }}>
          <label>
            Comment
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{ display: "block", marginTop: "0.25rem" }}
            />
          </label>
        </div>

        {serverError && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ marginTop: "0.75rem" }}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </section>
  );
}
