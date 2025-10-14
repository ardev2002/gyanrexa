"use client";
import React, { useState } from "react";
import AddBlogPage from "@/components/crud/Addblog";
import EditBlog from "@/components/crud/EditBlog";
import DeleteBlog from "@/components/crud/DeleteBlog";
import { CirclePlus, EditIcon, Trash2 } from "lucide-react";

export const dynamic = "force-static";

export default function CrudPage() {
  const [mode, setMode] = useState<"ADD" | "EDIT" | "DELETE" | null>("ADD");

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

  const buttonClass = (currentMode: "ADD" | "EDIT" | "DELETE", activeColor: string) =>
    `btn ${activeColor} flex items-center gap-2 transition-all duration-300 ${
      mode === currentMode ? "opacity-100 scale-105" : "opacity-50 hover:opacity-80"
    }`;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🛠️ Blog Management</h1>

      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        <button
          className={buttonClass("ADD", "btn-primary")}
          onClick={() => setMode("ADD")}
        >
          <CirclePlus /> Add Blog
        </button>

        <button
          className={buttonClass("EDIT", "btn-warning")}
          onClick={() => setMode("EDIT")}
        >
          <EditIcon /> Edit Blog
        </button>

        <button
          className={buttonClass("DELETE", "btn-error")}
          onClick={() => setMode("DELETE")}
        >
          <Trash2 /> Delete Blog
        </button>
      </div>

      {renderContent()}
    </div>
  );
}
