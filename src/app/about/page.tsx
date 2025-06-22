import { Metadata } from "next";
import AboutHero from "../_components/about-hero/about-hero";
import AboutStory from "../_components/about-story/about-story";

export const metadata: Metadata = {
  title: "About Chloe Mary | Contemporary Wedding Photographer Bristol",
  description:
    "Meet Chloe Mary, a contemporary reportage photographer passionate about capturing authentic love stories. Based in Bristol, working with creative couples across the UK and beyond. Memento vivere - remember to live.",
  keywords: [
    "about chloe mary photographer",
    "bristol wedding photographer bio",
    "contemporary reportage photographer",
    "creative wedding photographer bristol",
    "authentic wedding photography",
    "candid wedding photographer uk",
    "artistic wedding photography",
    "memento vivere photographer",
    "professional photos top 50 photographer",
    "who what wear wedding photographer",
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
    title: "About Chloe Mary | Contemporary Wedding Photographer Bristol",
    description:
      "Meet Chloe Mary, a contemporary reportage photographer passionate about capturing authentic love stories. Based in Bristol, working with creative couples across the UK.",
    url: "https://www.chloemary.com/about",
    siteName: "Chloe Mary Photography",
    locale: "en_GB",
    type: "profile",
    images: [
      {
        url: "/chloe-mary-portrait-2.jpg",
        width: 1200,
        height: 630,
        alt: "Chloe Mary - Contemporary Wedding Photographer Bristol",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Chloe Mary | Contemporary Wedding Photographer Bristol",
    description:
      "Meet Chloe Mary, a contemporary reportage photographer passionate about capturing authentic love stories.",
    creator: "@chloemary_photo",
    images: ["/chloe-mary-portrait-2.jpg"],
  },
  alternates: {
    canonical: "https://www.chloemary.com/about",
  },
  other: {
    "photographer-style": "Contemporary Reportage",
    specialization: "Wedding Photography",
    location: "Bristol, UK",
    philosophy: "Memento vivere - remember to live",
  },
};

export default function About() {
  return (
    <>
      {/* JSON-LD for Person/Photographer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://www.chloemary.com/about#person",
            name: "Chloe Mary",
            jobTitle: "Wedding Photographer",
            description:
              "Contemporary reportage photographer passionate about working with creative and carefree couples who value relaxed, artistic images that truly reflect who they are.",
            url: "https://www.chloemary.com",
            email: "hello@chloemary.com",
            image: "https://www.chloemary.com/chloe-mary-portrait-2.jpg",
            sameAs: [
              "https://www.instagram.com/chloemary_photo",
              "https://www.facebook.com/chloemary.photography",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bristol",
              addressRegion: "England",
              addressCountry: "GB",
            },
            worksFor: {
              "@type": "Organization",
              name: "Chloe Mary Photography",
              url: "https://www.chloemary.com",
            },
            hasOccupation: {
              "@type": "Occupation",
              name: "Wedding Photographer",
              occupationLocation: {
                "@type": "Place",
                name: "Bristol, UK",
              },
              skills: [
                "Contemporary Reportage Photography",
                "Candid Wedding Photography",
                "Artistic Wedding Photography",
                "Creative Portrait Photography",
              ],
            },
            award: [
              "Professional Photos Top 50 Wedding Photographers UK 2025",
              "Featured on Who What Wear Wedding Issue 2025",
              "World's Best Wedding Photos Top 20 UK 2024/2025",
              "Trusted member of La Lista",
            ],
            knowsAbout: [
              "Wedding Photography",
              "Reportage Photography",
              "Creative Photography",
              "Artistic Photography",
              "Portrait Photography",
            ],
          }),
        }}
      />
      <AboutHero />
      <AboutStory />
    </>
  );
}
