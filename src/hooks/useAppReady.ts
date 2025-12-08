"use client";

import { useEffect, useState } from "react";

/**
 * Hook to track when the app is ready for animations.
 * This ensures DOM elements are mounted before running GSAP animations.
 */
export const useAppReady = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is fully mounted
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isAppReady;
};

