"use client";

import React, { useState, useEffect } from "react";
import Sections from "@/components/crud/Sections";
import { publishBlogAction } from "@/utils/actions/publishBlogAction";
import { isBlogURLAvailableAction } from "@/utils/actions/isBlogURLAvailableAction";
import { AUTHORS, CATEGORIES } from "@/utils/lib/CONFIG";
import { BlogClientSection } from "@/type";
import { Search, Plus, X, Info, Rocket, CircleCheck, CircleX } from "lucide-react";
import { useActionState } from "react";

export default function AddBlogPage() {
  const [blogUrl, setBlogUrl] = useState("");
  const [sections, setSections] = useState<BlogClientSection[]>([
    { subheading: "", paragraph: "", order: 1, imageFile: null, previewUrl: "", imgKey: "" },
  ]);
  const [showToast, setShowToast] = useState(false);

  const [publishState, formAction, isPublishing] = useActionState(publishBlogAction, { message: '', isSubmitted: false, ok: false });
  const [checkState, checkBlogURL, isChecking] = useActionState(isBlogURLAvailableAction, { message: '', isSubmitted: false, ok: false });

  const addSection = () => setSections(prev => [...prev, { subheading: "", paragraph: "", order: prev.length + 1, imageFile: null, previewUrl: "", imgKey: "" }]);

  const removeSection = (index: number) => {
    if (sections.length === 1) return alert("At least one section is required.");
    setSections(prev => prev.filter((_, i) => i !== index).map((sec, i) => ({ ...sec, order: i + 1 })));
  };

  const handleSectionChange = <K extends keyof BlogClientSection>(index: number, field: K, value: BlogClientSection[K]) => {
    setSections(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  useEffect(() => {
    if (publishState?.isSubmitted) {
      setShowToast(true);
      publishState.isSubmitted = false;
    }
  }, [publishState]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 text-base-content">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Add New Blog Post</h1>

      {/* Blog URL Check */}
      <form action={checkBlogURL}>
        <label className="label font-semibold">Blog Url</label>
        <div className="join w-full mb-2">
          <input
            type="text"
            name="blogUrl"
            placeholder="Enter blog URL (e.g., enhance-battery-life)"
            className="input input-bordered border-gray-400 dark:border-gray-600 join-item w-full"
            value={blogUrl}
            onChange={e => setBlogUrl(e.target.value)}
          />
          <button type="submit" disabled={isChecking || blogUrl === '' || checkState.blogUrl === blogUrl} className="btn btn-primary join-item">
            {isChecking ? <span className="loading loading-spinner loading-sm"></span> : <Search className="w-5 h-5" />}
          </button>
        </div>
        {checkState.message && (
          <p className={`my-1 text-sm flex items-center gap-1 ${checkState.ok ? "text-success" : "text-error"}`}>
            {checkState.ok ? <CircleCheck size={16} /> : <CircleX size={16} />} {checkState.message}
          </p>
        )}
      </form>

      {/* Blog Title, Author, Category */}
      <form className="space-y-6" action={formAction}>
        <input type="hidden" name="blogUrl" value={blogUrl} />

        <div>
          <label className="label font-semibold">Blog Title</label>
          <div className="relative">
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              className="input input-bordered w-full pr-10"
              required
            />
            <div className="tooltip tooltip-left absolute right-2 top-1/2 -translate-y-1/2" data-tip="Main blog title">
              <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>

        <div>
          <label className="label font-semibold">Category</label>
          <select name="category" className="select select-bordered w-full" required>
            {Object.entries(CATEGORIES).map(([key, value]) => (
              <option key={key} value={key} disabled={key === 'SELECT'}>{value}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label font-semibold">Author</label>
          <select name="author" className="select select-bordered w-full">
            {Object.entries(AUTHORS).map(([key, value]) => (
              <option key={key} value={value} disabled={key === '@select'}>{value}</option>
            ))}
          </select>
        </div>

        {/* Sections */}
        <Sections
          sections={sections}
          handleSectionChange={handleSectionChange}
          removeSection={removeSection}
        />

        <input type="hidden" name="sections" value={JSON.stringify(sections.map(({imageFile, previewUrl, ...rest}) => rest))}/>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button type="button" onClick={addSection} className="btn btn-outline btn-primary"><Plus /> Add Section</button>
        </div>

        <div className="text-center mt-8">
          <button type="submit" disabled={isPublishing || !checkState.ok || blogUrl !== checkState.blogUrl} className="btn btn-success px-10">
            {isPublishing ? <>Publishing <span className="loading loading-spinner loading-md"></span></> : <>Publish <Rocket /></>}
          </button>
        </div>
      </form>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert ${publishState?.ok ? 'alert-success' : 'alert-error'}`}>
            <span>{publishState?.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
