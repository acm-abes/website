import "./globals.css";
import { ThemeProvider } from "@/components/Providers";
import Footer from "@/components/Footer";
import Menu from "@/components/menu/Menu";
import { Metadata } from "next";
import React from "react";
import { defaultOGConfig } from "@/lib/constants";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s | ABES ACM", default: "HOME" },
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
          <Menu />
          <div className="pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
        {/*<Analytics />*/}
      </body>
    </html>
  );
}
