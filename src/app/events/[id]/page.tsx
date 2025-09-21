/** @format */

import React from "react";
import { getEventDetails } from "@/actions/events";
import { notFound } from "next/navigation";
import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

interface EventPageProps {
  params: Promise<{ id: string }>;
}

const EventPage = async ({ params }: EventPageProps) => {
  const { id } = await params;

  const event = await getEventDetails(id);

  if (!event) {
    return notFound();
  }

  return (
    <main className="mb-100 flex flex-col gap-28 px-8 pt-28 md:px-16 lg:px-32">
      <div className="flex gap-10">
        <Image src={event.poster} alt={event.name} width={480} height={480} />
        <div className="flex flex-col">
          <h1 className={`text-6xl ${oldStandardTT.className}`}>
            {event.name}
          </h1>
          <div className="mt-4 flex flex-col text-sm">
            <div className="mb-2 flex gap-4">
              <span className="font-semibold">Venue:</span>
              <span>{event.venue}</span>
            </div>
            <div className="mb-2 flex gap-4">
              <span className="font-semibold">Date:</span>
              <span>
                {event.startDate.toLocaleDateString()} -{" "}
                {event.endDate.toLocaleDateString()}
              </span>
            </div>
            <div className="mb-2 flex gap-4">
              <span className="font-semibold">Time:</span>
              <span>
                {event.startDate.toLocaleTimeString()} -{" "}
                {event.endDate.toLocaleTimeString()}
              </span>
            </div>
          </div>
          <div className="mt-4 text-lg">{event.description}</div>
        </div>
      </div>
    </main>
  );
};

export default EventPage;
