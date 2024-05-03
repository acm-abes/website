import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Menu from "@/components/menu/Menu";
import { Metadata } from "next";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOME | ABES ACM",
  description: "Official ABES ACM Chapter",
  // icons: {
  //   icon: "/images/abes-acm.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const index = getRandomGradient(gradients);

  return (
    <html lang="en">
      <body
        className={"bg-background"}
        // style={{

        //   background: `radial-gradient(${gradients[index].start}, ${gradients[index].end});`,
        // }}
        // className={inter.className}
      >
        <ThemeProvider>
          {/* <Navbar /> */}
          <Menu />
          <div className="pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
