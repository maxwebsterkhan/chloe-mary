"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./HomepageHero.module.scss";

interface HomepageHeroProps {
  images: string[];
  loaderText?: string;
  headerText?: string;
  onAnimationComplete?: () => void;
  initiallyHidden?: boolean;
}

export default function HomepageHero({
  images,
  loaderText = "CHLOE MARY",
  headerText = "mememento vivere",
  onAnimationComplete,
  initiallyHidden = false,
}: HomepageHeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  const loaderLetters = loaderText.split("");
  const headerLetters = headerText.split("");

  const extraImages = images.slice(0, 3);
  const mainImage = images[images.length - 1];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const loadingLetters = containerRef.current.querySelectorAll(
        `.${styles.homepagehero__letter}`
      );
      const box = containerRef.current.querySelector(
        `.${styles["homepagehero-loader__box"]}`
      );
      const growingImage = containerRef.current.querySelector(
        `.${styles.homepagehero__growing_image}`
      );
      const headingStart = containerRef.current.querySelector(
        `.${styles.homepagehero__h1_start}`
      );
      const headingEnd = containerRef.current.querySelector(
        `.${styles.homepagehero__h1_end}`
      );
      const coverImageExtra = containerRef.current.querySelectorAll(
        `.${styles.homepagehero__cover_image_extra}`
      );
      const headerLetters = containerRef.current.querySelectorAll(
        `.${styles.homepagehero__letter_white}`
      );

      const tl = gsap.timeline({
        defaults: {
          ease: "expo.inOut",
        },
        onStart: () => {
          containerRef.current?.classList.remove(styles["is--hidden"]);
        },
        onComplete: () => {
          onAnimationComplete?.();
        },
      });

      if (loadingLetters.length) {
        tl.from(loadingLetters, {
          yPercent: 100,
          stagger: 0.025,
          duration: 1.25,
        });
      }

      if (box) {
        tl.fromTo(
          box,
          {
            width: "0em",
          },
          {
            width: "1em",
            duration: 1.25,
          },
          "< 1.25"
        );
      }

      if (growingImage) {
        tl.fromTo(
          growingImage,
          {
            width: "0%",
          },
          {
            width: "100%",
            duration: 1.25,
          },
          "<"
        );
      }

      if (headingStart) {
        tl.fromTo(
          headingStart,
          {
            x: "0em",
          },
          {
            x: "-0.05em",
            duration: 1.25,
          },
          "<"
        );
      }

      if (headingEnd) {
        tl.fromTo(
          headingEnd,
          {
            x: "0em",
          },
          {
            x: "0.05em",
            duration: 1.25,
          },
          "<"
        );
      }

      if (coverImageExtra.length) {
        tl.fromTo(
          coverImageExtra,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            duration: 0.05,
            ease: "none",
            stagger: 0.5,
          },
          "-=0.05"
        );
      }

      if (growingImage) {
        tl.to(
          growingImage,
          {
            width: "100vw",
            height: "100dvh",
            duration: 2,
          },
          "< 1.25"
        );
      }

      if (box) {
        tl.to(
          box,
          {
            width: "110vw",
            duration: 2,
          },
          "<"
        );
      }

      if (headerLetters.length) {
        tl.from(
          headerLetters,
          {
            yPercent: 100,
            duration: 1.25,
            ease: "expo.out",
            stagger: 0.025,
          },
          "< 1.2"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`${styles["homepagehero-header"]} ${styles["is--loading"]} ${
        initiallyHidden ? styles["is--hidden"] : ""
      }`}
    >
      <div className={styles["homepagehero-loader"]}>
        <div className={styles.homepagehero__h1}>
          <div className={styles.homepagehero__h1_start}>
            {loaderLetters
              .slice(0, Math.floor(loaderLetters.length / 2))
              .map((letter, i) => (
                <span
                  key={`start-${i}`}
                  className={styles.homepagehero__letter}
                >
                  {letter}
                </span>
              ))}
          </div>

          <div className={styles["homepagehero-loader__box"]}>
            <div className={styles["homepagehero-loader__box_inner"]}>
              <div className={styles.homepagehero__growing_image}>
                <div className={styles.homepagehero__growing_image_wrap}>
                  {extraImages.map((src, i) => (
                    <img
                      key={`extra-${i}`}
                      className={`${styles.homepagehero__cover_image_extra} ${
                        styles[`is--${i + 1}`]
                      }`}
                      src={src}
                      loading="lazy"
                      alt=""
                    />
                  ))}
                  <img
                    className={styles.homepagehero__cover_image}
                    src={mainImage}
                    loading="lazy"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.homepagehero__h1_end}>
            {loaderLetters
              .slice(Math.floor(loaderLetters.length / 2))
              .map((letter, i) => (
                <span key={`end-${i}`} className={styles.homepagehero__letter}>
                  {letter}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className={styles["homepagehero-header__content"]}>
        <div className={styles["homepagehero-header__bottom"]}>
          <div className={styles.homepagehero__h1}>
            {headerLetters.map((letter, i) => (
              <span
                key={`header-${i}`}
                className={`${styles.homepagehero__letter_white} ${
                  letter === "©" ? styles["is--space"] : ""
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
