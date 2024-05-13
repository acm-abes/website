import { Metadata } from "next";
export const baseURL = "https://abes-acm.vercel.app";

export const defaultOGConfig: Metadata["openGraph"] = {
  siteName: "ABES ACM",
  url: baseURL,
  type: "website",
  locale: "en_IN",
  images: [
    {
      url: "/images/acm-color-bg.jpg",
    },
  ],
};
