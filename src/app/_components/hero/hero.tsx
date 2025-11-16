"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import styles from "./hero.module.scss";

interface HeroProps {
  imageUrl: string;
}

export default function Hero({ imageUrl }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const hero = heroRef.current;
    const targetEl = targetRef.current;

    if (!hero || !targetEl) return;

    function initFlipOnScroll() {
      if (!hero || !targetEl) return;

      const wrapperElements = hero.querySelectorAll(
        "[data-flip-element='wrapper']"
      );

      if (wrapperElements.length < 2) return;

      // Kill existing timeline and reset
      if (tlRef.current) {
        tlRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        const vars = trigger.vars as { trigger?: Element };
        if (vars.trigger && hero.contains(vars.trigger)) {
          trigger.kill();
        }
      });
      gsap.set(targetEl, { clearProps: "all" });

      // Force a layout recalculation
      void hero.offsetHeight;

      // Create new timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperElements[0],
          start: "center center",
          endTrigger: wrapperElements[wrapperElements.length - 1],
          end: "center center",
          scrub: 0.25,
        },
      });

      // Loop through each wrapper element
      wrapperElements.forEach((element, index) => {
        const nextIndex = index + 1;
        if (nextIndex < wrapperElements.length) {
          const nextWrapperEl = wrapperElements[nextIndex] as HTMLElement;
          const currentElement = element as HTMLElement;

          // Calculate vertical center positions relative to the document
          const scrollY = window.scrollY || window.pageYOffset;
          const nextRect = nextWrapperEl.getBoundingClientRect();
          const thisRect = currentElement.getBoundingClientRect();
          const nextDistance =
            nextRect.top + scrollY + nextWrapperEl.offsetHeight / 2;
          const thisDistance =
            thisRect.top + scrollY + currentElement.offsetHeight / 2;
          const offset = Math.abs(nextDistance - thisDistance);

          // Add the Flip.fit tween to the timeline
          const flipTween = Flip.fit(targetEl, nextWrapperEl, {
            duration: offset,
            ease: "none",
          });

          if (flipTween && "duration" in flipTween) {
            tl.add(flipTween as gsap.core.Tween);
          }
        }
      });

      tlRef.current = tl;

      // Refresh ScrollTrigger to ensure calculations are correct
      ScrollTrigger.refresh();
    }

    // Function to initialize animations
    const initializeAnimations = () => {
      // Double-check elements still exist
      if (!heroRef.current || !targetRef.current) return;
      initFlipOnScroll();
    };

    // Listen for page transition complete event
    const handleTransitionComplete = () => {
      initializeAnimations();
    };

    window.addEventListener("pageTransitionComplete", handleTransitionComplete);

    // Fallback: also initialize after a delay in case event doesn't fire
    const initTimer = setTimeout(() => {
      initializeAnimations();
    }, 500);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initFlipOnScroll();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", initFlipOnScroll);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", initFlipOnScroll);
      window.removeEventListener(
        "pageTransitionComplete",
        handleTransitionComplete
      );
      if (tlRef.current) {
        tlRef.current.kill();
      }
      // Use the captured hero from the effect scope
      if (hero) {
        ScrollTrigger.getAll().forEach((trigger) => {
          const vars = trigger.vars as { trigger?: Element };
          if (vars.trigger && hero.contains(vars.trigger)) {
            trigger.kill();
          }
        });
      }
    };
  }, [pathname]);

  return (
    <div ref={heroRef} className={styles.hero__wrapper}>
      <section className={styles.hero__header}>
        <span className={styles.hero__eyebrow}>Authentic Love Stories</span>
        <h1 className={styles.hero__h1}>told by you</h1>

        <div className={styles.hero__smallBox}>
          <div className={styles.hero__before}></div>
          <div data-flip-element="wrapper" className={styles.hero__flipWrapper}>
            <div
              ref={targetRef}
              data-flip-element="target"
              className={styles.hero__scaling}
            >
              <Image
                src={imageUrl}
                alt="Wedding photography"
                fill
                className={styles.hero__image}
                priority
                sizes="(max-width: 767px) 20em, 28em"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.hero__video}>
        <div className={styles.hero__bigBox}>
          <div className={styles.hero__before}></div>
          <div
            data-flip-element="wrapper"
            className={styles.hero__flipWrapper}
          ></div>
        </div>
        <h2 className={styles.hero__caption}>Captured by Chloe Mary</h2>
      </section>
    </div>
  );
}
