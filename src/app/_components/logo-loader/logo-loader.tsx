"use client";

import { useEffect, useRef } from "react";
import { gsap, CustomEase, SplitText } from "@/lib/gsapConfig";
import styles from "./logo-loader.module.scss";

interface LogoLoaderProps {
  /** If true, only shows once per session (for initial page load) */
  showOnce?: boolean;
  /** Animation duration multiplier (default: 1, shorter for route changes) */
  duration?: number;
}

export default function LogoLoader({
  showOnce = false,
  duration = 1,
}: LogoLoaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoBaseRef = useRef<HTMLDivElement>(null);
  const logoTopRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const container = containerRef.current;
    const bg = bgRef.current;
    const progressBar = progressBarRef.current;
    const logoBase = logoBaseRef.current;
    const logoTop = logoTopRef.current;
    const textWrap = textWrapRef.current;

    if (
      !wrap ||
      !container ||
      !bg ||
      !progressBar ||
      !logoBase ||
      !logoTop ||
      !textWrap
    )
      return;

    // If showOnce is true, check sessionStorage
    if (showOnce) {
      const hasShownLoader = sessionStorage.getItem("__logo-loader-shown");
      if (hasShownLoader) {
        gsap.set(wrap, { display: "none" });
        return;
      }
      sessionStorage.setItem("__logo-loader-shown", "true");
    }

    // Create custom ease
    CustomEase.create("loader", "0.65, 0.01, 0.05, 0.99");

    // Get text elements
    const textElements = Array.from(
      textWrap.querySelectorAll("[data-load-text]")
    );

    // Reset targets that are *not* split text targets
    const resetTargets = Array.from(
      wrap.querySelectorAll("[data-load-reset]:not([data-load-text])")
    );

    // Main loader timeline
    const loadTimeline = gsap
      .timeline({
        defaults: {
          ease: "loader",
        },
      })
      .set(wrap, { display: "block" })
      .to(logoTop, { clipPath: "inset(0% 0% 0% 0%)" });

    // If there are items to hide FOUC for, reset them at the start
    if (resetTargets.length) {
      loadTimeline.set(resetTargets, { autoAlpha: 1 }, 0);
    }

    // If there's text items, split them, and add to load timeline
    if (textElements.length >= 2) {
      const firstWord = new SplitText(textElements[0], {
        type: "lines,chars",
        mask: "lines",
      });
      const secondWord = new SplitText(textElements[1], {
        type: "lines,chars",
        mask: "lines",
      });

      // Set initial states of the text elements and letters
      gsap.set([firstWord.chars, secondWord.chars], {
        autoAlpha: 0,
        yPercent: 125,
      });
      gsap.set(textElements, { autoAlpha: 1 });

      // Calculate total text animation time
      // First text in: 0.6, wait: 0.4, first out + second in: 0.6 (overlap), wait: 0.2, second out: 0.4
      // Total: 0.6 + 0.4 + 0.6 + 0.2 + 0.4 = 2.2 seconds
      const totalTextTime = (0.6 + 0.4 + 0.6 + 0.2 + 0.4) * duration;

      // Progress bar fills during text animations
      loadTimeline.to(
        progressBar,
        {
          scaleX: 1,
          duration: totalTextTime,
          ease: "loader",
        },
        0
      );

      // first text in
      loadTimeline.to(
        firstWord.chars,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.6 * duration,
          stagger: { each: 0.02 },
        },
        0
      );

      // first text out while second text in
      loadTimeline.to(
        firstWord.chars,
        {
          autoAlpha: 0,
          yPercent: -125,
          duration: 0.4 * duration,
          stagger: { each: 0.02 },
        },
        ">+=0.4"
      );

      loadTimeline.to(
        secondWord.chars,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.6 * duration,
          stagger: { each: 0.02 },
        },
        "<"
      );

      // second text out - happens before container fades
      loadTimeline.to(
        secondWord.chars,
        {
          autoAlpha: 0,
          yPercent: -125,
          duration: 0.4 * duration,
          stagger: { each: 0.02 },
        },
        ">+=0.2"
      );

      // Container fades out after text animations complete
      loadTimeline
        .to(container, { autoAlpha: 0, duration: 0.5 * duration })
        .to(
          progressBar,
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.5 * duration,
          },
          "<"
        )
        .add("hideContent", "<")
        .to(bg, { yPercent: -101, duration: 1 * duration }, "hideContent")
        .set(wrap, { display: "none" });
    } else {
      // If no text, use original timing
      loadTimeline
        .to(
          progressBar,
          { scaleX: 1, duration: 3 * duration, ease: "loader" },
          0
        )
        .to(container, { autoAlpha: 0, duration: 0.5 * duration })
        .to(
          progressBar,
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.5 * duration,
          },
          "<"
        )
        .add("hideContent", "<")
        .to(bg, { yPercent: -101, duration: 1 * duration }, "hideContent")
        .set(wrap, { display: "none" });
    }

    timelineRef.current = loadTimeline;

    // Cleanup on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [showOnce, duration]);

  return (
    <div ref={wrapRef} data-load-wrap className={styles.loader}>
      <div ref={bgRef} data-load-bg className={styles.loader__bg}></div>
      <div
        ref={containerRef}
        data-load-container
        className={styles.loader__container}
      >
        <div className={styles.loader__logoWrap}>
          <div
            ref={logoBaseRef}
            className={`${styles.loader__logoItem} ${styles["is--base"]}`}
          >
            <h1 className={styles.loader__logoText}>Chloe Mary</h1>
          </div>
          <div
            ref={logoTopRef}
            data-load-logo
            className={`${styles.loader__logoItem} ${styles["is--top"]}`}
          >
            <h1 className={styles.loader__logoText}>Chloe Mary</h1>
          </div>
        </div>
        <div ref={textWrapRef} className={styles.loader__textWrap}>
          <span
            data-load-text
            data-load-reset
            className={styles.loader__textEl}
          >
            Hold tight
          </span>
          <span
            data-load-text
            data-load-reset
            className={styles.loader__textEl}
          >
            Hi there!
          </span>
        </div>
      </div>
      <div
        ref={progressBarRef}
        data-load-progress
        className={styles.loader__bgBar}
      ></div>
    </div>
  );
}
