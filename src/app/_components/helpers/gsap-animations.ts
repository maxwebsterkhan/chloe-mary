import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

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
    
    const el = typeof element === "string" ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;
    
    // Store original text if not already stored
    if (!el.dataset.originalText) {
      el.dataset.originalText = el.textContent || "";
    }
    
    // Reset to original text to ensure clean state
    const originalText = el.dataset.originalText;
    el.textContent = originalText;
    
    try {
      // Try to use SplitText first
      const split = new SplitText(element, { 
        type,
        position: "relative"
      });
      const targets = type === "chars" ? split.chars : type === "words" ? split.words : split.lines;
      
      // Remove any ARIA attributes that SplitText might have added
      targets.forEach((target: Element) => {
        const htmlTarget = target as HTMLElement;
        htmlTarget.removeAttribute('aria-hidden');
        htmlTarget.removeAttribute('aria-label');
        htmlTarget.removeAttribute('role');
      });
      
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
      
      // Clear and create spans for each character
      el.innerHTML = "";
      const spans: HTMLSpanElement[] = [];
      
      if (type === "chars") {
        // Split into characters
        for (let i = 0; i < originalText.length; i++) {
          const char = originalText[i];
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
        const words = originalText.split(" ");
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
      span.style.display = "inline";
      span.style.opacity = "0";
      span.style.whiteSpace = "nowrap";
      
      el.appendChild(span);
      wordSpans.push(span);
      
      // Add space after word (except last)
      if (index < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = " ";
        space.style.display = "inline";
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

  // NEW ANIMATION VARIANTS FOR DIFFERENT COMPONENTS

  // Floating entrance - perfect for intro sections
  floatingEntrance: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        y: 60,
        rotationX: 45,
        transformPerspective: 1000,
        transformOrigin: "50% 50%",
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.4)",
        ...options,
      }
    );
  },

  // Magnetic pull animation - great for cards
  magneticPull: (elements: HTMLElement[] | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      elements,
      { 
        opacity: 0,
        scale: 0.7,
        rotation: gsap.utils.random(-15, 15, true),
        x: gsap.utils.random(-100, 100, true),
        y: gsap.utils.random(-50, 50, true),
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        duration: 1.0,
        ease: "back.out(1.2)",
        stagger: {
          amount: 0.8,
          from: "random"
        },
        ...options,
      }
    );
  },

  // Prismatic text reveal - for special headings
  prismaticReveal: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;
    
    const text = el.textContent || "";
    const chars = text.split("");
    
    // Store original text
    if (!el.dataset.originalText) {
      el.dataset.originalText = text;
    }
    
    // Clear and create character spans
    el.innerHTML = "";
    const charSpans: HTMLSpanElement[] = [];
    
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transformOrigin = "50% 50%";
      
      el.appendChild(span);
      charSpans.push(span);
    });
    
    return gsap.fromTo(
      charSpans,
      { 
        opacity: 0,
        scale: 0.3,
        rotationY: 90,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "back.out(1.5)",
        stagger: {
          amount: 1.2,
          from: "center"
        },
        ...options,
      }
    );
  },

  // Typewriter effect using GSAP TextPlugin
  typewriter: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;
    
    const originalText = el.textContent || "";
    
    // Store original text if not already stored
    if (!el.dataset.originalText) {
      el.dataset.originalText = originalText;
    }
    
    // Clear the text first
    el.textContent = "";
    
    // Use TextPlugin to animate the text in - much faster
    return gsap.to(el, {
      duration: Math.max(0.8, originalText.length * 0.02), // Faster: minimum 0.8s, faster per character
      text: {
        value: originalText,
        delimiter: "" // Character by character
      },
      ease: "none",
      ...options,
    });
  },

  // Particle burst entrance
  particleBurst: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;
    
    // Create particle container
    const particleContainer = document.createElement("div");
    particleContainer.style.position = "relative";
    particleContainer.style.display = "inline-block";
    
    // Wrap element
    const parent = el.parentNode;
    parent?.insertBefore(particleContainer, el);
    particleContainer.appendChild(el);
    
    // Create particles
    const particles: HTMLElement[] = [];
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.backgroundColor = "var(--color-accent)";
      particle.style.borderRadius = "50%";
      particle.style.left = "50%";
      particle.style.top = "50%";
      particle.style.transform = "translate(-50%, -50%)";
      particle.style.pointerEvents = "none";
      
      particleContainer.appendChild(particle);
      particles.push(particle);
    }
    
    const tl = gsap.timeline();
    
    // Animate particles bursting out
    particles.forEach((particle, index) => {
      const angle = (index / particles.length) * Math.PI * 2;
      const distance = 80;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      tl.fromTo(particle, 
        { opacity: 1, scale: 0.5 },
        { 
          x, y, 
          opacity: 0, 
          scale: 1.5,
          duration: 0.8,
          ease: "power2.out",
        },
        0
      );
    });
    
    // Animate main element
    tl.fromTo(el,
      { opacity: 0, scale: 0.5 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        ease: "back.out(2)",
        ...options,
      },
      0.2
    );
    
    // Clean up particles
    tl.call(() => {
      particles.forEach(p => p.remove());
    }, [], 1);
    
    return tl;
  },

  // Wave text animation
  waveText: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;
    
    const text = el.textContent || "";
    const words = text.split(" ");
    
    // Store original text
    if (!el.dataset.originalText) {
      el.dataset.originalText = text;
    }
    
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
        y: 50,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "sine.out",
        stagger: {
          amount: 0.8,
          ease: "sine.inOut"
        },
        ...options,
      }
    );
  },

  // Spiral entrance for footer
  spiralEntrance: (element: HTMLElement | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        scale: 0.1,
        rotation: 720,
        transformOrigin: "center center",
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
        ...options,
      }
    );
  },

  // Liquid morph for cards
  liquidMorph: (elements: HTMLElement[] | string, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      elements,
      { 
        opacity: 0,
        scaleY: 0,
        skewX: 45,
        transformOrigin: "bottom center",
      },
      {
        opacity: 1,
        scaleY: 1,
        skewX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        stagger: {
          amount: 0.6,
          from: "start"
        },
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
export const createScrollTrigger = (element: HTMLElement | string, options: ScrollTrigger.Vars & { once?: boolean }) => {
  const { once, ...scrollTriggerOptions } = options;
  
  return ScrollTrigger.create({
    trigger: element,
    once: once || false, // Use the once parameter to prevent multiple runs
    ...scrollTriggerOptions,
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