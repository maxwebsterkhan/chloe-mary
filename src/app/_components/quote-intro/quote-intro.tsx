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
              I&apos;m passionate about working with creative and carefree
              couples who value relaxed, artistic images that truly reflect who
              you are.
            </p>

            <p className={styles.paragraphRight}>
              Rather than directing or staging scenes, I work alongside you,
              moving through your day as a trusted presence—not just an
              observer, but someone who becomes part of your story.
            </p>

            <p className={`${styles.philosophy} ${styles.paragraphCenter}`}>
              Because what truly matters isn&apos;t how it all looked, but how
              it felt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
