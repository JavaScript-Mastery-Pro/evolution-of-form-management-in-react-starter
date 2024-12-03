import Link from "next/link";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Evolution of form management in React",
  description: "A workshop for GitNation React Berlin 2024",
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
        <main className="flex flex-col max-w-3xl mx-auto min-h-screen p-5">
          <nav className="bg-white py-3">
            <Link href="/" className="text-black font-medium text-xl">
              🐞_
            </Link>
          </nav>

          <section className="my-5 text-center">
            <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg relative overflow-hidden w-full">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 relative z-10">
                Code Confessions
              </h1>
              <p className="text-lg text-slate-200 mt-2 max-w-xl mx-auto relative z-10">
                A hangout for developers to share their weirdest coding secrets
                and funniest debugging fails
              </p>
            </div>
          </section>

          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
