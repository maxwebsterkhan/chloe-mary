"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

// Register plugins (safe to call multiple times - GSAP handles duplicates gracefully)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer, CustomEase, SplitText);
}

export { gsap, ScrollTrigger, Observer, CustomEase, SplitText };

