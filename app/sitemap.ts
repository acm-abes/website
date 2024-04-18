import { MetadataRoute } from "next";
import { routes } from "@/public/data/constants";

export const sitemap = (): MetadataRoute.Sitemap => {
  const { base } = routes;

  return [
    {
      url: base + "/",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: base + "/events",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: base + "/about",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: base + "/team",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: base + "/auth/login",
      changeFrequency: "never",
      priority: 0.6,
    },
    {
      url: base + "/auth/register",
      changeFrequency: "never",
      priority: 0.6,
    },
  ];
};

export default sitemap;
