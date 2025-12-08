"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./introduction.module.scss";

interface IntroductionProps {
  image1: string | null;
  image2: string | null;
}

export default function Introduction({ image1, image2 }: IntroductionProps) {
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const bwImageRef = useRef<HTMLDivElement>(null);
  const colorImageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const loveRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Initialize Locomotive Scroll for this section
    const locomotiveScroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      lenisOptions: {
        lerp: 0.1,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
    });

    locomotiveScrollRef.current = locomotiveScroll;

    // Animate text reveals
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    }

    if (loveRef.current) {
      gsap.fromTo(
        loveRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: loveRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    }

    // Cleanup
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        const vars = trigger.vars as { trigger?: Element };
        if (vars.trigger && containerRef.current?.contains(vars.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  if (!image1 || !image2) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      className={styles.introduction}
      data-scroll-container
    >
      {/* First section - Color */}
      <div className={styles.introduction__section}>
        <div
          ref={colorImageRef}
          className={styles.introduction__fullImage}
          data-scroll
          data-scroll-speed="-0.2"
        >
          <Image
            src={image2}
            alt="Color photography"
            fill
            className={styles.introduction__image}
            sizes="100vw"
            priority
          />
        </div>
        <div className={styles.introduction__overlay}></div>
        <div className={`container ${styles.introduction__textContainer}`}>
          <h2
            ref={headingRef}
            className={styles.introduction__heading}
          >
            I love Black & White
          </h2>
        </div>
      </div>

      {/* Second section - Black & White */}
      <div className={styles.introduction__section}>
        <div
          ref={bwImageRef}
          className={styles.introduction__fullImage}
          data-scroll
          data-scroll-speed="-0.2"
        >
          <Image
            src={image1}
            alt="Black and white photography"
            fill
            className={styles.introduction__image}
            sizes="100vw"
          />
        </div>
        <div className={styles.introduction__overlay}></div>
        <div className={`container ${styles.introduction__textContainer}`}>
          <h2
            ref={loveRef}
            className={styles.introduction__heading}
          >
            but Adore Colour too
          </h2>
        </div>
      </div>
    </section>
  );
}

