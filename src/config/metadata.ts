import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zara Challenge",
  description: "E-commerce Zara - Nextjs App",
  keywords: ["Zara", "Challenge", "Next.js", "E-commerce", "React", "Shopping"],

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  openGraph: {
    title: "Zara Challenge",
    description: "E-commerce Zara - Nextjs App",
    url: "https://zara-challenge-one.vercel.app/",
    siteName: "Zara Challenge",
    images: [
      {
        url: "https://zara-challenge-one.vercel.app/mocks/1.webp",
        width: 1200,
        height: 630,
        alt: "Zara Challenge",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zara Challenge",
    description: "E-commerce Zara - Nextjs App",
    images: ["https://zara-challenge-one.vercel.app/mocks/1.webp"],
    creator: "@adrianperezcas",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};
