"use client";

import { useEffect, useRef } from "react";
import styles from "./not-found.module.scss";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frontNoteRef = useRef<HTMLDivElement>(null);
  const backNoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !frontNoteRef.current || !backNoteRef.current)
      return;

    // Set initial states
    gsap.set(frontNoteRef.current, {
      opacity: 0,
      y: 30,
      rotation: -3,
      scale: 0.9,
      zIndex: 3,
    });

    // Back note visible from start with slight offset
    gsap.set(backNoteRef.current, {
      opacity: 1,
      y: 10,
      x: -5,
      rotation: 2,
      scale: 0.95,
      zIndex: 1,
    });

    // Create timeline
    const tl = gsap.timeline();

    // Only front note animates in
    tl.to(frontNoteRef.current, {
      opacity: 1,
      y: 0,
      rotation: -3,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    })

      // After 4 seconds, front note falls
      .to(
        frontNoteRef.current,
        {
          y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
          rotation: -45,
          scale: 0.8,
          duration: 1.2,
          ease: "power2.in",
        },
        "+=4"
      )

      // Back note adjusts to center as front falls
      .to(
        backNoteRef.current,
        {
          y: 0,
          x: 0,
          rotation: -1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.8"
      );
  }, []);

  return (
    <main className={styles.notFound} ref={containerRef}>
      <div className={styles.dimmedBackground}></div>

      {/* Back sticky note */}
      <div className={styles.stickyNote} ref={backNoteRef}>
        <div className={styles.noteContent}>
          <h1 className={styles.title}>404</h1>

          <p className={styles.message}>
            Oops! Still lost?
            <br />
            Use the nav above
          </p>

          <p className={styles.subtitle}>
            Sometimes the best shots are unplanned!
          </p>
        </div>
      </div>

      {/* Front sticky note */}
      <div className={styles.stickyNote} ref={frontNoteRef}>
        <div className={styles.noteContent}>
          <h1 className={styles.title}>404</h1>

          <p className={styles.message}>
            This photo wandered
            <br />
            out of the frame...
          </p>

          <p className={styles.subtitle}>Every story has unexpected turns!</p>
        </div>
      </div>
    </main>
  );
}
