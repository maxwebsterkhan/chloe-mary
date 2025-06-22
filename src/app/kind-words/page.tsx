"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./kind-words.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function KindWords() {
  const heroRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        const tl = gsap.timeline();

        tl.from(`.${styles.heroLabel}`, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        })
          .from(
            `.${styles.heroTitle}`,
            {
              x: -100,
              rotationY: -15,
              opacity: 0,
              duration: 1.4,
              ease: "back.out(1.7)",
            },
            "-=0.4"
          )
          .from(
            `.${styles.heroSubtitle}`,
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )
          .from(
            `.${styles.decorLine}`,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .from(
            `.${styles.decorText}`,
            {
              x: -20,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )
          .from(
            `.${styles.metricLabel}`,
            {
              y: 15,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
            },
            "-=0.3"
          )
          .from(
            `.${styles.metricValue}`,
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
            },
            "-=0.2"
          )
          .from(
            `.${styles.metricDivider}`,
            {
              scaleY: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
            },
            "-=0.4"
          )
          .from(
            `.${styles.metricLine}`,
            {
              scaleX: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.2"
          );

        // Animate gradient
        const gradientElement = document.querySelector(
          `.${styles.titleAccent}`
        );
        if (gradientElement) {
          gsap.set(gradientElement, {
            backgroundPosition: "-100% 0%",
          });

          gsap.to(gradientElement, {
            backgroundPosition: "100% 0%",
            duration: 6,
            ease: "power1.inOut",
            repeat: -1,
            delay: 1.5,
          });
        }
      }

      // Testimonials animations
      if (testimonialsRef.current) {
        const testimonials =
          testimonialsRef.current.querySelectorAll("[data-animate]");
        testimonials.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%", // Adjust as needed
                once: true,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.kindWordsPage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLayout}>
            <div className={styles.heroLeft}>
              <div className={styles.heroLabel}>KIND WORDS FROM</div>
              <h1 className={styles.heroTitle}>
                BEAUTIFUL
                <span className={styles.titleAccent}>PEOPLE</span>
                <span className={styles.titleSecondary}>& THEIR STORIES</span>
              </h1>
            </div>
            <div className={styles.heroRight}>
              <p className={styles.heroSubtitle}>
                Heartfelt messages from the wonderful couples I&apos;ve had the
                privilege of working alongside on their most intimate and
                special days.
              </p>

              <div className={styles.heroDecor}>
                <div className={styles.decorLine}></div>
                <span className={styles.decorText}>
                  BRISTOL BASED • UK & BEYOND
                </span>
              </div>
            </div>
          </div>

          <div className={styles.heroFooter}>
            <div className={styles.heroMetrics}>
              <div className={styles.metricGroup}>
                <span className={styles.metricLabel}>Happy couples</span>
                <span className={styles.metricValue}>200+</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={`${styles.metricGroup} ${styles.metricWithLine}`}>
                <span className={styles.metricLabel}>Years experience</span>
                <span className={styles.metricValue}>5+</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricGroup}>
                <span className={styles.metricLabel}>Google rating</span>
                <span className={styles.metricValue}>5/5 ★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.testimonialsGrid}>
            {/* Testimonial 1 - Featured */}
            <div
              className={`${styles.testimonialCard} ${styles.theme1} ${styles.featured}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;Holy shit, this preview/these photos are INSANE (and I
                mean this in the best way, most complimenting way possible). We
                cannot stop looking at these photos.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Sarah & James</div>
            </div>

            {/* Testimonial 2 - Compact */}
            <div
              className={`${styles.testimonialCard} ${styles.theme2} ${styles.compact}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;Chloe was nothing short of perfect for us. Her work stood
                out as she got those moments that most photographers
                wouldn&apos;t bother with and went for personality over
                photoshop.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Alex & Eve</div>
            </div>

            {/* Testimonial 3 - Highlight */}
            <div
              className={`${styles.testimonialCard} ${styles.theme3} ${styles.highlight}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;The only easy part of wedding planning for me was
                choosing a photographer. I had seen Chloe&#39;s stunning work on
                Instagram and knew instantly that she was the person I
                wanted.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Emily & Matt</div>
            </div>

            {/* Testimonial 4 - Standard */}
            <div
              className={`${styles.testimonialCard} ${styles.theme4}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;10/10 would get a divorce just to have her at another
                wedding.&rdquo;
              </div>
              <div className={styles.testimonialContinue}>
                Chloe truly has the ability to capture the perfect moments. Not
                only does she have a great eye but also a great calming presence
                that made our day so special.
              </div>
              <div className={styles.testimonialAuthor}>Laura & Alex</div>
            </div>

            {/* Testimonial 5 - Featured */}
            <div
              className={`${styles.testimonialCard} ${styles.theme5} ${styles.featured}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;OK, where to begin with the exceptional, incredibly
                talented, knock out beauty & all round top notch human being. We
                don&apos;t know what to say other than THANK YOU THANK YOU THANK
                YOU!&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Hannah & Jake</div>
            </div>

            {/* Testimonial 6 - Standard */}
            <div
              className={`${styles.testimonialCard} ${styles.theme1}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;Asking Chloe to be our photographer was about the easiest
                decision we made for our wedding. Her photos were exactly the
                style we wanted, cool, editorial and just real!&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Charlotte & Sam</div>
            </div>

            {/* Testimonial 7 - Highlight */}
            <div
              className={`${styles.testimonialCard} ${styles.theme2} ${styles.highlight}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;Chloe, you are the shiniest gem. So glad we found you to
                capture our wedding. Having a very small wedding meant we needed
                a photographer that fit in, but you also completely made the
                day.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Immy & Mikey</div>
            </div>

            {/* Testimonial 8 - Compact */}
            <div
              className={`${styles.testimonialCard} ${styles.theme3} ${styles.compact}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;You can&apos;t put a value on the coolest wedding
                pictures ever.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Immy & Mikey</div>
            </div>

            {/* Testimonial 9 - Standard */}
            <div
              className={`${styles.testimonialCard} ${styles.theme4}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;From start to finish Chloe was the perfect photographer
                for our wedding. She has such a unique style and was able to
                capture so many incredible moments that we didn&apos;t see on
                the day.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Pooja & Michael</div>
            </div>

            {/* Testimonial 10 - Highlight */}
            <div
              className={`${styles.testimonialCard} ${styles.theme5} ${styles.highlight}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;Chloe absolutely exceeded our expectations and if
                you&apos;ve seen her instagram, you know they were high to start
                with. Not only are her photos obscenely good, she&apos;s so fun
                and friendly.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Laura & Oli</div>
            </div>

            {/* Testimonial 11 - Compact */}
            <div
              className={`${styles.testimonialCard} ${styles.theme1} ${styles.compact}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;Now it&apos;s all over, we just can&apos;t imagine having
                had anyone else photograph our day. There&apos;s something about
                the way in which she captures you that sets her apart.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Hayley & Grant</div>
            </div>

            {/* Testimonial 12 - Standard */}
            <div
              className={`${styles.testimonialCard} ${styles.theme2}`}
              data-animate
            >
              <div className={styles.testimonialText}>
                &ldquo;We worked with Chloe for our wedding and just got a
                preview of our photos and are beyond happy. Every single photo
                tells a story and captures the emotion of our day
                perfectly.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>Kat & Patrick</div>
            </div>
          </div>

          <div className={styles.kindWordsFooter}>
            <p className={styles.footerText}>
              Want to read more reviews?{" "}
              <a
                href="https://www.google.com/search?q=chloe+mary+photo&ie=UTF-8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                Check out my Google reviews
              </a>{" "}
              to see what other couples are saying.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
