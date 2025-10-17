"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-base-200 dark:bg-gray-800 shadow">
      {/* Fixed 21:9 ratio */}
      <div className="relative w-full" style={{ aspectRatio: "21 / 9" }}>
        {/* Skeleton loader (visible until image loads) */}
        {!loaded && (
          <div className="absolute inset-0">
            <div className="skeleton w-full h-full rounded-none"></div>
          </div>
        )}

        {/* Actual Image */}
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_URL!}/${imgKey}`}
          alt={alt}
          fill
          priority={priority}
          className={`object-cover object-center transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 60vw"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
