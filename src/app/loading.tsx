"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./loading.module.scss";

export default function Loading() {
  const bubbleLoaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (bubbleLoaderRef.current) {
        // Try selecting by class name directly
        const dots = bubbleLoaderRef.current.children;

        if (dots.length > 0) {
          // Convert to array and try animation
          const dotArray = Array.from(dots) as HTMLElement[];

          // Test with a very simple animation
          dotArray.forEach((dot, index) => {
            gsap.to(dot, {
              scale: 1.5,
              duration: 0.5,
              delay: index * 0.2,
              yoyo: true,
              repeat: -1,
              ease: "power2.inOut",
            });
          });
        }
      }

      // Text animation
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 10 },
          { opacity: 0.8, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={styles.loadingContainer}
      role="status"
      aria-label="Loading content"
    >
      <div ref={bubbleLoaderRef} className={styles.bubbleLoader}>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
      </div>
      <p ref={textRef} className={styles.loadingText}>
        Loading beautiful moments...
      </p>
      <span className={styles.srOnly}>
        Please wait while we load the content
      </span>
    </div>
  );
}
