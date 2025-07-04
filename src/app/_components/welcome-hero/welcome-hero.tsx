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
            sizes="(min-width: 2560px) 2560px, (min-width: 1920px) 1920px, 100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qQEBALkE2Qjc4QD5ARktPUFVVVkJWXV1dXV1dXV3/2wBDABUXFx4dHj0lJT1dQEBAXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
