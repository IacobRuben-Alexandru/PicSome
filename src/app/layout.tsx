import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../features/pictures/components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PicSum Gallery",
  description: "PicSum Gallery is a Next.js app that showcases a collection of pictures fetched from the Picsum API. Users can browse, favorite, and add pictures to their cart. Built with Next.js 13, TypeScript, and Zustand for state management.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-24 px-6 pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
