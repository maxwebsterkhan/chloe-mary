"use client";

import { usePathname } from "next/navigation";
import FooterWrapper from "./footer-wrapper";
import Footer from "./footer";

export default function FooterBoundary() {
  const pathname = usePathname();
  return (
    <FooterWrapper key={pathname} pathname={pathname}>
      <Footer />
    </FooterWrapper>
  );
}
