"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { createScrollTrigger } from "../_components/helpers/gsap-animations";
import styles from "./connect.module.scss";

export default function ConnectPage() {
  // Refs for animations
  const heroRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLSpanElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const spacer1Ref = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const spacer2Ref = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLDivElement>(null);
  const spacer3Ref = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Hero animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    if (labelRef.current) {
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -100, rotationY: -15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.4,
          ease: "back.out(1.7)",
        },
        0.2
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        0.5
      );
    }

    if (decorRef.current) {
      const decorLine = decorRef.current.querySelector(`.${styles.decorLine}`);
      const decorText = decorRef.current.querySelector(`.${styles.decorText}`);

      if (decorLine) {
        tl.fromTo(
          decorLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.out" },
          0.8
        );
      }

      if (decorText) {
        tl.fromTo(
          decorText,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          1.0
        );
      }
    }

    // Animate gradient
    if (gradientRef.current) {
      gsap.set(gradientRef.current, {
        backgroundPosition: "-100% 0%",
      });

      gsap.to(gradientRef.current, {
        backgroundPosition: "100% 0%",
        duration: 6,
        ease: "power1.inOut",
        repeat: -1,
        delay: 1.5,
      });
    }
  }, []);

  // Philosophy section animation
  useEffect(() => {
    if (philosophyRef.current) {
      createScrollTrigger(philosophyRef.current, {
        start: "top 85%",
        once: true,
        onEnter: () => {
          const quote = philosophyRef.current?.querySelector(
            `.${styles.quote}`
          );
          const attribution = philosophyRef.current?.querySelector(
            `.${styles.quoteAttribution}`
          );

          const tl = gsap.timeline();

          if (quote) {
            tl.fromTo(
              quote,
              { opacity: 0, y: 50, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.2)",
              },
              0
            );
          }

          if (attribution) {
            tl.fromTo(
              attribution,
              { opacity: 0, x: 30 },
              { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
              0.4
            );
          }
        },
      });
    }
  }, []);

  // Spacer 1 animation (decorativeDivider)
  useEffect(() => {
    if (spacer1Ref.current) {
      createScrollTrigger(spacer1Ref.current, {
        start: "top 90%",
        once: true,
        onEnter: () => {
          const lines = spacer1Ref.current?.querySelectorAll(
            `.${styles.dividerLine}`
          );
          const dot = spacer1Ref.current?.querySelector(
            `.${styles.dividerDot}`
          );

          const tl = gsap.timeline();

          if (lines) {
            tl.fromTo(
              lines,
              { scaleX: 0, opacity: 0 },
              {
                scaleX: 1,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
              },
              0
            );
          }

          if (dot) {
            tl.fromTo(
              dot,
              { scale: 0, opacity: 0, rotation: 180 },
              {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
              },
              0.3
            );
          }
        },
      });
    }
  }, []);

  // Spacer 2 animation (elegantDivider)
  useEffect(() => {
    if (spacer2Ref.current) {
      createScrollTrigger(spacer2Ref.current, {
        start: "top 90%",
        once: true,
        onEnter: () => {
          const lines = spacer2Ref.current?.querySelectorAll(
            `.${styles.elegantLine}`
          );
          const dots = spacer2Ref.current?.querySelectorAll(
            `.${styles.elegantDot}`
          );
          const diamond = spacer2Ref.current?.querySelector(
            `.${styles.elegantDiamond}`
          );

          const tl = gsap.timeline();

          if (lines) {
            tl.fromTo(
              lines,
              { scaleX: 0, opacity: 0 },
              {
                scaleX: 1,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
              },
              0
            );
          }

          if (dots) {
            tl.fromTo(
              dots,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.1,
              },
              0.2
            );
          }

          if (diamond) {
            tl.fromTo(
              diamond,
              { scale: 0, opacity: 0, rotation: 180 },
              {
                scale: 1,
                opacity: 1,
                rotation: 45,
                duration: 0.6,
                ease: "back.out(1.7)",
              },
              0.4
            );
          }
        },
      });
    }
  }, []);

  // Spacer 3 animation (decorativeDivider with shape)
  useEffect(() => {
    if (spacer3Ref.current) {
      createScrollTrigger(spacer3Ref.current, {
        start: "top 90%",
        once: true,
        onEnter: () => {
          const lines = spacer3Ref.current?.querySelectorAll(
            `.${styles.dividerLine}`
          );
          const shape = spacer3Ref.current?.querySelector(
            `.${styles.dividerShape}`
          );

          const tl = gsap.timeline();

          if (lines) {
            tl.fromTo(
              lines,
              { scaleX: 0, opacity: 0 },
              {
                scaleX: 1,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
              },
              0
            );
          }

          if (shape) {
            tl.fromTo(
              shape,
              { scale: 0, opacity: 0, rotation: 225 },
              {
                scale: 1,
                opacity: 1,
                rotation: 45,
                duration: 0.8,
                ease: "back.out(1.7)",
              },
              0.3
            );
          }
        },
      });
    }
  }, []);

  // Process section animation
  useEffect(() => {
    if (processRef.current) {
      createScrollTrigger(processRef.current, {
        start: "top 80%",
        once: true,
        onEnter: () => {
          const title = processRef.current?.querySelector(
            `.${styles.processTitle}`
          );
          const steps = processRef.current?.querySelectorAll(
            `.${styles.processStep}`
          );

          const tl = gsap.timeline();

          if (title) {
            tl.fromTo(
              title,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              0
            );
          }

          if (steps) {
            steps.forEach((step, index) => {
              const stepNumber = step.querySelector(`.${styles.stepNumber}`);
              const stepContent = step.querySelector(`.${styles.stepContent}`);

              if (stepNumber) {
                tl.fromTo(
                  stepNumber,
                  { opacity: 0, scale: 0, rotation: -180 },
                  {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                  },
                  0.3 + index * 0.2
                );
              }

              if (stepContent) {
                tl.fromTo(
                  stepContent,
                  { opacity: 0, x: 50 },
                  { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
                  0.5 + index * 0.2
                );
              }
            });
          }
        },
      });
    }
  }, []);

  // Ready section animation
  useEffect(() => {
    if (readyRef.current) {
      createScrollTrigger(readyRef.current, {
        start: "top 80%",
        once: true,
        onEnter: () => {
          const label = readyRef.current?.querySelector(
            `.${styles.readyLabel}`
          );
          const title = readyRef.current?.querySelector(
            `.${styles.readyTitle}`
          );
          const accent = readyRef.current?.querySelector(
            `.${styles.readyAccent}`
          );
          const divider = readyRef.current?.querySelector(
            `.${styles.readyDivider}`
          );
          const text = readyRef.current?.querySelector(`.${styles.readyText}`);
          const action = readyRef.current?.querySelector(
            `.${styles.readyAction}`
          );

          const tl = gsap.timeline();

          if (label) {
            tl.fromTo(
              label,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
              0
            );
          }

          if (title) {
            tl.fromTo(
              title,
              { opacity: 0, y: 40, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "back.out(1.2)",
              },
              0.2
            );
          }

          if (accent) {
            // Animate the gradient text
            gsap.fromTo(
              accent,
              { backgroundPosition: "-100% 0%" },
              {
                backgroundPosition: "100% 0%",
                duration: 2,
                ease: "power2.inOut",
                repeat: -1,
                delay: 1,
              }
            );
          }

          if (divider) {
            const dividerElements = divider.querySelectorAll("*");
            tl.fromTo(
              dividerElements,
              { opacity: 0, scale: 0 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.1,
              },
              0.6
            );
          }

          if (text) {
            tl.fromTo(
              text,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              0.8
            );
          }

          if (action) {
            const arrow = action.querySelector(`.${styles.actionArrow}`);
            const actionText = action.querySelector(`.${styles.actionText}`);

            if (arrow && actionText) {
              tl.fromTo(
                [arrow, actionText],
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  stagger: 0.1,
                },
                1
              );

              // Animate arrow bouncing
              gsap.to(arrow, {
                y: 5,
                duration: 1,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: 2,
              });
            }
          }
        },
      });
    }
  }, []);

  // Form section animation
  useEffect(() => {
    if (formSectionRef.current) {
      createScrollTrigger(formSectionRef.current, {
        start: "top 80%",
        once: true,
        onEnter: () => {
          const formHeader = formSectionRef.current?.querySelector(
            `.${styles.formHeader}`
          );
          const iframeWrapper = formSectionRef.current?.querySelector(
            `.${styles.iframeWrapper}`
          );

          const tl = gsap.timeline();

          if (formHeader) {
            const title = formHeader.querySelector(`.${styles.formTitle}`);
            const subtitle = formHeader.querySelector(
              `.${styles.formSubtitle}`
            );

            if (title) {
              tl.fromTo(
                title,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                0
              );
            }

            if (subtitle) {
              tl.fromTo(
                subtitle,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                0.2
              );
            }
          }

          if (iframeWrapper) {
            tl.fromTo(
              iframeWrapper,
              { opacity: 0, y: 60, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.2)",
              },
              0.4
            );
          }
        },
      });
    }
  }, []);

  // Footer animation
  useEffect(() => {
    if (footerRef.current) {
      createScrollTrigger(footerRef.current, {
        start: "top 90%",
        once: true,
        onEnter: () => {
          const footerText = footerRef.current?.querySelector(
            `.${styles.footerText}`
          );
          const signature = footerRef.current?.querySelector(
            `.${styles.footerSignature}`
          );

          const tl = gsap.timeline();

          if (footerText) {
            tl.fromTo(
              footerText,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              0
            );
          }

          if (signature) {
            const line = signature.querySelector(`.${styles.signatureLine}`);
            const text = signature.querySelector(`.${styles.signatureText}`);

            if (line) {
              tl.fromTo(
                line,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, ease: "power2.out" },
                0.3
              );
            }

            if (text) {
              tl.fromTo(
                text,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
                0.6
              );
            }
          }
        },
      });
    }
  }, []);

  return (
    <div className={styles.connectPage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLayout}>
            <div className={styles.heroLeft}>
              <div ref={labelRef} className={styles.heroLabel}>
                LET&apos;S CONNECT &
              </div>
              <h1 ref={titleRef} className={styles.heroTitle}>
                CREATE
                <span ref={gradientRef} className={styles.titleAccent}>
                  SOMETHING
                </span>
                <span className={styles.titleSecondary}>BEAUTIFUL</span>
              </h1>
            </div>
            <div className={styles.heroRight}>
              <p ref={subtitleRef} className={styles.heroSubtitle}>
                Your love story deserves to be captured with
                <br />
                authenticity, artistry & heart.
              </p>

              <div ref={decorRef} className={styles.heroDecor}>
                <div className={styles.decorLine}></div>
                <span className={styles.decorText}>
                  BRISTOL • LONDON • UK & BEYOND
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className={styles.content}>
        <div className={styles.contentContainer}>
          <div className={styles.contentLayout}>
            {/* Text Content */}
            <div ref={textSectionRef} className={styles.textSection}>
              <div ref={philosophyRef} className={styles.philosophySection}>
                <div className={styles.philosophyQuote}>
                  <blockquote className={styles.quote}>
                    &ldquo;Every love story is unique, and your wedding
                    photography should be too. I believe in creating images that
                    feel authentically <em>you</em> — not just beautiful, but
                    deeply personal.&rdquo;
                  </blockquote>
                  <div className={styles.quoteAttribution}>— Chloe Mary</div>
                </div>
              </div>

              {/* Spacer between Philosophy and Process */}
              <div ref={spacer1Ref} className={styles.sectionSpacer}>
                <div className={styles.decorativeDivider}>
                  <div className={styles.dividerLine}></div>
                  <div className={styles.dividerDot}></div>
                  <div className={styles.dividerLine}></div>
                </div>
              </div>

              <div ref={processRef} className={styles.processSection}>
                <h3 className={styles.processTitle}>My Process</h3>
                <div className={styles.processSteps}>
                  <div className={styles.processStep}>
                    <div className={styles.stepNumber}>01</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Initial Enquiry</h4>
                      <p className={styles.stepDescription}>
                        Share your wedding details, vision, and what drew you to
                        my work. I love learning about what makes your
                        relationship unique and understanding your photography
                        style preferences.
                      </p>
                    </div>
                  </div>
                  <div className={styles.processStep}>
                    <div className={styles.stepNumber}>02</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Personal Response</h4>
                      <p className={styles.stepDescription}>
                        I&apos;ll send you a thoughtful, personalised response
                        within a few days, including my availability, package
                        information, and answers to any questions you might have
                        about my approach.
                      </p>
                    </div>
                  </div>
                  <div className={styles.processStep}>
                    <div className={styles.stepNumber}>03</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>
                        Complimentary Consultation
                      </h4>
                      <p className={styles.stepDescription}>
                        We&apos;ll have a relaxed video chat to get to know each
                        other better. This helps me understand your vision and
                        ensures we&apos;re a perfect match before your special
                        day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer between Process and Ready */}
              <div ref={spacer2Ref} className={styles.sectionSpacer}>
                <div className={styles.elegantDivider}>
                  <div className={styles.elegantLine}></div>
                  <div className={styles.elegantCenter}>
                    <div className={styles.elegantDot}></div>
                    <div className={styles.elegantDiamond}></div>
                    <div className={styles.elegantDot}></div>
                  </div>
                  <div className={styles.elegantLine}></div>
                </div>
              </div>

              <div ref={readyRef} className={styles.readySection}>
                <div className={styles.readyContent}>
                  <div className={styles.readyLabel}>ARE YOU READY?</div>
                  <h3 className={styles.readyTitle}>
                    Let&apos;s Create Something
                    <span className={styles.readyAccent}>Extraordinary</span>
                    Together
                  </h3>
                  <div className={styles.readyDivider}>
                    <div className={styles.readyLine}></div>
                    <div className={styles.readyDot}></div>
                    <div className={styles.readyLine}></div>
                  </div>
                  <p className={styles.readyText}>
                    I can&apos;t wait to hear about your love story and learn
                    what makes your relationship special.
                  </p>
                  <div className={styles.readyAction}>
                    <span className={styles.actionArrow}>↓</span>
                    <span className={styles.actionText}>
                      Start your enquiry below
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer between Ready and Form */}
            <div ref={spacer3Ref} className={styles.sectionSpacer}>
              <div className={styles.decorativeDivider}>
                <div className={styles.dividerLine}></div>
                <div className={styles.dividerShape}></div>
                <div className={styles.dividerLine}></div>
              </div>
            </div>

            {/* Form Section */}
            <div ref={formSectionRef} className={styles.formSection}>
              <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Get In Touch</h2>
                  <p className={styles.formSubtitle}>
                    Tell me about your special day
                  </p>
                </div>

                <div className={styles.iframeWrapper}>
                  <iframe
                    src="https://app.studioninja.co/contactform/parser/0a800fc9-7033-1037-8170-3f8950262227/0a800fc8-7078-10f2-8170-817650cf2af9"
                    width="100%"
                    height="800"
                    title="Contact Form - Chloe Mary Photography"
                    className={styles.contactIframe}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section ref={footerRef} className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerText}>
              <p className={styles.footerParagraph}>
                Thank you so much for your interest in working with me. I
                carefully select just <strong>25 couples each year</strong>,
                ensuring I can dedicate the time, attention, and personal care
                that your love story deserves. This allows me to craft a truly
                bespoke experience tailored to your unique vision.
              </p>
            </div>
            <div className={styles.footerSignature}>
              <div className={styles.signatureLine}></div>
              <span className={styles.signatureText}>Chloe Mary</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
