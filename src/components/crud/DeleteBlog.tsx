"use client";
import { useActionState, useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { inputValidator } from "@/utils/lib/inputValidator";
import { getPostAction } from "@/utils/actions/getPostAction";
import { deleteBlogAction } from "@/utils/actions/deleteBlogAction";

export default function DeleteBlog() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [getPostState, getPost, isFinding] = useActionState(getPostAction, { message: '', isSubmitted: false, ok: false, blogUrl: '' });
  const [deleteBlogState, deleteBlog, isDeleting] = useActionState(deleteBlogAction, { message: '', isSubmitted: false, ok: false });
  const [blogUrl, setBlogUrl] = useState('');
  useEffect(() => {
    if (deleteBlogState?.ok) {
      getPostState.blogUrl = '';
      getPostState.isSubmitted = false;
    }
  }, [deleteBlogState]);

  return (
    <div className="bg-base-200 p-8 rounded-xl shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center flex justify-center items-center gap-2"><Trash2 /> Delete Blog Post</h2>

      {/* Search Input */}
      <form action={getPost}>
        <div className="join w-full mb-6">
          <input
            name="blogUrl"
            type="text"
            value={blogUrl}
            placeholder="Enter blog URL"
            className="input input-bordered join-item w-full"
            onChange={e => setBlogUrl(e.target.value)}
            onKeyDown={e => inputValidator(e, 'url')}
          />
          <button type="submit" className={`btn btn-primary join-item ${isFinding == true || blogUrl === '' || getPostState.blogUrl === blogUrl ? 'btn-disabled' : ''}`}>
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Post Display */}
      {getPostState?.post ? (
        <div className="card bg-base-100 shadow-md p-5 border border-base-300 w-full">
          <h3 className="font-semibold text-lg text-primary cursor-pointer hover:underline"
            onClick={() => setConfirmDelete(!confirmDelete)}>
            {getPostState?.post.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{getPostState?.blogUrl}</p>

          {confirmDelete && (
            <form action={deleteBlog}>
              <div className="mt-4 flex items-center gap-3">
                <input type="hidden" name="blogUrl" value={getPostState?.blogUrl} />
                <button
                  className={`btn btn-error flex items-center gap-2 ${isDeleting ? 'btn-disabled' : ''}`}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Permanently
                </button>
                <button className="btn" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
              </div>
            </form>

          )}
        </div>
      ) : (
        getPostState?.blogUrl && getPostState.isSubmitted && (
          <div className="alert alert-warning mt-4">
            <span>No match found.</span>
          </div>
        )
      )}
    </div>
  );
}
