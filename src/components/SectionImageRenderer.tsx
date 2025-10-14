"use client";

import Image from "next/image";

interface SectionImageRendererProps {
  imgKey: string;
  alt?: string;
  priority?: boolean;
}

export default function SectionImageRenderer({
  imgKey,
  alt = "Blog section image",
  priority = false,
}: SectionImageRendererProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow">
      {/* Keep fixed aspect ratio like 21:9 (wider, shorter) */}
      <div className="relative w-full" style={{ aspectRatio: "21 / 9" }}>
        <Image
          src={process.env.NEXT_PUBLIC_AWS_BUCKET_URL! + imgKey}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 60vw"
        />
      </div>
    </div>
  );
}
