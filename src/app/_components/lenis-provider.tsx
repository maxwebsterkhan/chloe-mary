"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

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
    // Lenis (with GSAP ScrollTrigger)
    const lenis = new Lenis();
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
