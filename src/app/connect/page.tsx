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
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

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

  // Content animations
  useEffect(() => {
    if (contentRef.current) {
      createScrollTrigger(contentRef.current, {
        start: "top 80%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          // Animate text content
          if (paragraph1Ref.current) {
            tl.fromTo(
              paragraph1Ref.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              0
            );
          }

          if (paragraph2Ref.current) {
            tl.fromTo(
              paragraph2Ref.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              0.3
            );
          }

          // Animate form section
          if (formSectionRef.current) {
            tl.fromTo(
              formSectionRef.current,
              { opacity: 0, y: 60, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "back.out(1.2)",
              },
              0.6
            );
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
              <div className={styles.philosophySection}>
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

              <div className={styles.processSection}>
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

              <div className={styles.readySection}>
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
      <section className={styles.footer}>
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
