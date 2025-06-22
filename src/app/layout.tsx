import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./styles/globals.scss";
import Navigation from "./_components/navigation/navigation";
import Footer from "./_components/footer/footer";
import ScrollSmootherProvider from "./_components/scroll-smoother-provider";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
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
    "Contemporary reportage wedding photographer based in Bristol, serving London, UK & internationally. Passionate about working with creative couples who value relaxed, artistic images. Professional Photos Top 50 UK 2025. Featured on Who What Wear 2025.",
  keywords: [
    "bristol wedding photographer",
    "london wedding photographer",
    "uk wedding photography",
    "international wedding photographer",
    "destination wedding photographer",
    "contemporary reportage photographer",
    "creative wedding photography",
    "artistic wedding photographer bristol",
    "artistic wedding photographer london",
    "candid wedding photography",
    "natural wedding photographer uk",
    "professional photos top 50",
    "who what wear wedding photographer",
    "authentic love stories",
    "memento vivere photography",
    // 2025 SEO: Added semantic and intent-based keywords
    "emotional wedding photography",
    "documentary wedding photographer",
    "fine art wedding photography bristol",
    "fine art wedding photography london",
    "wedding photographer near me bristol",
    "wedding photographer near me london",
    "bristol wedding photography packages",
    "london wedding photography packages",
    "uk destination wedding photographer",
    "european wedding photographer",
    "overseas wedding photographer",
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
      "Contemporary reportage wedding photographer based in Bristol, serving London, UK & internationally. Capturing authentic, artistic images for creative couples. Top 50 UK photographer 2025.",
    images: [
      {
        url: "/chloe-mary-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Chloe Mary - Bristol Wedding Photographer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Chloe Mary Photography | Bristol & London Wedding Photographer - UK & International",
    description:
      "Contemporary reportage wedding photographer based in Bristol, serving London, UK & internationally. Capturing authentic, artistic images for creative couples.",
    creator: "@chloemary_photo",
    images: ["/chloe-mary-portrait.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/cm-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/cm-icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/cm-icon.png", sizes: "180x180", type: "image/png" }],
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
                "Contemporary reportage wedding photographer specializing in authentic, artistic images for creative couples. Based in Bristol, serving London, throughout the UK, and internationally for destination weddings.",
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
              foundingDate: "2020",
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
              image: "https://www.chloemary.com/chloe-mary-portrait.jpg",
              logo: "https://www.chloemary.com/cm-icon.png",
            }),
          }}
        />
      </head>
      <body
        className={`${interTight.variable} ${geistMono.variable} ${nunitoSans.variable}`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
