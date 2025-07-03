import { Metadata } from "next";
import HomeHero from "./_components/home-hero/home-hero";
import QuoteIntro from "./_components/quote-intro/quote-intro";
import Achievements from "./_components/achievements/achievements";

import HomepageMasonryGallery from "./_components/masonry-gallery/HomepageMasonryGallery";

export const metadata: Metadata = {
  title:
    "Chloe Mary | Bristol Wedding Photographer - Authentic Modern Love Stories",
  description:
    "Contemporary documentary wedding photographer in Bristol. Passionate about capturing authentic love stories and candid moments for creative couples. Professional Photos Top 50 UK 2025. Featured on Who What Wear 2025. Memento vivere - remember to live.",
  keywords: [
    "bristol wedding photographer",
    "contemporary documentary photographer",
    "authentic love stories",
    "creative wedding photography bristol",
    "candid wedding photographer uk",
    "artistic wedding photography",
    "natural wedding photography",
    "unposed wedding photography",
    "memento vivere photography",
    "professional photos top 50",
    "who what wear wedding photographer",
    "worlds best wedding photos",
    "la lista photographer",
    "documentary wedding photography bristol",
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
    title:
      "Chloe Mary | Bristol Wedding Photographer - Authentic Modern Love Stories",
    description:
      "Contemporary documentary wedding photographer in Bristol. Capturing authentic love stories and candid moments for creative couples. Top 50 UK photographer 2025.",
    url: "https://www.chloemary.com",
    siteName: "Chloe Mary",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "Chloe Mary - Bristol Wedding Photographer",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chloe Mary | Bristol Wedding Photographer",
    description:
      "Contemporary documentary wedding photographer in Bristol. Capturing authentic love stories and candid moments for creative couples.",
    creator: "@chloemary_photo",
    images: ["/logo.webp"],
  },
  alternates: {
    canonical: "https://www.chloemary.com",
  },
  other: {
    "business-type": "Wedding Photography",
    "photographer-style": "Contemporary Documentary",
    location: "Bristol, UK",
    philosophy: "Memento vivere - remember to live",
    awards: "Professional Photos Top 50 UK 2025, Who What Wear 2025",
  },
};

export default function Home() {
  return (
    <>
      {/* Enhanced JSON-LD for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.chloemary.com/#website",
                url: "https://www.chloemary.com",
                name: "Chloe Mary",
                description:
                  "Contemporary documentary wedding photographer in Bristol capturing authentic modern love stories and candid moments.",
                publisher: {
                  "@id": "https://www.chloemary.com/#organization",
                },
                potentialAction: [
                  {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://www.chloemary.com/search?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                ],
                inLanguage: "en-GB",
              },
              {
                "@type": "WebPage",
                "@id": "https://www.chloemary.com/#webpage",
                url: "https://www.chloemary.com",
                name: "Chloe Mary | Bristol Wedding Photographer - Authentic Modern Love Stories",
                isPartOf: {
                  "@id": "https://www.chloemary.com/#website",
                },
                about: {
                  "@id": "https://www.chloemary.com/#organization",
                },
                primaryImageOfPage: {
                  "@id": "https://www.chloemary.com/#primaryimage",
                },
                image: {
                  "@id": "https://www.chloemary.com/#primaryimage",
                },
                thumbnailUrl: "https://www.chloemary.com/logo.webp",
                datePublished: "2020-01-01T00:00:00+00:00",
                dateModified: "2025-01-01T00:00:00+00:00",
                description:
                  "Contemporary documentary wedding photographer in Bristol capturing authentic modern love stories and candid moments.",
                breadcrumb: {
                  "@id": "https://www.chloemary.com/#breadcrumb",
                },
                inLanguage: "en-GB",
              },
              {
                "@type": "ImageObject",
                "@id": "https://www.chloemary.com/#primaryimage",
                inLanguage: "en-GB",
                url: "https://www.chloemary.com/logo.webp",
                contentUrl: "https://www.chloemary.com/logo.webp",
                width: 512,
                height: 512,
                caption: "Chloe Mary - Bristol Wedding Photographer",
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.chloemary.com/#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                  },
                ],
              },
            ],
          }),
        }}
      />
      <HomeHero />
      <main id="main" tabIndex={-1}>
        <QuoteIntro />
        <Achievements />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageGallery",
              name: "Homepage Masonry Gallery",
              description:
                "A curated selection of wedding photography by Chloe Mary, Bristol.",
              publisher: {
                "@type": "Organization",
                name: "Chloe Mary",
              },
            }),
          }}
        />
        <HomepageMasonryGallery />
      </main>
    </>
  );
}
