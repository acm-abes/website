import { Metadata } from "next";
export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://abes-acm.vercel.app"
    : "http://localhost:3000";

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
