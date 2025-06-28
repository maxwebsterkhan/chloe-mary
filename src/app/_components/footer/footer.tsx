"use client";

import { useEffect, useRef } from "react";
import styles from "./footer.module.scss";
import {
  animationUtils,
  createScrollTrigger,
} from "../helpers/gsap-animations";
import gsap from "gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Small delay to ensure hydration is complete before any GSAP operations
    const timer = setTimeout(() => {
      // Set initial states to prevent glitches with varied properties
      if (lineRef.current) {
        gsap.set(lineRef.current, { opacity: 0, scaleX: 0 });
      }
      if (titleLine1Ref.current) {
        gsap.set(titleLine1Ref.current, { opacity: 0, x: -60, scale: 0.95 });
      }
      if (titleLine2Ref.current) {
        gsap.set(titleLine2Ref.current, { opacity: 0, x: 60, scale: 0.95 });
      }
      if (sideRef.current) {
        gsap.set(sideRef.current, { opacity: 0, scale: 0.8, rotation: 5 });
      }
      if (copyrightRef.current) {
        gsap.set(copyrightRef.current, { opacity: 0, y: 30 });
      }

      // Check if footer is already in view
      const rect = footerRef.current?.getBoundingClientRect();
      const isInView = rect && rect.top < window.innerHeight * 0.75;

      if (isInView) {
        // If already in view, animate immediately without ScrollTrigger
        animateFooterElements();
      } else {
        // Set up scroll trigger for footer animations
        if (footerRef.current) {
          createScrollTrigger(footerRef.current, {
            start: "top 75%",
            once: true,
            onEnter: animateFooterElements,
          });
        }
      }
    }, 0);

    function animateFooterElements() {
      // Animated line first
      if (lineRef.current) {
        animationUtils.drawLineX(lineRef.current, {
          delay: 0,
          duration: 1.2,
        });
      }

      // Title Line 1: Slide in from left with bounce
      if (titleLine1Ref.current) {
        gsap.fromTo(
          titleLine1Ref.current,
          { opacity: 0, x: -60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.4,
            ease: "back.out(1.4)",
            delay: 0.3,
            clearProps: "transform",
          }
        );
      }

      // Title Line 2: Slide in from right with different timing
      if (titleLine2Ref.current) {
        gsap.fromTo(
          titleLine2Ref.current,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.4,
            ease: "back.out(1.4)",
            delay: 0.5,
            clearProps: "transform",
          }
        );
      }

      // Side content: Elegant fade with scale and rotation
      if (sideRef.current) {
        gsap.fromTo(
          sideRef.current,
          { opacity: 0, scale: 0.8, rotation: 5 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.6,
            ease: "elastic.out(1, 0.6)",
            delay: 0.8,
            clearProps: "transform",
          }
        );
      }

      // Copyright: Slide up from bottom (classic)
      if (copyrightRef.current) {
        gsap.fromTo(
          copyrightRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            delay: 1.2,
            clearProps: "transform",
          }
        );
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__main}>
            <h2 className={styles.footer__title}>
              <div ref={titleLine1Ref} className={styles.footer__title_line}>
                <span>Let&apos;s</span>
                <span>Create</span>
              </div>
              <div ref={titleLine2Ref} className={styles.footer__title_line}>
                <span>Something</span>
                <span>Beautiful</span>
              </div>
            </h2>
          </div>

          <div ref={sideRef} className={styles.footer__side}>
            <div className={styles.footer__vertical_text}>Follow</div>
            <a
              href="https://instagram.com/bychloemary"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__instagram}
            >
              @bychloemary
            </a>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <div ref={copyrightRef} className={styles.footer__copyright}>
            <p>All images are copyrighted to Chloe Mary</p>
            <p>
              For non-wedding work and collaborations email{" "}
              <a href="mailto:hello@chloemary.com">hello@chloemary.com</a>
            </p>
          </div>
        </div>

        <div ref={lineRef} className={styles.footer__animated_line}></div>
      </div>
    </footer>
  );
}
