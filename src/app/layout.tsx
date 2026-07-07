import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
    default: "Xanui Core — Documentation",
    template: "%s · Xanui Core",
  },
  description:
    "Xanui Core is a headless, theme-driven React toolkit: a styling primitive, a theming system, breakpoint-aware layout hooks, and an animation engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
    </html>
  );
}
