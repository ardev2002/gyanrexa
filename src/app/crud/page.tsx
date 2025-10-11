// /app/crud/page.tsx
"use client";
import React, { useState } from "react";
import AddBlogPage from "@/components/crud/Addblog"; // Reuse existing component
import EditBlog from "@/components/crud/EditBlog";
import DeleteBlog from "@/components/crud/DeleteBlog";

export const dynamic = "force-static";

export default function CrudPage() {
  const [mode, setMode] = useState<"ADD" | "EDIT" | "DELETE" | null>(null);

  const renderContent = () => {
    switch (mode) {
      case "ADD":
        return <AddBlogPage />;
      case "EDIT":
        return <EditBlog />;
      case "DELETE":
        return <DeleteBlog />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🛠️ Blog Management</h1>

      <div className="flex justify-center gap-6 mb-10">
        <button
          className="btn btn-primary"
          onClick={() => setMode("ADD")}
        >
          ➕ Add Blog
        </button>
        <button
          className="btn btn-warning"
          onClick={() => setMode("EDIT")}
        >
          ✏️ Edit Blog
        </button>
        <button
          className="btn btn-error"
          onClick={() => setMode("DELETE")}
        >
          🗑️ Delete Blog
        </button>
      </div>

      {renderContent()}
    </div>
  );
}
