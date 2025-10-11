"use client";
import React, { useState } from "react";
import { publishBlog } from "@/utils/actions/publishBlog";
import AddSection from "@/components/crud/AddSection";
import { Info } from "lucide-react";
import { inputValidator } from "@/utils/inputValidator";

export default function AddBlogPage() {
  const [sections, setSections] = useState([
    {
      subheading: "",
      paragraph: "",
      order: 1,
      imageFile: null,
      previewUrl: "",
      uploadProgress: 0,
      imgUrl: "",
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
        imgUrl: "",
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

      <form className="space-y-6" action={publishBlog}>
        {/* Title */}
        <div>
          <label className="label font-semibold">Blog Title</label>
          <div className="relative">
            <input
              type="text"
              name="title"
              className="input input-bordered w-full pr-10"
              onKeyDown={(e) => inputValidator(e, 'title')}
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

        {/* Slug */}
        <div>
          <label className="label font-semibold">Blog Url</label>
          <div className="relative">
            <input
              type="text"
              name="slug"
              className="input input-bordered w-full pr-10"
              onKeyDown={(e) => inputValidator(e, 'url')}
              required
            />
            <div
              className="tooltip tooltip-left absolute right-2 top-1/2 -translate-y-1/2"
              data-tip="This value must be unique for each blog because it will be the identity for a blog post. Ex: 'https://www.example.com/blog-url'.
              Only alphanumeric characters and hyphens are allowed. No spaces or special characters."
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
        <AddSection
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

        <div className="flex justify-between mt-4">
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
          <button type="submit" className="btn btn-success px-10">
            🚀 Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}