"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { inputValidator } from "@/utils/lib/inputValidator";
import { getPostAction } from "@/utils/actions/getPostAction";
import { deleteBlogAction } from "@/utils/actions/deleteBlogAction";

export default function DeleteBlog() {
  const [getPostState, getPost, isGetting] = useActionState(getPostAction, { message: '', isSubmitted: false, ok: false, blogUrl: '' });
  const [deleteBlogState, deleteBlog, isDeleting] = useActionState(deleteBlogAction, { message: '', isSubmitted: false, ok: false });
  const [blogUrl, setBlogUrl] = useState('');
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (deleteBlogState?.ok) {
      getPostState.blogUrl = '';
      getPostState.isSubmitted = false;
    }
  }, [deleteBlogState]);

  return (
    <div className="bg-base-200 p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Delete Blog Post</h2>

      {/* Search Input */}
      <form action={getPost}>
        <div className="join w-full mb-6">
          <input
            name="blogUrl"
            type="text"
            value={blogUrl}
            placeholder="Enter blog URL"
            className="input input-bordered border-gray-400 dark:border-gray-600 join-item w-full"
            onChange={e => setBlogUrl(e.target.value)}
            onKeyDown={e => inputValidator(e, 'url')}
          />
          <button type="submit" className={`btn btn-primary join-item ${isGetting == true || blogUrl === '' || getPostState.blogUrl === blogUrl ? 'btn-disabled' : ''}`}>
            {isGetting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {/* Post Display */}
      {getPostState?.post ? (
        <div className="card bg-base-100 shadow-md p-5 border border-base-300 w-full">
          <div className="flex gap-4 items-center flex-wrap justify-center">
            <img src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_URL!}/${getPostState?.post.sections[0].imgKey}`} alt={getPostState?.post.title} className="w-full sm:w-40 h-20 object-cover rounded-lg" />
            <div>
              <h3 className="font-semibold text-lg text-primary cursor-pointer hover:underline">{getPostState?.post.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{getPostState?.blogUrl}</p>
            </div>
            <button className="inline-block btn btn-error btn-sm" onClick={() => deleteModalRef.current?.showModal()}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <dialog ref={deleteModalRef} className="modal modal-middle">
            <form action={deleteBlog}>
              <div className="modal-box w-full mt-4 flex flex-col items-center gap-3">
                <input type="hidden" name="blogUrl" value={getPostState?.blogUrl} />
                <div className="flex flex-col gap-0.5 text-center mb-2">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Are you sure?</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone.</p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className={`btn btn-error flex items-center gap-2 ${isDeleting ? 'btn-disabled' : ''}`}
                  >
                    {
                      isDeleting ? (<span className="loading loading-spinner loading-sm"></span>) : (<span className="flex items-center gap-2"><Trash2 className="w-4 h-4" /> Delete</span>)
                    }
                  </button>
                  <button type="button" className="btn" onClick={() => deleteModalRef.current?.close()}>
                    Cancel
                  </button>
                </div>

              </div>
            </form>
          </dialog>
        </div>
      ) : (
        getPostState?.blogUrl && getPostState.isSubmitted && (
          <div className="alert alert-error mt-4">
            <span>{getPostState?.message}</span>
          </div>
        )
      )}

      {/* Toast Message */}
      {deleteBlogState.ok && (
        <div className="toast toast-top toast-center">
          <div className={`alert ${deleteBlogState?.ok ? 'alert-success' : 'alert-error'}`}>
            <span>{deleteBlogState?.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
