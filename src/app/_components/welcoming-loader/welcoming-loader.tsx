"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./welcoming-loader.module.scss";

export default function WelcomingLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const wordTargetRef = useRef<HTMLParagraphElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Only run once on initial mount
    if (hasAnimatedRef.current) return;

    const container = containerRef.current;
    const words = wordsRef.current;
    const wordTarget = wordTargetRef.current;

    if (!container || !words || !wordTarget) return;

    // Check if we've already shown the loader (using sessionStorage)
    const hasShownLoader = sessionStorage.getItem("__welcoming-loader-shown");
    if (hasShownLoader) {
      // Hide immediately if already shown
      gsap.set(container, { autoAlpha: 0, display: "none" });
      return;
    }

    // Mark as shown
    sessionStorage.setItem("__welcoming-loader-shown", "true");
    hasAnimatedRef.current = true;

    const wordsString = words.getAttribute("data-loading-words");
    if (!wordsString) return;

    const wordsArray = wordsString.split(",").map((w) => w.trim());

    const tl = gsap.timeline();

    tl.set(words, {
      yPercent: 50,
    });

    tl.to(words, {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: "Expo.easeInOut",
    });

    wordsArray.forEach((word) => {
      tl.call(
        () => {
          if (wordTarget) {
            wordTarget.textContent = word;
          }
        },
        undefined,
        "+=0.15"
      );
    });

    tl.to(
      words,
      {
        opacity: 0,
        yPercent: -75,
        duration: 0.8,
        ease: "Expo.easeIn",
      },
      "+ -0.2"
    );

    tl.to(
      container,
      {
        autoAlpha: 0,
        duration: 0.6,
        ease: "Power1.easeInOut",
      },
      "+ -0.2"
    );

    tl.call(() => {
      gsap.set(container, { display: "none" });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      data-loading-container
      className={styles.loadingContainer}
    >
      <div className={styles.loadingScreen}>
        <div
          ref={wordsRef}
          data-loading-words="Hello, Bonjour, स्वागत हे, Ciao, Olá, おい, Hallå, Guten tag, Hallo"
          className={styles.loadingWords}
        >
          <div className={styles.loadingWordsDot}></div>
          <p
            ref={wordTargetRef}
            data-loading-words-target
            className={styles.loadingWordsWord}
          >
            Hello
          </p>
        </div>
      </div>
    </div>
  );
}
