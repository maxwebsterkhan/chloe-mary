import type { Viewport } from "next";
import { Inter_Tight, Geist_Mono, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./styles/globals.scss";
import LenisProvider from "./_components/lenis-provider";

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
  themeColor: "#8B6D42",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${interTight.variable} ${geistMono.variable} ${poppins.variable}`}
      >
        <LenisProvider>
          <div id="boundary">{children}</div>
        </LenisProvider>
      </body>
      <Analytics />
    </html>
  );
}
