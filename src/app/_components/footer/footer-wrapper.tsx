"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterWrapper = ({ children }: { children: React.ReactNode }) => {
  const footerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the last <section> before the footer
    const allSections = Array.from(document.querySelectorAll("section"));
    const lastSection = allSections
      .filter(
        (section) =>
          !footerContainerRef.current ||
          !footerContainerRef.current.contains(section)
      )
      .pop();

    if (!footerContainerRef.current || !lastSection) return;

    // Always start fully hidden, regardless of height
    gsap.set(footerContainerRef.current, { yPercent: -100 });

    // Get the actual footer height
    const footerHeight = footerContainerRef.current.offsetHeight;

    // Timeline for reveal
    const uncover = gsap.timeline({ paused: true });
    uncover.to(footerContainerRef.current, { yPercent: 0, ease: "none" });

    // Use the actual footer height for the scroll distance
    const st = ScrollTrigger.create({
      trigger: lastSection,
      start: "bottom bottom",
      end: `+=${footerHeight}`,
      animation: uncover,
      scrub: true,
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={footerContainerRef} className="footer-element">
      {children}
    </div>
  );
};

export default FooterWrapper;
