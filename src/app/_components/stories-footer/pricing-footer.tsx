"use client";

import { useRef } from "react";
import { animationUtils } from "../helpers/gsap-animations";
import { useGSAP } from "@gsap/react";
import styles from "./stories-footer.module.scss";

export default function PricingFooter() {
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
      aria-labelledby="pricing-footer-header"
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <h3
            ref={headerRef}
            className={styles.footerHeader}
            id="pricing-footer-header"
          >
            Ready to Begin?
          </h3>

          <div ref={footerTextRef} className={styles.footerText}>
            <p className={styles.footerParagraph}>
              Your wedding is a unique celebration of your love story, and I
              would be honoured to capture it. If you&apos;d like to discuss
              your plans and how we can create something truly special together,
              I&apos;d love to hear from you. Let&apos;s talk about making your
              vision come to life.
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
