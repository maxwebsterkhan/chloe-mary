"use client";

import React from "react";
import Image, { ImageProps } from "next/image";
import { generateImageUrl } from "@/lib/imageLoader";

/**
 * CMImage – Unified wrapper around next/image.
 * --------------------------------------------------
 * 1. Adds a tiny blurred placeholder by default for faster perceived loading.
 * 2. Centralises default `sizes` so responsive behaviour is consistent.
 * 3. Allows future tweaks (e.g. AVIF, quality curves) in ONE place.
 */
export type CMImageProps = Omit<ImageProps, "loader"> & {
  /**
   * Override the default `sizes` attribute.
   * If omitted we fall back to `(max-width:768px) 100vw, 50vw`.
   */
  sizes?: string;
  /**
   * Disable the blur placeholder entirely.
   */
  noBlur?: boolean;
};

const DEFAULT_SIZES = "(max-width:768px) 100vw, 50vw";

export default function CMImage({
  placeholder,
  blurDataURL,
  noBlur,
  sizes,
  ...rest
}: CMImageProps) {
  let computedPlaceholder: ImageProps["placeholder"] = undefined;

  if (!noBlur) {
    computedPlaceholder = placeholder ?? (blurDataURL ? "blur" : undefined);
  }

  let finalBlur: string | undefined = blurDataURL;

  // Autogenerate a low-res blur image when possible
  if (
    !noBlur &&
    !finalBlur &&
    typeof rest.src === "string" &&
    typeof window === "undefined"
  ) {
    // Only generate server-side to avoid Buffer polyfill on the client
    try {
      finalBlur = generateImageUrl({
        src: rest.src as string,
        width: 24, // tiny image ~24px wide
        quality: 35,
      });
    } catch {
      /* noop */
    }
  }

  // If developer requested 'blur' but we failed to provide a blurDataURL, fall back to 'empty'
  if (computedPlaceholder === "blur" && !finalBlur) {
    computedPlaceholder = "empty";
  }

  // Explicitly pass the `alt` prop to satisfy a11y linters
  const { alt, ...imgRest } = rest;

  return (
    <Image
      {...imgRest}
      alt={alt}
      sizes={sizes ?? DEFAULT_SIZES}
      placeholder={computedPlaceholder}
      blurDataURL={finalBlur}
    />
  );
}
