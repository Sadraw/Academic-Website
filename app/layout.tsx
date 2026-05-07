import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeToggle } from "./components/ThemeToggle";
import logo from "@/public/logo.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sadra Daneshmand",
  description: "MA English Studies · Media · Discourse",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-screen flex flex-col bg-[#98A869] dark:bg-zinc-900">

        {/* background layers */}
        <div className="fixed inset-0 -z-20 bg-[#98A869] dark:bg-zinc-900" />

        {/* subtle gradient overlay */}
        <div className="fixed inset-0 -z-10 opacity-20 dark:opacity-10 bg-gradient-to-b from-white/30 to-transparent dark:from-white/5 pointer-events-none" />

        <Providers>
          <nav className="fixed top-0 left-0 right-0 flex justify-end px-8 py-4">
            <ThemeToggle />
          </nav>

          {children}
        </Providers>

      </body>
    </html>
  );
}