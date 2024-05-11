import React from "react";
import Card from "@/components/Card";
import { events as oldEvents } from "@/public/data/events";
import { Metadata } from "next";
import Database from "@/appwrite/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "EVENTS | ABES ACM",
  description: "Events Hosted by Official ABES ACM Chapter",
  icons: { icon: "/images/abes-acm.png" },
};

const Events = async () => {
  const database = new Database();

  const { documents } = await database.getEvents();

  const events = [...documents, ...oldEvents];

  return (
    <main className="p-5 md:px-20 lg:px-36 space-y-5">
      <div className="flex space-x-1 items-end">
        <h1 className="text-4xl">Events</h1>{" "}
        <span className="opacity-75">hosted by us</span>
      </div>
      <section className="gap-3 gap-y-5 md:gap-y-3 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3">
        {events.map((event, index) => (
          <Card className={"w-10"} key={index} {...event} image={event.logo} />
        ))}
      </section>
    </main>
  );
};

export default Events;
