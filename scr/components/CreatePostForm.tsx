"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const TipTapEditor = dynamic(() => import("@/components/editor/TipTapEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full animate-pulse rounded border border-gray-200 bg-gray-100" />
  ),
});

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("Post created successfully!");
      setTitle("");
      setContent("");
    } else {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <TipTapEditor onChange={setContent} />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Publish Post
      </button>
    </form>
  );
}
