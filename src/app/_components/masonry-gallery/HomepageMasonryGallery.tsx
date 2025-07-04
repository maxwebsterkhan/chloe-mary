"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { useS3Images } from "@/hooks/useS3Images";
import styles from "./masonry-gallery.module.scss";
import { XIcon } from "@phosphor-icons/react";
import { FocusTrap } from "focus-trap-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
        clickOutsideDeactivates: false,
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
        <div className={styles.lightboxImageWrapper}>
          <h2 id="lightbox-heading" className={styles.visuallyHidden}>
            {image.alt}
          </h2>
          <Image
            src={image.url}
            alt={image.alt}
            className={styles.lightboxImage}
            width={1200}
            height={1600}
            priority={true}
            quality={90}
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

  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const barSetterRef = useRef<((v: number) => void) | null>(null);

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

  // Setup GSAP ScrollTrigger for horizontal scrolling
  useEffect(() => {
    if (
      !galleryRef.current ||
      !containerRef.current ||
      !sectionRef.current ||
      images.length === 0
    )
      return;

    const gallery = galleryRef.current;
    const section = sectionRef.current;

    // Evaluate mobile breakpoint once per setup
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const updateScrollTrigger = () => {
      // Kill existing ScrollTrigger if it exists
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "horizontal-gallery") {
          trigger.kill();
        }
      });

      // Let the gallery determine its natural width
      gallery.style.width = "auto";

      // Force a reflow to get the actual width
      const galleryWidth = gallery.scrollWidth;
      const containerWidth =
        containerRef.current?.offsetWidth || window.innerWidth;

      // Only create ScrollTrigger if content is wider than container
      if (galleryWidth > containerWidth) {
        ScrollTrigger.create({
          id: "horizontal-gallery",
          trigger: section,
          start: "top top",
          end: () => `+=${galleryWidth - containerWidth}`,
          pin: true,
          pinType: isMobile ? "fixed" : undefined,
          scrub: 0.25,
          onUpdate: (self) => {
            const progress =
              (self.scroll() - self.start) / (self.end - self.start);
            if (progressBarRef.current) {
              if (!barSetterRef.current) {
                barSetterRef.current = gsap.quickSetter(
                  progressBarRef.current,
                  "width",
                  "%"
                ) as (v: number) => void;
              }
              barSetterRef.current?.(progress * 100);
            }
          },
          animation: gsap.to(gallery, {
            x: -(galleryWidth - containerWidth),
            ease: "none",
            force3D: false,
          }),
        });
      }
    };

    // Initial setup
    updateScrollTrigger();

    // Update on window resize
    const handleResize = () => {
      updateScrollTrigger();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "horizontal-gallery") {
          trigger.kill();
        }
      });
    };
  }, [images.length]);

  if (loading)
    return <div className={styles.loadingState}>Loading gallery...</div>;
  if (error)
    return (
      <div className={styles.errorState}>Error loading images: {error}</div>
    );
  if (!images.length) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="Homepage Horizontal Gallery"
      className={styles.horizontalSection}
    >
      <div ref={containerRef} className={styles.horizontalContainer}>
        <div ref={galleryRef} className={styles.horizontalGallery}>
          {images.map((image, index) => {
            const alt = `Wedding photo: ${image.key
              .replace(/[-_]/g, " ")
              .replace(/\.[^/.]+$/, "")}`;

            return (
              <div key={image.key} className={styles.imageWrapper}>
                <div className={styles.imageContainer}>
                  <Image
                    src={image.url}
                    alt={alt}
                    fill
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
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                    quality={85}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Progress Indicator */}
        <div className={styles.scrollProgress}>
          <div
            ref={progressBarRef}
            className={styles.scrollProgressBar}
            style={{ width: "0%" }}
          />
        </div>
      </div>
      {selectedImage && (
        <Lightbox image={selectedImage} onClose={handleLightboxClose} />
      )}
    </section>
  );
}
