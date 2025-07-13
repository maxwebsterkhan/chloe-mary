"use client";

import { useRef } from "react";
import { animationUtils } from "../helpers/gsap-animations";
import { useGSAP } from "@gsap/react";
import styles from "./stories-footer.module.scss";

export default function KindWordsFooter() {
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

    // Animate signature with floating entrance
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
      aria-labelledby="reviews-footer-header"
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <h3
            ref={headerRef}
            className={styles.footerHeader}
            id="reviews-footer-header"
          >
            Ready to Add Your Story?
          </h3>

          <div ref={footerTextRef} className={styles.footerText}>
            <p className={styles.footerParagraph}>
              These beautiful words from past couples mean the world to me, and
              I&apos;d be honoured to create something equally special for you.
              If you&apos;re looking for a photographer who will capture not
              just your day, but the authentic emotions and connections that
              make your love story unique, let&apos;s chat.
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
