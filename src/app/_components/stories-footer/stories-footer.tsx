"use client";

import { useEffect, useRef } from "react";
import { animationUtils } from "../helpers/gsap-animations";
import styles from "./stories-footer.module.scss";

export default function StoriesFooter() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];

    // Animate title with soft reveal
    if (titleRef.current) {
      const anim = animationUtils.softTitleReveal(titleRef.current, {
        delay: 0.2,
      });
      if (anim) animations.push(anim);
    }

    // Animate subtitle with slide in
    if (subtitleRef.current) {
      const anim = animationUtils.softSlideIn(subtitleRef.current, {
        delay: 0.6,
      });
      if (anim) animations.push(anim);
    }

    // Animate CTA with scale in
    if (ctaRef.current) {
      const anim = animationUtils.scaleIn(ctaRef.current, {
        delay: 1.0,
      });
      if (anim) animations.push(anim);
    }

    // Animate decorative line
    if (lineRef.current) {
      const anim = animationUtils.drawLineX(lineRef.current, {
        delay: 1.8,
      });
      if (anim) animations.push(anim);
    }

    return () => {
      animations.forEach((anim) => anim?.kill());
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 ref={titleRef} className={styles.title}>
              Ready to Tell Your Story?
            </h2>
            <div ref={lineRef} className={styles.decorativeLine}></div>
          </div>

          <p ref={subtitleRef} className={styles.subtitle}>
            Let&apos;s capture your unique love story with the same authenticity
            and beauty you&apos;ve seen in these galleries. Every couple
            deserves to have their special moments preserved forever.
          </p>

          <div className={styles.ctaSection}>
            <a ref={ctaRef} href="/connect" className={styles.cta}>
              <span className={styles.ctaText}>Start Your Journey</span>
              <div className={styles.ctaAccent}></div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
