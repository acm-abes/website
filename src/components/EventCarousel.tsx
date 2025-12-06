"use client";

import Carousel from "@/components/ui/carousel";
import { ArrowRight, ArrowUpRight } from "lucide-react";
export function EventCarousel() {
  const slideData = [
    {
      title: "Navrohan 2k25",
      button: (
        <div className="flex items-center gap-2">
          <span>View</span>
          <ArrowRight />
        </div>
      ),
      src: "/events/navrohan-25.png",
    },
    {
      title: "ACPC 2k24",
      button: (
        <div className="flex items-center gap-2">
          <span>View</span>
          <ArrowRight />
        </div>
      ),
      src: "/events/acpc-25.png",
    },
    {
      title: "Explore more events",
      button: (
        <div className="flex items-center gap-2">
          <span>Explore</span>
          <ArrowUpRight />
        </div>
      ),
      src: "/events/more-events.jpg",
    },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden px-28 py-40 text-6xl">
      
      <h1 className="pb-20">Recent Events</h1>
      <Carousel slides={slideData} />
    </div>
  );
}
