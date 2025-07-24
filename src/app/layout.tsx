import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Provider } from "@/components/ui/provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PDFQuick",
    default: "PDFQuick - Free Online PDF Tools",
  },
  description:
    "Free online PDF tools to merge, split, compress, protect, and convert PDF files. No registration required. All processing done locally.",
  keywords: ["PDF tools", "online PDF", "free PDF editor", "PDF converter"],
  authors: [{ name: "PDFQuick" }],
  creator: "PDFQuick",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://pdfquick.com"),
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
