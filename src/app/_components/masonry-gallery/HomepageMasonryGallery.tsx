"use client";
import React from "react";
import Image from "next/image";
import { useS3Images } from "@/hooks/useS3Images";
import styles from "./masonry-gallery.module.scss";

export default function HomepageMasonryGallery() {
  const { images, loading, error } = useS3Images({ prefix: "homepage/" });

  // Grid span logic to match the CSS example
  const getCellClass = (idx: number) => {
    if (idx === 0) return `${styles.imageCell} ${styles.span2x2}`;
    if ((idx + 1) % 4 === 1) return `${styles.imageCell} ${styles.span2r}`;
    if ((idx + 1) % 4 === 2) return `${styles.imageCell} ${styles.span2c}`;
    return styles.imageCell;
  };

  return (
    <section
      aria-label="Homepage Masonry Gallery"
      className={styles.masonrySection}
    >
      <div className={styles.masonryContainer}>
        <div className={styles.gallery}>
          {loading && <p>Loading gallery...</p>}
          {error && <p>Error loading images: {error}</p>}
          {!loading &&
            !error &&
            images.map((image, idx) => (
              <div key={image.key} className={getCellClass(idx)}>
                <Image
                  src={image.url}
                  alt={`Wedding photo: ${image.key
                    .replace(/[-_]/g, " ")
                    .replace(/\.[^/.]+$/, "")}`}
                  width={500}
                  height={500}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "2px",
                  }}
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
