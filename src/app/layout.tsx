import type { Metadata, Viewport } from "next";
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
  title: "Micro-Quiz Platform",
  description: "Test your knowledge with our interactive quiz platform. Take short, topic-specific quizzes on History, Science, Math, and Programming.",
  keywords: "quiz, education, learning, history, science, math, programming, interactive",
  authors: [{ name: "Micro-Quiz Platform" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://micro-quiz-platform.vercel.app",
    title: "Micro-Quiz Platform",
    description: "Test your knowledge with our interactive quiz platform",
    siteName: "Micro-Quiz Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Micro-Quiz Platform",
    description: "Test your knowledge with our interactive quiz platform",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
