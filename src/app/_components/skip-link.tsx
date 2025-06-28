"use client";

import { useState } from "react";

export default function SkipLink() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <a
      href="#main"
      className="skip-link"
      style={{
        position: "absolute",
        top: isVisible ? "6px" : "-40px",
        left: "6px",
        background: "#8B6D42",
        color: "#f3f0eb",
        padding: "8px",
        textDecoration: "none",
        borderRadius: "4px",
        zIndex: 10000,
        fontSize: "14px",
        fontWeight: "500",
        transition: "top 0.2s ease",
      }}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      Skip to main content
    </a>
  );
}
