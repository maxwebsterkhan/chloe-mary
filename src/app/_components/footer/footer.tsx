"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
      },
    });

    if (inner) {
      tl.from(inner, { yPercent: -25, ease: "linear" });
    }

    if (dark) {
      tl.from(dark, { opacity: 0.5, ease: "linear" }, "<");
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footerWrap) trigger.kill();
      });
    };
  }, []);

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
