import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Connect & Contact | Chloe Mary Photography Bristol - Book Your Wedding",
  description:
    "Get in touch with Chloe Mary Photography to discuss your wedding photography needs. Based in Bristol, serving couples across the UK and beyond. Contemporary reportage wedding photography for creative couples.",
  keywords: [
    "contact wedding photographer bristol",
    "book wedding photographer uk",
    "chloe mary photography contact",
    "wedding photography inquiry",
    "bristol wedding photographer booking",
    "contemporary wedding photographer contact",
    "reportage wedding photography inquiry",
    "creative wedding photography booking",
    "wedding photography consultation",
    "hello@chloemary.com",
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
    title: "Connect & Contact | Chloe Mary Photography Bristol",
    description:
      "Get in touch with Chloe Mary Photography to discuss your wedding photography needs. Based in Bristol, serving couples across the UK and beyond.",
    url: "https://www.chloemary.com/connect",
    siteName: "Chloe Mary Photography",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/chloe-mary-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Chloe Mary Photography - Wedding Photographer Bristol",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect & Contact | Chloe Mary Photography Bristol",
    description:
      "Get in touch with Chloe Mary Photography to discuss your wedding photography needs.",
    creator: "@chloemary_photo",
    images: ["/chloe-mary-portrait.jpg"],
  },
  alternates: {
    canonical: "https://www.chloemary.com/connect",
  },
  other: {
    "page-type": "Contact",
    "service-type": "Wedding Photography",
    location: "Bristol, UK",
    email: "hello@chloemary.com",
  },
};

export default function Page() {
  return (
    <>
      {/* JSON-LD for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://www.chloemary.com/connect",
            url: "https://www.chloemary.com/connect",
            name: "Connect & Contact | Chloe Mary Photography",
            description:
              "Get in touch with Chloe Mary Photography to discuss your wedding photography needs.",
            isPartOf: {
              "@id": "https://www.chloemary.com/#website",
            },
            about: {
              "@id": "https://www.chloemary.com/#organization",
            },
            mainEntity: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "hello@chloemary.com",
              availableLanguage: "English",
              areaServed: [
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
              serviceType: "Wedding Photography Consultation",
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
                  name: "Connect",
                  item: "https://www.chloemary.com/connect",
                },
              ],
            },
          }),
        }}
      />
      <h1>Connect</h1>
    </>
  );
}
