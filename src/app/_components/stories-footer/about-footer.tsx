"use client";

import { useRef } from "react";
import { animationUtils } from "../helpers/gsap-animations";
import { useGSAP } from "@gsap/react";
import styles from "./stories-footer.module.scss";

export default function AboutFooter() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const footerTextRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate header first
    if (headerRef.current) {
      animationUtils.softTitleReveal(headerRef.current, {
        delay: 0.1,
      });
    }

    // Animate footer text with soft reveal
    if (footerTextRef.current) {
      animationUtils.softSlideIn(footerTextRef.current, {
        delay: 0.3,
      });
    }

    // Animate signature line
    if (signatureRef.current) {
      const signatureLine = signatureRef.current.querySelector(
        `.${styles.signatureLine}`
      ) as HTMLElement;
      if (signatureLine) {
        animationUtils.drawLineX(signatureLine, {
          delay: 0.5,
        });
      }
    }
  });

  return (
    <div
      className={styles.footer}
      role="region"
      aria-labelledby="about-footer-header"
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <h3
            ref={headerRef}
            className={styles.footerHeader}
            id="about-footer-header"
          >
            Let&apos;s Connect
          </h3>

          <div ref={footerTextRef} className={styles.footerText}>
            <p className={styles.footerParagraph}>
              I believe in capturing love stories that are as unique as the
              couples who live them. If my approach to documentary photography
              resonates with you, and you&apos;re looking for someone to capture
              the authentic, unfiltered moments of your special day, I&apos;d
              love to hear your story.
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
                href="/contact"
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
