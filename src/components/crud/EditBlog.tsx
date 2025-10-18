"use client";

import React, { useState, useActionState, useEffect, useRef } from "react";
import { Search, Save, UserPen, CalendarDays, Pen, Plus } from "lucide-react";
import { inputValidator } from "@/utils/lib/inputValidator";
import { getPostAction } from "@/utils/actions/getPostAction";
import { updateBlogAction } from "@/utils/actions/updateBlogAction";
import { BlogClientSection, Section } from "@/type";
import Sections from "./Sections";
import Form from "next/form";
import { AUTHORS, CATEGORIES } from "@/utils/lib/CONFIG";
import ImageRenderer from "../ImageRenderer";
import Link from "next/link";

export default function EditBlog() {
  const [editMode, setEditMode] = useState(false);
  const [blogUrl, setBlogUrl] = useState("");
  const [sections, setSections] = useState<BlogClientSection[]>([]);
  const [showToast, setShowToast] = useState(false);
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

  // 🔹 Section handlers
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

  const handleRemoveSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        subheading: "",
        paragraph: "",
        order: sections.length + 1,
        imageFile: null,
        previewUrl: "",
        imgKey: "",
      },
    ]);
  };

  // 🔹 Load fetched blog
  useEffect(() => {
    if (getPostState.post && getPostState?.post?.sections?.length > 0) {
      const mapped = getPostState.post.sections.map((sec: Section) => ({
        ...sec,
        imageFile: null,
        previewUrl: "",
      }));
      setSections(mapped);
    }
  }, [getPostState.post]);

  // 🔹 Toast & Modal behavior
  useEffect(() => {
    if (updateState?.isSubmitted) {
      modalRef.current?.close();
      setShowToast(true);
    }
  }, [updateState]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showToast) timeout = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <div className="bg-base-200 p-6 sm:p-10 rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Edit Blog Post
      </h2>

      {/* Search */}
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
            disabled={
              isGetting || blogUrl === "" || getPostState.blogUrl === blogUrl
            }
            className="btn btn-warning join-item"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </Form>

      {isGetting && (
        <div className="flex justify-center">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}

      {getPostState?.isSubmitted && !getPostState?.post && (
        <div className="alert alert-warning mt-4">
          <span>{getPostState?.message}</span>
        </div>
      )}

      {getPostState?.post && (
        <div className="card bg-base-100 shadow-md border p-5 border-gray-400 dark:border-gray-600">
          <div className="flex gap-4 items-center flex-wrap justify-center">
            <ImageRenderer
              variant="small"
              imgKey={`${getPostState.post.sections[0].imgKey}`}
              alt={getPostState.post.title}
            />
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-primary hover:underline cursor-pointer">
                <Link href={`/blog/${getPostState.post.blogUrl}`}>
                  {getPostState.post.title}
                </Link>
              </h2>
              <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-2">
                  <UserPen size={16} /> {getPostState.post.author}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />{" "}
                  {new Date(getPostState.post.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="card-actions justify-center mt-6">
                <button
                  className={`btn btn-error flex items-center gap-2 ${editMode || isUpdating ? "btn-disabled" : ""
                    }`}
                  onClick={() => setEditMode(!editMode)}
                  disabled={editMode || isUpdating}
                >
                  <Pen className="w-4 h-4" /> Edit Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editMode && (
        <form
          action={updateBlog}
          className="bg-base-100 p-6 rounded-lg shadow-md border border-base-300 mt-6 space-y-5"
        >
          {/* Blog Info */}
          <input
            type="text"
            name="blogUrl"
            readOnly
            aria-readonly
            value={getPostState.blogUrl}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="title"
            defaultValue={getPostState.post?.title}
            className="input input-bordered w-full"
            required
          />

          <select
            name="author"
            aria-disabled
            disabled
            className="select select-bordered w-full"
            defaultValue={getPostState.post?.author}
          >
            {Object.entries(AUTHORS).map(([key, value]) => (
              <option key={key} value={value} disabled={key === "@select"}>
                {value}
              </option>
            ))}
          </select>

          <select
            name="category"
            className="select select-bordered w-full"
            defaultValue={getPostState.post?.category}
            required
          >
            {Object.entries(CATEGORIES).map(([key, value]) => (
              <option key={key} value={key} disabled={key === "SELECT"}>
                {value}
              </option>
            ))}
          </select>

          {/* Sections */}
          <Sections
            sections={sections}
            handleSectionChange={handleSectionChange}
            removeSection={handleRemoveSection}
          />
          <input type="hidden" name="sections" value={JSON.stringify(sections.map(({imageFile, previewUrl, ...rest}) => rest))}/>

          <div className="flex justify-center gap-4 flex-wrap mt-8">
            <button
              type="button"
              onClick={addSection}
              className="btn btn-outline btn-primary flex items-center gap-2"
            >
              <Plus /> Add Section
            </button>

            <button
              type="button"
              className="btn btn-success flex items-center gap-2"
              onClick={() => modalRef.current?.showModal()}
            >
              {isUpdating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
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

          <dialog ref={modalRef} className="modal modal-middle">
            <div className="modal-box mt-4">
              <h3 className="font-bold text-lg">Are you sure?</h3>
              <button type="submit" className="py-4 btn btn-warning btn-outline">Yes, Confirm</button>
              <div className="modal-action">
                <button className="btn" onClick={() => modalRef.current?.close()}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </form>
      )}

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${updateState?.ok ? "alert-success" : "alert-error"
              }`}
          >
            <span>{updateState?.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
