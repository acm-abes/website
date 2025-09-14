"use client";

import Carousel from "@/components/ui/carousel";
import { ArrowRight, ArrowUpRight } from "lucide-react";
export function EventCarousel() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: (
        <div className="flex items-center gap-2">
          <span>View</span>
          <ArrowRight />
        </div>
      ),
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Urban Dreams",
      button: (
        <div className="flex items-center gap-2">
          <span>View</span>
          <ArrowRight />
        </div>
      ),
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Neon Nights",
      button: (
        <div className="flex items-center gap-2">
          <span>View</span>
          <ArrowRight />
        </div>
      ),
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Explore more events",
      button: (
        <div className="flex items-center gap-2">
          <span>Explore</span>
          <ArrowUpRight />
        </div>
      ),
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden px-28 py-40 text-6xl font-semibold">
      <h1 className="pb-20">Recent Events</h1>
      <Carousel slides={slideData} />
    </div>
  );
}
