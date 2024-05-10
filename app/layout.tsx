import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Menu from "@/components/menu/Menu";
import { Metadata } from "next";
import React from "react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOME | ABES ACM",
  description: "Official ABES ACM Chapter",
  openGraph: {
    images: [
      {
        url: new URL("https://acm-abesec-1.vercel.app/images/acm-color-bg.jpg"),
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {/* <Navbar /> */}
          <Menu />
          <div className="pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
        {/*<Analytics />*/}
      </body>
    </html>
  );
}
