"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global Lenis Smooth Scroll Provider
 *
 * This component initializes Lenis smooth scrolling globally.
 * Lenis is integrated with GSAP ScrollTrigger for smooth animations.
 *
 * Usage:
 *
 * Nested Scroll:
 * For modals or other elements that have overflow: scroll;
 * add the data-attribute [data-lenis-prevent]
 *
 * Example:
 * <div className="modal" data-lenis-prevent>
 *   <div className="modal-content">Scrollable content</div>
 * </div>
 *
 * Stop/Pause Scroll:
 * Call lenis.stop(); to disable the scroll for the user,
 * for example when opening a modal.
 *
 * Example:
 * const handleOpenModal = () => {
 *   lenis.stop();
 *   // Open modal
 * };
 *
 * Start Scroll:
 * Call lenis.start(); to enable scroll again.
 *
 * Example:
 * const handleCloseModal = () => {
 *   lenis.start();
 *   // Close modal
 * };
 *
 * Scroll-To Anchor Target:
 * For more information how to implement lenis.scrollTo():
 * https://lenis.studiofreight.com/scroll-to
 *
 * Example:
 * lenis.scrollTo('#target', { offset: -100 });
 *
 * Using with GSAP ScrollTrigger:
 * Lenis is automatically integrated with GSAP ScrollTrigger.
 * The scroll events update ScrollTrigger, and GSAP ticker
 * handles the Lenis animation frame updates.
 */

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Make lenis instance globally available for stop/start/scrollTo
    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    // Cleanup
    return () => {
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete window.lenis;
      }
    };
  }, []);

  return <>{children}</>;
}

