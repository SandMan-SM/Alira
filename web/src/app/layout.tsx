import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "ALIRA - Spiritual Leadership & Consciousness Institute",
  description: "A global spiritual guidance and education organization dedicated to consciousness development and spiritual enlightenment.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ALIRA",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "ALIRA - Spiritual Leadership & Consciousness Institute",
    description: "A global spiritual guidance and education organization dedicated to consciousness development and spiritual enlightenment.",
    url: "https://alira.com",
    siteName: "ALIRA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALIRA - Spiritual Leadership & Consciousness Institute",
    description: "A global spiritual guidance and education organization dedicated to consciousness development and spiritual enlightenment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
