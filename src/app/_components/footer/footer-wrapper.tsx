"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FooterWrapper = ({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) => {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      const boundary = document.querySelector("#boundary");
      if (!footer || !boundary) return;

      gsap.set(footer, { yPercent: -50 });
      const footerHeight = footer.offsetHeight;

      const uncover = gsap.timeline({ paused: true });
      uncover.to(footer, { yPercent: 0, ease: "none" });

      ScrollTrigger.create({
        trigger: boundary,
        start: "bottom bottom",
        end: `+=${footerHeight}`,
        animation: uncover,
        scrub: true,
      });

      // Observe boundary element for size changes
      const resizeObserver = new ResizeObserver(() => {
        // Refresh ScrollTrigger on boundary height change
        ScrollTrigger.refresh();
      });

      resizeObserver.observe(boundary);

      // Cleanup function (useGSAP handles GSAP cleanup automatically)
      return () => {
        resizeObserver.disconnect();
      };
    },
    {
      scope: footerRef,
      dependencies: [pathname], // Re-run on route change
    }
  );

  return (
    <div ref={footerRef} className="footer-element">
      {children}
    </div>
  );
};

export default FooterWrapper;
