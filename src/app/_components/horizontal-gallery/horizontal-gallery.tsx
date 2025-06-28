"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./horizontal-gallery.module.scss";

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
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [galleryStories] = useState<GalleryStory[]>(mockGalleryStories);
  const [activeThumbs, setActiveThumbs] = useState<number[]>(
    new Array(galleryStories.length).fill(0)
  );
  const thumbRefs = useRef<(HTMLButtonElement | null)[][]>(
    galleryStories.map(() => [])
  );

  useEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Initialize story refs array
    storyRefs.current = storyRefs.current.slice(0, galleryStories.length);

    // Create parallax animations for each story
    storyRefs.current.forEach((storyRef) => {
      if (!storyRef) return;

      const heroImage = storyRef.querySelector(`.${styles.heroImageWrapper}`);
      const content = storyRef.querySelector(`.${styles.storyContent}`);

      if (heroImage && content) {
        // Parallax effect for hero image
        gsap.to(heroImage, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: storyRef,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Fade in content as story enters viewport
        gsap.fromTo(
          content,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storyRef,
              start: "top 80%",
              end: "top 20%",
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
    <section className={styles.parallaxContainer} ref={containerRef}>
      {galleryStories.map((story, index) => (
        <div
          key={story.id}
          ref={(el) => {
            storyRefs.current[index] = el;
          }}
          className={styles.storySection}
          data-story-id={story.id}
        >
          <div className={styles.storyContent}>
            <div className={styles.layoutUnified}>
              <div className={styles.heroImageContainerUnified}>
                <div className={styles.heroImageWrapper}>
                  <Image
                    src={story.images[activeThumbs[index]]}
                    alt={`${story.title} - Hero`}
                    fill
                    className={styles.heroImageUnified}
                    sizes="100vw"
                    priority={index < 2}
                  />
                </div>
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
                    aria-label={`Show image ${thumbIdx + 1} for ${story.title}`}
                    tabIndex={activeThumbs[index] === thumbIdx ? 0 : -1}
                    onClick={() => {
                      console.log(
                        `Clicked thumbnail ${thumbIdx} for story ${story.title}`
                      );
                      setActiveThumbs((prev) => {
                        const newThumbs = [...prev];
                        newThumbs[index] = thumbIdx;
                        return newThumbs;
                      });
                    }}
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
                <p className={styles.storyDescription}>{story.description}</p>
                <a href={story.ctaLink} className={styles.storyCta}>
                  {story.ctaText}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
