import React from "react";
import { Metadata } from "next";
import CardSkeleton from "@/components/CardSkeleton";

export const metadata: Metadata = {
  title: "EVENTS",
  description: "Events Hosted by Official ABES ACM Chapter",
  icons: { icon: "/images/abes-acm.png" },
};

const EventsLoading = async () => {
  return (
    <main className="p-5 md:px-20 lg:px-36 space-y-5">
      <div className="flex space-x-1 items-end">
        <h1 className="text-4xl">Events</h1>{" "}
        <span className="opacity-75">hosted by us</span>
      </div>
      <section className="gap-3 gap-y-5 md:gap-y-3 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3">
        {/*<CardSkeleton />*/}
        {Array.from({ length: 7 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </section>
    </main>
  );
};

export default EventsLoading;
