"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { useS3Images } from "@/hooks/useS3Images";
import styles from "./masonry-gallery.module.scss";
import { XIcon } from "@phosphor-icons/react";
import { FocusTrap } from "focus-trap-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";

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
            width={3840}
            height={2160}
            priority={true}
            sizes="(min-width: 2560px) 2560px, (min-width: 1920px) 1920px, 95vw"
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

  // Mobile progress bar refs
  const progressBarMobileRef = useRef<HTMLDivElement>(null);
  const barSetterMobileRef = useRef<((v: number) => void) | null>(null);

  // Detect mobile once (client-side only) to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 767;
  });
  // Update on resize (optional)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------------- MOBILE EMBLA CAROUSEL ---------------- */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
    loop: false,
  });

  // When switching from mobile -> desktop, destroy Embla; when switching desktop -> mobile, reInit.
  useEffect(() => {
    if (isMobile) {
      emblaApi?.reInit();
    } else {
      emblaApi?.destroy();
    }
  }, [isMobile, emblaApi]);

  // Re-init Embla on resize to recalc slide sizes
  useEffect(() => {
    if (!isMobile || !emblaApi) return;
    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMobile, emblaApi]);

  // Update mobile progress bar on Embla scroll
  useEffect(() => {
    if (!isMobile || !emblaApi || !progressBarMobileRef.current) return;
    if (!barSetterMobileRef.current) {
      barSetterMobileRef.current = gsap.quickSetter(
        progressBarMobileRef.current,
        "width",
        "%"
      ) as (v: number) => void;
    }
    const updateBar = () => {
      const p = emblaApi.scrollProgress();
      barSetterMobileRef.current?.(p * 100);
    };
    updateBar();
    emblaApi.on("scroll", updateBar);
    emblaApi.on("reInit", updateBar);
    return () => {
      emblaApi.off("scroll", updateBar);
      emblaApi.off("reInit", updateBar);
    };
  }, [isMobile, emblaApi]);

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

  // Skip ScrollTrigger setup on mobile – use Embla instead
  useEffect(() => {
    if (isMobile) {
      // Ensure any desktop triggers are killed when entering mobile mode
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id === "horizontal-gallery") t.kill();
      });
      return; // mobile handled by Embla
    }

    if (
      !galleryRef.current ||
      !containerRef.current ||
      !sectionRef.current ||
      images.length === 0
    )
      return;

    const gallery = galleryRef.current;
    const section = sectionRef.current;

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

      const trackLength = galleryWidth - containerWidth;
      const MAX_PER_GESTURE = isMobile ? 600 : trackLength; // cap horizontal travel per swipe on mobile
      const endDistance = Math.min(trackLength, MAX_PER_GESTURE);

      // Only create ScrollTrigger if content is wider than container
      if (galleryWidth > containerWidth) {
        ScrollTrigger.create({
          id: "horizontal-gallery",
          trigger: section,
          start: "top top",
          end: () => `+=${endDistance}`,
          pin: true,
          pinType: isMobile ? "fixed" : undefined,
          anticipatePin: 1,
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
            x: -trackLength,
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
  }, [images.length, isMobile]);

  if (loading)
    return <div className={styles.loadingState}>Loading gallery...</div>;
  if (error)
    return (
      <div className={styles.errorState}>Error loading images: {error}</div>
    );
  if (!images.length) return null;

  /* ------------------- RENDER ------------------- */
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        aria-label="Homepage Gallery (Swipe)"
        className={styles.horizontalSection}
      >
        <div className={styles.emblaMobile}>
          <div className={styles.emblaViewport} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {images.map((image, index) => {
                const alt = `Wedding photo: ${image.key
                  .replace(/[-_]/g, " ")
                  .replace(/\.[^/.]+$/, "")}`;

                return (
                  <div key={image.key} className={styles.emblaSlide}>
                    <Image
                      src={image.url}
                      alt={alt}
                      width={1046}
                      height={1920}
                      className={styles.galleryImage}
                      sizes="(max-width: 480px) 350px, (max-width: 768px) 365px, (max-width: 1024px) 400px, (max-width: 1440px) 600px, (max-width: 1920px) 800px, (max-width: 2560px) 1050px, 1400px"
                      priority={index < 2}
                      loading={index < 3 ? "eager" : "lazy"}
                      quality={index === 0 ? 85 : index < 3 ? 80 : 75}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.scrollProgressMobile}>
            <div
              ref={progressBarMobileRef}
              className={styles.scrollProgressBarMobile}
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </section>
    );
  }

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
                    width={1046}
                    height={1920}
                    className={styles.galleryImage}
                    sizes="(max-width: 480px) 350px, (max-width: 768px) 365px, (max-width: 1024px) 400px, (max-width: 1440px) 600px, (max-width: 1920px) 800px, (max-width: 2560px) 1050px, 1400px"
                    priority={index < 2}
                    loading={index < 3 ? "eager" : "lazy"}
                    quality={index === 0 ? 85 : index < 3 ? 80 : 75}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
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
