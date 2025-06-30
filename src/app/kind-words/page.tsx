"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./kind-words.module.scss";
import ExpandableText from "../_components/expandable-text/expandable-text";
import KindWordsFooter from "../_components/stories-footer/kind-words-footer";

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
                <span className={styles.titleSecondary}>& THEIR MEMORIES</span>
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
                <span className={styles.metricValue}>7+</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricGroup}>
                <span className={styles.metricLabel}>Google rating</span>
                <span className={styles.metricValue}>5.0</span>
              </div>
            </div>
            <div className={styles.metricLine}></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.main}>
        <section ref={testimonialsRef} className={styles.testimonials}>
          <div className={styles.testimonialsContainer}>
            <div className={styles.testimonialsGrid}>
              {/* Testimonial 1 - Katie & Ben */}
              <ExpandableText
                className={`${styles.testimonialCard} ${styles.theme1} ${styles.featured}`}
                maxHeight={200}
              >
                <div data-animate>
                  <div className={styles.testimonialText}>
                    &ldquo;I found Chloe on Instagram and immediately fell in
                    love with her work. Every photo was magical and full of
                    emotion. When I got in touch, she was so understanding and
                    really took the time to get to know us. On the day itself,
                    she was incredible. The way she captured our day was
                    everything I could have hoped for and so much more. I
                    honestly can&apos;t put into words how much I love our
                    wedding photos. They are beautiful beyond words and I will
                    treasure them forever. Chloe is not just a photographer but
                    an artist who captures love in its purest form. Thank you so
                    much for everything, Chloe. You are absolutely amazing!
                    Working with you was one of the best decisions we made for
                    our wedding.&rdquo;
                  </div>
                  <div className={styles.testimonialAuthor}>Katie & Ben</div>
                </div>
              </ExpandableText>

              {/* Testimonial 2 - Izzy & Dan */}
              <div
                className={`${styles.testimonialCard} ${styles.theme2}`}
                data-animate
              >
                <div className={styles.testimonialText}>
                  &ldquo;Chloe was absolutely perfect as our wedding
                  photographer! Her work speaks for itself but more than that,
                  she was just lovely to be around on our wedding day. She made
                  us feel so relaxed and comfortable, and really helped us enjoy
                  every moment. The photos are stunning - exactly what we
                  dreamed of!&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Izzy & Dan</div>
              </div>

              {/* Testimonial 3 - Sophie & Mark */}
              <ExpandableText
                className={`${styles.testimonialCard} ${styles.theme3}`}
                maxHeight={200}
              >
                <div data-animate>
                  <div className={styles.testimonialText}>
                    &ldquo;Chloe was recommended to us by a friend and we are so
                    grateful for that recommendation! From our first
                    conversation, she was warm, professional, and really
                    listened to what we wanted from our wedding photography. On
                    the day, she was brilliant - capturing all the candid
                    moments we treasured while also making sure we got the
                    formal shots our families wanted. The final gallery exceeded
                    our expectations in every way. The photos are absolutely
                    beautiful and tell the story of our day perfectly. We
                    couldn&apos;t be happier with our choice and would recommend
                    Chloe to anyone looking for a talented, professional, and
                    lovely photographer.&rdquo;
                  </div>
                  <div className={styles.testimonialAuthor}>Sophie & Mark</div>
                </div>
              </ExpandableText>

              {/* Testimonial 4 - Emma & Tom */}
              <div
                className={`${styles.testimonialCard} ${styles.theme4}`}
                data-animate
              >
                <div className={styles.testimonialText}>
                  &ldquo;We are absolutely in love with our wedding photos!
                  Chloe captured our day so beautifully. She has such a natural
                  eye for those perfect candid moments that tell the real story
                  of the day. Thank you so much, Chloe!&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Emma & Tom</div>
              </div>

              {/* Testimonial 5 - Hannah & Jake */}
              <ExpandableText
                className={`${styles.testimonialCard} ${styles.theme5} ${styles.featured}`}
                maxHeight={200}
              >
                <div data-animate>
                  <div className={styles.testimonialText}>
                    &ldquo;OK, where to begin with the exceptional, incredibly
                    talented, knock out beauty & all round top notch human
                    being. We don&apos;t know what to say other than THANK YOU
                    THANK YOU THANK YOU! The previews we received of both our
                    special days (the intimate legal & the big performance
                    affair) were out of this world. You&apos;ve captured
                    everything, the moments big and small, the intimate details,
                    the intricacies of all our relationships & the beauty of the
                    day. We can&apos;t wait to see the rest and the videos!
                    Getting the chance to relive our days through your
                    incredible eye is such a blessing. I, Hannah, could not of
                    gotten through both days without you! Not just a
                    photographer - a florist, a guru, a dresser, a coordinator,
                    a sugar rush help, a bridesmaids basically haha & most
                    importantly a friend. If you&apos;re stuck for a
                    photographer or videographer then you should stop your
                    search with Chloe, she&apos;s no short of a genius! Every
                    photo she captured I love, even when I get too hard on
                    myself and scrutinise - I realise she&apos;s captured every
                    emotion of the day, and that&apos;s no small feat. I&apos;m
                    obsessed and maybe your biggest fan!&rdquo;
                  </div>
                  <div className={styles.testimonialAuthor}>Hannah & Jake</div>
                </div>
              </ExpandableText>

              {/* Testimonial 6 - Charlotte & Sam */}
              <div
                className={`${styles.testimonialCard} ${styles.theme1}`}
                data-animate
              >
                <div className={styles.testimonialText}>
                  &ldquo;Asking Chloe to be our photographer was about the
                  easiest decision we made for our wedding. Her photos were
                  exactly the style we wanted, cool, editorial and just real!
                  She was also a total legend to work with, putting us at
                  complete ease and felt like an old pal we&apos;d known
                  forever. We cannot recommend her enough!&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Charlotte & Sam</div>
              </div>

              {/* Testimonial 7 - Combined Immy & Mikey */}
              <ExpandableText
                className={`${styles.testimonialCard} ${styles.theme2} ${styles.featured}`}
                maxHeight={200}
              >
                <div data-animate>
                  <div className={styles.testimonialText}>
                    &ldquo;Chloe, you are the shiniest gem. So glad we found you
                    to capture our wedding. Having a very small wedding meant we
                    needed a photographer that fit in, but you also completely
                    made the day and everyone loved you. From getting ready with
                    my sister to capturing the after ceremony drinks with
                    family, we loved sharing it all with you. From the first
                    phone call you were amazing, and kept us nicely informed
                    about what would happen on the day. You really understood
                    what we wanted, and executed it so well on the day, taking
                    into account other family members. You spookily timed it so
                    well giving us the preview pics while we were coming back
                    from Ibiza, and then the full gallery in the middle of our
                    honeymoon in Costa Rica. It was all so perfect. The pictures
                    are STUNNING. The ones that make me the most emotional are
                    the candid moments I didn&apos;t see happening, you captured
                    the love and happiness on the day so well and immortalised
                    it into gorgeous stylish pics. Is 6 months too soon to renew
                    our vows just to have you there again? Trust me when I say I
                    shopped around for months, so I have a lot to compare to in
                    price and quality. Makes me a bit sad thinking we could have
                    booked with someone else, our keepsakes from the day just
                    weren&apos;t have been the same.&rdquo;
                  </div>
                  <div className={styles.testimonialDivider}></div>
                  <div className={styles.testimonialText}>
                    &ldquo;You can&apos;t put a value on the coolest wedding
                    pictures ever. Thank you endlessly for capturing memories
                    we&apos;ll treasure for a lifetime.&rdquo;
                  </div>
                  <div className={styles.testimonialAuthor}>Immy & Mikey</div>
                </div>
              </ExpandableText>

              {/* Testimonial 8 - Pooja & Michael */}
              <ExpandableText
                className={`${styles.testimonialCard} ${styles.theme4}`}
                maxHeight={200}
              >
                <div data-animate>
                  <div className={styles.testimonialText}>
                    &ldquo;From start to finish Chloe was the perfect
                    photographer for our wedding. We wanted to make sure we
                    would have photos that would help us re-live the day and
                    Chloe did exactly that! She has such a unique style and was
                    able to capture so many incredible moments that we
                    didn&apos;t see on the day, we are so genuinely grateful to
                    have these memories forever. Apart from the photos, she
                    brought such great energy and an ease to the day that we
                    could never thank her enough for! She made the whole process
                    so easy and effortless and was flexible in meeting our needs
                    on the day. If you are looking for a wedding photographer to
                    capture the genuine and authentic feeling in every moment of
                    your wedding - Chloe is the one! Thank you Chloe!&rdquo;
                  </div>
                  <div className={styles.testimonialAuthor}>
                    Pooja & Michael
                  </div>
                </div>
              </ExpandableText>

              {/* Testimonial 9 - Laura & Oli */}
              <div
                className={`${styles.testimonialCard} ${styles.theme5}`}
                data-animate
              >
                <div className={styles.testimonialText}>
                  &ldquo;Chloe absolutely exceeded our expectations and if
                  you&apos;ve seen her instagram, you know they were high to
                  start with. Not only are her photos obscenely good, she&apos;s
                  so fun and friendly, you immediately feel at ease and then you
                  hardly see her for the rest of the wedding because she&apos;s
                  an expert in capturing moments without encroaching. The
                  gallery captured our wedding beautifully and we&apos;ll
                  treasure the photos forever. Could not recommend her
                  enough.&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Laura & Oli</div>
              </div>

              {/* Testimonial 10 - Hayley & Grant */}
              <ExpandableText
                className={`${styles.testimonialCard} ${styles.theme1} ${styles.featured}`}
                maxHeight={200}
              >
                <div data-animate>
                  <div className={styles.testimonialText}>
                    &ldquo;Now it&apos;s all over, we just can&apos;t imagine
                    having had anyone else photograph our day. I came across
                    Chloe&apos;s work online whilst looking for a photographer
                    and I knew from the minute I saw her portfolio and Instagram
                    that she needed to photograph our wedding. There&apos;s
                    something about the way in which she captures you that sets
                    her apart from anyone else you&apos;ll come across and
                    it&apos;s not something you can put your finger on! I am in
                    love with her black and white work and honestly can&apos;t
                    imagine putting anything else up on my wall. Chatting to her
                    in the lead up about what we wanted put us so at ease and it
                    was like chatting to your friend! Not being super sure of
                    what you want is actually a bonus I think, because we very
                    much took the day how it came and Chloe was our guiding
                    light for 2 hours helping us get some shots to remember our
                    wedding. Now it&apos;s all over we just can&apos;t imagine
                    having had anyone else photograph our day, Chloe brought so
                    much calm and patience to the table. She was so fun to be
                    around too and it was the most relaxing way to be
                    photographed I think I&apos;ve ever experienced! Literally
                    forget ever posing for photographs again because she will
                    just capture the most raw and beautiful moments without you
                    having to try for anything, and believe me we can be very
                    awkward people for photographs! I&apos;m just not over it
                    one bit… One of the best days of my life with the best
                    photographer we could have had - everyone has literally said
                    how beautiful the photos are already! So much love
                    Chloe.&rdquo;
                  </div>
                  <div className={styles.testimonialAuthor}>Hayley & Grant</div>
                </div>
              </ExpandableText>
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
      </main>

      <KindWordsFooter />
    </div>
  );
}
