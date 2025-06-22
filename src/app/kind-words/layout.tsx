import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kind Words & Testimonials | Chloe Mary Photography Bristol",
  description:
    "Read heartfelt testimonials from 200+ happy couples who chose Chloe Mary Photography for their weddings. 5-star Google rating. Contemporary documentary wedding photography in Bristol and beyond.",
  keywords: [
    "wedding photography testimonials",
    "bristol wedding photographer reviews",
    "chloe mary photography reviews",
    "wedding photography testimonials uk",
    "happy couples testimonials",
    "5 star wedding photographer bristol",
    "contemporary wedding photography reviews",
    "documentary wedding photographer testimonials",
    "candid wedding photography reviews",
    "creative wedding photography reviews",
    "authentic wedding photography testimonials",
    "natural wedding photography reviews",
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
    title: "Kind Words & Testimonials | Chloe Mary Photography",
    description:
      "Read heartfelt testimonials from 200+ happy couples who chose Chloe Mary Photography for their weddings. 5-star Google rating.",
    url: "https://www.chloemary.com/kind-words",
    siteName: "Chloe Mary Photography",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/chloe-mary-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Chloe Mary Photography - Wedding Photography Testimonials",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kind Words & Testimonials | Chloe Mary Photography",
    description:
      "Read heartfelt testimonials from 200+ happy couples who chose Chloe Mary Photography for their weddings.",
    creator: "@chloemary_photo",
    images: ["/chloe-mary-portrait.jpg"],
  },
  alternates: {
    canonical: "https://www.chloemary.com/kind-words",
  },
  other: {
    "review-count": "200+",
    rating: "5/5",
    "service-type": "Wedding Photography",
    location: "Bristol, UK & International",
  },
};

export default function KindWordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data for Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.chloemary.com/kind-words",
            url: "https://www.chloemary.com/kind-words",
            name: "Kind Words & Testimonials | Chloe Mary Photography",
            description:
              "Read heartfelt testimonials from 200+ happy couples who chose Chloe Mary Photography for their weddings.",
            isPartOf: {
              "@id": "https://www.chloemary.com/#website",
            },
            about: {
              "@id": "https://www.chloemary.com/#organization",
            },
            mainEntity: {
              "@type": "AggregateRating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
              ratingCount: "200",
              itemReviewed: {
                "@type": "ProfessionalService",
                name: "Chloe Mary Photography",
                description:
                  "Contemporary documentary wedding photography services",
                url: "https://www.chloemary.com",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Bristol",
                  addressRegion: "England",
                  addressCountry: "GB",
                },
              },
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
                  name: "Kind Words",
                  item: "https://www.chloemary.com/kind-words",
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
