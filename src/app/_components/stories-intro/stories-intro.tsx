"use client";

import { useEffect, useRef } from "react";
import styles from "./stories-intro.module.scss";
import { createScrollTrigger } from "../helpers/gsap-animations";
import gsap from "gsap";

export default function StoriesIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const paragraphLeftRef = useRef<HTMLParagraphElement>(null);
  const paragraphRightRef = useRef<HTMLParagraphElement>(null);
  const paragraphCenterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial states - hide elements that will animate
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0 });
    }
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0 });
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

        // 1. First: "Real Love Stories" - simple fade in
        if (titleRef.current) {
          tl.to(
            titleRef.current,
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            0
          );
        }

        // 2. Second: "Authentic moments captured" - simple fade in
        if (subtitleRef.current) {
          tl.to(
            subtitleRef.current,
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
          <h2 ref={titleRef} className={styles.title}>
            Real Love Stories
          </h2>
          <p ref={subtitleRef} className={styles.subtitle}>
            Authentic moments captured
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.description}>
            <p
              ref={paragraphLeftRef}
              className={`${styles.paragraphLeft} ${styles.paragraph}`}
            >
              Each wedding tells a unique story-a celebration of love, laughter,
              and the magical chaos that makes every couple&apos;s day truly
              special. Here you&apos;ll find a collection of real moments from
              real couples who trusted me to document their story.
            </p>

            <p
              ref={paragraphRightRef}
              className={`${styles.paragraphRight} ${styles.paragraph}`}
            >
              From intimate London elopements to grand celebrations in France,
              these galleries showcase the raw emotions, genuine connections and
              authentic moments preserved through documentary photography. When
              you let go and allow your true selves to shine, your story unfolds
              in its most authentic form - creating images that reflect the true
              spirit of your relationship.
            </p>

            <p
              ref={paragraphCenterRef}
              className={`${styles.philosophy} ${styles.paragraphCenter} ${styles.paragraph}`}
            >
              &quot;Every love story deserves to be told with honesty, artistry
              and heart.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
