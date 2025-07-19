import React from "react";
import Card from "@/components/Card";
import { events as oldEvents } from "@/public/data/events";
import { Metadata } from "next";
import database from "@/appwrite/database";
import { EventDocument } from "@/types";
import { connectToDB } from "@/lib/mongodb";

export const metadata: Metadata = {
  title: "EVENTS",
  description: "Events Hosted by Official ABES ACM Chapter",
  icons: { icon: "/images/abes-acm.png" },
};

const getAllEvents = async () => {
  // const { documents } = await database.events?.list<EventDocument>()!;
  await connectToDB();
  const { Event } = await import("@/database/models/event");
  const documents = await Event.find({});
  const event = documents.map((event) => {
    return {
      id: event.id,
      name: event.name,
      date: event.date,
      description: event.description,
      sponsors: event.sponsors,
      prizes: event.prizes,
      venue: event.venue,
      logo: event.logo,
      banners: event.banners,
    };
  }
  );
  const allEvents = [...event, ...oldEvents];

  return allEvents;
};

const Events = async () => {
  const events = await getAllEvents();
  // console.log(events);

  return (
    <main className="p-5 md:px-20 lg:px-36 space-y-5">
      <div className="flex space-x-1 items-end">
        <h1 className="text-4xl">Events</h1>{" "}
        <span className="opacity-75">hosted by us</span>
      </div>
      <section className="gap-3 gap-y-5 md:gap-y-3 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3">
        {events.map((event, index) => (
          <Card
            className={
              "w-10 hover:border-foreground/80 hover:scale-[103%] duration-150"
            }
            key={index}
            {...event}
            image={event.logo}
          />
        ))}
      </section>
    </main>
  );
};

export default Events;
