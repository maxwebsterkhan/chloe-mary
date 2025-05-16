"use client";

import styles from "./home-hero.module.scss";
import CascadingText from "../helpers/cascading-text";
import { useEffect, useState } from "react";

export default function HomeHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={styles["home-hero"]}>
      {!isMobile && <div className={styles["home-hero__vertical-line"]}></div>}
      <div className={styles["home-hero__container"]}>
        <div className={styles["home-hero__content"]}>
          <h1 className={styles["home-hero__title"]}>
            Authentic Modern Love Stories
          </h1>
          <p className={styles["home-hero__subtitle"]}>
            Told by you
            <span
              aria-hidden="true"
              className={styles["home-hero__dot-separator"]}
            >
              •
            </span>
            Captured by Chloe Mary
          </p>
        </div>
        <div className={styles["home-hero__memento"]}>
          <div className={styles["home-hero__vertical-text"]}>
            <CascadingText
              text="MEMENTO"
              className={styles["home-hero__cascading-text"]}
              letterClassName={styles["home-hero__cascading-text__letter"]}
              direction="vertical"
            />
            <CascadingText
              text="VIVERE"
              className={styles["home-hero__cascading-text"]}
              letterClassName={styles["home-hero__cascading-text__letter"]}
              direction="vertical"
              startDelay={0.4}
            />
          </div>
          <div className={styles["home-hero__horizontal-text"]}>
            <CascadingText
              text="R E M E M B E R T O L I V E"
              className={styles["home-hero__cascading-text"]}
              letterClassName={styles["home-hero__cascading-text__letter"]}
              direction="horizontal"
              startDelay={0.8}
            />
          </div>
        </div>
      </div>
      <div className={styles["home-hero__animated-line"]}></div>
    </div>
  );
}
