export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    "@id": "https://www.chloemary.com",
    name: "Chloe Mary",
    image: "https://www.chloemary.com/logo.webp",
    url: "https://www.chloemary.com",
    email: "hello@chloemary.com",
    telephone: "",
    priceRange: "££££",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bristol",
      addressRegion: "England",
      addressCountry: "UK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.4545",
      longitude: "-2.5879",
    },
    description:
      "Contemporary documentary photographer based in Bristol, specializing in wedding photography and available for creative collaborations. Capturing authentic, candid moments for weddings across UK & internationally.",
    founder: {
      "@type": "Person",
      name: "Chloe Mary",
    },
    sameAs: ["https://instagram.com/bychloemary"],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "51.4545",
        longitude: "-2.5879",
      },
      geoRadius: "500000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Day Essential Coverage",
            description:
              "Up to 9 hours of documentation with professional editing, online gallery access, and personal printing rights. Includes two rolls of black and white film.",
            offers: {
              "@type": "Offer",
              price: "3500",
              priceCurrency: "GBP",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Day Extensive Documentation",
            description:
              "Up to 12 hours of documentation with professional editing, online gallery access, and personal printing rights. Includes two rolls of black and white film.",
            offers: {
              "@type": "Offer",
              price: "4500",
              priceCurrency: "GBP",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Focused Session",
            description:
              "Up to 3 hours coverage, perfect for intimate celebrations. Limited peak season availability.",
            offers: {
              "@type": "Offer",
              price: "1350",
              priceCurrency: "GBP",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Extended Session",
            description:
              "Up to 5 hours coverage for intimate celebrations. Limited peak season availability.",
            offers: {
              "@type": "Offer",
              price: "2100",
              priceCurrency: "GBP",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "European Destination Wedding",
            description:
              "9 hours of documentation for European destination weddings. Includes two rolls of black and white film.",
            offers: {
              "@type": "Offer",
              price: "4250",
              priceCurrency: "GBP",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Worldwide Destination Wedding",
            description:
              "9 hours of documentation for worldwide destination weddings. Includes two rolls of black and white film.",
            offers: {
              "@type": "Offer",
              price: "4750",
              priceCurrency: "GBP",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Additional Coverage Hour",
            description: "Extend your coverage by one hour",
            offers: {
              "@type": "Offer",
              price: "375",
              priceCurrency: "GBP",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Additional Film Roll",
            description: "Additional black and white film roll",
            offers: {
              "@type": "Offer",
              price: "50",
              priceCurrency: "GBP",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Professional Collaborations",
            description:
              "Available for non-wedding creative projects and professional collaborations",
            offers: {
              "@type": "Offer",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "GBP",
                description: "Please contact for collaboration rates",
              },
            },
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
