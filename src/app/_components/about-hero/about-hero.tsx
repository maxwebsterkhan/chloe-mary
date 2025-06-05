"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./about-hero.module.scss";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  const handleScrollClick = () => {
    const aboutStory = document.getElementById("about-story");
    if (aboutStory) {
      aboutStory.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero} ref={sectionRef}>
      {/* Background decorative elements */}
      <div className={styles.decorativeElements}>
        <div className={styles.decorativeCircle}></div>
        <div className={styles.decorativeLine}></div>
        <div className={styles.decorativeShape}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div
            className={`${styles.titleSection} ${
              isVisible ? styles.titleVisible : ""
            }`}
          >
            {/* Main hero title with enhanced styling */}
            <div className={styles.heroMain}>
              <div className={styles.heroPreTitle}>
                <span className={styles.preTitleText}>Meet</span>
                <div className={styles.preTitleLine}></div>
              </div>

              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleWord}>NOSTALGIA</span>
                <span className={styles.heroTitleWord}>LOVER</span>
              </h1>

              <div className={styles.heroSubtitle}>
                <span className={styles.heroSubtitleText}>
                  & Visual Storyteller
                </span>
              </div>
            </div>

            {/* Characteristic traits with varied styling */}
            <div className={styles.traitsSection}>
              <div className={styles.traitPrimary}>
                <div className={styles.traitIcon}>—</div>
                <h2 className={styles.traitTitleLarge}>
                  <span className={styles.traitWord}>EMBRACER</span>
                  <span className={styles.traitWord}>OF THE</span>
                  <span className={styles.traitWordAccent}>IMPERFECT</span>
                </h2>
                <div className={styles.traitIcon}>—</div>
              </div>

              <div className={styles.traitSecondary}>
                <div className={styles.traitGrid}>
                  <div className={styles.traitItem}>
                    <span className={styles.traitLabel}>Collector</span>
                    <span className={styles.traitText}>OF MEMORIES</span>
                  </div>
                  <div className={styles.traitItem}>
                    <span className={styles.traitLabel}>Preserver</span>
                    <span className={styles.traitText}>OF LEGACIES</span>
                  </div>
                </div>
              </div>

              <div className={styles.traitHighlight}>
                <div className={styles.highlightBox}>
                  <h2 className={styles.traitTitleSpecial}>
                    <span className={styles.specialWordGradient}>
                      EXTROVERTED
                    </span>
                    <span className={styles.specialWordGradient}>
                      INTROVERT
                    </span>
                  </h2>
                  <div className={styles.highlightAccent}></div>
                </div>
              </div>
            </div>

            {/* Enhanced tagline section */}
            <div className={styles.taglineSection}>
              <div className={styles.taglineWrapper}>
                <div className={styles.taglineDecorator}></div>
                <p
                  className={`${styles.tagline} ${
                    isVisible ? styles.taglineVisible : ""
                  }`}
                >
                  Wedding Photographer
                </p>
                <div className={styles.taglineDecorator}></div>
              </div>
              <div className={styles.taglineSubtext}>
                Bristol Based • UK & Beyond
              </div>
            </div>

            {/* Enhanced scroll indicator */}
            <div className={styles.scrollSection}>
              <div
                className={styles.scrollIndicator}
                onClick={handleScrollClick}
              >
                <div className={styles.scrollContent}>
                  <div className={styles.scrollLine}></div>
                  <span className={styles.scrollText}>DISCOVER</span>
                  <span className={styles.scrollSubtext}>My Story</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
