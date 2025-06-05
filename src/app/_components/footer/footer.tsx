"use client";

import { useEffect, useRef } from "react";
import styles from "./footer.module.scss";

export default function Footer() {
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const title = titleRef.current;
    const side = sideRef.current;
    const copyright = copyrightRef.current;

    if (!line || !title || !side || !copyright) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === line) {
              entry.target.classList.add(styles.lineVisible);
            } else if (entry.target === title) {
              entry.target.classList.add(styles.titleVisible);
            } else if (entry.target === side) {
              entry.target.classList.add(styles.sideVisible);
            } else if (entry.target === copyright) {
              entry.target.classList.add(styles.copyrightVisible);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(line);
    observer.observe(title);
    observer.observe(side);
    observer.observe(copyright);

    return () => {
      observer.unobserve(line);
      observer.unobserve(title);
      observer.unobserve(side);
      observer.unobserve(copyright);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__main}>
            <h2 ref={titleRef} className={styles.footer__title}>
              Let&apos;s Create
              <br />
              Something Beautiful
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
