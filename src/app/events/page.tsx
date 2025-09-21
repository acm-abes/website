import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getEvents } from "@/actions/events";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const EventsPage = async () => {
  const events = await getEvents();

  const featuredEvent = events[0]; // Assuming the first event is the featured one
  const upcomingEvents = events.slice(1, 4); // Next three events as upcoming
  const pastEvents = events.slice(4); // Remaining events as past events

  return (
    <main className="mb-20 flex flex-col gap-28 px-8 pt-28 md:px-16 lg:px-32">
      <section className="flex flex-col gap-10">
        <div className={oldStandardTT.className}>
          <h1 className={"text-7xl"}>Ongoing Event</h1>
        </div>
        <div className="flex">
          <div className="flex gap-8">
            <Image
              src={featuredEvent.poster}
              alt={featuredEvent.name}
              width={450}
              height={300}
            />
            <div className="flex flex-col gap-4">
              <Link
                href={`/events/${featuredEvent.id}`}
                className="flex gap-4 text-4xl"
              >
                {featuredEvent.name}
              </Link>

              <div className="flex flex-col text-sm">
                <div className="mb-2 flex gap-4">
                  <span className="font-semibold">Venue:</span>
                  <span>{featuredEvent.venue}</span>
                </div>
                <div className="mb-2 flex gap-4">
                  <span className="font-semibold">Date:</span>
                  <span>
                    {featuredEvent.startDate.toLocaleDateString()} -{" "}
                    {featuredEvent.endDate.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="text-lg">{featuredEvent.description}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-10">
        <div className={oldStandardTT.className}>
          <h1 className={"text-7xl"}>Upcoming Events</h1>
        </div>
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="h-full"
            >
              <div className="relative flex w-fit gap-8">
                <Image
                  src={event.poster}
                  alt={event.name}
                  width={480}
                  height={480}
                />
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-tr from-black opacity-0 transition duration-200 hover:opacity-100">
                  <div className="flex h-full flex-col justify-end gap-1 p-4 text-white">
                    <div className="text-2xl font-bold">{event.name}</div>
                    <div className="text-sm">
                      {event.startDate.toLocaleDateString()} -{" "}
                      {event.endDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-10">
        <div className={oldStandardTT.className}>
          <h1 className={"text-7xl"}>Past Events</h1>
        </div>
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="h-full"
            >
              <div className="relative flex w-fit gap-8">
                <Image
                  src={event.poster}
                  alt={event.name}
                  width={480}
                  height={480}
                />
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-tr from-black opacity-0 transition duration-200 hover:opacity-100">
                  <div className="flex h-full flex-col justify-end gap-1 p-4 text-white">
                    <div className="text-2xl font-bold">{event.name}</div>
                    <div className="text-sm">
                      {event.startDate.toLocaleDateString()} -{" "}
                      {event.endDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default EventsPage;
