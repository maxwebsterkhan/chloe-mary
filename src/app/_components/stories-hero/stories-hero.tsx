"use client";

import { useEffect, useRef } from "react";
import styles from "./stories-hero.module.scss";
import { animationUtils } from "../helpers/gsap-animations";

export default function StoriesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      animationUtils.slideInUp(titleRef.current, { delay: 0.2 });
    }
    if (rightRef.current) {
      animationUtils.fadeIn(rightRef.current, { delay: 0.8 });
    }
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.heroLayout}>
          <div className={styles.heroLeft}>
            <div className={styles.heroLabel}>REAL MOMENTS</div>
            <h1 ref={titleRef} className={styles.heroTitle}>
              YOUR STORY{" "}
              <span className={styles.heroAccent}>BEAUTIFULLY TOLD</span>
            </h1>
          </div>
          <div ref={rightRef} className={styles.heroRight}>
            <p className={styles.heroSubtitle}>
              True stories of love, laughter, and connection—told through
              candid, heartfelt photography. Every gallery is a window into
              genuine moments and the beauty of your day.
            </p>
            <div className={styles.heroDecor}>
              <div className={styles.decorLine}></div>
              <span className={styles.decorText}>
                BRISTOL BASED &bull; UK & BEYOND
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
