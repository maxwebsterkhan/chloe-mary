"use client";

import { useEffect, useRef } from "react";
import styles from "./footer.module.scss";
import {
  animationUtils,
  createScrollTrigger,
} from "../helpers/gsap-animations";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Set up scroll trigger for footer animations - only once
    createScrollTrigger(footerRef.current, {
      start: "top 75%",
      once: true, // This prevents the animation from running multiple times
      onEnter: () => {
        // Animated line first
        if (lineRef.current) {
          animationUtils.drawLineX(lineRef.current, {
            delay: 0,
            duration: 1.2,
          });
        }

        // Animate each title line separately to preserve structure
        if (titleLine1Ref.current) {
          animationUtils.slideInUp(titleLine1Ref.current, {
            delay: 0.3,
          });
        }

        if (titleLine2Ref.current) {
          animationUtils.slideInUp(titleLine2Ref.current, {
            delay: 0.5,
          });
        }

        // Soft slide in for the side content
        if (sideRef.current) {
          animationUtils.softSlideIn(sideRef.current, {
            delay: 0.8,
          });
        }

        // Elegant fade in for copyright
        if (copyrightRef.current) {
          animationUtils.slideInUp(copyrightRef.current, {
            delay: 1.2,
          });
        }
      },
    });
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
