"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./footer.module.scss";

interface FooterLink {
  href: string;
  label: string;
}

const pageLinks: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const socialLinks: FooterLink[] = [
  { href: "https://instagram.com/bychloemary", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "X/Twitter" },
];

const contactLinks: FooterLink[] = [
  { href: "mailto:hello@chloemary.com", label: "hello@chloemary.com" },
  { href: "tel:+441234567890", label: "+44 12 34 56 78 90" },
];

export default function Footer() {
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const footerInnerRef = useRef<HTMLElement>(null);
  const footerDarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const footerWrap = footerWrapRef.current;
    if (!footerWrap) return;

    const inner = footerInnerRef.current;
    const dark = footerDarkRef.current;

    const scrollTriggerConfig = {
      trigger: footerWrap,
      start: "clamp(top bottom)",
      end: "clamp(top top)",
      scrub: true,
    };

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    if (inner) {
      tl.from(inner, {
        yPercent: -25,
        ease: "linear",
      });
    }

    if (dark) {
      tl.from(
        dark,
        {
          opacity: 0.5,
          ease: "linear",
        },
        "<"
      );
    }

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footerWrap) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={footerWrapRef} data-footer-parallax className={styles.footer__wrap}>
      <footer
        ref={footerInnerRef}
        data-footer-parallax-inner
        className={styles.footer}
      >
        <div className={`container ${styles.footer__container}`}>
          <div className={styles.footer__linksRow}>
            <div className={styles.footer__col}>
              <p className={styles.footer__eyebrow}>( Pages )</p>
              <div className={styles.footer__links}>
                {pageLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    data-underline-link
                    className={styles.footer__a}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.footer__col}>
              <p className={styles.footer__eyebrow}>( Socials )</p>
              <div className={styles.footer__links}>
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-underline-link
                    className={styles.footer__a}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.footer__col}>
              <p className={styles.footer__eyebrow}>( Contact )</p>
              <div className={styles.footer__links}>
                {contactLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    data-underline-link
                    className={styles.footer__a}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.footer__logoRow}>
            <p className={styles.footer__tagline}>Let's Create Something Beautiful</p>
          </div>
        </div>
      </footer>
      <div
        ref={footerDarkRef}
        data-footer-parallax-dark
        className={styles.footer__dark}
      ></div>
    </div>
  );
}
