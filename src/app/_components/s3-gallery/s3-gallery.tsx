"use client";

import { useState } from "react";
import Image from "next/image";
import { useS3Images } from "@/hooks/useS3Images";
import { Skeleton } from "@radix-ui/themes";
import styles from "./s3-gallery.module.scss";

interface S3GalleryProps {
  prefix?: string;
  columns?: number;
  showLoadingState?: boolean;
}

export default function S3Gallery({
  prefix = "gallery",
  columns = 3,
  showLoadingState = true,
}: S3GalleryProps) {
  const { images, loading, error, refetch } = useS3Images({ prefix });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading && showLoadingState) {
    return (
      <div className={styles.gallery}>
        <div
          className={styles.grid}
          style={{ "--columns": columns } as React.CSSProperties}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={styles.imageItem}>
              <Skeleton width="100%" height="300px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.gallery}>
        <div className={styles.error}>
          <p>Error loading images: {error}</p>
          <button onClick={refetch} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.gallery}>
      <div
        className={styles.grid}
        style={{ "--columns": columns } as React.CSSProperties}
      >
        {images.map((image) => (
          <div
            key={image.key}
            className={styles.imageItem}
            onClick={() => setSelectedImage(image.url)}
          >
            <Image
              src={image.url}
              alt={`Gallery image: ${image.key}`}
              fill
              className={styles.image}
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Lightbox/Modal for selected image */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxContent}>
            <Image
              src={selectedImage}
              alt="Selected gallery image"
              width={1200}
              height={800}
              className={styles.lightboxImage}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            />
            <button
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
