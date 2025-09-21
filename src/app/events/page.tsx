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

  const ongoingEvent = events.find(
    (event) => event.startDate < new Date() && event.endDate > new Date(),
  );
  const upcomingEvents = events
    .filter((event) => event.startDate > new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const pastEvents = events
    .filter((event) => event.endDate < new Date())
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime());

  return (
    <main className="mb-20 flex flex-col gap-28 px-8 pt-28 md:px-16 lg:px-32">
      <section className="flex flex-col gap-10">
        <div className={oldStandardTT.className}>
          <h1 className={"text-7xl"}>Ongoing Event</h1>
        </div>
        {ongoingEvent ? (
          <div className="flex">
            <div className="flex gap-8">
              <Image
                src={ongoingEvent.poster}
                alt={ongoingEvent.name}
                width={450}
                height={300}
              />
              <div className="flex flex-col gap-4">
                <Link
                  href={`/events/${ongoingEvent.slug}`}
                  className="flex gap-4 text-4xl"
                >
                  {ongoingEvent.name}
                </Link>

                <div className="flex flex-col text-sm">
                  <div className="mb-2 flex gap-4">
                    <span className="font-semibold">Venue:</span>
                    <span>{ongoingEvent.venue}</span>
                  </div>
                  <div className="mb-2 flex gap-4">
                    <span className="font-semibold">Date:</span>
                    <span>
                      {ongoingEvent.startDate.toLocaleDateString()} -{" "}
                      {ongoingEvent.endDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-lg">{ongoingEvent.description}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-lg">
            No ongoing event at the moment. Stay tuned for upcoming events!
          </div>
        )}
      </section>
      <section className="flex flex-col gap-10">
        <div className={oldStandardTT.className}>
          <h1 className={"text-7xl"}>Upcoming Events</h1>
        </div>
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <Link
                href={`/events/${event.slug}`}
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
            ))
          ) : (
            <div className="text-lg">
              No upcoming events at the moment. Stay tuned!
            </div>
          )}
        </ul>
      </section>
      <section className="flex flex-col gap-10">
        <div className={oldStandardTT.className}>
          <h1 className={"text-7xl"}>Past Events</h1>
        </div>
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <Link
              href={`/events/${event.slug}`}
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
