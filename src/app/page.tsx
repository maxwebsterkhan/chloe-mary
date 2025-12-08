import { head } from "@vercel/blob";

import Introduction from "./_components/introduction/introduction";
import Slideshow from "./_components/slideshow/slideshow";
import HomepageHero from "./_components/homepage-hero/HomepgeHero";

export default async function Home() {
  // Get image URLs for hero and slideshow
  const heroBlob = await head("wedding-test.jpg");
  const heroImageUrl = heroBlob.url;

  // Get multiple test images for slideshow
  // Try different file extensions for each image
  const imageBaseNames = [
    "wedding-test",
    "wedding-test-2",
    "wedding-test-3",
    "wedding-test-4",
  ];
  const extensions = [".jpg", ".jpeg", ".webp", ".png"];

  const slideshowImagesPromises = imageBaseNames.map(async (baseName) => {
    // Try each extension until one works
    for (const ext of extensions) {
      try {
        const name = `${baseName}${ext}`;
        const blob = await head(name);
        return {
          src: blob.url,
          alt: `Wedding test image ${
            baseName.replace("wedding-test", "") || "1"
          }`,
        };
      } catch (error) {
        // Try next extension
        continue;
      }
    }
    // If no extension worked, skip this image
    console.warn(`Image ${baseName} not found with any extension, skipping`);
    return null;
  });

  const slideshowImagesResults = await Promise.all(slideshowImagesPromises);
  const slideshowImages = slideshowImagesResults.filter(
    (img): img is { src: string; alt: string } => img !== null
  );

  // Use the first two images from slideshow for introduction component
  const introImage1 = slideshowImages[0]?.src || null;
  const introImage2 = slideshowImages[1]?.src || null;

  // Use first 3 slideshow images as extra images for hero animation
  const heroExtraImages = slideshowImages.slice(0, 3).map((img) => img.src);

  return (
    <main id="main" tabIndex={-1}>
      <HomepageHero images={[heroImageUrl, ...heroExtraImages]} />
      <Introduction image1={introImage1} image2={introImage2} />
      <Slideshow images={slideshowImages} />
    </main>
  );
}
