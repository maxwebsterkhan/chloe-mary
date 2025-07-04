"use client";

import { useState } from "react";
import CMImage from "@/components/CMImage";
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

  // Calculate responsive sizes based on columns
  const imageSizes = `(max-width: 640px) 100vw, (max-width: 1024px) ${Math.floor(
    100 / Math.min(columns, 2)
  )}vw, ${Math.floor(100 / columns)}vw`;

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
        {images.map((image, index) => {
          const alt = `Wedding photography: ${image.key
            .replace(/[-_]/g, " ")
            .replace(/\.[^/.]+$/, "")}`;

          return (
            <div
              key={image.key}
              className={styles.imageItem}
              onClick={() => setSelectedImage(image.url)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedImage(image.url);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${alt} in full size`}
            >
              <CMImage
                src={image.url}
                alt={alt}
                fill
                className={styles.image}
                sizes={imageSizes}
                loading={index < 4 ? "eager" : "lazy"}
                priority={index < 2}
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox/Modal for selected image */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxContent}>
            <CMImage
              src={selectedImage}
              alt="Selected gallery image"
              width={1200}
              height={800}
              className={styles.lightboxImage}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 90vw, 1200px"
            />
            <button
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
              aria-label="Close image view"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
