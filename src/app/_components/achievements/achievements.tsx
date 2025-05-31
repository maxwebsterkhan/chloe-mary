"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./achievements.module.scss";

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

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const achievementsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Enable hover states after each animation completes
          achievements.forEach((_, index) => {
            setTimeout(() => {
              setHoverEnabled((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, (index * 0.4 + 0.6) * 1000);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Responsive alternating pattern
  const getCardVariant = (index: number) => {
    if (isMobile) {
      // Mobile: simple alternating pattern (0,2 dark, 1,3 light)
      return index % 2 === 0 ? "dark" : "light";
    } else {
      // Desktop: checkerboard pattern (0,3 dark, 1,2 light)
      return index === 0 || index === 3 ? "dark" : "light";
    }
  };

  return (
    <section
      ref={achievementsRef}
      className={`${styles.achievements} ${
        isVisible ? styles["achievements--visible"] : ""
      }`}
    >
      <div className={styles.achievements__container}>
        <div className={styles.achievements__grid}>
          {achievements.map((achievement, index) => {
            const CardContent = (
              <div className={styles.achievements__content}>
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
            );

            const cardClasses = [
              styles.achievements__item,
              styles[`achievements__item--${getCardVariant(index)}`],
              achievement.link ? styles["achievements__item--linked"] : "",
              achievement.link && hoverEnabled[index]
                ? styles["achievements__item--hover-enabled"]
                : "",
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
