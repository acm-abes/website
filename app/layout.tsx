import "./globals.css";
import { ReactQueryProvider, ThemeProvider } from "@/components/Providers";
import FooterNew from "@/components/FooterNew";
import NavBarNew from "@/components/NavBarNew";
import SpaceDivider from "@/components/SpaceDivider";
import { Metadata } from "next";
import React from "react";
import { defaultOGConfig } from "@/lib/constants";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

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
              {/* <Menu /> */}
              <NavBarNew />
              {/* <div className="pt-20">{children}</div> */}
              {children}
              <FooterNew />
            </ReactQueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
