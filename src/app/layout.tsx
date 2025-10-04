/** @format */

import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "HOME | ABES x ACM",
  description: "Official website of ACM Chapter at ABES Engineering College",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased ${poppins.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
