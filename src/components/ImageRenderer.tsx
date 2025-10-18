"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageRendererProps {
  imgKey: string;
  alt?: string;
  priority?: boolean;
  variant?: "small" | "normal" | "wide"; // controls image size
  rounded?: boolean; // optional rounded corners
}

export default function ImageRenderer({
  imgKey,
  alt = "Blog image",
  priority = false,
  variant = "normal",
  rounded = true,
}: ImageRendererProps) {
  const [loaded, setLoaded] = useState(false);

  // Adjust size/aspect ratio based on variant
  const aspectClass =
    variant === "small"
      ? "aspect-[4/3] max-h-48 sm:max-h-56"
      : variant === "wide"
      ? "aspect-[21/9]"
      : "aspect-video";

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden bg-base-200 dark:bg-gray-800 ${
        rounded ? "rounded-xl" : ""
      }`}
    >
      {/* Skeleton Loader */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 dark:bg-gray-800 animate-pulse">
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
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
