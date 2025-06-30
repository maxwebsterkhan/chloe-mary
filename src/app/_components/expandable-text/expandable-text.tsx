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
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (textRef.current) {
        gsap.set(textRef.current, {
          height: "auto",
        });

        const fullHeight = textRef.current.scrollHeight;

        if (fullHeight > maxHeight) {
          setShowToggle(true);
          gsap.set(textRef.current, { height: maxHeight });
        }
      }
    },
    { scope: textRef }
  );

  const toggleExpansion = () => {
    if (!textRef.current) return;

    if (!isExpanded) {
      gsap.to(textRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      const currentHeight = textRef.current.scrollHeight;
      gsap.set(textRef.current, { height: currentHeight });

      gsap.to(textRef.current, {
        height: maxHeight,
        duration: 0.5,
        ease: "power2.out",
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
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
