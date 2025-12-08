"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import styles from "./introduction.module.scss";

interface IntroductionProps {
  image1: string | null;
  image2: string | null;
}

export default function Introduction({ image1, image2 }: IntroductionProps) {
  const collectionRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Only run animations on the homepage
  const isHomepage = pathname === "/";

  useLayoutEffect(() => {
    // Don't run if not on homepage
    if (!isHomepage) return;

    // Track ScrollTriggers created by this component for proper cleanup
    const triggers: ScrollTrigger[] = [];

    // Animate headings down from above on scroll
    const headings = collectionRef.current?.querySelectorAll(
      "[data-stacking-cards-heading]"
    );
    if (headings) {
      headings.forEach((heading) => {
        const card = heading.closest("[data-stacking-cards-item]");
        if (!card) return;

        // Set initial state (CSS already handles this, but ensure GSAP has control)
        gsap.set(heading, { opacity: 0, y: -40, immediateRender: true });

        // Animate on scroll - trigger on the card, not the heading
        const st = gsap.to(heading, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Track the ScrollTrigger
        const scrollTrigger = st.scrollTrigger;
        if (scrollTrigger) {
          triggers.push(scrollTrigger);
        }
      });
    }

    function initStackingCardsParallax() {
      const cards = collectionRef.current?.querySelectorAll(
        "[data-stacking-cards-item]"
      );
      if (!cards) return;

      if (cards.length < 2) return;

      cards.forEach((card, i) => {
        // Skip over the first section
        if (i === 0) return;

        // When current section is in view, target the PREVIOUS one
        const previousCard = cards[i - 1];
        if (!previousCard) return;

        // Find any element inside the previous card
        const previousCardImage = previousCard.querySelector(
          "[data-stacking-cards-img]"
        );
        const previousCardHeading = previousCard.querySelector(
          "[data-stacking-cards-heading]"
        );

        const tl = gsap.timeline({
          defaults: {
            ease: "none",
            duration: 1,
          },
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Track the ScrollTrigger
        const scrollTrigger = tl.scrollTrigger;
        if (scrollTrigger) {
          triggers.push(scrollTrigger);
        }

        tl.fromTo(previousCard, { yPercent: 0 }, { yPercent: 50 }).fromTo(
          previousCardImage,
          { rotate: 0, yPercent: 0 },
          { rotate: 0, yPercent: -25 },
          "<"
        );

        // Animate heading fade out and move up (using yPercent to move relative to viewport)
        if (previousCardHeading) {
          tl.fromTo(
            previousCardHeading,
            { autoAlpha: 1, yPercent: 0 },
            { autoAlpha: 0, yPercent: -50 },
            "<"
          );
        }
      });
    }

    // Initialize Stacking Cards Parallax
    initStackingCardsParallax();

    // Cleanup - only kill triggers created by this component
    return () => {
      triggers.forEach((trigger) => {
        trigger.kill();
      });
      // Kill any tweens targeting elements in this component
      if (collectionRef.current) {
        gsap.killTweensOf(collectionRef.current.querySelectorAll("*"));
      }
    };
  }, [isHomepage]);

  if (!image1 || !image2) {
    return null;
  }

  return (
    <section ref={collectionRef} className={styles.stackingCardsCollection}>
      <div className={styles.stackingCardsList}>
        {/* First section - Color */}
        <div data-stacking-cards-item className={styles.stackingCardsItem}>
          <div
            className={styles.stackingCardsItemImgWrapper}
            data-stacking-cards-img
          >
            <Image
              src={image2}
              alt="Color photography"
              fill
              className={styles.stackingCardsItemImg}
              sizes="100vw"
              priority
            />
            <div className={styles.stackingCardsItemOverlay}></div>
          </div>
          <div
            className={styles.stackingCardsItemHeading}
            data-stacking-cards-heading
          >
            <h1 className={styles.stackingCardsItemH}>
              <span className={styles.stackingCardHeadingFaded}>I love</span>
              <br />
              Black & White
            </h1>
          </div>
        </div>

        {/* Second section - Black & White */}
        <div data-stacking-cards-item className={styles.stackingCardsItem}>
          <div
            className={styles.stackingCardsItemImgWrapper}
            data-stacking-cards-img
          >
            <Image
              src={image1}
              alt="Black and white photography"
              fill
              className={styles.stackingCardsItemImg}
              sizes="100vw"
            />
            <div className={styles.stackingCardsItemOverlay}></div>
          </div>
          <div
            className={styles.stackingCardsItemHeading}
            data-stacking-cards-heading
          >
            <h1 className={styles.stackingCardsItemH}>
              <span className={styles.stackingCardHeadingFaded}>but Adore</span>
              <br />
              Colour too
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
