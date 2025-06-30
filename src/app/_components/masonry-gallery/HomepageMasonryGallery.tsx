/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useS3Images } from "@/hooks/useS3Images";
import styles from "./masonry-gallery.module.scss";
import { XIcon } from "@phosphor-icons/react";
import { FocusTrap } from "focus-trap-react";

type ImageData = { url: string; key: string };

interface LightboxProps {
  image: { url: string; alt: string };
  onClose: () => void;
}

function Lightbox({ image, onClose }: LightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Autofocus close button on mount
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Only close if overlay itself is clicked, not its children
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: false, // Don't let focus-trap handle closing
      }}
    >
      <div
        className={styles.lightboxOverlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-heading"
        onClick={handleOverlayClick}
        tabIndex={-1}
      >
        <button
          ref={closeBtnRef}
          className={styles.lightboxClose}
          aria-label="Close image view"
          onClick={onClose}
          type="button"
          autoFocus
        >
          <XIcon size={32} weight="bold" />
        </button>
        <div
          className={styles.lightboxImageWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="lightbox-heading" className={styles.visuallyHidden}>
            {image.alt}
          </h2>
          <img
            src={image.url}
            alt={image.alt}
            className={styles.lightboxImage}
          />
        </div>
      </div>
    </FocusTrap>
  );
}

export default function HomepageMasonryGallery() {
  const { images = [], loading, error } = useS3Images({ prefix: "homepage/" });
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  const handleImageSelect = useCallback((image: ImageData) => {
    setSelectedImage({
      url: image.url,
      alt: `Wedding photo: ${image.key
        .replace(/[-_]/g, " ")
        .replace(/\.[^/.]+$/, "")}`,
    });
  }, []);

  const handleLightboxClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p>Error loading images: {error}</p>;
  if (!images.length) return null;

  return (
    <section
      aria-label="Homepage Masonry Gallery"
      className={styles.masonrySection}
    >
      <div className={styles.masonryContainer}>
        <div className={styles.gallery}>
          {images.map((image) => {
            const alt = `Wedding photo: ${image.key
              .replace(/[-_]/g, " ")
              .replace(/\.[^/.]+$/, "")}`;
            return (
              <img
                key={image.key}
                src={image.url}
                alt={alt}
                className={styles.galleryImage}
                onClick={() => handleImageSelect(image)}
                tabIndex={0}
                role="button"
                aria-label={alt}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleImageSelect(image);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
      {selectedImage && (
        <Lightbox image={selectedImage} onClose={handleLightboxClose} />
      )}
    </section>
  );
}
