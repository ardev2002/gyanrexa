"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageRendererProps {
  imgKey: string;
  alt?: string;
  priority?: boolean;
}

export default function ImageRenderer({
  imgKey,
  alt = "Blog image",
  priority = false,
}: ImageRendererProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-base-200 dark:bg-gray-800">
      {/* Skeleton Loader */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 dark:bg-gray-800">
          <div className="skeleton w-full h-full rounded-none"></div>
        </div>
      )}

      {/* Real Image */}
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
