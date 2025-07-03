"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

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
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
