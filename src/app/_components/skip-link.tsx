"use client";

import { useState } from "react";

export default function SkipLink() {
  const [isVisible, setIsVisible] = useState(false);

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainElement = document.getElementById("main");
    if (mainElement) {
      mainElement.focus();
      mainElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href="#main"
      className="skip-link"
      onClick={handleSkip}
      style={{
        position: "absolute",
        top: isVisible ? "6px" : "-40px",
        left: "6px",
        background: "#8B6D42",
        color: "#f3f0eb",
        padding: "8px 16px",
        textDecoration: "none",
        borderRadius: "4px",
        zIndex: 10000,
        fontSize: "14px",
        fontWeight: "500",
        transition: "top 0.2s ease",
        outline: "2px solid transparent",
        outlineOffset: "2px",
      }}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      Skip to main content
    </a>
  );
}
