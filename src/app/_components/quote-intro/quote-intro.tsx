"use client";

import { useEffect, useRef } from "react";
import styles from "./quote-intro.module.scss";
import { createScrollTrigger } from "../helpers/gsap-animations";
import gsap from "gsap";

export default function QuoteIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const paragraphLeftRef = useRef<HTMLParagraphElement>(null);
  const paragraphRightRef = useRef<HTMLParagraphElement>(null);
  const paragraphCenterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial states - hide elements that will animate
    if (greetingRef.current) {
      gsap.set(greetingRef.current, { opacity: 0 });
    }
    if (taglineRef.current) {
      gsap.set(taglineRef.current, { opacity: 0 });
    }
    if (paragraphLeftRef.current) {
      gsap.set(paragraphLeftRef.current, { opacity: 0 });
    }
    if (paragraphRightRef.current) {
      gsap.set(paragraphRightRef.current, { opacity: 0 });
    }
    if (paragraphCenterRef.current) {
      gsap.set(paragraphCenterRef.current, { opacity: 0 });
    }

    // Set up scroll trigger to start animations when section comes into view - only once
    createScrollTrigger(sectionRef.current, {
      start: "top 80%", // Start earlier so animations are more immediate
      once: true,
      onEnter: () => {
        // Create a fast, simple timeline
        const tl = gsap.timeline();

        // 1. First: "Hi, I'm Chloe" - simple fade in
        if (greetingRef.current) {
          tl.to(
            greetingRef.current,
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            0
          );
        }

        // 2. Second: "Self Professed Queen of Monochrome" - simple fade in
        if (taglineRef.current) {
          console.log("Starting tagline animation");
          tl.to(
            taglineRef.current,
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            0.3
          );
        }

        // 3. Third: First two paragraphs - slide up
        if (paragraphLeftRef.current) {
          tl.fromTo(
            paragraphLeftRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0.6
          );
        }

        if (paragraphRightRef.current) {
          tl.fromTo(
            paragraphRightRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0.8
          );
        }

        // 4. Finally: Philosophy quote - simple fade with slight scale
        if (paragraphCenterRef.current) {
          tl.fromTo(
            paragraphCenterRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
            1.2
          );
        }
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.intro}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 ref={greetingRef} className={styles.greeting}>
            Hi, I&apos;m Chloe
          </h2>
          <p ref={taglineRef} className={styles.tagline}>
            &quot;Self Professed Queen of Monochrome&quot;
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.description}>
            <p
              ref={paragraphLeftRef}
              className={`${styles.paragraphLeft} ${styles.paragraph}`}
            >
              I&apos;m drawn to creative, carefree couples who seek images that
              capture not just how you look, but who you truly are—relaxed,
              authentic, and beautifully yourselves.
            </p>

            <p
              ref={paragraphRightRef}
              className={`${styles.paragraphRight} ${styles.paragraph}`}
            >
              Instead of orchestrating moments, I move quietly through your day,
              a trusted presence witnessing your story unfold naturally.
              I&apos;m not just documenting—I&apos;m becoming part of the story
              you&apos;re telling.
            </p>

            <p
              ref={paragraphCenterRef}
              className={`${styles.philosophy} ${styles.paragraphCenter} ${styles.paragraph}`}
            >
              &quot;Because what truly matters isn&apos;t how it all looked, but
              how it felt.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
