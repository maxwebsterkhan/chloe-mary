"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./expandable-text.module.scss";

interface ExpandableTextProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
}

export default function ExpandableText({
  children,
  maxHeight = 150,
  className = "",
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const fullHeightRef = useRef<number>(0);

  useGSAP(
    () => {
      if (textRef.current && !isAnimating) {
        // Temporarily set height to auto to get full height
        gsap.set(textRef.current, {
          height: "auto",
        });

        const fullHeight = textRef.current.scrollHeight;
        fullHeightRef.current = fullHeight;

        if (fullHeight > maxHeight) {
          setShowToggle(true);
          gsap.set(textRef.current, { height: maxHeight });
        } else {
          setShowToggle(false);
          gsap.set(textRef.current, { height: "auto" });
        }
      }
    },
    { scope: textRef, dependencies: [isAnimating] }
  );

  const toggleExpansion = () => {
    if (!textRef.current || isAnimating) return;

    setIsAnimating(true);

    // Find the testimonials grid and add animating class
    const gridContainer =
      textRef.current.closest(".testimonialsGrid") ||
      document.querySelector(".testimonialsGrid");
    if (gridContainer) {
      gridContainer.classList.add("animating");
    }

    if (!isExpanded) {
      gsap.to(textRef.current, {
        height: fullHeightRef.current,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          setIsAnimating(false);
          // Remove animating class after animation completes
          if (gridContainer) {
            gridContainer.classList.remove("animating");
          }
        },
      });
    } else {
      gsap.to(textRef.current, {
        height: maxHeight,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          setIsAnimating(false);
          // Remove animating class after animation completes
          if (gridContainer) {
            gridContainer.classList.remove("animating");
          }
        },
      });
    }

    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.expandableText} ${className}`}>
      {/* Visible content */}
      <div ref={textRef} className={styles.textContent}>
        {children}
      </div>

      {/* Gradient overlay when collapsed and toggle is available */}
      {!isExpanded && showToggle && <div className={styles.fadeOverlay} />}

      {/* Only show toggle button if content is long enough */}
      {showToggle && (
        <button
          onClick={toggleExpansion}
          className={styles.toggleButton}
          aria-label={isExpanded ? "Read less" : "Read more"}
          disabled={isAnimating}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
