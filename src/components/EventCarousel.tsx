"use client";

import Carousel from "@/components/ui/carousel";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { title } from "node:process";
export function EventCarousel() {
  const slideDataUpcoming = [
    {
      title: "SAH 2k26",
      button: (
        <div className="flex items-center gap-2">
          <a href="/events/sah-2k26" className="flex items-center gap-2">
            <span>View</span>
            <ArrowRight />
          </a>
        </div>
      ),
      src: "/events/sah-2k26.jpg",
    },
  ];
  const slideData = [
    {
      title: "ACPC 2k25",
      button: (
        <div className="flex items-center gap-2">
          <a href="/events/acpc-2k25" className="flex items-center gap-2">
            <span>View</span>
            <ArrowRight />
          </a>
        </div>
      ),
      src: "/events/acpc-2k25(2).jpg",
    },
    {
      title: "Navrohan 2k25",
      button: (
        <div className="flex items-center gap-2">
          <a href="/events" className="flex items-center gap-2">
            <span>View</span>
            <ArrowRight />
          </a>
        </div>
      ),
      src: "/events/navrohan-25.png",
    },
    {
      title: "ACPC 2k24",
      button: (
        <div className="flex items-center gap-2">
          <a href="/events/acpc-2k24-event-8c0tu" className="flex items-center gap-2">
            <span>View</span>
            <ArrowRight />
          </a>
        </div>
      ),
      src: "/events/acpc-25.png",
    },
    {
      title: "Explore more events",
      button: (
        <div className="flex items-center gap-2">
          <a href="/events" className="flex items-center gap-2">
            <span>Explore</span>
            <ArrowUpRight />
          </a>
        </div>
      ),
      src: "/events/more-events.jpg",
    },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden px-4 sm:px-8 md:px-16 lg:px-28 py-16 sm:py-24 md:py-32 lg:py-40 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
      <h1 className="pb-8 sm:pb-12 md:pb-16 lg:pb-20">Upcoming Events</h1>
      <Carousel slides={slideDataUpcoming} /><br/><br/>
      <h1 className="pb-8 sm:pb-12 md:pb-16 lg:pb-20">Recent Events</h1>
      <Carousel slides={slideData} />
    </div>
  );
}
