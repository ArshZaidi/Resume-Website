import type { Metadata, Viewport } from "next";
import {
  Inter,
  Space_Grotesk,
  Source_Serif_4,
  JetBrains_Mono,
  Noto_Serif_Devanagari,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { TransitionProvider } from "@/components/journey/TransitionProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

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

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500"],
  variable: "--font-devanagari-family",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-nastaliq-family",
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
      className={`${inter.variable} ${grotesk.variable} ${serif.variable} ${mono.variable} ${devanagari.variable} ${nastaliq.variable}`}
      style={
        {
          "--font-body": "var(--font-body-family), system-ui, sans-serif",
          "--font-display": "var(--font-serif-family), Georgia, serif",
          "--font-serif": "var(--font-serif-family), Georgia, serif",
          "--font-mono": "var(--font-mono-family), ui-monospace, monospace",
          "--font-devanagari":
            "var(--font-devanagari-family), 'Noto Serif Devanagari', serif",
          "--font-nastaliq":
            "var(--font-nastaliq-family), 'Noto Nastaliq Urdu', serif",
        } as React.CSSProperties
      }
    >
      <body>
        <SmoothScroll>
          <TransitionProvider>
            <CustomCursor />
            <NoiseOverlay />
            {children}
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}