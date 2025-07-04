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
import { usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { useS3ImageCategories } from "@/hooks/useS3Images";
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

const TWEEN_FACTOR_BASE = 0.15;

export default function HorizontalGallery() {
  const { categories, loading } = useS3ImageCategories();
  const [galleryStories, setGalleryStories] = useState<GalleryStory[]>([]);
  const [activeThumbs, setActiveThumbs] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    align: "start",
    inViewThreshold: 0.5,
  });

  // Parallax refs
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);
  const tweenFactor = useRef(0);

  // Refs for thumbnail buttons
  const thumbButtonRefs = useRef<React.RefObject<HTMLButtonElement | null>[][]>(
    []
  );

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // Process S3 categories into gallery stories
  useEffect(() => {
    if (categories && categories.stories && categories.stories.length > 0) {
      const storyFolders = [
        "hannah-jake",
        "beth-alex",
        "kat-patrick",
        "marj-ellis",
      ];
      const stories: GalleryStory[] = [];

      // Create a map to store the latest images for each story
      const storyImages: Record<string, Set<string>> = {};

      // First pass: Group images by story folder
      categories.stories.forEach((image) => {
        const keyParts = image.key.split("/");
        if (keyParts.length >= 3 && keyParts[0] === "stories") {
          const storyFolder = keyParts[1];

          // Only process folders we want to show
          if (!storyFolders.includes(storyFolder)) return;

          if (!storyImages[storyFolder]) {
            storyImages[storyFolder] = new Set();
          }
          storyImages[storyFolder].add(image.url);
        }
      });

      // Story descriptions to match your couples
      const storyDescriptions: Record<
        string,
        { description: string; location: string; picTimeUrl: string }
      > = {
        "beth-alex": {
          description:
            "An urban city celebration where modern elegance meets timeless romance. Infused with cinematic flair with the ceremony taking place at the the Ritzy Picture House.",
          location: "100 Barrington, London",
          picTimeUrl: "https://chloemaryphoto.pic-time.com/INDUdpnmxfz33",
        },
        "hannah-jake": {
          description:
            "Where creativity meets drama: A stylish South London wedding celebration for creative couple Hannah and Jake. Taking place at the iconic Asylum Chapel & St John Smithfield.",
          location: "St. John & Asylum Chapel, London",
          picTimeUrl: "https://chloemaryphoto.pic-time.com/cduUXU5KYqrs4",
        },
        "kat-patrick": {
          description:
            "A romantic countryside wedding with a modern twist, capturing the charm and warmth of the south of France.",
          location: "Chateau La Durantie, France",
          picTimeUrl: "https://chloemaryphoto.pic-time.com/i0561DkOwQM8Q",
        },
        "marj-ellis": {
          description:
            "A family centric city  at the Mount Without Bristol for high school sweethearts, enriched with heartfelt nods to the couples Filipino and Greek heritage.",
          location: "The Mount Without, Bristol",
          picTimeUrl: "https://chloemaryphoto.pic-time.com/y00bovLaECnZY",
        },
      };

      // Second pass: Create stories in the specified order
      for (const folderName of storyFolders) {
        if (storyImages[folderName]?.size > 0) {
          const names = folderName
            .split("-")
            .map((name) => name.charAt(0).toUpperCase() + name.slice(1));
          const title = names.join(" & ");

          const storyData = storyDescriptions[folderName];
          if (!storyData) continue; // Skip if no description found

          // Sort images and take first 5
          const sortedImages = Array.from(storyImages[folderName])
            .sort()
            .slice(0, 5);

          if (sortedImages.length === 0) continue; // Skip if no images

          stories.push({
            id: `story-${folderName}`,
            title,
            description: storyData.description,
            location: storyData.location,
            ctaText: "View Full Gallery",
            ctaLink: storyData.picTimeUrl,
            images: sortedImages,
          });
        }
      }

      setGalleryStories(stories);
      setActiveThumbs(new Array(stories.length).fill(0));

      // Initialize thumbnail button refs
      thumbButtonRefs.current = stories.map((story) =>
        Array(story.images.length)
          .fill(null)
          .map(() => createRef<HTMLButtonElement>())
      );
    }
  }, [categories]);

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

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  if (loading) {
    return (
      <div className={styles.embla}>
        <div className={styles.loadingState}>
          <p>Loading gallery stories...</p>
        </div>
      </div>
    );
  }

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
                              key={`${story.id}-${activeThumbs[index]}`}
                              src={
                                story.images[isMobile ? 0 : activeThumbs[index]]
                              }
                              alt={`${story.title} wedding photography at ${story.location}`}
                              fill
                              className={
                                styles.heroImageUnified +
                                " " +
                                styles.fadeInHeroImage
                              }
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                              loading={index === 0 ? undefined : "lazy"}
                              quality={95}
                              priority={index === 0}
                              style={{ objectFit: "cover" }}
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
                              tabIndex={0}
                              onClick={() => {
                                setActiveThumbs((prev) => {
                                  const newThumbs = [...prev];
                                  newThumbs[index] = thumbIdx;
                                  return newThumbs;
                                });
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
                                } else if (e.key === "Home") {
                                  e.preventDefault();
                                  thumbButtonRefs.current[
                                    index
                                  ][0].current?.focus();
                                } else if (e.key === "End") {
                                  e.preventDefault();
                                  const lastIndex = story.images.length - 1;
                                  thumbButtonRefs.current[index][
                                    lastIndex
                                  ].current?.focus();
                                } else if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setActiveThumbs((prev) => {
                                    const newThumbs = [...prev];
                                    newThumbs[index] = thumbIdx;
                                    return newThumbs;
                                  });
                                }
                              }}
                            >
                              <Image
                                src={image}
                                alt={`${
                                  story.title
                                } wedding photography thumbnail ${
                                  thumbIdx + 1
                                }`}
                                fill
                                className={styles.thumbImageUnified}
                                sizes="100px"
                                priority={index === 0 && thumbIdx < 2}
                                quality={85}
                              />
                            </button>
                          ))}
                        </div>
                        <div className={styles.ctaTextWithDivider}>
                          <a
                            href={story.ctaLink}
                            className={styles.ctaTextLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`View complete ${story.title} wedding photography collection on Pic-Time`}
                            aria-label={`View full ${story.title} wedding gallery on Pic-Time`}
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
          <button
            className={styles.embla__button}
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className={styles.embla__button}
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
