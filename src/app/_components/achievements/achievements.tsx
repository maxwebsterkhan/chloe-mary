"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import styles from "./achievements.module.scss";
import {
  animationUtils,
  createScrollTrigger,
} from "../helpers/gsap-animations";
import Image from "next/image";
import { useS3Images } from "@/hooks/useS3Images";
import { gsap } from "gsap";

// Reordered for both desktop (2x2 grid) and mobile (stack) layouts
// Desktop: dark light | light dark
// Mobile: dark light dark light
const achievements = [
  {
    title: "Professional Photos Top 50",
    subtitle: "Wedding photographers in the UK 2025",
    year: "2025",
    link: "https://professionalphoto.online/professional-photo-magazine-photography-news/top-50-uk-wedding-photographers-2024-2025/",
  },
  {
    title: "Who What Wear",
    subtitle: "Featured on wedding Issue 2025",
    year: "2025",
    link: "https://www.whowhatwear.com/living/wedding/fashion-editor-wedding-directory#section-3-suppliers",
  },
  {
    title: "World's Best Wedding Photos",
    subtitle: "Top 20 photographers in the UK 2024/2025",
    year: "2024/25",
    link: "https://www.worldsbestweddingphotos.com/best-wedding-photographers/chloe-mary-photo",
  },
  {
    title: "La Lista",
    subtitle: "Trusted member",
    year: "Member",
    link: "https://www.lalista.com/suppliers/photographer/chloe-mary",
  },
];

// Helper function to generate alt text from image key
function generateAltText(key: string): string {
  // Remove the folder prefix and file extension
  const filename = key.split("/").pop()?.split(".")[0] || "";

  // Replace hyphens and underscores with spaces
  const words = filename.replace(/[-_]/g, " ");

  // Capitalize first letter of each word
  const formattedText = words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedText;
}

type AchievementRefs = {
  item: HTMLDivElement | null;
  textContent: HTMLDivElement | null;
  imageWrapper: HTMLDivElement | null;
  overlay: HTMLDivElement | null;
};

export default function Achievements() {
  const achievementsRef = useRef<HTMLElement>(null);
  const achievementRefs = useRef<(AchievementRefs | null)[]>([]);
  const { images: awardImages, loading } = useS3Images({ prefix: "awards" });

  // Handle scroll animations
  useEffect(() => {
    if (!achievementsRef.current) return;

    const items = Array.from(
      achievementsRef.current.querySelectorAll(`.${styles.achievements__item}`)
    ) as HTMLElement[];

    createScrollTrigger(achievementsRef.current, {
      start: "top 75%",
      once: true,
      onEnter: () => {
        animationUtils.staggerFadeIn(items);
      },
    });
  }, []);

  // Handle hover animations
  useLayoutEffect(() => {
    // Store all contexts for cleanup
    const contexts: {
      item: HTMLDivElement;
      timeline: gsap.core.Timeline;
      handleEnter: () => void;
      handleLeave: () => void;
    }[] = [];

    achievementRefs.current.forEach((refs) => {
      if (
        !refs?.item ||
        !refs.textContent ||
        !refs.imageWrapper ||
        !refs.overlay
      )
        return;

      // Create hover animation timeline
      const hoverTimeline = gsap.timeline({ paused: true });

      // Set initial states
      gsap.set(refs.imageWrapper, { scale: 1 });
      gsap.set(refs.overlay, { opacity: 0.7 });
      gsap.set(refs.textContent, { y: 0 });

      hoverTimeline
        .to(refs.imageWrapper, {
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          refs.overlay,
          {
            opacity: 0.85,
            duration: 0.4,
            ease: "power2.out",
          },
          0
        )
        .to(
          refs.textContent,
          {
            y: -10,
            duration: 0.4,
            ease: "power2.out",
          },
          0
        );

      // Add event listeners
      const handleEnter = () => hoverTimeline.play();
      const handleLeave = () => hoverTimeline.reverse();

      refs.item.addEventListener("mouseenter", handleEnter);
      refs.item.addEventListener("mouseleave", handleLeave);

      // Store context for cleanup
      contexts.push({
        item: refs.item,
        timeline: hoverTimeline,
        handleEnter,
        handleLeave,
      });
    });

    // Cleanup function
    return () => {
      contexts.forEach(({ item, timeline, handleEnter, handleLeave }) => {
        timeline.kill();
        item.removeEventListener("mouseenter", handleEnter);
        item.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [loading, awardImages]); // Re-run when images are loaded

  return (
    <section ref={achievementsRef} className={styles.achievements}>
      <div className={styles.achievements__container}>
        <div className={styles.achievements__grid}>
          {achievements.map((achievement, index) => {
            // Initialize refs for this achievement
            achievementRefs.current[index] = {
              item: null,
              textContent: null,
              imageWrapper: null,
              overlay: null,
            };

            const CardContent = (
              <div className={styles.achievements__content}>
                {!loading && awardImages[index] && (
                  <div
                    ref={(el) => {
                      if (el) achievementRefs.current[index]!.imageWrapper = el;
                    }}
                    className={styles.achievements__imageWrapper}
                  >
                    <Image
                      src={awardImages[index].url}
                      alt={generateAltText(awardImages[index].key)}
                      fill
                      className={styles.achievements__image}
                      sizes="(max-width: 768px) 100vw, 25vw"
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div
                      ref={(el) => {
                        if (el) achievementRefs.current[index]!.overlay = el;
                      }}
                      className={styles.achievements__imageOverlay}
                    />
                  </div>
                )}
                <div
                  ref={(el) => {
                    if (el) achievementRefs.current[index]!.textContent = el;
                  }}
                  className={styles.achievements__textContent}
                >
                  <div className={styles.achievements__year}>
                    {achievement.year}
                  </div>
                  <h3 className={styles.achievements__title}>
                    {achievement.title}
                  </h3>
                  <p className={styles.achievements__subtitle}>
                    {achievement.subtitle}
                  </p>
                </div>
              </div>
            );

            const cardClasses = [
              styles.achievements__item,
              styles[
                `achievements__item--${index % 2 === 0 ? "dark" : "light"}`
              ],
              achievement.link ? styles["achievements__item--linked"] : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) achievementRefs.current[index]!.item = el;
                }}
                className={cardClasses}
                style={{ "--index": index } as React.CSSProperties}
              >
                {achievement.link ? (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.achievements__link}
                  >
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
