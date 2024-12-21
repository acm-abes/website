import "./globals.css";
import { ReactQueryProvider, ThemeProvider } from "@/components/Providers";
// import Menu from "@/components/menu/Menu";
// import Footer from "@/components/Footer";
import FooterNew from "@/components/FooterNew";
import NavBarNew from "@/components/NavBarNew";
import SpaceDivider from "@/components/SpaceDivider";
import { Metadata } from "next";
import React from "react";
import { defaultOGConfig } from "@/lib/constants";
import { AuthProvider } from "@/hooks/auth";
import { Toaster } from "@/components/ui/toaster";
import { connect } from "@/database";

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
  connect();

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ReactQueryProvider>
              <Toaster />
              {/* <Menu /> */}
              <NavBarNew />
              {/* <div className="pt-20">{children}</div> */}
              {children}
              <FooterNew />
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
