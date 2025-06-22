"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const isInitialized = useRef(false);

  // Initialize ScrollSmoother once
  useEffect(() => {
    if (isInitialized.current) return;

    // Prevent browser scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      const wrapper = document.getElementById("smooth-wrapper");
      const content = document.getElementById("smooth-content");

      if (wrapper && content && !smootherRef.current) {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });

        isInitialized.current = true;
      }
    }, 50);

    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    if (!isInitialized.current) return;

    // Scroll to top on route change
    if (smootherRef.current) {
      smootherRef.current.scrollTo(0, false); // Instant scroll to top
    }

    // Kill all ScrollTriggers and refresh
    ScrollTrigger.killAll();

    // Delay to ensure DOM is updated
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (smootherRef.current) {
        smootherRef.current.refresh();
      }
    }, 100);

    return () => clearTimeout(refreshTimer);
  }, [pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      isInitialized.current = false;
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
