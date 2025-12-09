"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

// ✅ EmailJS config – THESE MUST MATCH YOUR DASHBOARD
const SERVICE_ID = "service_61cjyqi";      // 👈 exact spelling from EmailJS
const TEMPLATE_ID = "template_oik93md";
const PUBLIC_KEY = "uxBSMxSnL6_H0MLY1";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all fields before submitting.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
      };

      // 🔥 Call EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error("EmailJS error:", err);
      setStatus("error");

      const msg =
        err?.text ||
        err?.message ||
        "Something went wrong sending your message. Please try again.";
      setErrorMessage(msg);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 md:p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Me</h1>
        <p className="text-sm text-neutral-300 mb-6 text-center">
          Have a question or want to work together? Send me a message and
          I&apos;ll get back to you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full min-h-[120px] resize-y rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What would you like to talk about?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-4 min-h-[1.5rem]">
          {status === "success" && (
            <p className="text-sm text-green-400 text-center">
              ✅ Message sent! Check your email to confirm it arrived.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-yellow-400 text-center">
              ⚠️ {errorMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
