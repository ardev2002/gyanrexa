"use client";
import React, { useState, useActionState } from "react";
import { Search, Pencil, Save } from "lucide-react";
import { inputValidator } from "@/utils/lib/inputValidator";
import { getPostAction } from "@/utils/actions/getPostAction";
import { updateBlogAction } from "@/utils/actions/updateBlogAction";
import { BlogClientSection, Section } from "@/type";
import Sections from "./Sections";
import Form from "next/form";

export default function EditBlog() {
  const [editMode, setEditMode] = useState(false);
  const [blogUrl, setBlogUrl] = useState("");
  const [sections, setSections] = useState<BlogClientSection[]>([]);

  const [getPostState, getPost, isGetting] = useActionState(getPostAction, {
    message: "",
    isSubmitted: false,
    ok: false,
    blogUrl: "",
  });

  const [updateState, updateBlog, isUpdating] = useActionState(updateBlogAction, {
    message: "",
    isSubmitted: false,
    ok: false,
  });

  // 🔧 Update a specific field in a section
  const handleSectionChange = <E extends keyof BlogClientSection, T>(
    index: number,
    field: E,
    value: T
  ) => {
    setSections((prevSections) => {
      const updated = [...prevSections];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ✅ When blog post is fetched, populate sections
  React.useEffect(() => {
    if (getPostState?.post?.sections && getPostState.post.sections.length > 0) {
      const sections = getPostState.post.sections.map((sec: Section) => ({
        ...sec,
        imageFile: null,
        previewUrl: "",
        uploadProgress: 0,
      }));
      setSections(sections);
    }
  }, [getPostState.post]);

  return (
    <div className="bg-base-200 p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center flex justify-center items-center gap-2">
        <Pencil /> Edit Blog Post
      </h2>

      {/* Search Input */}
      <Form action={getPost}>
        <div className="join w-full mb-6">
          <input
            type="text"
            name="blogUrl"
            placeholder="Enter blog URL"
            value={blogUrl}
            className="input input-bordered join-item w-full"
            onChange={(e) => setBlogUrl(e.target.value)}
            onKeyDown={(e) => inputValidator(e, "url")}
          />
          <button
            type="submit"
            className={`btn btn-warning join-item ${isGetting || blogUrl === "" || getPostState.blogUrl === blogUrl ? "btn-disabled" : ""
              }`}
          >
            {isGetting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </Form>

      {/* Found Blog Banner */}
      {getPostState?.post && !editMode && (
        <div className="card bg-base-100 shadow-md border border-base-300 p-5">
          <h3 className="text-lg font-semibold text-primary">
            {getPostState.post.title}
          </h3>
          <p className="text-sm text-gray-500">{getPostState.blogUrl}</p>

          <div className="flex justify-end mt-4">
            <button
              className="btn btn-outline btn-warning flex items-center gap-2"
              onClick={() => setEditMode(true)}
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editMode && (
        <form
          action={updateBlog}
          className="bg-base-100 p-6 rounded-lg shadow-md border border-base-300 mt-6 space-y-5"
        >
          <input type="hidden" name="crudType" value={"UPDATE"} />
          <input
            type="text"
            name="blogUrl"
            value={getPostState.blogUrl}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Blog Title */}
          <div className="flex flex-col gap-2">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={getPostState.post?.title}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-2">
            <label className="label">Author</label>
            <input
              type="text"
              name="author"
              defaultValue={getPostState.post?.author}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="label">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={getPostState.post?.category}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* 🧩 Dynamic Section Editor */}
          {sections.length > 0 && (
            <div className="mt-8 space-y-6">
              <h3 className="text-lg font-semibold border-b pb-2">
                Edit Sections
              </h3>
              <Sections
                sections={sections}
                handleSectionChange={handleSectionChange}
              />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className={`btn btn-success flex items-center gap-2 ${isUpdating ? "btn-disabled" : ""
                }`}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* No match found */}
      {getPostState?.isSubmitted && !getPostState?.post && (
        <div className="alert alert-warning mt-4">
          <span>{getPostState?.message}</span>
        </div>
      )}
    </div>
  );
}
