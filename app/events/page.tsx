import React from "react";
import Card from "@/components/Card";
import { events as oldEvents } from "@/public/data/events";
import { Metadata } from "next";
import database from "@/appwrite/database";
import { EventDocument } from "@/types";
// import { global } from "styled-jsx/css";

export const metadata: Metadata = {
  title: "EVENTS",
  description: "Events Hosted by Official ABES ACM Chapter",
  icons: { icon: "/images/abes-acm.png" },
};

const getAllEvents = async () => {
  const { documents } = await database.events?.list<EventDocument>()!;

  // const allEvents= [...documents,...oldEvents];
  // allEvents.sort((a,b)=> new Date(b.$createdAt).getTime()- new Date(a.$createdAt).getTime());
  return [...documents, ...oldEvents];
};

const Events = async () => {
  const events = await getAllEvents();

  return (
    <main className="p-5 md:px-20 lg:px-36 space-y-5">
      <div className="flex space-x-1 items-end justify-center  ">
        <div>

        <h1 style={{fontFamily:'Nosifer', wordSpacing:4, letterSpacing:2}} className="text-4xl">Events</h1>{" "}
        <span style={{fontFamily:"creepster"}} className="flex opacity-75 justify-center">hosted by us</span>
        </div>
      </div>
      <div className="flex p-7 "></div>
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
