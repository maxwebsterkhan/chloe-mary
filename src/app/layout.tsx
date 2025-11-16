import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./styles/globals.scss";
import LenisProvider from "./_components/lenis-provider";
import BoldNav from "./_components/navigation/bold-nav";
import ThemeToggle from "./_components/theme-toggle/theme-toggle";
import Footer from "./_components/footer/footer";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B6D42",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chloemary.com/"),
  title: {
    default:
      "Chloe Mary | Bristol Wedding Photographer - Authentic Modern Love Stories",
    template: "%s | Chloe Mary",
  },
  description:
    "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Passionate about capturing authentic, candid moments for creative couples who value natural, artistic images.",
  keywords: [
    "bristol wedding photographer",
    "london wedding photographer",
    "contemporary documentary photographer",
    "authentic love stories",
    "candid wedding photography",
    "professional photos top 50",
    "featured in vogue",
    "featured in who what wear",
    "featured in the world's best wedding photos",
    "featured in the professional photo magazine",
    "featured in the wedding photographer magazine",
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
    type: "website",
    locale: "en_GB",
    url: "https://www.chloemary.com",
    title:
      "Chloe Mary | Bristol & London Wedding Photographer - UK & International",
    description:
      "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Capturing authentic, candid moments for creative couples.",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "Chloe Mary - Bristol Wedding Photographer",
      },
    ],
    siteName: "Chloe Mary",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Chloe Mary | Bristol & London Wedding Photographer - UK & International",
    description:
      "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Capturing authentic, candid moments for creative couples.",
    images: ["/logo.webp"],
  },
  alternates: {
    canonical: "https://www.chloemary.com",
  },
  other: {
    "theme-color": "#8B6D42",
    "msapplication-TileColor": "#8B6D42",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.chloemary.com/#organization",
  name: "Chloe Mary",
  url: "https://www.chloemary.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.chloemary.com/logo.webp",
    width: 512,
    height: 512,
  },
  description:
    "Contemporary documentary wedding photographer passionate about capturing authentic love stories and candid moments for creative couples.",
  foundingDate: "2018",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "1",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bristol",
    addressRegion: "England",
    addressCountry: "GB",
  },
  areaServed: [
    {
      "@type": "Place",
      name: "Bristol",
    },
    {
      "@type": "Place",
      name: "London",
    },
    {
      "@type": "Place",
      name: "United Kingdom",
    },
  ],
  serviceType: [
    "Wedding Photography",
    "Documentary Photography",
    "Fine Art Photography",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.chloemary.com/#website",
  url: "https://www.chloemary.com",
  name: "Chloe Mary",
  description:
    "Contemporary documentary wedding photographer capturing authentic love stories for creative couples.",
  publisher: {
    "@id": "https://www.chloemary.com/#organization",
  },
  inLanguage: "en-GB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" data-theme-status="light">
      <body
        className={`${interTight.variable} ${geistMono.variable} ${poppins.variable}`}
      >
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Structured Data - Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <LenisProvider>
          <BoldNav />
          <ThemeToggle />
          <div id="boundary">{children}</div>
          <Footer />
        </LenisProvider>
      </body>
      <Analytics />
    </html>
  );
}
