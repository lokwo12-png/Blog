"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TipTapEditor({ onChange }: { onChange: (value: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your post here...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <EditorContent editor={editor} />
    </div>
  );
}
