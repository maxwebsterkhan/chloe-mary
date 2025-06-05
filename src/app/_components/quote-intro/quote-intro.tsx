"use client";

import { useEffect, useRef } from "react";
import styles from "./quote-intro.module.scss";

export default function QuoteIntro() {
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greeting = greetingRef.current;
    const tagline = taglineRef.current;
    const content = contentRef.current;

    if (!greeting || !tagline || !content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === greeting) {
              entry.target.classList.add(styles.greetingVisible);
            } else if (entry.target === tagline) {
              entry.target.classList.add(styles.taglineVisible);
            } else if (entry.target === content) {
              entry.target.classList.add(styles.contentVisible);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(greeting);
    observer.observe(tagline);
    observer.observe(content);

    return () => {
      observer.unobserve(greeting);
      observer.unobserve(tagline);
      observer.unobserve(content);
    };
  }, []);

  return (
    <section className={styles.intro}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 ref={greetingRef} className={styles.greeting}>
            Hi, I&apos;m Chloe
          </h2>
          <p ref={taglineRef} className={styles.tagline}>
            &quot;Self Professed Queen of Monochrome&quot;
          </p>
        </div>

        <div ref={contentRef} className={styles.content}>
          <div className={styles.description}>
            <p className={styles.paragraphLeft}>
              I&apos;m drawn to creative, carefree couples who seek images that
              capture not just how you look, but who you truly are—relaxed,
              authentic, and beautifully yourselves.
            </p>

            <p className={styles.paragraphRight}>
              Instead of orchestrating moments, I move quietly through your day,
              a trusted presence witnessing your story unfold naturally.
              I&apos;m not just documenting—I&apos;m becoming part of the story
              you&apos;re telling.
            </p>

            <p className={`${styles.philosophy} ${styles.paragraphCenter}`}>
              &quot;Because what truly matters isn&apos;t how it all looked, but
              how it felt.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
