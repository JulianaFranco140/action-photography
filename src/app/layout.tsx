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
  title: "Action Photography",
  description: "Action Photography",
  icons: {
    icon: [
      { url: "/Action A Negro.svg", media: "(prefers-color-scheme: light)", type: "image/svg+xml" },
      { url: "/Action A Blanco.svg", media: "(prefers-color-scheme: dark)", type: "image/svg+xml" },
    ],
    shortcut: [
      { url: "/Action A Negro.svg", media: "(prefers-color-scheme: light)", type: "image/svg+xml" },
      { url: "/Action A Blanco.svg", media: "(prefers-color-scheme: dark)", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
