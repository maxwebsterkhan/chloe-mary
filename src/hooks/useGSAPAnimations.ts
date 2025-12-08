"use client";

import { useGSAP } from "@gsap/react";
import { useAppReady } from "@/hooks/useAppReady";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

type AnimationFunction = () => (() => void) | void;

interface UseGSAPAnimationsOptions {
  animations: AnimationFunction[];
  delay?: number;
  dependencies?: any[];
  scope?: React.RefObject<HTMLElement>;
}

/**
 * Custom hook for running GSAP animations with proper cleanup and app ready state.
 * Ensures animations only run when the app is ready and properly cleans up on unmount.
 */
export const useGSAPAnimations = ({
  animations,
  delay = 100,
  dependencies = [],
  scope,
}: UseGSAPAnimationsOptions) => {
  const isAppReady = useAppReady();

  useGSAP(
    () => {
      if (!isAppReady) return;

      const cleanupFns: Array<() => void> = [];
      const timer = setTimeout(() => {
        animations.forEach((fn) => {
          const cleanup = fn();
          if (typeof cleanup === "function") {
            cleanupFns.push(cleanup);
          }
        });
        // Refresh ScrollTrigger once after all animations are initialized
        ScrollTrigger.refresh();
      }, delay);

      return () => {
        clearTimeout(timer);
        cleanupFns.forEach((fn) => fn());
      };
    },
    { scope, dependencies: [isAppReady, ...dependencies] }
  );
};

