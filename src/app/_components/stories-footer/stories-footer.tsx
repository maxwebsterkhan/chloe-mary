"use client";

import { useEffect, useRef } from "react";
import { animationUtils } from "../helpers/gsap-animations";
import styles from "./stories-footer.module.scss";

export default function StoriesFooter() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const footerTextRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];

    // Animate header first
    if (headerRef.current) {
      const anim = animationUtils.softTitleReveal(headerRef.current, {
        delay: 0.1,
      });
      if (anim) animations.push(anim);
    }

    // Animate footer text with soft reveal
    if (footerTextRef.current) {
      const anim = animationUtils.softSlideIn(footerTextRef.current, {
        delay: 0.4,
      });
      if (anim) animations.push(anim);
    }

    // Animate signature with staggered reveal
    if (signatureRef.current) {
      const line = signatureRef.current.querySelector(
        `.${styles.signatureLine}`
      ) as HTMLElement;
      const text = signatureRef.current.querySelector(
        `.${styles.signatureText}`
      ) as HTMLElement;

      if (line) {
        const lineAnim = animationUtils.drawLineX(line, {
          delay: 0.8,
        });
        if (lineAnim) animations.push(lineAnim);
      }

      if (text) {
        const textAnim = animationUtils.softSlideIn(text, {
          delay: 1.2,
        });
        if (textAnim) animations.push(textAnim);
      }
    }

    return () => {
      animations.forEach((anim) => anim?.kill());
    };
  }, []);

  return (
    <div
      className={styles.footer}
      role="region"
      aria-labelledby="stories-footer-header"
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <h3
            ref={headerRef}
            className={styles.footerHeader}
            id="stories-footer-header"
          >
            Interested?
          </h3>

          <div ref={footerTextRef} className={styles.footerText}>
            <p className={styles.footerParagraph}>
              Every love story is unique, and these galleries represent just a
              glimpse of the authentic moments I have the privilege to capture.
              If you&apos;d like to discuss how we can tell your story together,
              I&apos;d love to hear from you.
            </p>
          </div>

          <div ref={signatureRef} className={styles.footerSignature}>
            <div
              className={styles.signatureLine}
              role="presentation"
              aria-hidden="true"
            ></div>
            <span className={styles.signatureText}>
              <a
                href="/connect"
                className={styles.signatureLink}
                aria-label="Get in touch - Go to contact page to start your wedding photography enquiry"
              >
                Get in touch
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
