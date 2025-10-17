import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Chloe Mary | Bristol Wedding Photographer - Get In Touch",
  description:
    "Ready to capture your love story? Contact Chloe Mary, Bristol's contemporary documentary wedding photographer. Complimentary consultations available. Only 25 couples per year for personalized service.",
  keywords: [
    "contact chloe mary photographer",
    "bristol wedding photographer contact",
    "wedding photography enquiry bristol",
    "contemporary documentary photographer contact",
    "book wedding photographer bristol",
    "wedding photography consultation bristol",
    "creative wedding photographer enquiry",
    "authentic wedding photography bristol",
    "candid wedding photographer contact uk",
    "artistic wedding photography enquiry",
    "natural wedding photography contact",
    "memento vivere photographer contact",
    "professional photos top 50 photographer contact",
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
    title: "Contact Chloe Mary | Bristol Wedding Photographer - Get In Touch",
    description:
      "Ready to capture your love story? Contact Chloe Mary for contemporary documentary wedding photography in Bristol. Complimentary consultations available.",
    url: "https://www.chloemary.com/contact",
    siteName: "Chloe Mary",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "Contact Chloe Mary - Bristol Wedding Photographer",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Chloe Mary | Bristol Wedding Photographer",
    description:
      "Ready to capture your love story? Contact Chloe Mary for contemporary documentary wedding photography in Bristol.",
    creator: "@chloemary_photo",
    images: ["/logo.webp"],
  },
  alternates: {
    canonical: "https://www.chloemary.com/contact",
  },
  other: {
    "photographer-style": "Contemporary Documentary",
    specialization: "Wedding Photography Contact",
    location: "Bristol, UK",
    philosophy: "Memento vivere - remember to live",
    "contact-method": "Online Form & Consultation",
    "response-time": "Within a few days",
  },
};

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://www.chloemary.com/contact#webpage",
                url: "https://www.chloemary.com/contact",
                name: "Contact Chloe Mary | Bristol Wedding Photographer - Get In Touch",
                isPartOf: {
                  "@id": "https://www.chloemary.com/#website",
                },
                about: {
                  "@id": "https://www.chloemary.com/about#person",
                },
                description:
                  "Contact Chloe Mary for contemporary documentary wedding photography in Bristol. Complimentary consultations available for couples.",
                breadcrumb: {
                  "@id": "https://www.chloemary.com/contact#breadcrumb",
                },
                inLanguage: "en-GB",
                potentialAction: [
                  {
                    "@type": "CommunicateAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://www.chloemary.com/contact",
                      actionPlatform: [
                        "http://schema.org/DesktopWebPlatform",
                        "http://schema.org/MobileWebPlatform",
                      ],
                    },
                  },
                ],
              },
              {
                "@type": "ContactPage",
                "@id": "https://www.chloemary.com/contact#contactpage",
                url: "https://www.chloemary.com/contact",
                name: "Contact Chloe Mary",
                description:
                  "Get in touch with Chloe Mary for wedding photography enquiries. Complimentary video consultations available.",
                provider: {
                  "@type": "Person",
                  "@id": "https://www.chloemary.com/about#person",
                  name: "Chloe Mary",
                  jobTitle: "Wedding Photographer",
                  image: "https://www.chloemary.com/logo.webp",
                  telephone: "07719011701", // Replace with actual number
                  email: "hello@chloemary.com",
                  url: "https://www.chloemary.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bristol",
                    addressRegion: "England",
                    addressCountry: "GB",
                  },
                  areaServed: [
                    {
                      "@type": "Place",
                      name: "Bristol, UK",
                    },
                    {
                      "@type": "Place",
                      name: "London, UK",
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
                  priceRange: "£1350-£5000",
                  serviceType: "Wedding Photography",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Wedding Photography Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Full Day Wedding Photography",
                          description:
                            "Complete wedding day coverage with professional editing and online gallery",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Set Hours Wedding Photography",
                          description:
                            "Flexible hour packages for intimate weddings and elopements",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Destination Wedding Photography",
                          description:
                            "Wedding photography services for destination weddings worldwide",
                        },
                      },
                    ],
                  },
                },
                mainEntity: {
                  "@type": "ContactPoint",
                  contactType: "Wedding Photography Enquiries",
                  email: "hello@chloemary.com",
                  availableLanguage: "English",
                  areaServed: "GB",
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ],
                    opens: "09:00",
                    closes: "17:00",
                  },
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.chloemary.com/contact#breadcrumb",
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
                    name: "Contact",
                  },
                ],
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
