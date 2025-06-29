import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono, Poppins } from "next/font/google";
import "./styles/globals.scss";
import Navigation from "./_components/navigation/navigation";
import LenisScrollWrapper from "./_components/lenis-scroll-wrapper";
import FooterBoundary from "./_components/footer/footer-boundary";
import SkipLink from "./_components/skip-link";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B6D42", // Your accent color
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chloemary.com"),
  title: {
    default:
      "Chloe Mary Photography | Bristol Wedding Photographer - Authentic Modern Love Stories",
    template: "%s | Chloe Mary Photography",
  },
  description:
    "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Passionate about capturing authentic, candid moments for creative couples who value natural, artistic images. Professional Photos Top 50 UK 2025. Featured on Who What Wear 2025.",
  keywords: [
    // Primary location keywords
    "bristol wedding photographer",
    "bristol photographer",
    "london wedding photographer",
    "london photographer",
    "uk wedding photography",
    "uk photographer",
    "uk wedding photographer",

    // Regional variations
    "bath wedding photographer",
    "somerset wedding photographer",
    "gloucestershire wedding photographer",
    "cotswolds wedding photographer",
    "devon wedding photographer",
    "cornwall wedding photographer",

    // Intent-based keywords
    "hire wedding photographer bristol",
    "book wedding photographer london",
    "find wedding photographer uk",
    "wedding photographer near me bristol",
    "wedding photographer near me london",

    // Service variations
    "international wedding photographer",
    "destination wedding photographer",
    "european wedding photographer",
    "overseas wedding photographer",
    "abroad wedding photographer",
    "international photographer",
    "destination photographer",
    "wedding photographer abroad",
    "uk photographer working internationally",
    "british photographer overseas",

    // Specific international regions
    "france wedding photographer",
    "italy wedding photographer",
    "spain wedding photographer",
    "portugal wedding photographer",
    "greece wedding photographer",
    "tuscany wedding photographer",
    "provence wedding photographer",
    "amalfi coast wedding photographer",
    "santorini wedding photographer",
    "ibiza wedding photographer",
    "mallorca wedding photographer",

    // International cities
    "paris wedding photographer",
    "rome wedding photographer",
    "barcelona wedding photographer",
    "amsterdam wedding photographer",
    "berlin wedding photographer",
    "prague wedding photographer",
    "vienna wedding photographer",

    // Broader international terms
    "worldwide wedding photographer",
    "global wedding photographer",
    "travel wedding photographer",
    "elopement photographer abroad",
    "destination elopement photographer",

    // Style-specific keywords
    "contemporary documentary photographer",
    "creative wedding photography",
    "artistic wedding photographer bristol",
    "artistic wedding photographer london",
    "candid wedding photography",
    "natural wedding photographer uk",
    "authentic wedding photography",
    "unposed wedding photography",
    "emotional wedding photography",
    "documentary wedding photographer",
    "fine art wedding photography bristol",
    "fine art wedding photography london",

    // Package/pricing keywords
    "bristol wedding photography packages",
    "london wedding photography packages",
    "wedding photography pricing uk",
    "affordable wedding photographer bristol",
    "luxury wedding photographer london",

    // Brand/recognition keywords
    "professional photos top 50",
    "who what wear wedding photographer",
    "authentic love stories",
    "memento vivere photography",

    // Venue-specific (popular wedding venues)
    "clifton wedding photographer",
    "harbourside wedding photographer",
    "bristol harbour wedding photographer",
    "shoreditch wedding photographer",
    "islington wedding photographer",
    "hackney wedding photographer",
  ],
  authors: [{ name: "Chloe Mary", url: "https://www.chloemary.com" }],
  creator: "Chloe Mary Photography",
  publisher: "Chloe Mary Photography",
  applicationName: "Chloe Mary Photography",
  referrer: "origin-when-cross-origin",
  // 2025 SEO: Enhanced robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // 2025 SEO: PWA manifest for better mobile experience
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.chloemary.com",
    siteName: "Chloe Mary Photography",
    title:
      "Chloe Mary Photography | Bristol & London Wedding Photographer - UK & International",
    description:
      "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Capturing authentic, candid moments for creative couples. Top 50 UK photographer 2025.",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "Chloe Mary Photography - Bristol Wedding Photographer",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Chloe Mary Photography | Bristol & London Wedding Photographer - UK & International",
    description:
      "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Capturing authentic, candid moments for creative couples.",
    creator: "@chloemary_photo",
    images: ["/logo.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.webp", sizes: "32x32", type: "image/webp" },
      { url: "/logo.webp", sizes: "16x16", type: "image/webp" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/logo.webp", sizes: "180x180", type: "image/webp" }],
  },
  alternates: {
    canonical: "https://www.chloemary.com",
  },
  category: "Photography",
  classification: "Wedding Photography Services",
  other: {
    "geo.region": "GB-ENG",
    "geo.placename": "Bristol",
    "geo.position": "51.4545;-2.5879",
    ICBM: "51.4545, -2.5879",
    "business-type": "Photography Services",
    "service-area": "Bristol, London, UK & International",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        {/* JSON-LD Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://www.chloemary.com/#organization",
              name: "Chloe Mary Photography",
              alternateName: "Chloe Mary",
              description:
                "Contemporary documentary wedding photographer specializing in authentic, candid images for creative couples. Based in Bristol, serving London, throughout the UK, and internationally for destination weddings.",
              url: "https://www.chloemary.com",
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
                {
                  "@type": "Place",
                  name: "International",
                },
              ],
              serviceType: "Wedding Photography",
              priceRange: "£1,350 - £4,750",
              paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
              currenciesAccepted: "GBP",
              foundingDate: "2018",
              awards: [
                "Professional Photos Top 50 Wedding Photographers UK 2025",
                "Featured on Who What Wear Wedding Issue 2025",
                "World's Best Wedding Photos Top 20 UK 2024/2025",
                "Trusted member of La Lista",
              ],
              // 2025 SEO: Enhanced social presence and review signals
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "200+",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Happy Couple",
                  },
                  reviewBody:
                    "Exceptional wedding photography capturing authentic moments beautifully.",
                },
              ],
              sameAs: [
                "https://www.instagram.com/chloemary_photo",
                "https://www.facebook.com/chloemary.photography",
              ],
              image: "https://www.chloemary.com/logo.webp",
              logo: "https://www.chloemary.com/logo.webp",
            }),
          }}
        />
      </head>
      <body
        className={`${interTight.variable} ${geistMono.variable} ${poppins.variable}`}
      >
        <SkipLink />
        <LenisScrollWrapper>
          <Navigation />
          <div id="boundary">{children}</div>
          <FooterBoundary />
        </LenisScrollWrapper>
      </body>
    </html>
  );
}
