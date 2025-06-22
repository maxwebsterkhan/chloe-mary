"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./expandable-text.module.scss";

interface ExpandableTextProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
}

export default function ExpandableText({
  children,
  maxHeight = 120,
  className = "",
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Set initial collapsed height
      gsap.set(textRef.current, {
        height: maxHeight,
        overflow: "hidden",
      });
    }
  }, [maxHeight]);

  const toggleExpanded = () => {
    if (!textRef.current) return;

    if (isExpanded) {
      // Collapse
      gsap.to(textRef.current, {
        height: maxHeight,
        duration: 0.5,
        ease: "power2.inOut",
      });
      setIsExpanded(false);
    } else {
      // Expand - get the natural height
      const currentHeight = textRef.current.offsetHeight;
      gsap.set(textRef.current, { height: "auto" });
      const autoHeight = textRef.current.offsetHeight;
      gsap.set(textRef.current, { height: currentHeight });

      gsap.to(textRef.current, {
        height: autoHeight,
        duration: 0.5,
        ease: "power2.inOut",
      });
      setIsExpanded(true);
    }
  };

  return (
    <div className={`${styles.expandableText} ${className}`}>
      {/* Visible content */}
      <div ref={textRef} className={styles.textContent}>
        {children}
      </div>

      {/* Gradient overlay when collapsed */}
      {!isExpanded && <div className={styles.fadeOverlay} />}

      <button
        onClick={toggleExpanded}
        className={styles.toggleButton}
        aria-label={isExpanded ? "Read less" : "Read more"}
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
