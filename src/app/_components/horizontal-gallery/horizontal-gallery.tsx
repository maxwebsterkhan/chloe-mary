"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
} from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import styles from "./horizontal-gallery.module.scss";

interface GalleryStory {
  id: string;
  title: string;
  description: string;
  location: string;
  ctaText: string;
  ctaLink: string;
  images: string[];
}

const testImage1 =
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D";
const testImage2 =
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D";
const testImage3 =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D";
const testImage4 =
  "https://images.unsplash.com/flagged/photo-1620830102229-9db5c00d4afc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D";
const testImage5 =
  "https://media.istockphoto.com/id/2156079626/photo/bride-and-groom-wedding-with-dog.webp?a=1&b=1&s=612x612&w=0&k=20&c=Et2NAAOw4QK-VNebfRcQi5M2z4ZZfmUNPBgYK7dGoEU=";

const mockGalleryStories: GalleryStory[] = [
  {
    id: "story-1",
    title: "Sarah & James",
    description:
      "A romantic countryside wedding filled with laughter, tears, and endless joy. Every moment captured with authenticity and love.",
    location: "Cotswolds, Gloucestershire",
    ctaText: "View Full Gallery",
    ctaLink: "/gallery/sarah-james",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
  {
    id: "story-2",
    title: "Emma & Michael",
    description:
      "An intimate city celebration where modern elegance met timeless romance. A day of pure magic and genuine emotion.",
    location: "Bristol Harbour",
    ctaText: "See More Photos",
    ctaLink: "/gallery/emma-michael",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
  {
    id: "story-3",
    title: "Lucy & David",
    description:
      "A rustic barn wedding that perfectly captured their love for nature and each other. Authentic moments in a beautiful setting.",
    location: "Somerset Countryside",
    ctaText: "Explore Gallery",
    ctaLink: "/gallery/lucy-david",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
  {
    id: "story-4",
    title: "Rachel & Tom",
    description:
      "A sophisticated celebration of love in the heart of the city. Every detail thoughtfully captured with artistic vision.",
    location: "Bristol City Centre",
    ctaText: "View Complete Story",
    ctaLink: "/gallery/rachel-tom",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
  {
    id: "story-5",
    title: "Hannah & Chris",
    description:
      "A coastal wedding that embraced the natural beauty of the sea. Pure, candid moments of genuine happiness and love.",
    location: "Cornwall Coast",
    ctaText: "See Full Collection",
    ctaLink: "/gallery/hannah-chris",
    images: [testImage1, testImage2, testImage3, testImage4, testImage5],
  },
];

const TWEEN_FACTOR_BASE = 0.15;

export default function HorizontalGallery() {
  const [galleryStories] = useState<GalleryStory[]>(mockGalleryStories);
  const [activeThumbs, setActiveThumbs] = useState<number[]>(
    new Array(galleryStories.length).fill(0)
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "start",
  });

  // Progress bar state
  const [progress, setProgress] = useState(0);

  // Parallax refs
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);
  const tweenFactor = useRef(0);

  // Animation state for hero image
  const [imageFadeKey, setImageFadeKey] = useState(0);

  // Refs for thumbnail buttons
  const thumbButtonRefs = useRef(
    galleryStories.map(() =>
      Array(5)
        .fill(null)
        .map(() => createRef<HTMLButtonElement>())
    )
  );

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // Parallax effect logic
  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: HTMLElement) => {
      return slideNode.querySelector(`.${styles.embla__parallax__bg}`);
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: string) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi
        .scrollSnapList()
        .forEach((scrollSnap: number, snapIndex: number) => {
          let diffToTarget = scrollSnap - scrollProgress;
          const slidesInSnap = engine.slideRegistry[snapIndex];

          slidesInSnap.forEach((slideIndex: number) => {
            if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

            if (engine.options.loop) {
              engine.slideLooper.loopPoints.forEach(
                (loopItem: { target: () => number; index: number }) => {
                  const target = loopItem.target();
                  if (slideIndex === loopItem.index && target !== 0) {
                    const sign = Math.sign(target);
                    if (sign === -1) {
                      diffToTarget = scrollSnap - (1 + scrollProgress);
                    }
                    if (sign === 1) {
                      diffToTarget = scrollSnap + (1 - scrollProgress);
                    }
                  }
                }
              );
            }

            const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
            const tweenNode = tweenNodes.current[slideIndex];
            if (tweenNode) {
              (
                tweenNode as HTMLElement
              ).style.transform = `translateX(${translate}%)`;
            }
          });
        });
    },
    []
  );

  // Progress bar effect
  useEffect(() => {
    if (!emblaApi) return;
    const updateProgress = () => {
      setProgress(emblaApi.scrollProgress());
    };
    updateProgress();
    emblaApi.on("scroll", updateProgress);
    return () => {
      emblaApi.off("scroll", updateProgress);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);
    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {galleryStories.map((story, index) => (
            <div className={styles.embla__slide} key={story.id}>
              <div className={styles.embla__parallax}>
                <div className={styles.embla__parallax__layer}>
                  <div className={styles.embla__slide__content}>
                    <div className={styles.layoutUnified}>
                      <div className={styles.heroImageContainerUnified}>
                        <div className={styles.heroImageWrapper}>
                          <div className={styles.embla__parallax__bg}>
                            <Image
                              key={
                                imageFadeKey +
                                "-" +
                                (isMobile ? 0 : activeThumbs[index])
                              }
                              src={
                                story.images[isMobile ? 0 : activeThumbs[index]]
                              }
                              alt={`${story.title} - Hero`}
                              fill
                              className={
                                styles.heroImageUnified +
                                " " +
                                styles.fadeInHeroImage
                              }
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                              loading="lazy"
                              quality={90}
                            />
                          </div>
                        </div>
                        <div className={styles.heroOverlayUnified}>
                          <h2 className={styles.storyTitle}>{story.title}</h2>
                          <p className={styles.storyLocation}>
                            {story.location}
                          </p>
                        </div>
                      </div>
                      <div className={styles.thumbsCtaRow}>
                        <div
                          className={styles.thumbsRowUnified}
                          role="tablist"
                          aria-label={`Gallery thumbnails for ${story.title}`}
                        >
                          {story.images.map((image, thumbIdx) => (
                            <button
                              key={thumbIdx}
                              ref={thumbButtonRefs.current[index][thumbIdx]}
                              className={
                                styles.thumbButton +
                                (activeThumbs[index] === thumbIdx
                                  ? " " + styles.activeThumb
                                  : "")
                              }
                              aria-selected={activeThumbs[index] === thumbIdx}
                              aria-label={`Show image ${thumbIdx + 1} for ${
                                story.title
                              }`}
                              tabIndex={
                                activeThumbs[index] === thumbIdx ? 0 : -1
                              }
                              onClick={() => {
                                setActiveThumbs((prev) => {
                                  const newThumbs = [...prev];
                                  newThumbs[index] = thumbIdx;
                                  return newThumbs;
                                });
                                setImageFadeKey((k) => k + 1);
                              }}
                              type="button"
                              role="tab"
                              onKeyDown={(e) => {
                                if (e.key === "ArrowRight") {
                                  e.preventDefault();
                                  const next =
                                    (thumbIdx + 1) % story.images.length;
                                  thumbButtonRefs.current[index][
                                    next
                                  ].current?.focus();
                                } else if (e.key === "ArrowLeft") {
                                  e.preventDefault();
                                  const prev =
                                    (thumbIdx - 1 + story.images.length) %
                                    story.images.length;
                                  thumbButtonRefs.current[index][
                                    prev
                                  ].current?.focus();
                                } else if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setActiveThumbs((prev) => {
                                    const newThumbs = [...prev];
                                    newThumbs[index] = thumbIdx;
                                    return newThumbs;
                                  });
                                  setImageFadeKey((k) => k + 1);
                                }
                              }}
                            >
                              <span className="sr-only">{`Show image ${
                                thumbIdx + 1
                              }`}</span>
                              <Image
                                src={image}
                                alt={`Thumbnail ${thumbIdx + 1} for ${
                                  story.title
                                }`}
                                fill
                                className={styles.thumbImageUnified}
                                loading="lazy"
                              />
                            </button>
                          ))}
                        </div>
                        <div className={styles.ctaTextWithDivider}>
                          <a
                            href={story.ctaLink}
                            className={styles.ctaTextLink}
                          >
                            <span>View</span>
                            <span>Gallery</span>
                          </a>
                          <span
                            className={styles.ctaDivider}
                            aria-hidden="true"
                          ></span>
                        </div>
                      </div>
                      <div className={styles.bottomSectionUnified}>
                        <p className={styles.storyDescription}>
                          {story.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Progress Bar */}
      <div className={styles.embla__progressBarWrap}>
        <div
          className={styles.embla__progressBar}
          style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
        />
      </div>
      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className={styles.embla__button}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className={styles.embla__button}
          />
        </div>
      </div>
    </div>
  );
}
