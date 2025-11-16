"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import styles from "./slideshow.module.scss";

gsap.registerPlugin(Observer, ScrollTrigger, CustomEase);
CustomEase.create("slideshow-wipe", "0.6, 0.08, 0.02, 0.99");

interface SlideshowImage {
  src: string;
  alt: string;
}

interface SlideshowProps {
  images: SlideshowImage[];
}

export default function Slideshow({ images }: SlideshowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<Observer | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarClickHandlerRef = useRef<
    ((event: MouseEvent) => void) | null
  >(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || images.length === 0) return;

    // Save all elements in an object for easy reference
    const ui = {
      el,
      slides: Array.from(
        el.querySelectorAll<HTMLElement>('[data-slideshow="slide"]')
      ),
      inner: Array.from(
        el.querySelectorAll<HTMLElement>('[data-slideshow="parallax"]')
      ),
    };

    let current = 0;
    const length = ui.slides.length;
    let animating = false;
    const animationDuration = 0.9;
    let lastTriggeredIndex = 0;

    ui.slides.forEach((slide, index) => {
      slide.setAttribute("data-index", index.toString());
    });

    ui.slides[current].classList.add(styles.isCurrent);

    // Set initial positions for all slides
    ui.slides.forEach((slide, index) => {
      if (index !== current) {
        gsap.set(slide, { xPercent: 0, opacity: 0 });
        gsap.set(ui.inner[index], { xPercent: 0 });
      }
    });

    function navigate(direction: number, targetIndex: number | null = null) {
      if (animating) return;
      animating = true;
      if (observerRef.current) {
        observerRef.current.disable();
      }

      const previous = current;
      current =
        targetIndex !== null && targetIndex !== undefined
          ? targetIndex
          : direction === 1
          ? current < length - 1
            ? current + 1
            : 0
          : current > 0
          ? current - 1
          : length - 1;

      const currentSlide = ui.slides[previous];
      const currentInner = ui.inner[previous];
      const upcomingSlide = ui.slides[current];
      const upcomingInner = ui.inner[current];

      gsap
        .timeline({
          defaults: {
            duration: animationDuration,
            ease: "slideshow-wipe",
          },
          onStart: function () {
            upcomingSlide.classList.add(styles.isCurrent);
            gsap.set(upcomingSlide, { opacity: 1 });
          },
          onComplete: function () {
            currentSlide.classList.remove(styles.isCurrent);
            animating = false;
            // Re-enable observer after a short delay
            setTimeout(() => {
              if (observerRef.current) {
                observerRef.current.enable();
              }
            }, animationDuration * 1000);
          },
        })
        .to(currentSlide, { xPercent: -direction * 100 }, 0)
        .to(currentInner, { xPercent: direction * 50 }, 0)
        .fromTo(
          upcomingSlide,
          { xPercent: direction * 100 },
          { xPercent: 0 },
          0
        )
        .fromTo(
          upcomingInner,
          { xPercent: -direction * 50 },
          { xPercent: 0 },
          0
        );
    }

    const observer = Observer.create({
      target: el,
      type: "wheel,touch,pointer",
      // Drag events to go left/right
      onLeft: () => {
        if (!animating) navigate(1);
      },
      onRight: () => {
        if (!animating) navigate(-1);
      },
      // For wheel events, check horizontal movement
      onWheel: (event) => {
        if (animating) return;
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          if (event.deltaX > 50) {
            navigate(1);
          } else if (event.deltaX < -50) {
            navigate(-1);
          }
        }
      },
      wheelSpeed: -1,
      tolerance: 10,
    });

    observerRef.current = observer;

    // Create ScrollTrigger to pin and control horizontal scrolling
    const scrollDistance = window.innerHeight * 0.6 * length;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: 1,
      snap: {
        snapTo: (progress) => {
          // Find the closest snap point
          const targetIndex = Math.round(progress * (length - 1));
          return targetIndex / (length - 1 || 1);
        },
        duration: { min: 0.2, max: 0.6 },
        ease: "power1.inOut",
      },
      onUpdate: (self) => {
        // Skip if animating
        if (animating) return;

        // Calculate which slide should be active based on scroll progress
        const progress = self.progress;
        const targetIndex = Math.min(
          Math.round(progress * (length - 1)),
          length - 1
        );

        // Only trigger navigation when we cross into a new slide section
        if (targetIndex !== lastTriggeredIndex && targetIndex !== current) {
          lastTriggeredIndex = targetIndex;
          const direction = targetIndex > current ? 1 : -1;
          navigate(direction, targetIndex);
        }
      },
      invalidateOnRefresh: true,
    });

    // Initialize progress bar
    const progressBar = progressBarRef.current;
    const progressBarWrap = el.querySelector<HTMLElement>(
      `.${styles.progressBarWrap}`
    );

    if (progressBar && progressBarWrap) {
      // Animate the progress bar based on the same ScrollTrigger progress
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 0.5,
        },
      });

      // Click handler to scroll to a specific position
      const handleProgressBarClick = (event: MouseEvent) => {
        const clickX = event.clientX;
        const progress = clickX / progressBarWrap.offsetWidth;

        // Calculate the target scroll position within the slideshow section
        // Get the element's position relative to document
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const targetScrollPosition = elementTop + progress * scrollDistance;

        const lenis = typeof window !== "undefined" ? window.lenis : null;
        if (lenis) {
          lenis.scrollTo(targetScrollPosition, {
            duration: 0.725,
            easing: (t: number) => {
              // power3.out easing
              return 1 - Math.pow(1 - t, 3);
            },
          });
        } else {
          window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth",
          });
        }
      };

      progressBarWrap.addEventListener("click", handleProgressBarClick);
      progressBarClickHandlerRef.current = handleProgressBarClick;
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (progressBarWrap && progressBarClickHandlerRef.current) {
        progressBarWrap.removeEventListener(
          "click",
          progressBarClickHandlerRef.current
        );
      }
    };
  }, [images]);

  return (
    <div ref={containerRef} data-slideshow="wrap" className={styles.imgSlider}>
      <div className={styles.progressBarWrap}>
        <div ref={progressBarRef} className={styles.progressBar}></div>
      </div>
      <div className={styles.imgSliderList}>
        {images.map((image, index) => (
          <div
            key={`slide-${index}`}
            data-slideshow="slide"
            className={`${styles.imgSlide} ${
              index === 0 ? styles.isCurrent : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-slideshow="parallax"
              alt={image.alt}
              src={image.src}
              draggable={false}
              className={styles.imgSlideInner}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
