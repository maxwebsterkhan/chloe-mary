import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./styles/globals.scss";
import Navigation from "./_components/navigation/navigation";
import Footer from "./_components/footer/footer";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chloe Mary",
  description: "Capturing beauty, one photo at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${geistMono.variable}`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
