"use client";

import { useEffect, useRef } from "react";
import styles from "./achievements.module.scss";
import {
  animationUtils,
  createScrollTrigger,
} from "../helpers/gsap-animations";
import Image from "next/image";
import { useS3Images } from "@/hooks/useS3Images";

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

export default function Achievements() {
  const achievementsRef = useRef<HTMLElement>(null);
  const { images: awardImages, loading } = useS3Images({ prefix: "awards" });

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

  return (
    <section ref={achievementsRef} className={styles.achievements}>
      <div className={styles.achievements__container}>
        <div className={styles.achievements__grid}>
          {achievements.map((achievement, index) => {
            const CardContent = (
              <div className={styles.achievements__content}>
                {!loading && awardImages[index] && (
                  <div className={styles.achievements__imageWrapper}>
                    <Image
                      src={awardImages[index].url}
                      alt={generateAltText(awardImages[index].key)}
                      fill
                      className={styles.achievements__image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className={styles.achievements__imageOverlay} />
                  </div>
                )}
                <div className={styles.achievements__textContent}>
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
