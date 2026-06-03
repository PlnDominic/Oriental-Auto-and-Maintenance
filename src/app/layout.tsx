import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oriental Auto | Premium Configurator",
  description: "Configure your perfect vehicle with Oriental Auto & Maintenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Prevent flash of unstyled light mode when user prefers dark */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&p)){document.documentElement.classList.add('dark')}})()` }} />
      </head>
      <body className="h-full overflow-hidden" style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
