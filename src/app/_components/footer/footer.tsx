"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import AnimatedUnderline from "../animated-underline/animated-underline";
import WhatsAppModal from "../whatsapp-modal/whatsapp-modal";
import WhatsAppTrigger from "../whatsapp-modal/whatsapp-trigger";
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
  { href: "https://uk.pinterest.com/bychloemary/", label: "Pinterest" },
  { href: "https://www.tiktok.com/@bychloemary", label: "TikTok" },
];

const contactLinks: FooterLink[] = [
  { href: "mailto:hello@chloemary.com", label: "hello@chloemary.com" },
];

export default function Footer() {
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const footerInnerRef = useRef<HTMLElement>(null);
  const footerDarkRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const footerWrap = footerWrapRef.current;
      const inner = footerInnerRef.current;
      const dark = footerDarkRef.current;

      if (!footerWrap) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerWrap,
          start: "clamp(top bottom)",
          end: "clamp(top top)",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (inner) {
        tl.from(inner, { yPercent: -25, ease: "linear" });
      }

      if (dark) {
        tl.from(dark, { opacity: 0.5, ease: "linear" }, "<");
      }

      // Store the ScrollTrigger instance for cleanup
      scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

      ScrollTrigger.refresh();
    },
    { scope: footerWrapRef, dependencies: [pathname] }
  );

  // Watch for DOM height changes and refresh ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;

    let resizeTimeout: NodeJS.Timeout;
    const refreshScrollTrigger = () => {
      // Debounce refresh calls to avoid excessive updates
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Watch for window resize
    const handleResize = () => {
      refreshScrollTrigger();
    };

    // Watch for DOM height changes using ResizeObserver
    // This catches dynamic content loading, image loading, etc.
    const resizeObserver = new ResizeObserver(() => {
      refreshScrollTrigger();
    });

    // Observe the document body for overall page height changes
    resizeObserver.observe(document.body);

    // Also observe the main content area (where children are rendered)
    const boundary = document.getElementById("boundary");
    if (boundary) {
      resizeObserver.observe(boundary);
    }

    // Observe the footer element itself for any size changes
    if (footerWrapRef.current) {
      resizeObserver.observe(footerWrapRef.current);
    }

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  return (
    <div
      ref={footerWrapRef}
      data-footer-parallax
      className={styles.footer__wrap}
    >
      <footer
        ref={footerInnerRef}
        data-footer-parallax-inner
        className={styles.footer}
        aria-label="Site footer"
      >
        <div className={`container ${styles.footer__container}`}>
          <div className={styles.footer__linksRow}>
            <div className={styles.footer__col}>
              <p className={styles.footer__eyebrow}>Pages</p>
              <div className={styles.footer__links}>
                {pageLinks.map((link) => {
                  const isCurrent = pathname === link.href;
                  return isCurrent ? (
                    <span
                      key={link.label}
                      aria-current="page"
                      className={styles.footer__a}
                    >
                      {link.label}
                    </span>
                  ) : (
                    <AnimatedUnderline
                      key={link.label}
                      href={link.href}
                      useNextLink={true}
                      className={styles.footer__a}
                    >
                      {link.label}
                    </AnimatedUnderline>
                  );
                })}
              </div>
            </div>
            <div className={styles.footer__col}>
              <p className={styles.footer__eyebrow}>Socials</p>
              <div className={styles.footer__links}>
                {socialLinks.map((link) => (
                  <AnimatedUnderline
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    as="a"
                    className={styles.footer__a}
                  >
                    {link.label}
                  </AnimatedUnderline>
                ))}
              </div>
            </div>
            <div className={styles.footer__col}>
              <p className={styles.footer__eyebrow}>Contact</p>
              <div className={styles.footer__links}>
                {contactLinks.map((link) => (
                  <AnimatedUnderline
                    key={link.label}
                    href={link.href}
                    as="a"
                    className={styles.footer__a}
                  >
                    {link.label}
                  </AnimatedUnderline>
                ))}
                <WhatsAppTrigger
                  whatsappUrl="https://wa.me/447719011701"
                  className={styles.footer__a}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer__taglineWrapper}>
          <p className={styles.footer__taglineSmall}>Let&apos;s Create</p>
          <p className={styles.footer__taglineLarge}>Something Beautiful</p>
        </div>
      </footer>
      <div
        ref={footerDarkRef}
        data-footer-parallax-dark
        className={styles.footer__dark}
      />
      <WhatsAppModal whatsappUrl="https://wa.me/447719011701" />
    </div>
  );
}
