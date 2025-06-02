"use client";

import styles from "./quote-intro.module.scss";

export default function QuoteIntro() {
  return (
    <section className={styles.intro}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.greeting}>Hi, I&apos;m Chloe</h2>
          <p className={styles.tagline}>
            &quot;Self Professed Queen of Monochrome&quot;
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.description}>
            <p className={styles.paragraphLeft}>
              I&apos;m passionate about working with creative and carefree
              couples who value relaxed, artistic images that truly reflect who
              you are.
            </p>

            <p className={styles.paragraphRight}>
              Rather than directing or staging scenes, I work alongside you,
              moving through your day as a trusted presence—not just an
              observer, but someone who becomes part of your story.
            </p>

            <p className={`${styles.philosophy} ${styles.paragraphCenter}`}>
              Because what truly matters isn&apos;t how it all looked, but how
              it felt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
