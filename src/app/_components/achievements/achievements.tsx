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
  const achievementsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop: checkerboard pattern (0,3 dark and 1,2 light)
  // Mobile: alternating pattern (0,2 dark and 1,3 light)
  const getCardVariant = (index: number) => {
    if (isMobile) {
      return index % 2 === 0 ? "dark" : "light";
    } else {
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

            return (
              <div
                key={index}
                className={`${styles.achievements__item} ${
                  styles[`achievements__item--${getCardVariant(index)}`]
                } ${
                  achievement.link ? styles["achievements__item--linked"] : ""
                }`}
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
