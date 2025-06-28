"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterWrapper = ({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Helper to (re)initialize ScrollTrigger
  const initScrollTrigger = () => {
    const footer = footerRef.current;
    const main = document.querySelector("#main");
    if (!footer || !main) return;

    // Kill previous instances
    scrollTriggerRef.current?.kill();
    timelineRef.current?.kill();

    gsap.set(footer, { yPercent: -50 });
    const footerHeight = footer.offsetHeight;

    const uncover = gsap.timeline({ paused: true });
    uncover.to(footer, { yPercent: 0, ease: "none" });
    timelineRef.current = uncover;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: main,
      start: "bottom bottom",
      end: `+=${footerHeight}`,
      animation: uncover,
      scrub: true,
    });
  };

  useLayoutEffect(() => {
    initScrollTrigger();

    // Observe main element for size changes
    const main = document.querySelector("#main");
    if (!main) return;

    const resizeObserver = new ResizeObserver(() => {
      // Re-init ScrollTrigger on main height change
      initScrollTrigger();
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(main);

    return () => {
      resizeObserver.disconnect();
      scrollTriggerRef.current?.kill();
      timelineRef.current?.kill();
    };
  }, [pathname]); // Re-run on route change

  return (
    <div ref={footerRef} className="footer-element">
      {children}
    </div>
  );
};

export default FooterWrapper;
