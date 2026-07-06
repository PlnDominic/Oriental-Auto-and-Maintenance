import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oriental Auto | Our Vehicles",
  description: "Browse the vehicles available at Oriental Auto & Maintenance — Geely, Jetour, Toyota, Honda, Changan and GMC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden" style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
