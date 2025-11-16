import { head } from "@vercel/blob";
import Hero from "./_components/hero/hero";

export default async function Home() {
  // Get image URL by pathname
  const blob = await head("wedding-test.jpg");
  const imageUrl = blob.url;

  return (
    <main id="main" tabIndex={-1}>
      <Hero imageUrl={imageUrl} />
    </main>
  );
}
