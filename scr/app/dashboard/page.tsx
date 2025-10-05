"use client";

import { useState } from "react";
import TipTapEditor from "@/components/editor/TipTapEditor";
import { useSession } from "next-auth/react";

export default function CreatePost() {
  const { data: session } = useSession();
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

  if (!session) {
    return <p className="text-center mt-10">Please log in to create a post.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
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
    </div>
  );
}
