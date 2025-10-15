"use client";
import React, { useActionState, useState } from "react";
import { publishBlogAction } from "@/utils/actions/publishBlogAction";
import Sections from "@/components/crud/Sections";
import { Info, Rocket, Search, CircleCheck, CircleX } from "lucide-react";
import { inputValidator } from "@/utils/lib/inputValidator";
import { BlogClientSection } from "@/type";
import { isBlogURLAvailableAction } from "@/utils/actions/isBlogURLAvailableAction";

export default function AddBlogPage() {
  const [blogUrl, setBlogUrl] = useState('');
  const [recentState, formAction, isPublishing] = useActionState(publishBlogAction, { message: '', isSubmitted: false, ok: false });
  const [checkState, checkBlogURL, isChecking] = useActionState(isBlogURLAvailableAction, { message: '', isSubmitted: false, ok: false });
  const [sections, setSections] = useState<BlogClientSection[]>([
    {
      subheading: "",
      paragraph: "",
      order: 1,
      imageFile: null,
      previewUrl: "",
      uploadProgress: 0,
      imgKey: "",
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        subheading: "",
        paragraph: "",
        order: sections.length + 1,
        imageFile: null,
        previewUrl: "",
        uploadProgress: 0,
        imgKey: "",
      },
    ]);
  };

  const removeLastSection = () => {
    if (sections.length === 1) {
      alert("At least one section is required.");
      return;
    }
    const updated = sections
      .slice(0, -1)
      .map((sec, i) => ({ ...sec, order: i + 1 }));
    setSections(updated);
  };

  const handleSectionChange = (index: number, field: string, value: any) => {
    const updated = [...sections];
    (updated[index] as any)[field] = value;
    setSections(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 text-base-content">
      <h1 className="text-4xl font-bold mb-6 text-center">
        📝 Add New Blog Post
      </h1>

      <form action={checkBlogURL}>
        <label className="label font-semibold">Blog Url</label>
        <div className="relative">
          <div className="join w-full">
            <input
              type="text"
              name="blogUrl"
              placeholder="Enter blog URL (e.g., enhance-battery-life)"
              className="input input-bordered join-item w-full"
              defaultValue={checkState.blogUrl}
              onKeyDown={e => inputValidator(e, "url")}
              onChange={e => setBlogUrl(e.target.value)}
            />
            <button
              type="submit"
              className={`btn btn-primary join-item ${isChecking || blogUrl === '' || checkState.blogUrl === blogUrl ? 'btn-disabled' : ''}`}
            >
              {isChecking ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {
          checkState.message ? (<p className={`my-1 text-sm flex items-center gap-1 ${checkState.ok ? "text-success" : "text-error"}`}>
              {checkState.ok ? (<CircleCheck size={16} />) : (<CircleX size={16} />)} <span>{checkState.message}</span>
            </p>) : (<p className="my-1 text-sm invisible h-4"></p>)
        }
      </form>

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
              defaultValue={recentState?.fields?.title}
              onKeyDown={e => inputValidator(e, 'title')}
              required
            />
            <div
              className="tooltip tooltip-left absolute right-2 top-1/2 -translate-y-1/2"
              data-tip="Blog title means the main heading of the blog. This will be displayed on the blog card. ex: 'How to enhance your mobile battery life'"
            >
              <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="label font-semibold">Category</label>
          <select
            name="categoryId"
            className="select select-bordered w-full"
            required
          >
            <option disabled defaultValue={"select"}>
              Select category
            </option>
            <option value="MOBILES">Mobiles</option>
            <option value="TECHNOLOGY">Technology</option>
            <option value="TIPS_AND_TRICKS">Tips & Tricks</option>
            <option value="LIFESTYLE">Lifestyle</option>
            <option value="HEALTH_AND_WELLNESS">Health & Wellness</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="SPORTS">Sports</option>
          </select>
        </div>

        {/* Author */}
        <div>
          <label className="label font-semibold">Author</label>
          <select name="author" className="select select-bordered w-full">
            <option disabled defaultValue={"select"}>
              Select Author
            </option>
            <option value="Ankur_Rajbongshi">Ankur Rajbongshi</option>
            <option value="Manabendra_Nath">Manabendra Nath</option>
          </select>
        </div>

        {/* Sections */}
        <Sections
          sections={sections}
          handleSectionChange={handleSectionChange}
        />

        <input
          type="hidden"
          name="sections"
          value={JSON.stringify(
            sections.map(
              ({ imageFile, previewUrl, uploadProgress, ...rest }) => rest
            )
          )}
        />

        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button
            type="button"
            onClick={addSection}
            className="btn btn-outline btn-primary"
          >
            ➕ Add Another Section
          </button>
          <button
            type="button"
            onClick={removeLastSection}
            className="btn btn-outline btn-error"
          >
            ❌ Remove Last Section
          </button>
        </div>

        <div className="text-center mt-8">
          <button type="submit" disabled={isPublishing} className={`btn btn-success px-10 ${isPublishing || !checkState.ok || blogUrl !== checkState.blogUrl ? 'btn-disabled' : ''}`}>
            {isPublishing ? <>Publishing <span className="loading loading-spinner loading-md"></span></> : <>Publish <Rocket /></>}
          </button>
        </div>
      </form>

      {/* Toast Message */}
      {recentState?.isSubmitted && (
        <div className="toast toast-top toast-center">
          <div className={`alert ${recentState?.ok ? 'alert-success' : 'alert-error'}`}>
            <span>{recentState?.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}