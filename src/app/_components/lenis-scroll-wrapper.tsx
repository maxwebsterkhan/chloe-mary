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
      duration: 1.4, // Increased for smoother motion
      easing: (t) => 1 - Math.pow(1 - t, 3), // Smoother cubic easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true, // Use built-in RAF
    });

    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
