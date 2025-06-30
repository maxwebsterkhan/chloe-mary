"use client";

import { useRef } from "react";
import { animationUtils } from "../helpers/gsap-animations";
import { useGSAP } from "@gsap/react";
import styles from "./stories-footer.module.scss";

export default function StoriesFooter() {
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
      animationUtils.floatingEntrance(signatureRef.current, {
        delay: 0.5,
      });
    }
  });

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
