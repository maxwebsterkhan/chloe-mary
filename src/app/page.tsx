import { Metadata } from "next";
import HomeHero from "./_components/home-hero/home-hero";
import QuoteIntro from "./_components/quote-intro/quote-intro";
import Achievements from "./_components/achievements/achievements";

export const metadata: Metadata = {
  title:
    "Chloe Mary Photography | Bristol Wedding Photographer - Authentic Modern Love Stories",
  description:
    "Contemporary reportage wedding photographer in Bristol. Passionate about capturing authentic love stories for creative couples. Professional Photos Top 50 UK 2025. Featured on Who What Wear 2025. Memento vivere - remember to live.",
  keywords: [
    "bristol wedding photographer",
    "contemporary reportage photographer",
    "authentic love stories",
    "creative wedding photography bristol",
    "candid wedding photographer uk",
    "artistic wedding photography",
    "memento vivere photography",
    "professional photos top 50",
    "who what wear wedding photographer",
    "worlds best wedding photos",
    "la lista photographer",
    "natural wedding photography bristol",
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
    title:
      "Chloe Mary Photography | Bristol Wedding Photographer - Authentic Modern Love Stories",
    description:
      "Contemporary reportage wedding photographer in Bristol. Capturing authentic love stories for creative couples. Top 50 UK photographer 2025.",
    url: "https://www.chloemary.com",
    siteName: "Chloe Mary Photography",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/chloe-mary-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Chloe Mary - Bristol Wedding Photographer - Authentic Modern Love Stories",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chloe Mary Photography | Bristol Wedding Photographer",
    description:
      "Contemporary reportage wedding photographer in Bristol. Capturing authentic love stories for creative couples.",
    creator: "@chloemary_photo",
    images: ["/chloe-mary-portrait.jpg"],
  },
  alternates: {
    canonical: "https://www.chloemary.com",
  },
  other: {
    "business-type": "Wedding Photography",
    "photographer-style": "Contemporary Reportage",
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
                name: "Chloe Mary Photography",
                description:
                  "Contemporary reportage wedding photographer in Bristol capturing authentic modern love stories.",
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
                name: "Chloe Mary Photography | Bristol Wedding Photographer - Authentic Modern Love Stories",
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
                thumbnailUrl:
                  "https://www.chloemary.com/chloe-mary-portrait.jpg",
                datePublished: "2020-01-01T00:00:00+00:00",
                dateModified: "2025-01-01T00:00:00+00:00",
                description:
                  "Contemporary reportage wedding photographer in Bristol. Passionate about capturing authentic love stories for creative couples.",
                breadcrumb: {
                  "@id": "https://www.chloemary.com/#breadcrumb",
                },
                inLanguage: "en-GB",
              },
              {
                "@type": "ImageObject",
                "@id": "https://www.chloemary.com/#primaryimage",
                inLanguage: "en-GB",
                url: "https://www.chloemary.com/chloe-mary-portrait.jpg",
                contentUrl: "https://www.chloemary.com/chloe-mary-portrait.jpg",
                width: 1200,
                height: 630,
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
      <QuoteIntro />
      <Achievements />
    </>
  );
}
