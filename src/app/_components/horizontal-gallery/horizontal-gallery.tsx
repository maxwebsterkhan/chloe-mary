"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useS3Images } from "@/hooks/useS3Images";
import styles from "./horizontal-gallery.module.scss";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface GalleryStory {
  id: string;
  title: string;
  description: string;
  location: string;
  ctaText: string;
  ctaLink: string;
  images: string[];
}

// Mock data for gallery stories - you can replace this with real data
const mockGalleryStories: GalleryStory[] = [
  {
    id: "story-1",
    title: "Sarah & James",
    description:
      "A romantic countryside wedding filled with laughter, tears, and endless joy. Every moment captured with authenticity and love.",
    location: "Cotswolds, Gloucestershire",
    ctaText: "View Full Gallery",
    ctaLink: "/gallery/sarah-james",
    images: [],
  },
  {
    id: "story-2",
    title: "Emma & Michael",
    description:
      "An intimate city celebration where modern elegance met timeless romance. A day of pure magic and genuine emotion.",
    location: "Bristol Harbour",
    ctaText: "See More Photos",
    ctaLink: "/gallery/emma-michael",
    images: [],
  },
  {
    id: "story-3",
    title: "Lucy & David",
    description:
      "A rustic barn wedding that perfectly captured their love for nature and each other. Authentic moments in a beautiful setting.",
    location: "Somerset Countryside",
    ctaText: "Explore Gallery",
    ctaLink: "/gallery/lucy-david",
    images: [],
  },
  {
    id: "story-4",
    title: "Rachel & Tom",
    description:
      "A sophisticated celebration of love in the heart of the city. Every detail thoughtfully captured with artistic vision.",
    location: "Bristol City Centre",
    ctaText: "View Complete Story",
    ctaLink: "/gallery/rachel-tom",
    images: [],
  },
  {
    id: "story-5",
    title: "Hannah & Chris",
    description:
      "A coastal wedding that embraced the natural beauty of the sea. Pure, candid moments of genuine happiness and love.",
    location: "Cornwall Coast",
    ctaText: "See Full Collection",
    ctaLink: "/gallery/hannah-chris",
    images: [],
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryStories, setGalleryStories] = useState<GalleryStory[]>([]);
  const [activeStory, setActiveStory] = useState(0);
  const { images: s3Images, loading } = useS3Images({ prefix: "stories" });

  useEffect(() => {
    // Distribute S3 images across gallery stories (5 per story)
    if (s3Images.length > 0) {
      const storiesWithImages = mockGalleryStories.map((story, index) => {
        const startIndex = index * 5;
        const storyImages = s3Images
          .slice(startIndex, startIndex + 5)
          .map((img) => img.url);
        return {
          ...story,
          images: storyImages,
        };
      });
      setGalleryStories(storiesWithImages);
    } else {
      setGalleryStories(mockGalleryStories);
    }
  }, [s3Images]);

  useEffect(() => {
    if (
      !containerRef.current ||
      !galleryRef.current ||
      galleryStories.length === 0
    )
      return;

    const container = containerRef.current;
    const gallery = galleryRef.current;

    // Calculate the total width needed for horizontal scroll
    const totalWidth = galleryStories.length * 100; // 100vw per story

    // Set up the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalWidth * 1.5}vw`,
        pin: true,
        scrub: 2,
        anticipatePin: 1,
        snap: {
          snapTo: galleryStories.map(
            (_, index) => index / (galleryStories.length - 1)
          ),
          duration: { min: 0.2, max: 0.3 },
          delay: 0,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const storyIndex = Math.round(progress * (galleryStories.length - 1));
          setActiveStory(storyIndex);
        },
      },
    });

    // Animate the gallery horizontally
    tl.to(gallery, {
      x: `-${totalWidth - 100}vw`,
      ease: "none",
    });

    // Subtle fade in animations for each story
    galleryStories.forEach((story) => {
      const storyElement = gallery.querySelector(
        `[data-story-id="${story.id}"]`
      );
      if (storyElement) {
        gsap.fromTo(
          storyElement,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storyElement,
              start: "left center",
              end: "right center",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [galleryStories]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading beautiful stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Progress indicator */}
      <div className={styles.progressIndicator}>
        {galleryStories.map((_, index) => (
          <div
            key={index}
            className={`${styles.progressDot} ${
              index === activeStory ? styles.active : ""
            }`}
          />
        ))}
      </div>

      <div ref={galleryRef} className={styles.gallery}>
        {galleryStories.map((story) => (
          <div
            key={story.id}
            data-story-id={story.id}
            className={styles.story}
            style={{ width: "100vw" }}
          >
            <div className={styles.storyContent}>
              <div className={styles.storyHeader}>
                <h2 className={styles.storyTitle}>{story.title}</h2>
                <p className={styles.storyLocation}>{story.location}</p>
              </div>

              <div className={styles.storyImages}>
                {story.images.slice(0, 5).map((image, imgIndex) => (
                  <div key={imgIndex} className={styles.imageContainer}>
                    <Image
                      src={image || `/placeholder-${imgIndex + 1}.jpg`}
                      alt={`${story.title} - Image ${imgIndex + 1}`}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                ))}
              </div>

              <div className={styles.storyFooter}>
                <p className={styles.storyDescription}>{story.description}</p>
                <a href={story.ctaLink} className={styles.storyCta}>
                  {story.ctaText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
