"use client";

import { useRef } from "react";
import styles from "./pricing.module.scss";
import { createScrollTrigger } from "../_components/helpers/gsap-animations";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import PricingFooter from "../_components/stories-footer/pricing-footer";

export default function PricingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gradientRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const fullDayRef = useRef<HTMLElement>(null);
  const setHoursRef = useRef<HTMLElement>(null);
  const destinationRef = useRef<HTMLElement>(null);
  const inclusionsRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Hero animations
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.5 });

      // Pricing page: Subtle directional + refined timing variation
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, x: -15, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          0
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, x: 40, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          0.15
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "power2.out",
          },
          0.4
        );
      }

      if (decorRef.current) {
        const decorLine = decorRef.current.querySelector(
          `.${styles.decorLine}`
        );
        const decorText = decorRef.current.querySelector(
          `.${styles.decorText}`
        );

        if (decorLine) {
          tl.fromTo(
            decorLine,
            { scaleX: 0, transformOrigin: "right center" },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            0.7
          );
        }

        if (decorText) {
          tl.fromTo(
            decorText,
            { opacity: 0, x: 15, scale: 0.98 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            1.0
          );
        }
      }

      // Animate gradient with striking visual effect
      if (gradientRef.current) {
        // Set initial background position
        gsap.set(gradientRef.current, {
          backgroundPosition: "-100% 0%",
        });

        // Create a smooth left-to-right gradient sweep
        gsap.to(gradientRef.current, {
          backgroundPosition: "100% 0%",
          duration: 6,
          ease: "power1.inOut",
          repeat: -1,
          delay: 1.5,
        });
      }
    }

    // Animate sections on scroll
    [fullDayRef, setHoursRef, destinationRef, inclusionsRef].forEach((ref) => {
      if (ref.current) {
        createScrollTrigger(ref.current, {
          start: "top 80%",
          once: true,
          onEnter: () => {
            const elements = ref.current?.querySelectorAll(
              `.${styles.animateIn}`
            );
            if (elements) {
              gsap.fromTo(
                Array.from(elements),
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  stagger: 0.15,
                }
              );
            }
          },
        });
      }
    });
  });

  return (
    <div className={styles.pricingPage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLayout}>
            <div className={styles.heroLeft}>
              <div ref={labelRef} className={styles.heroLabel}>
                PRICING AND
              </div>
              <h1 ref={titleRef} className={styles.heroTitle}>
                EVERYTHING
                <span ref={gradientRef} className={styles.titleAccent}>
                  YOU NEED
                </span>
                <span className={styles.titleSecondary}>TO KNOW</span>
              </h1>
            </div>
            <div className={styles.heroRight}>
              <p ref={subtitleRef} className={styles.heroSubtitle}>
                Full day coverage, intimate celebrations
                <br />& destination weddings.
              </p>

              <div ref={decorRef} className={styles.heroDecor}>
                <div className={styles.decorLine}></div>
                <span className={styles.decorText}>
                  BRISTOL BASED • UK & BEYOND
                </span>
              </div>
            </div>
          </div>

          <div className={styles.heroFooter}>
            <div className={styles.heroFooterContent}>
              <div className={styles.heroStatement}>
                <p className={styles.statementText}>
                  Transparent pricing with no hidden costs. Every package
                  includes professional editing, online gallery access, and
                  personal printing rights.
                </p>
              </div>

              <div className={styles.heroMetrics}>
                <div className={styles.metricGroup}>
                  <span className={styles.metricLabel}>Starting from</span>
                  <span className={styles.metricValue}>£1,350</span>
                </div>
                <div className={styles.metricDivider}></div>
                <div className={styles.metricGroup}>
                  <span className={styles.metricLabel}>Delivery timeline</span>
                  <span className={styles.metricValue}>1-12 weeks</span>
                </div>
                <div className={styles.metricDivider}></div>
                <div className={styles.metricGroup}>
                  <span className={styles.metricLabel}>Coverage options</span>
                  <span className={styles.metricValue}>3-12 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="main" tabIndex={-1}>
        {/* Full Day Coverage - Light */}
        <section
          ref={fullDayRef}
          className={`${styles.section} ${styles.sectionLight}`}
        >
          {/* Decorative images for light section */}
          <Image
            src="/floral.webp"
            alt=""
            width={168}
            height={168}
            style={{
              opacity: 0.22,
              position: "absolute",
              top: "3rem",
              right: "3rem",
              zIndex: 0,
            }}
          />
          <div className={styles.container}>
            <div className={styles.sectionLayout}>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionNumber}>01</span>
                <div className={styles.sectionLabels}>
                  <span className={styles.sectionLabel}>COVERAGE</span>
                  <span className={styles.sectionSubLabel}>FULL DAY</span>
                </div>

                <div className={`${styles.metaNote} ${styles.animateIn}`}>
                  <span className={styles.noteHighlight}>INCLUDED</span>
                  <p>Two rolls of black and white film</p>
                  <span className={styles.noteAddition}>
                    Additional rolls available for £50 each
                  </span>
                </div>
              </div>

              <div className={styles.contentArea}>
                <h2 className={`${styles.sectionTitle} ${styles.animateIn}`}>
                  FULL DAY
                  <span className={styles.titleBreak}>COVERAGE</span>
                </h2>

                <div className={styles.priceMatrix}>
                  <div className={`${styles.priceBlock} ${styles.animateIn}`}>
                    <div className={styles.priceLabel}>ESSENTIAL</div>
                    <div className={styles.priceDetails}>
                      <span className={styles.priceAmount}>£3,500</span>
                      <span className={styles.priceDesc}>
                        Up to 9 hours of documentation
                      </span>
                    </div>
                  </div>

                  <div className={`${styles.priceBlock} ${styles.animateIn}`}>
                    <div className={styles.priceLabel}>EXTENSIVE</div>
                    <div className={styles.priceDetails}>
                      <span className={styles.priceAmount}>£4,500</span>
                      <span className={styles.priceDesc}>
                        Up to 12 hours of documentation
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`${styles.mobileMetaNote} ${styles.animateIn}`}>
                  <span className={styles.noteHighlight}>INCLUDED</span>
                  <p>Two rolls of black and white film</p>
                  <span className={styles.noteAddition}>
                    Additional rolls available for £50 each
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Set Hours - Dark */}
        <section
          ref={setHoursRef}
          className={`${styles.section} ${styles.sectionDark}`}
        >
          <div className={styles.container}>
            <div className={styles.sectionLayout}>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionNumber}>02</span>
                <div className={styles.sectionLabels}>
                  <span className={styles.sectionLabel}>SESSIONS</span>
                  <span className={styles.sectionSubLabel}>SET HOURS</span>
                </div>

                <div className={`${styles.metaExtensions} ${styles.animateIn}`}>
                  <div className={styles.extensionItem}>
                    <span className={styles.extensionLabel}>
                      EXTEND YOUR STORY
                    </span>
                    <span className={styles.extensionPrice}>
                      £375 per additional hour
                    </span>
                  </div>
                  <div className={styles.extensionItem}>
                    <span className={styles.extensionLabel}>FILM</span>
                    <span className={styles.extensionPrice}>
                      £50 per film roll
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.contentArea}>
                <h2 className={`${styles.sectionTitle} ${styles.animateIn}`}>
                  INTIMATE
                  <span className={styles.titleBreak}>MOMENTS</span>
                </h2>

                <div className={styles.priceMatrix}>
                  <div className={`${styles.priceBlock} ${styles.animateIn}`}>
                    <div className={styles.priceLabel}>FOCUSED</div>
                    <div className={styles.priceDetails}>
                      <span className={styles.priceAmount}>£1,350</span>
                      <span className={styles.priceDesc}>
                        Up to 3 hours of documentation
                      </span>
                      <span className={styles.availability}>
                        Limited peak season availability
                      </span>
                    </div>
                  </div>

                  <div className={`${styles.priceBlock} ${styles.animateIn}`}>
                    <div className={styles.priceLabel}>EXTENDED</div>
                    <div className={styles.priceDetails}>
                      <span className={styles.priceAmount}>£2,100</span>
                      <span className={styles.priceDesc}>
                        Up to 5 hours of documentation
                      </span>
                      <span className={styles.availability}>
                        Limited peak season availability
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.mobileMetaExtensions} ${styles.animateIn}`}
                >
                  <div className={styles.extensionItem}>
                    <span className={styles.extensionLabel}>
                      EXTEND YOUR STORY
                    </span>
                    <span className={styles.extensionPrice}>
                      £375 per additional hour
                    </span>
                  </div>
                  <div className={styles.extensionItem}>
                    <span className={styles.extensionLabel}>FILM</span>
                    <span className={styles.extensionPrice}>
                      £50 per film roll
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations - Light */}
        <section
          ref={destinationRef}
          className={`${styles.section} ${styles.sectionLight}`}
        >
          {/* Decorative images for light section */}
          <Image
            src="/polaroid.webp"
            alt=""
            width={168}
            height={168}
            style={{
              opacity: 0.25,
              position: "absolute",
              top: "3rem",
              right: "3rem",
              zIndex: 0,
              transform: "rotate(-8deg)",
            }}
          />
          <div className={styles.container}>
            <div className={styles.sectionLayout}>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionNumber}>03</span>
                <div className={styles.sectionLabels}>
                  <span className={styles.sectionLabel}>TRAVEL</span>
                  <span className={styles.sectionSubLabel}>DESTINATIONS</span>
                </div>

                <div className={`${styles.metaNote} ${styles.animateIn}`}>
                  <span className={styles.noteHighlight}>
                    ADVENTURE INCLUDES
                  </span>
                  <p>Two rolls of black and white film</p>
                  <span className={styles.noteAddition}>
                    Additional rolls available for £50 each
                  </span>
                </div>
              </div>

              <div className={styles.contentArea}>
                <h2 className={`${styles.sectionTitle} ${styles.animateIn}`}>
                  BEYOND
                  <span className={styles.titleBreak}>BORDERS</span>
                </h2>

                <div className={styles.destinationMatrix}>
                  <div
                    className={`${styles.destinationBlock} ${styles.animateIn}`}
                  >
                    <div className={styles.destinationRegion}>EUROPE</div>
                    <div className={styles.destinationDetails}>
                      <span className={styles.destinationPrice}>
                        From £4,250
                      </span>
                      <span className={styles.destinationDesc}>
                        Up to 9 hours of documentation
                      </span>
                    </div>
                  </div>

                  <div
                    className={`${styles.destinationBlock} ${styles.animateIn}`}
                  >
                    <div className={styles.destinationRegion}>WORLDWIDE</div>
                    <div className={styles.destinationDetails}>
                      <span className={styles.destinationPrice}>
                        From £4,750
                      </span>
                      <span className={styles.destinationDesc}>
                        Up to 9 hours of documentation
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`${styles.mobileMetaNote} ${styles.animateIn}`}>
                  <span className={styles.noteHighlight}>
                    ADVENTURE INCLUDES
                  </span>
                  <p>One roll of black and white film</p>
                  <span className={styles.noteAddition}>
                    Additional rolls available for £50 each
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Inclusions - Dark */}
        <section
          ref={inclusionsRef}
          className={`${styles.inclusionsSection} ${styles.sectionDark}`}
        >
          <div className={styles.container}>
            <div className={styles.inclusionsLayout}>
              <div className={styles.inclusionsMeta}>
                <span className={styles.inclusionsNumber}>04</span>
                <div className={styles.inclusionsLabels}>
                  <span className={styles.inclusionsLabel}>SERVICE</span>
                  <span className={styles.inclusionsSubLabel}>INCLUSIONS</span>
                </div>
              </div>

              <div className={styles.inclusionsContent}>
                <h2 className={`${styles.inclusionsTitle} ${styles.animateIn}`}>
                  COMPLETE
                  <span className={styles.titleBreak}>EXPERIENCE</span>
                </h2>

                <div className={styles.inclusionsList}>
                  <div className={`${styles.inclusionRow} ${styles.animateIn}`}>
                    <div className={styles.inclusionLabel}>ONLINE GALLERY</div>
                    <div className={styles.inclusionDesc}>
                      You will receive a preview gallery within 1-2 weeks of
                      your wedding date with the remaining images delivered in
                      your final gallery within 12 weeks. This includes
                      unlimited downloads for you, your family and friends and
                      remains online for 6 months.
                    </div>
                  </div>

                  <div className={`${styles.inclusionRow} ${styles.animateIn}`}>
                    <div className={styles.inclusionLabel}>
                      HI-RES IMAGES & PRINTING LICENCE
                    </div>
                    <div className={styles.inclusionDesc}>
                      All photos are shared with you in web size resolution
                      (suitable for social media sharing) and high resolution
                      (suitable for printing). You also receive a personal
                      printing licence which allows you to print your photos
                      with any company of your choice.
                    </div>
                  </div>

                  <div className={`${styles.inclusionRow} ${styles.animateIn}`}>
                    <div className={styles.inclusionLabel}>
                      TRAVEL CHARGES INCLUDED
                    </div>
                    <div className={styles.inclusionDesc}>
                      All UK travel is included within quoted fees. For
                      Scotland, Ireland and destination weddings, additional
                      charges will apply but are clearly outlined in your quote.
                    </div>
                  </div>

                  <div className={`${styles.inclusionRow} ${styles.animateIn}`}>
                    <div className={styles.inclusionLabel}>ONLINE STORE</div>
                    <div className={styles.inclusionDesc}>
                      Through your online store you will be able to purchase
                      professional quality products. With a wide range of
                      choices and products delivered straight to your door, this
                      is an easy and convenient way to order quality and trusted
                      products.
                    </div>
                  </div>

                  <div className={`${styles.inclusionRow} ${styles.animateIn}`}>
                    <div className={styles.inclusionLabel}>HELP & GUIDANCE</div>
                    <div className={styles.inclusionDesc}>
                      Wedding planning for some can be a stressful experience,
                      so having an inside source of knowledge available to you
                      whenever needed can be invaluable. I personally allocate
                      time in my schedule to be available for you whenever
                      needed and you can ask me any questions or for advice, no
                      matter how big or small.
                    </div>
                  </div>

                  <div className={`${styles.inclusionRow} ${styles.animateIn}`}>
                    <div className={styles.inclusionLabel}>
                      LITTLE BLACK BOOK
                    </div>
                    <div className={styles.inclusionDesc}>
                      As part of booking with me, you&apos;ll receive exclusive
                      access to my &apos;little black book&apos; which is full
                      of supplier recommendations to help you with planning.
                      Suppliers are regularly vetted, updated and refreshed with
                      new talent throughout the year and are either people
                      I&apos;ve had the pleasure of working with first hand or
                      have come highly recommended in the industry.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PricingFooter />
    </div>
  );
}
