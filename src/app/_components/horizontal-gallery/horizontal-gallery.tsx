"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const testImage1 =
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D";
const testImage2 =
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D";
const testImage3 =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D";
const testImage4 =
  "https://images.unsplash.com/flagged/photo-1620830102229-9db5c00d4afc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D";
const testImage5 =
  "https://media.istockphoto.com/id/2156079626/photo/bride-and-groom-wedding-with-dog.webp?a=1&b=1&s=612x612&w=0&k=20&c=Et2NAAOw4QK-VNebfRcQi5M2z4ZZfmUNPBgYK7dGoEU=";
const mockGalleryStories: GalleryStory[] = [
  {
    id: "story-1",
    title: "Sarah & James",
    description:
      "A romantic countryside wedding filled with laughter, tears, and endless joy. Every moment captured with authenticity and love.",
    location: "Cotswolds, Gloucestershire",
    ctaText: "View Full Gallery",
    ctaLink: "/gallery/sarah-james",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
  {
    id: "story-2",
    title: "Emma & Michael",
    description:
      "An intimate city celebration where modern elegance met timeless romance. A day of pure magic and genuine emotion.",
    location: "Bristol Harbour",
    ctaText: "See More Photos",
    ctaLink: "/gallery/emma-michael",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
  {
    id: "story-3",
    title: "Lucy & David",
    description:
      "A rustic barn wedding that perfectly captured their love for nature and each other. Authentic moments in a beautiful setting.",
    location: "Somerset Countryside",
    ctaText: "Explore Gallery",
    ctaLink: "/gallery/lucy-david",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
  {
    id: "story-4",
    title: "Rachel & Tom",
    description:
      "A sophisticated celebration of love in the heart of the city. Every detail thoughtfully captured with artistic vision.",
    location: "Bristol City Centre",
    ctaText: "View Complete Story",
    ctaLink: "/gallery/rachel-tom",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
  {
    id: "story-5",
    title: "Hannah & Chris",
    description:
      "A coastal wedding that embraced the natural beauty of the sea. Pure, candid moments of genuine happiness and love.",
    location: "Cornwall Coast",
    ctaText: "See Full Collection",
    ctaLink: "/gallery/hannah-chris",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryStories] = useState<GalleryStory[]>(mockGalleryStories);
  const [activeStory, setActiveStory] = useState(0);

  // Move state management to component level
  const [activeThumbs, setActiveThumbs] = useState<number[]>(
    new Array(galleryStories.length).fill(0)
  );
  const thumbRefs = useRef<(HTMLButtonElement | null)[][]>(
    galleryStories.map(() => [])
  );

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        if (activeStory > 0) {
          const newStoryIndex = activeStory - 1;
          setActiveStory(newStoryIndex);
          scrollToStory(newStoryIndex);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (activeStory < galleryStories.length - 1) {
          const newStoryIndex = activeStory + 1;
          setActiveStory(newStoryIndex);
          scrollToStory(newStoryIndex);
        }
        break;
      case "Home":
        event.preventDefault();
        setActiveStory(0);
        scrollToStory(0);
        break;
      case "End":
        event.preventDefault();
        setActiveStory(galleryStories.length - 1);
        scrollToStory(galleryStories.length - 1);
        break;
    }
  };

  const scrollToStory = (storyIndex: number) => {
    // Ensure storyIndex is within bounds
    const boundedStoryIndex = Math.max(
      0,
      Math.min(galleryStories.length - 1, storyIndex)
    );

    if (containerRef.current) {
      const scrollDistance = boundedStoryIndex * 100;
      const scrollPosition = containerRef.current.offsetTop + scrollDistance;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleProgressDotClick = (index: number) => {
    setActiveStory(index);
    scrollToStory(index);
  };

  // Handle thumbnail clicks
  const handleThumbClick = (storyIndex: number, thumbIdx: number) => {
    setActiveThumbs((prev) => {
      const newThumbs = [...prev];
      newThumbs[storyIndex] = thumbIdx;
      return newThumbs;
    });
  };

  // Handle thumbnail keyboard navigation
  const handleThumbKeyDown = (
    e: React.KeyboardEvent,
    storyIndex: number,
    thumbIdx: number
  ) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (thumbIdx + 1) % 5;
      thumbRefs.current[storyIndex]?.[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (thumbIdx + 4) % 5;
      thumbRefs.current[storyIndex]?.[prev]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleThumbClick(storyIndex, thumbIdx);
    }
  };

  useEffect(() => {
    if (
      !containerRef.current ||
      !galleryRef.current ||
      galleryStories.length === 0
    )
      return;

    const container = containerRef.current;
    const gallery = galleryRef.current;
    const pinnedContent = container.querySelector(`.${styles.pinnedContent}`);

    if (!pinnedContent) return;

    // Calculate the total width needed for horizontal scroll
    const totalWidth = galleryStories.length * 100; // 100vw per story
    const scrollDistance = totalWidth - 100; // Subtract one viewport width

    // Set up the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedContent,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 0.8, // Smooth, responsive scrub
        anticipatePin: 1,
        snap: {
          snapTo: galleryStories.map(
            (_, index) => index / (galleryStories.length - 1)
          ),
          duration: { min: 0.3, max: 0.5 }, // Gentle snap duration
          delay: 0,
          ease: "power1.out", // Smooth ease for natural feel
        },
        onUpdate: (self) => {
          const progress = self.progress;
          // Clamp progress between 0 and 1 to prevent over-scrolling
          const clampedProgress = Math.max(0, Math.min(1, progress));
          const storyIndex = Math.round(
            clampedProgress * (galleryStories.length - 1)
          );
          // Ensure storyIndex is within bounds
          const boundedStoryIndex = Math.max(
            0,
            Math.min(galleryStories.length - 1, storyIndex)
          );
          setActiveStory(boundedStoryIndex);
        },
        onEnter: () => {
          // Ensure we start at the first story when entering
          setActiveStory(0);
        },
        onLeave: () => {
          // Optional: handle when leaving the gallery area
        },
        onEnterBack: () => {
          // Ensure we end at the last story when scrolling back up
          setActiveStory(galleryStories.length - 1);
        },
        onLeaveBack: () => {
          // Optional: handle when leaving the gallery area going backwards
        },
      },
    });

    // Animate the gallery horizontally with precise control
    tl.to(gallery, {
      x: `-${scrollDistance}vw`,
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

  return (
    <div
      ref={containerRef}
      className={styles.container}
      role="region"
      aria-label="Wedding Stories Gallery"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Progress indicator */}
      <div
        className={styles.progressIndicator}
        role="tablist"
        aria-label="Story navigation"
      >
        {galleryStories.map((_, index) => (
          <button
            key={index}
            className={`${styles.progressDot} ${
              index === activeStory ? styles.active : ""
            }`}
            onClick={() => handleProgressDotClick(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleProgressDotClick(index);
              }
            }}
            role="tab"
            aria-selected={index === activeStory}
            aria-label={`Go to story ${index + 1}: ${
              galleryStories[index].title
            }`}
            tabIndex={index === activeStory ? 0 : -1}
          />
        ))}
      </div>

      <div className={styles.pinnedContent}>
        <div ref={galleryRef} className={styles.gallery}>
          {galleryStories.map((story, index) => {
            return (
              <div
                key={story.id}
                data-story-id={story.id}
                className={styles.story}
                aria-hidden={index !== activeStory}
                role="tabpanel"
                aria-label={`Story ${index + 1}: ${story.title}`}
              >
                <div className={styles.storyContent}>
                  <div className={styles.layoutUnified}>
                    <div className={styles.heroImageContainerUnified}>
                      <Image
                        src={story.images[activeThumbs[index]]}
                        alt={`${story.title} - Hero`}
                        fill
                        className={styles.heroImageUnified}
                        sizes="100vw"
                        priority={index === activeStory}
                      />
                      <div className={styles.heroOverlayUnified}>
                        <h2 className={styles.storyTitle}>{story.title}</h2>
                        <p className={styles.storyLocation}>{story.location}</p>
                      </div>
                    </div>
                    <div
                      className={styles.thumbsRowUnified}
                      role="tablist"
                      aria-label={`Gallery thumbnails for ${story.title}`}
                    >
                      {story.images.map((image, thumbIdx) => (
                        <button
                          key={thumbIdx}
                          ref={(el) => {
                            if (thumbRefs.current[index]) {
                              thumbRefs.current[index][thumbIdx] = el;
                            }
                          }}
                          className={
                            styles.thumbButton +
                            (activeThumbs[index] === thumbIdx
                              ? " " + styles.activeThumb
                              : "")
                          }
                          aria-selected={activeThumbs[index] === thumbIdx}
                          aria-label={`Show image ${thumbIdx + 1} for ${
                            story.title
                          }`}
                          tabIndex={activeThumbs[index] === thumbIdx ? 0 : -1}
                          onClick={() => handleThumbClick(index, thumbIdx)}
                          onKeyDown={(e) =>
                            handleThumbKeyDown(e, index, thumbIdx)
                          }
                          type="button"
                          role="tab"
                        >
                          <span className="sr-only">{`Show image ${
                            thumbIdx + 1
                          }`}</span>
                          <Image
                            src={image}
                            alt={`Thumbnail ${thumbIdx + 1} for ${story.title}`}
                            fill
                            className={styles.thumbImageUnified}
                            sizes="100px"
                          />
                        </button>
                      ))}
                    </div>
                    <div className={styles.bottomSectionUnified}>
                      <p className={styles.storyDescription}>
                        {story.description}
                      </p>
                      <a href={story.ctaLink} className={styles.storyCta}>
                        {story.ctaText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessibility instructions */}
      <div className={styles.accessibilityInfo} aria-live="polite">
        <p className="sr-only">
          Use left and right arrow keys to navigate between stories. Press Home
          to go to the first story, End to go to the last story.
        </p>
      </div>
    </div>
  );
}
