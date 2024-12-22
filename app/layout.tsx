import "./globals.css";
import { ReactQueryProvider, ThemeProvider } from "@/components/Providers";
import FooterNew from "@/components/FooterNew";
import NavBarNew from "@/components/NavBarNew";
import { Metadata } from "next";
import React from "react";
import { defaultOGConfig } from "@/lib/constants";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
          <SessionProvider>
            <ReactQueryProvider>
              <Toaster />
              <NavBarNew />
              {children}
              <FooterNew />
            </ReactQueryProvider>
          </SessionProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
