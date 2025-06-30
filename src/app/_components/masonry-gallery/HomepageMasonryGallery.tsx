/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef } from "react";
import { useS3Images } from "@/hooks/useS3Images";
import { Masonry } from "masonic";
import styles from "./masonry-gallery.module.scss";
import { XIcon } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HomepageMasonryGallery() {
  const { images, loading, error } = useS3Images({ prefix: "homepage/" });
  const [lightbox, setLightbox] = useState<null | { url: string; alt: string }>(
    null
  );
  const [isFadingOut, setIsFadingOut] = useState(false);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // Lightbox fade logic using useGSAP
  useGSAP(
    () => {
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
    },
    { dependencies: [lightbox, isFadingOut], scope: imageWrapperRef }
  );

  const handleCloseLightbox = () => setIsFadingOut(true);

  // Card renderer for masonic
  const MasonryCard = ({ data }: { data: { url: string; key: string } }) => (
    <img
      src={data.url}
      alt={`Wedding photo: ${data.key
        .replace(/[-_]/g, " ")
        .replace(/\.[^/.]+$/, "")}`}
      className={styles.galleryImage}
      onClick={() =>
        setLightbox({
          url: data.url,
          alt: `Wedding photo: ${data.key
            .replace(/[-_]/g, " ")
            .replace(/\.[^/.]+$/, "")}`,
        })
      }
      tabIndex={0}
      role="button"
      aria-label={`Wedding photo: ${data.key
        .replace(/[-_]/g, " ")
        .replace(/\.[^/.]+$/, "")}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          setLightbox({
            url: data.url,
            alt: `Wedding photo: ${data.key
              .replace(/[-_]/g, " ")
              .replace(/\.[^/.]+$/, "")}`,
          });
      }}
    />
  );

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p>Error loading images: {error}</p>;
  if (!images.length) return null;

  return (
    <section
      aria-label="Homepage Masonry Gallery"
      className={styles.masonrySection}
    >
      <div className={styles.masonryContainer}>
        <Masonry
          items={images}
          columnGutter={32}
          columnWidth={320}
          overscanBy={2}
          render={MasonryCard}
        />
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
          >
            <img
              src={lightbox.url}
              alt={lightbox.alt}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}
