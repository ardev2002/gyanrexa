"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ImageRenderer from "@/components/ImageRenderer";
import { PostWithSections } from "@/type";



interface PostsGridProps {
  initialPosts: PostWithSections[];
  initialNextToken: string | null;
}

export default function PostsGrid({ initialPosts, initialNextToken }: PostsGridProps) {
  const [posts, setPosts] = useState<PostWithSections[]>(initialPosts || []);
  const [nextToken, setNextToken] = useState<string | null>(initialNextToken);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!nextToken) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading) {
          setLoading(true);
          try {
            const res = await fetch(`/api/posts?nextToken=${encodeURIComponent(nextToken)}`);
            const { posts: newPosts, nextToken: newToken } = await res.json();

            setPosts((prev) => [...prev, ...newPosts]);
            setNextToken(newToken);
          } catch (err) {
            console.error("Error fetching more posts:", err);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextToken, loading]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => {
          const firstSection = post.sections?.[0];

          // Format the date
          const postedDate = post.createdAt && new Date(post.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          return (
            <Link
              key={post.blogUrl}
              href={`/blog/${post.blogUrl}`}
              className="
                group block rounded-xl border
                bg-base-200 dark:bg-gray-800
                border-gray-300 dark:border-gray-700
                shadow-md hover:shadow-lg transition overflow-hidden
              "
            >
              {/* Thumbnail */}
              {firstSection?.imgKey && (
                <div className="aspect-video w-full overflow-hidden">
                  <ImageRenderer imgKey={firstSection.imgKey} alt={post.title!} />
                </div>
              )}

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold line-clamp-2">{post.title}</h2>

                {(post.author || post.createdAt) && (
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <span>{post.author.replace(/_/g, ' ')}</span>
                    <span>{postedDate}</span>
                  </div>
                )}
              </div>


              {/* Footer */}
              <div className="p-4 pt-0">
                <span className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100
                                 text-xs font-medium px-3 py-1 rounded-full">
                  Read More →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* === Infinite Scroll Loader === */}
      {nextToken && (
        <div ref={loaderRef} className="py-6 flex justify-center">
          {loading ? (
            <span className="loading loading-dots loading-lg text-primary"></span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">Scroll down to load more...</span>
          )}
        </div>
      )}

      {/* === No More Posts === */}
      {!nextToken && posts.length > 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No more posts to load.
        </div>
      )}
    </>
  );
}
