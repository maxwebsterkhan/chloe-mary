"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
}

export default function LenisScrollWrapper({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    /* 1 — Create Lenis with autoRaf:false so GSAP drives it */
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    /* 2 — Let ScrollTrigger use Lenis for scroll values */
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (arguments.length && value != null) {
          // Cast value to number because ScrollTrigger passes a numeric scroll position
          lenis.scrollTo(value as number, { immediate: true });
        } else {
          return lenis.scroll ?? 0;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    /* 3 — Update ScrollTrigger whenever Lenis scrolls */
    lenis.on("scroll", ScrollTrigger.update);

    /* 4 — Drive Lenis from GSAP's ticker */
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* 5 — Initial refresh */
    ScrollTrigger.refresh();

    /* 6 — Cleanup */
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
}
