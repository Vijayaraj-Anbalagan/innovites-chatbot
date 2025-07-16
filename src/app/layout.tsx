import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "InnoVites",
  description: "Powering the Wire & Cable Industry with Innovation",
  openGraph: {
    title: "InnoVites",
    description: "Powering the Wire & Cable Industry with Innovation",
    url: "https://innovites.com",
    siteName: "InnoVites",
    images: [
      {
        url: "https://cdn.prod.website-files.com/64e33263df2f6848c89f1afd/64e33263df2f6848c89f1b37_logo_full_black.png",
        width: 1200,
        height: 630,
        alt: "InnoVites Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
