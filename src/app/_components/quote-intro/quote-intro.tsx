"use client";

import { useEffect, useRef } from "react";
import styles from "./quote-intro.module.scss";
import { createScrollTrigger } from "../helpers/gsap-animations";
import gsap from "gsap";
import { useS3Images } from "@/hooks/useS3Images";
import Image from "next/image";
import Link from "next/link";

export default function QuoteIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const paragraphLeftRef = useRef<HTMLParagraphElement>(null);
  const paragraphRightRef = useRef<HTMLParagraphElement>(null);
  const paragraphCenterRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { images, loading } = useS3Images({ prefix: "intro/" });
  const introImage = images[0]; // Get the first image from the intro folder

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial states - hide elements that will animate
    if (greetingRef.current) {
      gsap.set(greetingRef.current, { opacity: 0 });
    }
    if (taglineRef.current) {
      gsap.set(taglineRef.current, { opacity: 0 });
    }
    if (paragraphLeftRef.current) {
      gsap.set(paragraphLeftRef.current, { opacity: 0 });
    }
    if (paragraphRightRef.current) {
      gsap.set(paragraphRightRef.current, { opacity: 0 });
    }
    if (paragraphCenterRef.current) {
      gsap.set(paragraphCenterRef.current, { opacity: 0 });
    }
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0 });
    }
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 0 });
    }

    // Set up scroll trigger to start animations when section comes into view - only once
    createScrollTrigger(sectionRef.current, {
      start: "top 80%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        // 1. First: "Hi, I'm Chloe" - simple fade in
        if (greetingRef.current) {
          tl.to(
            greetingRef.current,
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            0
          );
        }

        // 2. Second: "Self Professed Queen of Monochrome" - simple fade in
        if (taglineRef.current) {
          tl.to(
            taglineRef.current,
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            0.3
          );
        }

        // 3. Third: Paragraphs - slide up
        if (paragraphLeftRef.current) {
          tl.fromTo(
            paragraphLeftRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0.6
          );
        }

        if (paragraphRightRef.current) {
          tl.fromTo(
            paragraphRightRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0.8
          );
        }

        // 4. Philosophy quote - simple fade with slight scale
        if (paragraphCenterRef.current) {
          tl.fromTo(
            paragraphCenterRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
            1.2
          );
        }

        // 5. CTA - subtle fade in
        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            1.6
          );
        }

        // 6. Image fade in
        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
            0.3
          );
        }
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.intro}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.header}>
              <h2 ref={greetingRef} className={styles.greeting}>
                Hi, I&apos;m Chloe
              </h2>
              <p ref={taglineRef} className={styles.tagline}>
                &quot;Self Professed Queen of Monochrome.
                <br />
                <br />
                Named one of the Top 50 UK Wedding Photographers for 2024 &
                2025.&quot;
              </p>
            </div>

            <div className={styles.description}>
              <p ref={paragraphLeftRef} className={styles.paragraph}>
                I&apos;m a Bristol wedding photographer, London wedding
                photographer & destination wedding photographer. Drawn towards
                creative and carefree couples.
                <br />
                <br />I love to create wedding images that reflect not just how
                you look, but who you truly are - relaxed, authentic &
                beautifully yourselves. Forget lengthy shot lists or hours spent
                stiffly posing, my documentary approach is about capturing your
                day as it naturally unfolds, stripping away the artificiality
                and creating photos that reflect your true story.
              </p>

              <p ref={paragraphRightRef} className={styles.paragraph}>
                Rather than orchestrating moments, I move through your day as a
                trusted presence, observing how you share it with the people who
                matter most. Your story writes itself while I document each
                moment as it happens, the stollen glances, the heartfelt
                connections capturing what makes your wedding uniquely yours.
              </p>

              <p
                ref={paragraphCenterRef}
                className={`${styles.philosophy} ${styles.paragraph}`}
              >
                &quot;Because what truly matters isn&apos;t how it all looked,
                but how it felt.&quot;
              </p>
            </div>
          </div>

          <div ref={imageRef} className={styles.imageContent}>
            {!loading && introImage && (
              <Image
                src={introImage.url}
                alt="Chloe Mary Introduction"
                className={styles.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                quality={85}
                loading="lazy"
              />
            )}
          </div>
        </div>
        <div ref={ctaRef} className={styles.cta}>
          <div className={styles.ctaLine}></div>
          <Link href="/about" className={styles.ctaLink}>
            <span className={styles.ctaText}>Learn More About My Story</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
