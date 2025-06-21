"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    // Ensure DOM is ready and elements exist
    const wrapper = document.getElementById("smooth-wrapper");
    const content = document.getElementById("smooth-content");

    if (wrapper && content) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });
    }

    // Cleanup function
    return () => {
      ScrollSmoother.get()?.kill();
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    // Kill all ScrollTriggers and refresh on route change
    ScrollTrigger.killAll();

    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollSmoother.get()?.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
