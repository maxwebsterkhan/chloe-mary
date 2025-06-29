"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useS3Images } from "@/hooks/useS3Images";
import styles from "./masonry-gallery.module.scss";
import { X as XIcon } from "@phosphor-icons/react";
import gsap from "gsap";

export default function HomepageMasonryGallery() {
  const { images, loading, error } = useS3Images({ prefix: "homepage/" });
  const [lightbox, setLightbox] = useState<null | { url: string; alt: string }>(
    null
  );
  const [isFadingOut, setIsFadingOut] = useState(false);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // Grid span logic to match the CSS example
  const getCellClass = (idx: number) => {
    if (idx === 0) return `${styles.imageCell} ${styles.span2x2}`;
    if ((idx + 1) % 4 === 1) return `${styles.imageCell} ${styles.span2r}`;
    if ((idx + 1) % 4 === 2) return `${styles.imageCell} ${styles.span2c}`;
    return styles.imageCell;
  };

  // Close lightbox on ESC
  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line
  }, [lightbox]);

  // GSAP fade in/out
  useEffect(() => {
    if (!lightbox || !imageWrapperRef.current) return;
    if (!isFadingOut) {
      gsap.fromTo(
        imageWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.32, ease: "power2.out" }
      );
    } else {
      gsap.to(imageWrapperRef.current, {
        opacity: 0,
        duration: 0.32,
        ease: "power2.out",
        onComplete: () => {
          setLightbox(null);
          setIsFadingOut(false);
        },
      });
    }
  }, [lightbox, isFadingOut]);

  const handleCloseLightbox = () => {
    setIsFadingOut(true);
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
            images.map((image, idx) => {
              const alt = `Wedding photo: ${image.key
                .replace(/[-_]/g, " ")
                .replace(/\.[^/.]+$/, "")}`;
              return (
                <div
                  key={image.key}
                  className={getCellClass(idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={alt}
                  onClick={() => setLightbox({ url: image.url, alt })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setLightbox({ url: image.url, alt });
                  }}
                  style={{ cursor: "zoom-in" }}
                >
                  <Image
                    src={image.url}
                    alt={alt}
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
              );
            })}
        </div>
      </div>
      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={handleCloseLightbox}
        >
          <button
            className={styles.lightboxClose}
            aria-label="Close image view"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseLightbox();
            }}
            type="button"
          >
            <XIcon size={32} weight="bold" />
          </button>
          <div
            className={styles.lightboxImageWrapper}
            ref={imageWrapperRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Image
              src={lightbox.url}
              alt={lightbox.alt}
              width={1200}
              height={800}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                borderRadius: "2px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                background: "#fff",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
