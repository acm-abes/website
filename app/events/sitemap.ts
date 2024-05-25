import { MetadataRoute } from "next";
import { routes } from "@/public/data/constants";
import { getAllEvents } from "@/lib/utils";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { base } = routes;

  const eventsURL = base + "/events/";

  const events = await getAllEvents();

  return events.map((event) => ({
    url: eventsURL + event.id,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
};

export default sitemap;
