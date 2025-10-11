"use client";

import Image from "next/image";

interface ImageRendererProps {
  path: string;
  alt?: string;
  priority?: boolean;
}

export default function ImageRenderer({ path, alt = "Blog image", priority = false }: ImageRendererProps) {
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
      <Image
        src={path}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-center transition-transform duration-500 hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
    </div>
  );
}
