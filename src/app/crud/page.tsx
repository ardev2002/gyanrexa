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
    `btn ${activeColor} flex items-center gap-2 transition-all duration-300 ${mode === currentMode ? "opacity-100 scale-105" : "opacity-60 hover:opacity-100"
    }`;

  return (
    <div className="mx-auto p-6">

      {/* --- CRUD Buttons --- */}
      <div className="flex justify-center gap-6 mb-6 flex-wrap">
        <button className={buttonClass("ADD", "btn-primary")} onClick={() => setMode("ADD")}>
          <CirclePlus /> Add
        </button>

        <button className={buttonClass("EDIT", "btn-warning")} onClick={() => setMode("EDIT")}>
          <EditIcon /> Edit
        </button>

        <button className={buttonClass("DELETE", "btn-error")} onClick={() => setMode("DELETE")}>
          <Trash2 /> Delete
        </button>
      </div>

      {/* --- Info Banner (DaisyUI Styled) --- */}
      <div className="flex flex-col justify-center mb-8">
        <div className="text-center mt-2 text-sm opacity-70 flex items-center justify-center">
          <span>Use optimized JPG or WEBP images for faster loading — maintain aspect ratio</span>
        </div>
      </div>

      {/* --- Dynamic Content --- */}
      {renderContent()}
    </div>
  );
}
