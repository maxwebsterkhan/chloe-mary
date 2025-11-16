"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import styles from "./page-transition.module.scss";

export default function PageTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isTransitioningRef = useRef(false);
  const initialMountRef = useRef(true);

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

      // Get computed style of the grid and extract the number of columns
      const computedStyle = window.getComputedStyle(transition);
      const gridTemplateColumns = computedStyle.getPropertyValue(
        "grid-template-columns"
      );
      const columns = gridTemplateColumns.split(" ").length; // Count the number of columns

      const blockSize = window.innerWidth / columns;
      const rowsNeeded = Math.ceil(window.innerHeight / blockSize);

      // Update grid styles
      transition.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`;
      transition.style.display = "grid";

      // Calculate the total number of blocks needed
      const totalBlocks = columns * rowsNeeded;

      // Create blocks
      const newBlocks: HTMLDivElement[] = [];
      for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add(styles.transitionBlock);
        transition.appendChild(block);
        newBlocks.push(block);
      }

      setBlocks(newBlocks);
      resolve();
    });
  };

  // Initial page load animation
  useEffect(() => {
    adjustGrid().then(() => {
      const transition = transitionRef.current;
      if (!transition) return;

      const pageLoadTimeline = gsap.timeline({
        onStart: () => {
          gsap.set(transition, { backgroundColor: "transparent" });
          setIsVisible(true);
        },
        onComplete: () => {
          gsap.set(transition, { display: "none" });
          setIsVisible(false);
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
  }, []);

  // Handle route changes
  useEffect(() => {
    if (isTransitioningRef.current) return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Check if link should be excluded
      if (
        link.hasAttribute("data-transition-prevent") ||
        link.getAttribute("target") === "_blank" ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Check if it's an internal link
      try {
        const url = new URL(href, window.location.origin);
        if (url.hostname !== window.location.hostname) {
          return;
        }
      } catch {
        // Relative URL, continue
      }

      // Prevent default navigation
      e.preventDefault();
      isTransitioningRef.current = true;

      const transition = transitionRef.current;
      if (!transition) {
        router.push(href);
        return;
      }

      setIsVisible(true);

      // Ensure grid is ready
      adjustGrid().then(() => {
        // Animate blocks in
        gsap.fromTo(
          `.${styles.transitionBlock}`,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.001,
            ease: "linear",
            stagger: { amount: 0.5, from: "random" },
            onComplete: () => {
              // Navigate after animation
              router.push(href);
              // Reset after a short delay to allow navigation
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 100);
            },
          }
        );
      });
    };

    document.addEventListener("click", handleLinkClick, true);

    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [router]);

  // Handle page show (back/forward navigation)
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
      if (transitionRef.current) {
        // Clear existing blocks
        transitionRef.current.innerHTML = "";
        setBlocks([]);
        // Recreate grid
        adjustGrid();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate out on pathname change (after navigation)
  useEffect(() => {
    // Skip initial render
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }

    if (!isVisible) return;

    const transition = transitionRef.current;
    if (!transition) return;

    // Ensure blocks exist
    const existingBlocks = transition.querySelectorAll(`.${styles.transitionBlock}`);
    if (existingBlocks.length === 0) {
      adjustGrid().then(() => {
        const exitTimeline = gsap.timeline({
          onStart: () => {
            gsap.set(transition, { backgroundColor: "transparent" });
          },
          onComplete: () => {
            gsap.set(transition, { display: "none" });
            setIsVisible(false);
          },
          defaults: {
            ease: "linear",
          },
        });

        exitTimeline.to(`.${styles.transitionBlock}`, {
          opacity: 0,
          duration: 0.1,
          stagger: { amount: 0.75, from: "random" },
        });
      });
      return;
    }

    const exitTimeline = gsap.timeline({
      onStart: () => {
        gsap.set(transition, { backgroundColor: "transparent" });
      },
      onComplete: () => {
        gsap.set(transition, { display: "none" });
        setIsVisible(false);
      },
      defaults: {
        ease: "linear",
      },
    });

    exitTimeline.to(`.${styles.transitionBlock}`, {
      opacity: 0,
      duration: 0.1,
      stagger: { amount: 0.75, from: "random" },
    });
  }, [pathname]);

  return (
    <div
      ref={transitionRef}
      className={styles.transition}
      aria-hidden="true"
    ></div>
  );
}

