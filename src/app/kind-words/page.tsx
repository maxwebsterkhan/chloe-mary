"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./kind-words.module.scss";

import KindWordsFooter from "../_components/stories-footer/kind-words-footer";

gsap.registerPlugin(ScrollTrigger);

export default function KindWords() {
  const heroRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  useGSAP(() => {
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
      const gradientElement = document.querySelector(`.${styles.titleAccent}`);
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
      const testimonials = testimonialsRef.current.querySelectorAll(
        `.${styles.testimonialCard}`
      );

      // Simple entrance animation
      gsap.fromTo(
        testimonials,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }); // useGSAP automatically handles cleanup

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
          <div className={styles.container}>
            <div className={styles.testimonialsGrid}>
              {/* Testimonial 1 */}
              <div className={`${styles.testimonialCard} ${styles.theme1}`}>
                <p className={styles.testimonialText}>
                  &ldquo;Holy sh*t, this preview/these photos are INSANE (and I
                  mean this in the best way, most complimenting way possible).
                  We cannot stop looking at these photos. You have captured such
                  perfect moments and have made us, our friends and family look
                  even more beautiful.
                  <br />
                  <br />
                  We also wanted to take some time to not only thank you for
                  your obvious talent and eye but also thank you for being such
                  an incredible presence to have at our wedding. You felt like
                  one of our safe spaces for when we would feel overwhelmed /
                  overstimulated with all our guests coming up to us at once.
                  <br />
                  <br />
                  We worked with Chloe for our wedding and just got a preview of
                  our photos and are beyond happy with how the photos so far
                  have come out. Chloe truly has the ability to capture the
                  perfect moments. Not only does she have a great eye but also a
                  great calming presence. We cannot thank her enough for making
                  us laugh, pulling us for photos at the perfect time. The
                  amount of guests coming up to you at once can be overwhelming
                  and it seemed like Chloe had a 6th sense for it.
                  <br />
                  <br />
                  At the end, I told Chloe she is now one of my favourite people
                  and she said it right back to me. It was everything!! Thank
                  you Chloe for everything, we are so grateful for you being our
                  photographer.&rdquo;
                </p>
                <div className={styles.testimonialAuthor}>Kat & Patrick</div>
              </div>

              {/* Testimonial 5 - Hannah & Jake */}
              <div
                className={`${styles.testimonialCard} ${styles.theme5} ${styles.featured}`}
              >
                <div className={styles.testimonialText}>
                  &ldquo;OK, where to begin with the exceptional, incredibly
                  talented, knock out beauty & all round top notch human being.
                  We don&apos;t know what to say other than THANK YOU THANK YOU
                  THANK YOU!
                  <br />
                  <br />
                  The previews we received of both our special days (the
                  intimate legal & the big performance affair) were out of this
                  world. You&apos;ve captured everything, the moments big and
                  small, the intimate details, the intricacies of all our
                  relationships & the beauty of the day. We can&apos;t wait to
                  see the rest and the videos!
                  <br />
                  <br />
                  Getting the chance to relive our days through your incredible
                  eye is such a blessing. I, Hannah, could not of gotten through
                  both days without you! Not just a photographer - a florist, a
                  guru, a dresser, a coordinator, a sugar rush help, a
                  bridesmaids basically haha & most importantly a friend.
                  <br />
                  <br />
                  If you&apos;re stuck for a photographer or videographer then
                  you should stop your search with Chloe, she&apos;s no short of
                  a genius! Every photo she captured I love, even when I get too
                  hard on myself and scrutinise - I realise she&apos;s captured
                  every emotion of the day, and that&apos;s no small feat.
                  I&apos;m obsessed and maybe your biggest fan!&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Hannah & Jake</div>
              </div>

              {/* Testimonial 6 - Charlotte & Sam */}
              <div className={`${styles.testimonialCard} ${styles.theme1}`}>
                <div className={styles.testimonialText}>
                  &ldquo;Asking Chloe to be our photographer was about the
                  easiest decision we made for our wedding. Her photos were
                  exactly the style we wanted, cool, editorial and just real!
                  <br />
                  <br />
                  She was also a total legend to work with, putting us at
                  complete ease and felt like an old pal we&apos;d known
                  forever. We cannot recommend her enough!&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Charlotte & Sam</div>
              </div>

              {/* Testimonial 7 - Combined Immy & Mikey */}
              <div
                className={`${styles.testimonialCard} ${styles.theme2} ${styles.featured}`}
              >
                <div className={styles.testimonialText}>
                  &ldquo;Chloe, you are the shiniest gem. So glad we found you
                  to capture our wedding. Having a very small wedding meant we
                  needed a photographer that fit in, but you also completely
                  made the day and everyone loved you.
                  <br />
                  <br />
                  From getting ready with my sister to capturing the after
                  ceremony drinks with family, we loved sharing it all with you.
                  From the first phone call you were amazing, and kept us nicely
                  informed about what would happen on the day. You really
                  understood what we wanted, and executed it so well on the day,
                  taking into account other family members.
                  <br />
                  <br />
                  You spookily timed it so well giving us the preview pics while
                  we were coming back from Ibiza, and then the full gallery in
                  the middle of our honeymoon in Costa Rica. It was all so
                  perfect. The pictures are STUNNING. The ones that make me the
                  most emotional are the candid moments I didn&apos;t see
                  happening, you captured the love and happiness on the day so
                  well and immortalised it into gorgeous stylish pics. Is 6
                  months too soon to renew our vows just to have you there
                  again?
                  <br />
                  <br />
                  Trust me when I say I shopped around for months, so I have a
                  lot to compare to in price and quality. Makes me a bit sad
                  thinking we could have booked with someone else, our keepsakes
                  from the day just weren&apos;t have been the same.&rdquo;
                </div>
                <div className={styles.testimonialDivider}></div>
                <div className={styles.testimonialText}>
                  &ldquo;You can&apos;t put a value on the coolest wedding
                  pictures ever. Thank you endlessly for capturing memories
                  we&apos;ll treasure for a lifetime.&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Immy & Mikey</div>
              </div>

              {/* Testimonial 8 - Pooja & Michael */}
              <div className={`${styles.testimonialCard} ${styles.theme4}`}>
                <div className={styles.testimonialText}>
                  &ldquo;From start to finish Chloe was the perfect photographer
                  for our wedding. We wanted to make sure we would have photos
                  that would help us re-live the day and Chloe did exactly that!
                  <br />
                  <br />
                  She has such a unique style and was able to capture so many
                  incredible moments that we didn&apos;t see on the day, we are
                  so genuinely grateful to have these memories forever. Apart
                  from the photos, she brought such great energy and an ease to
                  the day that we could never thank her enough for!
                  <br />
                  <br />
                  She made the whole process so easy and effortless and was
                  flexible in meeting our needs on the day. If you are looking
                  for a wedding photographer to capture the genuine and
                  authentic feeling in every moment of your wedding - Chloe is
                  the one! Thank you Chloe!&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Pooja & Michael</div>
              </div>

              {/* Testimonial 9 - Laura & Oli */}
              <div className={`${styles.testimonialCard} ${styles.theme5}`}>
                <div className={styles.testimonialText}>
                  &ldquo;Chloe absolutely exceeded our expectations and if
                  you&apos;ve seen her instagram, you know they were high to
                  start with. Not only are her photos obscenely good, she&apos;s
                  so fun and friendly, you immediately feel at ease and then you
                  hardly see her for the rest of the wedding because she&apos;s
                  an expert in capturing moments without encroaching.
                  <br />
                  <br />
                  The gallery captured our wedding beautifully and we&apos;ll
                  treasure the photos forever. Could not recommend her
                  enough.&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Laura & Oli</div>
              </div>

              {/* Testimonial 10 - Hayley & Grant */}
              <div
                className={`${styles.testimonialCard} ${styles.theme1} ${styles.featured}`}
              >
                <div className={styles.testimonialText}>
                  &ldquo;Now it&apos;s all over, we just can&apos;t imagine
                  having had anyone else photograph our day. I came across
                  Chloe&apos;s work online whilst looking for a photographer and
                  I knew from the minute I saw her portfolio and Instagram that
                  she needed to photograph our wedding.
                  <br />
                  <br />
                  There&apos;s something about the way in which she captures you
                  that sets her apart from anyone else you&apos;ll come across
                  and it&apos;s not something you can put your finger on! I am
                  in love with her black and white work and honestly can&apos;t
                  imagine putting anything else up on my wall.
                  <br />
                  <br />
                  Chatting to her in the lead up about what we wanted put us so
                  at ease and it was like chatting to your friend! Not being
                  super sure of what you want is actually a bonus I think,
                  because we very much took the day how it came and Chloe was
                  our guiding light for 2 hours helping us get some shots to
                  remember our wedding.
                  <br />
                  <br />
                  Now it&apos;s all over we just can&apos;t imagine having had
                  anyone else photograph our day, Chloe brought so much calm and
                  patience to the table. She was so fun to be around too and it
                  was the most relaxing way to be photographed I think I&apos;ve
                  ever experienced! Literally forget ever posing for photographs
                  again because she will just capture the most raw and beautiful
                  moments without you having to try for anything, and believe me
                  we can be very awkward people for photographs!
                  <br />
                  <br />
                  I&apos;m just not over it one bit… One of the best days of my
                  life with the best photographer we could have had - everyone
                  has literally said how beautiful the photos are already! So
                  much love Chloe.&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Hayley & Grant</div>
              </div>

              {/* Testimonial 11 - Amy & Campbell */}
              <div
                className={`${styles.testimonialCard} ${styles.theme2} ${styles.featured}`}
              >
                <div className={styles.testimonialText}>
                  &ldquo;Wow - Chloe. Not really sure how to put into words the
                  magic you&apos;ve created with our wedding photos. From the
                  first zoom chat with you we knew you were going to be
                  different from the typical photographers (fully supporting our
                  request of a maximum of 10 minutes couples photos) and then to
                  the detail and thoughtfulness in the pre-wedding questionnaire
                  (we particularly appreciated being asked the sensitive
                  question about whether there was any family drama that you
                  needed to be aware of and avoid capturing people together).
                  <br />
                  <br />
                  The photos themselves give us goosebumps (and have made Amy
                  cry on more than one occasion), and we are so grateful to be
                  able to re-live the day over and over again through the
                  memories you captured. You seemed to be able to get right to
                  the heart of our &ldquo;vibe&rdquo; so quickly - nothing too
                  gushy for us, lots of hilarious moments and silly faces
                  (including dogs and kids!), and secret shots taken that in the
                  whirlwind of the day, we hadn&apos;t even noticed had
                  happened.
                  <br />
                  <br />
                  The speedy turnaround of the previews in a week meant we had
                  the joy of looking through photos while on our honeymoon. That
                  was a really special moment. Not sure how to put our thanks
                  into the right words - except to say you are so talented and
                  we feel so lucky to have had you as part of our wedding
                  day.&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Amy & Campbell</div>
              </div>

              {/* Testimonial 12 - Laura & Alex */}
              <div className={`${styles.testimonialCard} ${styles.theme4}`}>
                <div className={styles.testimonialText}>
                  &ldquo;Chloe was the person I was most excited for to have as
                  part of our day and I was not disappointed. She just slotted
                  in perfectly to the day creating genuine connections with our
                  guests and we&apos;ve received nothing but love from them
                  about how she worked. And then the photos themselves were just
                  to die for. Chloe has the amazing ability to capture parts of
                  the day you won&apos;t have thought about photographing and
                  bring them to life to create a beautiful narrative. I
                  couldn&apos;t recommend Chloe enough. 10/10 would get a
                  divorce just to have her at another wedding.&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Laura & Alex</div>
              </div>

              {/* Testimonial 13 - Emily & Matt */}
              <div
                className={`${styles.testimonialCard} ${styles.theme5} ${styles.featured}`}
              >
                <div className={styles.testimonialText}>
                  &ldquo;The only easy part of wedding planning for me was
                  choosing a photographer&apos; I had seen Chloe&apos;s stunning
                  work on Instagram and knew instantly that she was the person I
                  wanted to capture our day (and as someone who is outrageously
                  indecisive this was a big BIG deal).
                  <br />
                  <br />
                  We couldn&apos;t be any happier with how beautiful the photos
                  are. We chose Chloe based on her documentary and storytelling
                  style, which she absolutely delivered on.
                  <br />
                  <br />
                  I don&apos;t like having my photo taken, so was clear I
                  didn&apos;t want posed photos (apart from the few she quite
                  rightly said my older family members would want for the
                  mantelpiece) I hardly noticed Chloe (and her second
                  photographer Hana) capturing all the beautiful moments
                  throughout the day, they worked so seamlessly and I trusted
                  them fully to tell the story of the day.
                  <br />
                  <br />I can&apos;t really put into words how grateful I am for
                  having these memories to look back on and savour with the
                  people I love the most. Thank you thank you thank you
                  Chloe!&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Emily & Matt</div>
              </div>

              {/* Testimonial 14 - Billie & Alex */}
              <div className={`${styles.testimonialCard} ${styles.theme1}`}>
                <div className={styles.testimonialText}>
                  &ldquo;Hiring Chloe as our photographer was the best and
                  easiest decision. From the minute we found our venue, we knew
                  she was the photographer for us.
                  <br />
                  <br />
                  She made us feel completely at ease and we had so much fun in
                  our portrait session. She was considerate and warm and we
                  loved sharing our special day with her!
                  <br />
                  <br />
                  She made something we were quite nervous about so fun and
                  exciting. The photos are incredible - still can&apos;t believe
                  that it is actually us in the pictures! Chloe, you really are
                  amazing! Thank you&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Billie & Alex</div>
              </div>

              {/* Testimonial 15 - Alice & Jacob */}
              <div className={`${styles.testimonialCard} ${styles.theme2}`}>
                <div className={styles.testimonialText}>
                  &ldquo;Chloe was by far one of the best decisions we made for
                  our wedding day. I was so excited to work with her after
                  seeing her work, but all expectations were completely
                  exceeded.
                  <br />
                  <br />
                  Just as important as the photos themselves, was how seamlessly
                  Chloe fitted into the day, particularly in the morning getting
                  ready she was so ready to jump in and help with everything and
                  really helped to keep the vibes very calm and positive!
                  <br />
                  <br />
                  All the communication in the run up was also very smooth.
                  Would recommend Chloe to everyone!&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Alice & Jacob</div>
              </div>

              {/* Testimonial 16 - Alex & Eve */}
              <div
                className={`${styles.testimonialCard} ${styles.theme5} ${styles.featured}`}
              >
                <div className={styles.testimonialText}>
                  &ldquo;Chloe was nothing short of perfect for us. Why?
                  It&apos;s easier to break it down!
                  <br />
                  <br />
                  Standing Out From Other Photographers - Chloe&apos;s work
                  stood out as there weren&apos;t any poses or over the top
                  staged fake looking shots that make you not want to have a
                  wedding at all. Her work stood out as she got those moments
                  that most photographers wouldn&apos;t bother with and went for
                  personality over photoshop. I personally thought it was like
                  if Richard Avedon ever did weddings.
                  <br />
                  <br />
                  Communication before hand - nothing was ever an issue and I
                  always felt like I was chatting to a friend. She made us laugh
                  and won my husband over from the first call with being
                  authentic and getting us from the get go, nothing forced and
                  not boasting about how big her other clients went on their
                  weddings (believe me we had a lot of photographers who
                  wouldn&apos;t even meet with us before knowing what designer
                  my dress was going to be or if our wedding was over £50k)
                  <br />
                  <br />
                  On the day - Chloe was everything on the day, stylist,
                  therapist and cheerleader - God I needed it. It was very
                  special having her with us getting ready capturing both
                  intimate moments and beautiful candid scenes.
                  <br />
                  <br />
                  Afterwards - The results of her work are just so incredible
                  and gentle with a powerful, raw authenticity. We were left in
                  tears at how special and unique we felt the photos were to us
                  and that just like from the first meeting with Chloe, we just
                  got us.&rdquo;
                </div>
                <div className={styles.testimonialAuthor}>Alex & Eve</div>
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
      </main>

      <KindWordsFooter />
    </div>
  );
}
