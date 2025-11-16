import { head } from "@vercel/blob";
import Hero from "./_components/hero/hero";
import Slideshow from "./_components/slideshow/slideshow";

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

  return (
    <main id="main" tabIndex={-1}>
      <Hero imageUrl={heroImageUrl} />
      <Slideshow images={slideshowImages} />
    </main>
  );
}
