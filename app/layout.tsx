import "./globals.css";
import { ThemeProvider } from "@/components/Providers";
import Footer from "@/components/Footer";
import Menu from "@/components/menu/Menu";
import { Metadata } from "next";
import React from "react";
import { defaultOGConfig } from "@/lib/constants";
import { AuthProvider } from "@/hooks/auth";

export const metadata: Metadata = {
  title: { template: "%s | ABES ACM", default: "HOME" },
  metadataBase: new URL("https://abes-acm.vercel.app"),
  description: "Official ABES ACM Chapter",
  openGraph: {
    ...defaultOGConfig,
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
          <AuthProvider>
            <Menu />
            <div className="pt-20">{children}</div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
        {/*<Analytics />*/}
      </body>
    </html>
  );
}
