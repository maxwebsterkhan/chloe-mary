"use client";

import styles from "./home-hero.module.scss";
import { useEffect, useState, useRef } from "react";
import { animationUtils } from "../helpers/gsap-animations";

export default function HomeHero() {
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const mementoRef = useRef<HTMLDivElement>(null);
  const verticalTextRef = useRef<HTMLDivElement>(null);
  const horizontalTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1100);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];

    // Set initial states with softer animations
    if (titleRef.current) {
      const anim = animationUtils.softTitleReveal(titleRef.current, {
        delay: 0.3,
      });
      if (anim) animations.push(anim);
    }

    if (subtitleRef.current) {
      const anim = animationUtils.softSlideIn(subtitleRef.current, {
        delay: 0.8,
      });
      if (anim) animations.push(anim);
    }

    if (lineRef.current) {
      const anim = animationUtils.drawLineX(lineRef.current, { delay: 1.8 });
      if (anim) animations.push(anim);
    }

    // Animate text with SplitText (removed conflicting fadeIn on parent)
    if (verticalTextRef.current) {
      const anim = animationUtils.splitTextAnimation(verticalTextRef.current, {
        type: "chars",
        direction: "vertical",
        startDelay: 0.2,
      });
      if (anim) animations.push(anim);
    }

    if (horizontalTextRef.current) {
      const anim = animationUtils.splitTextAnimation(
        horizontalTextRef.current,
        {
          type: "chars",
          direction: "horizontal",
          startDelay: 0.8,
        }
      );
      if (anim) animations.push(anim);
    }

    // Animate dot separator
    const dotSeparator = document.querySelector(
      `.${styles["home-hero__dot-separator"]}`
    );
    if (dotSeparator) {
      const anim = animationUtils.scaleIn(dotSeparator as HTMLElement, {
        delay: 1.1,
      });
      if (anim) animations.push(anim);
    }

    // Cleanup function to kill all animations
    return () => {
      animations.forEach((anim) => anim?.kill());
    };
  }, []);

  return (
    <div className={styles["home-hero"]}>
      <div className={styles["home-hero__container"]}>
        <div className={styles["home-hero__content"]}>
          <h1 ref={titleRef} className={styles["home-hero__title"]}>
            Authentic Modern Love Stories
          </h1>
          <p ref={subtitleRef} className={styles["home-hero__subtitle"]}>
            {isMobile ? (
              <>
                <span>Told By You</span>
                <span>— Captured by Chloe Mary</span>
              </>
            ) : (
              <>
                Told By You
                <span className={styles["home-hero__dot-separator"]}>•</span>
                Captured by Chloe Mary
              </>
            )}
          </p>
        </div>

        <div ref={mementoRef} className={styles["home-hero__memento"]}>
          <div
            ref={verticalTextRef}
            className={styles["home-hero__vertical-text"]}
          >
            MEMENTO VIVERE
          </div>
          <div
            ref={horizontalTextRef}
            className={styles["home-hero__horizontal-text"]}
          >
            REMEMBER TO LIVE
          </div>
        </div>
      </div>
      <div ref={lineRef} className={styles["home-hero__animated-line"]}></div>
    </div>
  );
}
