"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css"; // Critical CSS import

interface LenisScrollWrapperProps {
  children: React.ReactNode;
}

export default function LenisScrollWrapper({
  children,
}: LenisScrollWrapperProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true, // Use built-in RAF
    });

    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
