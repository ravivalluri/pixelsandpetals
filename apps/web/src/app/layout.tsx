import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixels & Petals — Design-forward engineering for modern web & mobile products",
  description: "Creating exceptional digital experiences with passion and precision. Specializing in web and mobile development, cloud architecture, and user experience design.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Pixels & Petals — Design-forward engineering",
    description: "Creating exceptional digital experiences with passion and precision.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixels & Petals — Design-forward engineering",
    description: "Creating exceptional digital experiences with passion and precision.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#F0F8FF" data-theme="light" />
        <meta name="theme-color" content="#0f1419" data-theme="dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
