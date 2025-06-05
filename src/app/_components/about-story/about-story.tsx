"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./about-story.module.scss";
import Image from "next/image";

export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isPhilosophyVisible, setIsPhilosophyVisible] = useState(false);
  const [isClosingVisible, setIsClosingVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const content = contentRef.current;
    const philosophy = philosophyRef.current;
    const closing = closingRef.current;

    if (!content || !philosophy || !closing) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === content) {
            setIsContentVisible(entry.isIntersecting);
          } else if (entry.target === philosophy) {
            setIsPhilosophyVisible(entry.isIntersecting);
          } else if (entry.target === closing) {
            setIsClosingVisible(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(content);
    observer.observe(philosophy);
    observer.observe(closing);

    return () => {
      observer.unobserve(content);
      observer.unobserve(philosophy);
      observer.unobserve(closing);
    };
  }, []);

  // Scroll-based image fade effect
  useEffect(() => {
    const handleScroll = () => {
      const content = contentRef.current;
      const imageSection = imageRef.current;

      if (!content || !imageSection) return;

      const contentRect = content.getBoundingClientRect();
      const imageRect = imageSection.getBoundingClientRect();

      // Only trigger when content is passing the sticky image
      if (
        contentRect.bottom < imageRect.top ||
        contentRect.top > imageRect.bottom
      ) {
        return;
      }

      // Calculate progress based on how much content has scrolled past the image
      const contentStart = contentRect.top;
      const imageCenter = imageRect.top + imageRect.height / 2;

      // Calculate progress over a shorter distance (image height * 1.5) for quicker transition
      const fadeDistance = imageRect.height * 1.5;
      const scrolledDistance = Math.max(0, imageCenter - contentStart);
      const progress = Math.max(
        0,
        Math.min(1, scrolledDistance / fadeDistance)
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="about-story" className={styles.story} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div ref={imageRef} className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <Image
                src="/chloe-mary-portrait.jpg"
                alt="Chloe Mary - Photographer"
                width={600}
                height={800}
                className={styles.image}
                style={{ opacity: 1 - scrollProgress }}
                priority
              />
              <Image
                src="/chloe-mary-portrait-2.jpg"
                alt="Chloe Mary - Photographer"
                width={600}
                height={800}
                className={`${styles.image} ${styles.imageSecond}`}
                style={{ opacity: scrollProgress }}
                priority
              />
              <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.imageCaption}>
              <span className={styles.captionText}>BRISTOL BASED</span>
              <span className={styles.captionDivider}>•</span>
              <span className={styles.captionText}>UK & BEYOND</span>
            </div>
          </div>

          <div
            ref={contentRef}
            className={`${styles.content} ${
              isContentVisible ? styles.contentVisible : ""
            }`}
          >
            <div className={styles.intro}>
              <h2 className={styles.introTitle}>Meet Chloe</h2>
              <p className={styles.introText}>
                Mary is actually my middle name given to me in honour of my
                great grandmother. I&apos;m a photographer based in Bristol who
                captures weddings for the creative and carefree.
              </p>
            </div>

            <div className={styles.story1}>
              <div className={styles.storyNumber}>01</div>
              <p className={styles.storyTextLarge}>
                When I&apos;m not busy behind the camera, you can find me
                roaming around the UK with my partner Max on our camping
                adventures, usually by the coast.
              </p>
              <p className={styles.storyTextSmall}>
                A place of silence where the salty air calms my head and my
                creative soul can breathe.
              </p>
            </div>

            <div className={styles.pullQuote}>
              <blockquote className={styles.pullQuoteText}>
                &quot;I was the curious child who captured life with her little
                point-and-shoot camera&quot;
              </blockquote>
            </div>

            <div className={styles.story2}>
              <div className={styles.storyNumber}>02</div>
              <p className={styles.storyText}>
                I&apos;ve always been deeply inspired by the power of nostalgia
                and from a young age, I was the curious child who captured life
                with her little point-and-shoot camera. Back in a time when none
                of us felt the pressure to be &apos;picture perfect&apos; but
                instead chose to document the real moments in our lives simply
                to relive at a later date, seeing the rawness and realness in
                things.
              </p>
            </div>

            <div className={styles.story3}>
              <div className={styles.highlight}>
                <span className={styles.highlightLabel}>My Philosophy</span>
                <p className={styles.highlightText}>
                  That feeling of authenticity still lives with me today and I
                  strive to translate this into both my digital and film photo
                  work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width philosophy section */}
        <div
          ref={philosophyRef}
          className={`${styles.philosophySection} ${
            isPhilosophyVisible ? styles.philosophyVisible : ""
          }`}
        >
          <div className={styles.philosophyContent}>
            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>
                &quot;My style blends a relaxed documentary approach with an
                artful, editorial edge that resonates with modern lovers across
                the UK and beyond. On your wedding day, I won&apos;t be
                directing you or orchestrating moments; I&apos;ll be your
                trusted partner capturing the joy, emotions, and connections as
                they naturally unfold, aiding with a little artistic direction
                if needed or wanted.&quot;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Full-width closing section */}
        <div
          ref={closingRef}
          className={`${styles.closingSection} ${
            isClosingVisible ? styles.closingVisible : ""
          }`}
        >
          <div className={styles.closingStatement}>
            <p className={styles.closingTextLarge}>
              I want to show my couples just how much love and life was present
              on their wedding day
            </p>
            <p className={styles.closingTextSmall}>
              and just how perfect they were as their true, unvarnished selves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
