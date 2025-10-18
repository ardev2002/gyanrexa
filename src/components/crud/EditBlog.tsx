"use client";
import React, { useState, useActionState, useEffect, useRef } from "react";
import { Search, Pencil, Save } from "lucide-react";
import { inputValidator } from "@/utils/lib/inputValidator";
import { getPostAction } from "@/utils/actions/getPostAction";
import { updateBlogAction } from "@/utils/actions/updateBlogAction";
import { BlogClientSection, Section } from "@/type";
import Sections from "./Sections";
import Form from "next/form";
import { AUTHORS, CATEGORIES } from "@/utils/lib/CONFIG";

export default function EditBlog() {
  const [editMode, setEditMode] = useState(false);
  const [blogUrl, setBlogUrl] = useState("");
  const [sections, setSections] = useState<BlogClientSection[]>([]);
  const modalRef = useRef<HTMLDialogElement>(null);

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

  useEffect(() => {
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
    <div className="bg-base-200 p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Blog Post</h2>

      {/* Search Input */}
      <Form action={getPost}>
        <div className="join w-full mb-6">
          <input
            type="text"
            name="blogUrl"
            placeholder="Enter blog URL"
            value={blogUrl}
            className="input input-bordered border-gray-400 dark:border-gray-600 join-item w-full"
            onChange={(e) => setBlogUrl(e.target.value)}
            onBeforeInput={(e) => inputValidator(e, "url")}
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
        <div className="card bg-base-100 shadow-md border p-5 border-gray-400 dark:border-gray-600">
          <div className="flex gap-4 items-center flex-wrap justify-center">
            <img src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_URL!}/${getPostState?.post.sections[0].imgKey}`} alt={getPostState?.post.title} className="w-full sm:w-40 h-20 object-cover rounded-lg" />
            <div>
              <h3 className="text-lg font-semibold text-primary">{getPostState.post.title}</h3>
              <p className="text-sm text-gray-500">{getPostState.blogUrl}</p>
            </div>

            <button
              className="inline-block btn btn-outline btn-warning"
              onClick={() => setEditMode(true)}
            >
              <Pencil className="w-4 h-4" />
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
          <div>
            <label className="label font-semibold">Author</label>
            <select name="author" className="select select-bordered w-full">
              {
                Array.from(Object.entries(AUTHORS)).map(([key, value]) => (
                  <option key={key} value={value} disabled={key === '@select'} defaultValue={getPostState.post?.author}>
                    {value}
                  </option>
                ))
              }
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="label">Category</label>
            <select
              name="categoryId"
              className="select select-bordered w-full"
              required
            >
              {
                Array.from(Object.entries(CATEGORIES)).map(([key, value]) => (
                  <option key={key} value={key} disabled={key === 'SELECT'} defaultValue={getPostState.post?.category}>
                    {value}
                  </option>
                ))
              }
            </select>
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

          <div className="flex justify-center mt-6 gap-4">
            <button
              type="button"
              className={`btn btn-success flex items-center gap-2 ${isUpdating ? "btn-disabled" : ""}`}
              onClick={() => modalRef.current?.showModal()}
            >
              {isUpdating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <div className="flex items-center gap-2"><Save className="w-4 h-4" /><span>Save Changes</span></div>
              )}
            </button>
            <button
              type="button"
              className="btn border border-gray-400 dark:border-gray-600"
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

      {/* Toast Message */}
      {updateState.ok && (
        <div className="toast toast-top toast-center">
          <div className={`alert ${updateState?.ok ? 'alert-success' : 'alert-error'}`}>
            <span>{updateState?.message}</span>
          </div>
        </div>
      )}


      {/* Under Development Message Modal */}
      <dialog ref={modalRef} className="modal modal-middle">
        <div className="modal-box mt-4">
          <h3 className="font-bold text-lg">Under Development</h3>
          <p className="py-4">This feature is currently under development. Please check back later.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => modalRef.current?.close()}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
