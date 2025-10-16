"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { PostWithSections, Section } from "@/type";

interface BlogSidebarProps {
  recentPosts: (Omit<PostWithSections, 'sections'> & { firstSection?: Omit<Section, "order"> })[];
}

export default function BlogSidebar({ recentPosts }: BlogSidebarProps) {
  return (
    <aside className="w-full lg:w-1/3 xl:w-1/4 mt-10 lg:mt-0 lg:pl-8">
      <div className="flex flex-col gap-8">
        {/* ✅ Recent Posts Section */}
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold border-b border-gray-500 pb-2 mb-4">
              Recent Posts
            </h2>

            <ul className="space-y-4">
              {recentPosts.slice(0, 10).map(rp => (
                <li key={rp.blogUrl}>
                  <Link
                    href={`/blog/${rp.blogUrl}`}
                    className="flex items-center gap-3 hover:text-primary transition"
                  >
                    <div className="relative w-16 h-10 rounded-md overflow-hidden bg-gray-300">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_URL!}/${rp.firstSection?.imgKey}`}
                        alt={rp.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-2 text-sm font-medium">
                      {rp.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ✅ Social Links Section */}
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold border-b border-gray-500 pb-2 mb-4">
              Connect with Us
            </h2>

            <div className="flex items-center justify-around">
              <Link href="https://twitter.com" target="_blank" className="btn btn-circle btn-ghost hover:text-primary">
                <Twitter size={22} />
              </Link>
              <Link href="https://github.com" target="_blank" className="btn btn-circle btn-ghost hover:text-primary">
                <Github size={22} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="btn btn-circle btn-ghost hover:text-primary">
                <Linkedin size={22} />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="btn btn-circle btn-ghost hover:text-primary">
                <Youtube size={22} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
