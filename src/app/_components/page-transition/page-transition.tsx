"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page-transition.module.scss";

export default function PageTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isTransitioningRef = useRef(false);

  // Calculate grid and create blocks
  const adjustGrid = (): Promise<void> => {
    return new Promise((resolve) => {
      const transition = transitionRef.current;
      if (!transition) {
        resolve();
        return;
      }

      // Clear existing blocks first
      transition.innerHTML = "";

      // Temporarily show grid to get computed styles (but keep it invisible)
      const originalDisplay = transition.style.display;
      transition.style.display = "grid";
      transition.style.visibility = "hidden";
      transition.style.opacity = "0";

      const computedStyle = window.getComputedStyle(transition);
      const gridTemplateColumns = computedStyle.getPropertyValue(
        "grid-template-columns"
      );
      const columns = gridTemplateColumns.split(" ").length; // Count the number of columns

      const blockSize = window.innerWidth / columns;
      const rowsNeeded = Math.ceil(window.innerHeight / blockSize);

      // Update grid styles
      transition.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`;

      // Calculate the total number of blocks needed
      const totalBlocks = columns * rowsNeeded;

      // Generate blocks dynamically
      for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add(styles.transitionBlock);
        transition.appendChild(block);
      }

      // Restore original display state
      transition.style.display = originalDisplay || "none";
      transition.style.visibility = "";
      transition.style.opacity = "";

      // Resolve the Promise after grid creation is complete
      resolve();
    });
  };

  // Handle page load animation (fade out) - runs on every pathname change
  useEffect(() => {
    sessionStorage.removeItem("__transitioning");

    adjustGrid().then(() => {
      const transition = transitionRef.current;
      if (!transition) return;

      // Set blocks to visible first (they start at opacity 0 from adjustGrid)
      gsap.set(`.${styles.transitionBlock}`, { opacity: 1 });

      // Always animate out on page load (like DOMContentLoaded in original)
      const pageLoadTimeline = gsap.timeline({
        onStart: () => {
          gsap.set(transition, { backgroundColor: "transparent" });
          gsap.set(transition, { display: "grid" });
        },
        onComplete: () => {
          gsap.set(transition, { display: "none" });
          // Dispatch custom event to signal transition is complete
          window.dispatchEvent(new CustomEvent("pageTransitionComplete"));
          // Refresh ScrollTrigger after transition completes to ensure animations recalculate
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
        defaults: {
          ease: "linear",
        },
      });

      // Play the timeline only after the grid is ready
      pageLoadTimeline.to(
        `.${styles.transitionBlock}`,
        {
          opacity: 0,
          duration: 0.1,
          stagger: { amount: 0.75, from: "random" },
        },
        0.5
      );
    });
  }, [pathname]); // Run on every pathname change

  // Handle link clicks
  useEffect(() => {
    if (isTransitioningRef.current) return;

    // Pre-process all valid links
    const validLinks = Array.from(document.querySelectorAll("a")).filter(
      (link) => {
        const href = link.getAttribute("href") || "";
        if (!href) return false;

        try {
          const url = new URL(href, window.location.origin);
          const hostname = url.hostname;

          return (
            hostname === window.location.hostname && // Same domain
            !href.startsWith("#") && // Not an anchor link
            link.getAttribute("target") !== "_blank" && // Not opening in a new tab
            !link.hasAttribute("data-transition-prevent") // No 'data-transition-prevent' attribute
          );
        } catch {
          // Relative URL, check if it's valid
          return (
            !href.startsWith("#") &&
            link.getAttribute("target") !== "_blank" &&
            !link.hasAttribute("data-transition-prevent")
          );
        }
      }
    );

    // Add event listeners to pre-processed valid links
    const clickHandlers = validLinks.map((link) => {
      const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        const destination = link.href;

        isTransitioningRef.current = true;

        const transition = transitionRef.current;
        if (!transition) {
          router.push(destination);
          return;
        }

        // Mark that we're transitioning
        sessionStorage.setItem("__transitioning", "true");

        // Show loading grid with animation
        gsap.set(transition, { display: "grid" });
        gsap.fromTo(
          `.${styles.transitionBlock}`,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.001,
            ease: "linear",
            stagger: { amount: 0.5, from: "random" },
            onComplete: () => {
              router.push(destination);
              setTimeout(() => {
                isTransitioningRef.current = false;
                // Dispatch custom event to signal transition is complete
                window.dispatchEvent(new CustomEvent("pageTransitionComplete"));
                // Refresh ScrollTrigger after navigation to ensure animations recalculate
                requestAnimationFrame(() => {
                  ScrollTrigger.refresh();
                });
              }, 100);
            },
          }
        );
      };

      link.addEventListener("click", handleClick);
      return { link, handleClick };
    });

    return () => {
      clickHandlers.forEach(({ link, handleClick }) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [router, pathname]); // Re-run when pathname changes to catch new links

  // Handle pageshow event
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      adjustGrid();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={transitionRef}
      className={styles.transition}
      aria-hidden="true"
    ></div>
  );
}
