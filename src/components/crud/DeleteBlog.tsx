"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { Search, Trash2, UserPen, CalendarDays } from "lucide-react";
import { inputValidator } from "@/utils/lib/inputValidator";
import { getPostAction } from "@/utils/actions/getPostAction";
import { deleteBlogAction } from "@/utils/actions/deleteBlogAction";
import Link from "next/link";
import ImageRenderer from "../ImageRenderer";

export default function DeleteBlog() {
  const [getPostState, getPost, isGetting] = useActionState(getPostAction, { message: "", isSubmitted: false, ok: false, blogUrl: "" });
  const [deleteBlogState, deleteBlog, isDeleting] = useActionState(deleteBlogAction, { message: "", isSubmitted: false, ok: false });
  const [blogUrl, setBlogUrl] = useState("");
  const [showToast, setShowToast] = useState(false);
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (deleteBlogState?.isSubmitted) {
      deleteModalRef.current?.close();
      setShowToast(true);
      getPostState.isSubmitted = false;
    }
  }, [deleteBlogState]);

  useEffect(() => {
    let toastTimeout: NodeJS.Timeout;
    if (showToast) {
      toastTimeout = setTimeout(() => setShowToast(false), 3000);
    }
    return () => clearTimeout(toastTimeout);
  }, [showToast]);

  return (
    <>
      <div className="bg-base-200 p-6 sm:p-10 rounded-xl shadow-lg max-w-3xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Delete Blog Post</h2>

        {/* Search Input */}
        <form action={getPost} className="mb-8">
          <div className="join w-full">
            <input
              name="blogUrl"
              type="text"
              value={blogUrl}
              placeholder="Enter blog URL"
              className="input input-bordered border-gray-400 dark:border-gray-600 join-item w-full"
              onChange={(e) => setBlogUrl(e.target.value)}
              onBeforeInput={(e) => inputValidator(e, "url")}
            />
            <button
              type="submit"
              className={`btn btn-primary join-item ${isGetting || blogUrl === "" || getPostState.blogUrl === blogUrl ? "btn-disabled" : ""}`}
              disabled={isGetting || blogUrl === "" || getPostState.blogUrl === blogUrl}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {
          isGetting && (
            <div className="flex justify-center">
              <span className="loading loading-dots loading-xl"></span>
            </div>
          )
        }

        {
          getPostState.isSubmitted && !getPostState.ok && (
            <div className="alert alert-error">
              <span>{getPostState.message}</span>
            </div>
          )
        }
        
        {/* Blog Card */}
        {getPostState?.post && (
          <div className="card bg-base-100 border border-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
            {/* Blog Image */}
            <div>
              <ImageRenderer variant="small" imgKey={`${getPostState.post.sections[0].imgKey}`} alt={getPostState.post.title} />
            </div>

            {/* Blog Content */}
            <div className="card-body">
              <h2 className="card-title text-2xl sm:text-3xl font-bold text-primary hover:underline cursor-pointer">
                <Link href={`/blog/${getPostState.post.blogUrl}`}>{getPostState.post.title}</Link>
              </h2>

              {/* Meta Info */}
              <div className="flex sm:flex-row justify-between items-start sm:items-center mt-6 gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-8 flex justify-center items-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <UserPen size={24} />
                    </div>
                  </div>
                  <span className="flex items-center gap-1">
                    {getPostState.post.author}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  <span>{new Date(getPostState.post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Delete Button */}
              <div className="card-actions justify-center mt-6">
                <button
                  className="btn btn-error btn-md flex items-center gap-2"
                  onClick={() => deleteModalRef.current?.showModal()}
                >
                  <Trash2 className="w-4 h-4" /> Delete Blog
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <dialog ref={deleteModalRef} className="modal modal-middle">
        <form action={deleteBlog}>
          <div className="modal-box text-center space-y-4">
            <input type="hidden" name="blogUrl" value={getPostState?.blogUrl} />
            <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-200">Are you sure?</h3>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>

            <div className="flex justify-center gap-4 mt-4">
              <button type="submit" className={`btn btn-error ${isDeleting ? "btn-disabled" : ""}`}>
                {isDeleting ? <span className="loading loading-spinner loading-sm"></span> : "Yes, Delete"}
              </button>
              <button type="button" className="btn" onClick={() => deleteModalRef.current?.close()}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </dialog>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert ${deleteBlogState?.ok ? "alert-success" : "alert-error"}`}>
            <span>{deleteBlogState?.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
