import { Metadata } from "next";
import StoriesHero from "@/app/_components/stories-hero/stories-hero";
import StoriesIntro from "@/app/_components/stories-intro/stories-intro";
import HorizontalGallery from "@/app/_components/horizontal-gallery/horizontal-gallery";
import StoriesFooter from "@/app/_components/stories-footer/stories-footer";

export const metadata: Metadata = {
  title: "Wedding Photography Stories | Chloe Mary Bristol",
  description:
    "Explore authentic wedding photography stories captured by Chloe Mary. Contemporary documentary wedding photography showcasing real couples and their beautiful love stories across Bristol and the UK.",
  keywords: [
    "wedding photography portfolio",
    "bristol wedding photography stories",
    "bristol photography portfolio",
    "london wedding photography gallery",
    "london photography portfolio",
    "contemporary wedding photography",
    "documentary wedding photography",
    "candid wedding photography",
    "creative wedding photography bristol",
    "creative photography bristol",
    "authentic wedding stories",
    "artistic wedding photography",
    "natural wedding photography uk",
    "unposed wedding photography",
    "wedding photography gallery",
    "real wedding stories bristol",
    "uk wedding photography portfolio",
    "photographer portfolio uk",
  ],
  authors: [{ name: "Chloe Mary" }],
  creator: "Chloe Mary",
  publisher: "Chloe Mary",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Wedding Photography Stories | Chloe Mary",
    description:
      "Explore authentic wedding photography stories captured by Chloe Mary. Contemporary documentary wedding photography showcasing real couples and their beautiful love stories.",
    url: "https://www.chloemary.com/stories",
    siteName: "Chloe Mary",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "Chloe Mary - Wedding Photography Stories",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Photography Stories | Chloe Mary",
    description:
      "Explore authentic wedding photography stories captured by Chloe Mary. Contemporary documentary wedding photography showcasing candid moments.",
    creator: "@chloemary_photo",
    images: ["/logo.webp"],
  },
  alternates: {
    canonical: "https://www.chloemary.com/stories",
  },
  other: {
    "content-type": "Wedding Photography Portfolio",
    "photography-style": "Contemporary Documentary",
    location: "Bristol, UK & International",
  },
};

export default function Page() {
  return (
    <>
      {/* JSON-LD for Creative Work */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://www.chloemary.com/stories",
            url: "https://www.chloemary.com/stories",
            name: "Wedding Photography Stories | Chloe Mary",
            description:
              "Explore authentic wedding photography stories captured by Chloe Mary. Contemporary documentary wedding photography showcasing real couples and their beautiful love stories.",
            isPartOf: {
              "@id": "https://www.chloemary.com/#website",
            },
            about: {
              "@type": "CreativeWork",
              name: "Wedding Photography Portfolio",
              description:
                "A collection of authentic wedding photography stories",
              creator: {
                "@type": "Person",
                name: "Chloe Mary",
                url: "https://www.chloemary.com/about",
              },
              genre: "Wedding Photography",
              keywords: [
                "Contemporary Documentary Photography",
                "Candid Wedding Photography",
                "Artistic Wedding Photography",
                "Creative Wedding Photography",
                "Natural Wedding Photography",
              ],
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.chloemary.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Stories",
                  item: "https://www.chloemary.com/stories",
                },
              ],
            },
          }),
        }}
      />

      <StoriesHero />
      <main id="main" tabIndex={-1}>
        <StoriesIntro />
        <HorizontalGallery />
        <StoriesFooter />
      </main>
    </>
  );
}
