import React from "react";
import Card from "@/components/Card";
import { events } from "@/public/data/events";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "EVENTS | ABES ACM",
  description: "Official ABES ACM Chapter",
  icons: { icon: "/images/abes-acm.png" },
};

const Events = () => {
  return (
    <main className="p-5 md:px-20 lg:px-36 space-y-5">
      <div className="flex space-x-1 items-end">
        <h1 className="text-4xl">Events</h1>{" "}
        <span className="opacity-75">hosted by us</span>
      </div>
      <section className="gap-3 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {events.map((event, index) => (
          <Card className={"w-10"} key={index} {...event} />
        ))}
      </section>
    </main>
  );
};

export default Events;
