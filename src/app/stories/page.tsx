import { Metadata } from "next";
import S3Gallery from "@/app/_components/s3-gallery/s3-gallery";

export const metadata: Metadata = {
  title: "Wedding Photography Stories | Chloe Mary Photography Bristol",
  description:
    "Explore authentic wedding photography stories captured by Chloe Mary. Contemporary documentary wedding photography showcasing real couples and their beautiful love stories across Bristol and the UK.",
  keywords: [
    "wedding photography portfolio",
    "bristol wedding photography stories",
    "contemporary wedding photography",
    "documentary wedding photography",
    "candid wedding photography",
    "creative wedding photography bristol",
    "authentic wedding stories",
    "artistic wedding photography",
    "natural wedding photography uk",
    "unposed wedding photography",
    "wedding photography gallery",
    "real wedding stories bristol",
  ],
  authors: [{ name: "Chloe Mary" }],
  creator: "Chloe Mary Photography",
  publisher: "Chloe Mary Photography",
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
    title: "Wedding Photography Stories | Chloe Mary Photography",
    description:
      "Explore authentic wedding photography stories captured by Chloe Mary. Contemporary documentary wedding photography showcasing real couples and their beautiful love stories.",
    url: "https://www.chloemary.com/stories",
    siteName: "Chloe Mary Photography",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/chloe-mary-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Chloe Mary Photography - Wedding Photography Stories",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Photography Stories | Chloe Mary Photography",
    description:
      "Explore authentic wedding photography stories captured by Chloe Mary. Contemporary documentary wedding photography showcasing candid moments.",
    creator: "@chloemary_photo",
    images: ["/chloe-mary-portrait.jpg"],
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
            name: "Wedding Photography Stories | Chloe Mary Photography",
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
      <main style={{ padding: "2rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Stories</h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Authentic moments captured through contemporary documentary
            photography. Each story is unique, showcasing the genuine emotions
            and candid beauty of real love.
          </p>
        </div>
        <S3Gallery prefix="stories" columns={3} />
      </main>
    </>
  );
}
