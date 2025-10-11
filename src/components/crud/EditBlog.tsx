// /components/EditBlog.tsx
"use client";
import React, { useEffect, useState } from "react";
// Mock data fetching - replace with real fetch
const mockBlogs = [
  { id: "1", title: "How to enhance battery life", slug: "battery-life" },
  { id: "2", title: "Top 10 tech gadgets", slug: "top-tech" },
];

export default function EditBlog() {
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  return (
    <div className="bg-base-200 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">✏️ Edit Blog</h2>

      <label className="label font-semibold">Select Blog to Edit</label>
      <select
        className="select select-bordered w-full mb-6"
        onChange={(e) => setSelectedBlog(e.target.value)}
        defaultValue=""
      >
        <option disabled value="">Choose blog</option>
        {mockBlogs.map((blog) => (
          <option key={blog.id} value={blog.id}>
            {blog.title}
          </option>
        ))}
      </select>

      {selectedBlog && (
        <div>
          {/* Show the editable blog form here */}
          {/* Reuse AddBlogForm but prefill the fields based on selected blog */}
          <p className="text-center text-gray-500">Form to edit blog ID: {selectedBlog}</p>
          {/* You would pass props like blogData to AddBlogForm to prefill */}
        </div>
      )}
    </div>
  );
}
