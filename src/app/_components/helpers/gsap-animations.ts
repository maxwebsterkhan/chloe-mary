import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Animation utilities
export const animationUtils = {
  // Fade in animation
  fadeIn: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        ...options,
      }
    );
  },

  // Slide in from left
  slideInLeft: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0, 
        x: -30,
        scale: 0.98
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        ...options,
      }
    );
  },

  // Slide in from down
  slideInDown: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0, 
        y: -25,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        ...options,
      }
    );
  },

  // Slide in from up
  slideInUp: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0, 
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        ...options,
      }
    );
  },

  // Scale animation
  scaleIn: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0, 
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        ...options,
      }
    );
  },

  // Line drawing animation (scaleX)
  drawLineX: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        transformOrigin: "left center",
        ...options,
      }
    );
  },

  // Line drawing animation (scaleY)
  drawLineY: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.inOut",
        transformOrigin: "top center",
        ...options,
      }
    );
  },

  // Stagger animation for multiple elements
  staggerFadeIn: (elements: HTMLElement[] | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.4,
        ...options,
      }
    );
  },

  // SplitText animation with fallback to manual splitting
  splitTextAnimation: (element: HTMLElement | string, options?: { 
    type?: "chars" | "words" | "lines", 
    direction?: "vertical" | "horizontal", 
    startDelay?: number,
    staggerAmount?: number 
  }) => {
    const { 
      type = "chars", 
      direction = "vertical", 
      startDelay = 0,
      staggerAmount = direction === "vertical" ? 0.06 : 0.04
    } = options || {};
    
    try {
      // Try to use SplitText first
      const split = new SplitText(element, { type });
      const targets = type === "chars" ? split.chars : type === "words" ? split.words : split.lines;
      
      console.log("SplitText working, targets:", targets.length);
      
      return gsap.fromTo(
        targets,
        { 
          opacity: 0, 
          y: direction === "vertical" ? 20 : 0, 
          x: direction === "horizontal" ? -10 : 0 
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: staggerAmount,
          delay: startDelay,
        }
      );
    } catch (error) {
      console.log("SplitText not available, using manual approach:", error);
      
      // Fallback to manual text splitting
      const el = typeof element === "string" ? document.querySelector(element) as HTMLElement : element;
      if (!el) return;
      
      const text = el.textContent || "";
      
      // Clear original text and create spans for each character
      el.innerHTML = "";
      const spans: HTMLSpanElement[] = [];
      
      if (type === "chars") {
        // Split into characters
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.opacity = "0"; // Start invisible
          
          // Handle spaces properly
          if (char === " ") {
            span.innerHTML = "&nbsp;";
          }
          
          el.appendChild(span);
          spans.push(span);
        }
      } else {
        // Split into words
        const words = text.split(" ");
        words.forEach((word, index) => {
          const span = document.createElement("span");
          span.textContent = word;
          span.style.display = "inline-block";
          span.style.opacity = "0"; // Start invisible
          
          el.appendChild(span);
          spans.push(span);
          
          // Add space after word (except last)
          if (index < words.length - 1) {
            const space = document.createElement("span");
            space.innerHTML = "&nbsp;";
            space.style.display = "inline-block";
            el.appendChild(space);
          }
        });
      }
      
      console.log("Manual split created", spans.length, "spans for text:", text);
      
      // Animate the spans
      return gsap.fromTo(
        spans,
        { 
          opacity: 0, 
          y: direction === "vertical" ? 20 : 0, 
          x: direction === "horizontal" ? -10 : 0 
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: staggerAmount,
          delay: startDelay,
        }
      );
    }
  },

  // Complex hero animation
  heroAnimation: (elements: { title: string, subtitle: string, line: string }) => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      elements.title,
      { opacity: 0, y: -25, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo(
      elements.subtitle,
      { opacity: 0, x: -30, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      elements.line,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power3.out", transformOrigin: "left center" },
      "-=0.2"
    );

    return tl;
  },

  // Scroll-triggered animation
  scrollAnimation: (element: HTMLElement | string, animation: gsap.TweenVars, trigger?: string) => {
    return gsap.fromTo(
      element,
      animation,
      {
        ...animation,
        scrollTrigger: {
          trigger: trigger || element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...(animation.scrollTrigger || {}),
        },
      }
    );
  },

  // Navigation bracket animation
  bracketAnimation: (element: HTMLElement | string, options?: { isHover?: boolean }) => {
    const { isHover = false } = options || {};
    
    if (isHover) {
      return gsap.to(element, {
        duration: 0.8,
        ease: "power2.inOut",
        // This will be handled by specific bracket positioning
      });
    }
    
    return gsap.fromTo(
      element,
      { width: 0, height: 0 },
      { width: "1rem", height: "1rem", duration: 0.8, ease: "power2.out" }
    );
  },

  // Advanced title animations
  titleReveal: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        ...options,
      }
    );
  },

  // Elastic slide in for subtitle
  elasticSlideIn: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        x: -150,
        scale: 0.5,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.4,
        ease: "elastic.out(1, 0.5)",
        ...options,
      }
    );
  },

  // Text reveal with mask effect
  textReveal: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power3.out",
        ...options,
      }
    );
  },

  // Morphing entrance
  morphIn: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        scaleX: 0.3,
        scaleY: 1.5,
        rotation: -5,
        transformOrigin: "left center",
      },
      {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(2)",
        ...options,
      }
    );
  },

  // Split text reveal for titles
  titleSplitReveal: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;
    
    const text = el.textContent || "";
    const words = text.split(" ");
    
    // Clear and create word spans
    el.innerHTML = "";
    const wordSpans: HTMLSpanElement[] = [];
    
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.overflow = "hidden";
      span.style.opacity = "0";
      
      el.appendChild(span);
      wordSpans.push(span);
      
      // Add space after word (except last)
      if (index < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        el.appendChild(space);
      }
    });
    
    return gsap.fromTo(
      wordSpans,
      { 
        opacity: 0,
        y: 100,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
        ...options,
      }
    );
  },

  // Glitch effect entrance  
  glitchIn: (element: HTMLElement | string) => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      element,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.1 }
    )
    .to(element, { x: 5, duration: 0.05 })
    .to(element, { x: -3, duration: 0.05 })
    .to(element, { x: 2, duration: 0.05 })
    .to(element, { x: 0, duration: 0.1 });
    
    return tl;
  },

  // Soft title reveal - gentle word-by-word fade up
  softTitleReveal: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;
    
    const text = el.textContent || "";
    const words = text.split(" ");
    
    // Clear and create word spans
    el.innerHTML = "";
    const wordSpans: HTMLSpanElement[] = [];
    
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      
      el.appendChild(span);
      wordSpans.push(span);
      
      // Add space after word (except last)
      if (index < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        el.appendChild(space);
      }
    });
    
    return gsap.fromTo(
      wordSpans,
      { 
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        ...options,
      }
    );
  },

  // Soft subtitle slide - gentle slide with subtle scale
  softSlideIn: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        x: -40,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        ...options,
      }
    );
  },
};

// Timeline utilities
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline(options);
};

// Scroll trigger utilities
export const createScrollTrigger = (element: HTMLElement | string, options: ScrollTrigger.Vars) => {
  return ScrollTrigger.create({
    trigger: element,
    ...options,
  });
};

// Utility to kill all animations
export const killAllAnimations = () => {
  gsap.killTweensOf("*");
  ScrollTrigger.killAll();
};

// Utility to refresh ScrollTrigger (useful for responsive changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
}; 