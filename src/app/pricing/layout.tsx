import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography Pricing | Chloe Mary Photography - Bristol & UK",
  description:
    "Transparent wedding photography pricing from £1,350. Full day coverage, intimate sessions & destination weddings. Professional editing, online gallery access, and personal printing rights included. Based in Bristol, serving UK & beyond.",
  keywords: [
    "wedding photography pricing",
    "bristol wedding photographer prices",
    "uk wedding photography costs",
    "destination wedding photographer",
    "wedding photography packages bristol",
    "professional wedding photographer rates",
    "intimate wedding photography pricing",
    "full day wedding coverage cost",
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
    title: "Wedding Photography Pricing | Chloe Mary Photography",
    description:
      "Transparent wedding photography pricing from £1,350. Full day coverage, intimate sessions & destination weddings. Based in Bristol, serving UK & beyond.",
    url: "https://www.chloemary.com/pricing",
    siteName: "Chloe Mary Photography",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "Chloe Mary Photography - Wedding Photography Pricing",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Photography Pricing | Chloe Mary Photography",
    description:
      "Transparent wedding photography pricing from £1,350. Full day coverage, intimate sessions & destination weddings.",
    creator: "@chloemary_photo",
    images: ["/logo.webp"],
  },
  alternates: {
    canonical: "https://www.chloemary.com/pricing",
  },
  other: {
    "price-range": "£1,350 - £4,750",
    "service-type": "Wedding Photography",
    "geographic-area": "Bristol, UK & International",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfessionalService",
                "@id": "https://www.chloemary.com/#organization",
                name: "Chloe Mary Photography",
                description:
                  "Professional wedding photography services in Bristol and across the UK",
                url: "https://www.chloemary.com",
                telephone: "07719011701",
                email: "hello@chloemary.com",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Bristol",
                  addressRegion: "England",
                  addressCountry: "GB",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: "51.4545",
                  longitude: "-2.5879",
                },
                serviceArea: [
                  {
                    "@type": "Place",
                    name: "Bristol, UK",
                  },
                  {
                    "@type": "Place",
                    name: "United Kingdom",
                  },
                  {
                    "@type": "Place",
                    name: "Europe",
                  },
                ],
                priceRange: "£1,350 - £4,750",
                paymentAccepted: "Cash, Credit Card, Bank Transfer",
                currenciesAccepted: "GBP",
              },
              {
                "@type": "Service",
                name: "Full Day Wedding Photography",
                description:
                  "Complete wedding day coverage from preparation to celebration",
                provider: {
                  "@id": "https://www.chloemary.com/#organization",
                },
                offers: {
                  "@type": "Offer",
                  price: "2750",
                  priceCurrency: "GBP",
                  availability: "https://schema.org/InStock",
                  validFrom: "2024-01-01",
                  priceValidUntil: "2024-12-31",
                },
                serviceOutput: [
                  "Professional photo editing",
                  "Online gallery access",
                  "Personal printing rights",
                  "8-12 hour coverage",
                ],
              },
              {
                "@type": "Service",
                name: "Set Hours Wedding Photography",
                description: "Flexible hour wedding photography packages",
                provider: {
                  "@id": "https://www.chloemary.com/#organization",
                },
                offers: {
                  "@type": "Offer",
                  price: "1350",
                  priceCurrency: "GBP",
                  availability: "https://schema.org/InStock",
                  validFrom: "2024-01-01",
                  priceValidUntil: "2024-12-31",
                },
                serviceOutput: [
                  "Professional photo editing",
                  "Online gallery access",
                  "Personal printing rights",
                  "3-6 hour coverage",
                ],
              },
              {
                "@type": "Service",
                name: "Destination Wedding Photography",
                description:
                  "Wedding photography for destination and elopement ceremonies",
                provider: {
                  "@id": "https://www.chloemary.com/#organization",
                },
                offers: {
                  "@type": "Offer",
                  price: "4750",
                  priceCurrency: "GBP",
                  availability: "https://schema.org/InStock",
                  validFrom: "2024-01-01",
                  priceValidUntil: "2024-12-31",
                },
                serviceOutput: [
                  "Professional photo editing",
                  "Online gallery access",
                  "Personal printing rights",
                  "Full day coverage",
                  "Travel included",
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.chloemary.com/pricing",
                url: "https://www.chloemary.com/pricing",
                name: "Wedding Photography Pricing | Chloe Mary Photography",
                description:
                  "Transparent wedding photography pricing from £1,350. Full day coverage, intimate sessions & destination weddings.",
                isPartOf: {
                  "@id": "https://www.chloemary.com/#website",
                },
                about: {
                  "@id": "https://www.chloemary.com/#organization",
                },
                mainEntity: {
                  "@id": "https://www.chloemary.com/#organization",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
