import type { Metadata, Viewport } from "next";
import {
  Inter,
  Space_Grotesk,
  Source_Serif_4,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { TransitionProvider } from "@/components/journey/TransitionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-family",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-family",
  display: "swap",
});

const SITE = "https://arshzaidi.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Arsh Raza Zaidi — Developer & AI Builder",
  description:
    "Founder of MYRAQ.ai. Student, developer and AI builder working across applied machine learning, full-stack product and research.",
  keywords: [
    "Arsh Raza Zaidi",
    "MYRAQ",
    "AI developer",
    "machine learning",
    "Next.js portfolio",
  ],
  authors: [{ name: "Arsh Raza Zaidi" }],
  openGraph: {
    title: "Arsh Raza Zaidi — Developer & AI Builder",
    description:
      "A resume you travel through. Scroll the railway from Departure to Destination.",
    url: SITE,
    siteName: "Arsh Raza Zaidi",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsh Raza Zaidi — Developer & AI Builder",
    description: "Founder of MYRAQ.ai. Applied ML, product and research.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${serif.variable} ${mono.variable}`}
      style={
        {
          "--font-body": "var(--font-body-family), system-ui, sans-serif",
          // Display now maps to the editorial serif — Claude-style headlines
          // throughout the site, homepage included.
          "--font-display": "var(--font-serif-family), Georgia, serif",
          "--font-serif": "var(--font-serif-family), Georgia, serif",
          "--font-mono": "var(--font-mono-family), ui-monospace, monospace",
        } as React.CSSProperties
      }
    >
      <body>
        <SmoothScroll>
          <TransitionProvider>{children}</TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}