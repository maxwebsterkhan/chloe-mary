"use client";

import Image from "next/image";
import styles from "./welcome-hero.module.scss";
import { useS3Images } from "@/hooks/useS3Images";

export default function WelcomeHero() {
  const { images } = useS3Images({ prefix: "welcome" });
  const welcomeImage = images.find(
    (img) => img.key === "welcome/welcome-pack.jpg"
  );

  return (
    <section className={styles.hero}>
      <div className={styles.heroImageWrapper}>
        {welcomeImage && (
          <Image
            src={welcomeImage.url}
            alt="Welcome Pack"
            fill
            className={styles.heroImage}
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        )}
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heroTitle}>Welcome to Your Journey</h1>
          <p className={styles.heroSubtitle}>
            I&apos;m thrilled to have you here. Let&apos;s begin this beautiful
            adventure together.
          </p>
        </div>
      </div>
    </section>
  );
}
