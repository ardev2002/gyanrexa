"use client";
import React, { useState } from "react";

const mockBlogs = [
  { id: "1", title: "How to enhance battery life" },
  { id: "2", title: "Top 10 tech gadgets" },
];

export default function DeleteBlog() {
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = () => {
    if (!selectedBlog) return;
    // Replace this with actual delete API call
    alert(`Deleted blog with ID: ${selectedBlog}`);
    setSelectedBlog(null);
    setConfirm(false);
  };

  return (
    <div className="bg-base-200 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">🗑️ Delete Blog</h2>

      <label className="label font-semibold">Select Blog to Delete</label>
      <select
        className="select select-bordered w-full mb-4"
        onChange={(e) => {
          setSelectedBlog(e.target.value);
          setConfirm(false);
        }}
        defaultValue=""
      >
        <option disabled value="">Choose blog</option>
        {mockBlogs.map((blog) => (
          <option key={blog.id} value={blog.id}>
            {blog.title}
          </option>
        ))}
      </select>

      {selectedBlog && !confirm && (
        <button className="btn btn-error" onClick={() => setConfirm(true)}>
          Confirm Delete
        </button>
      )}

      {confirm && (
        <div className="mt-4">
          <p className="text-red-600 font-bold mb-2">
            Are you sure you want to delete this blog? This action cannot be undone.
          </p>
          <button className="btn btn-error mr-4" onClick={handleDelete}>
            Yes, Delete
          </button>
          <button className="btn" onClick={() => setConfirm(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
