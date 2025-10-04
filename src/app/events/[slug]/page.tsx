/** @format */

import React from "react";
import { getEventBySlug } from "@/actions/events";
import { notFound } from "next/navigation";
import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, MapPin, Clock } from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const EventPage = async ({ params }: EventPageProps) => {
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  if (!event) {
    return notFound();
  }

  // Check if event is multi-day
  const isMultiDay =
    event.startDate.toDateString() !== event.endDate.toDateString();

  // Format dates and times
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <main className="mb-20 flex flex-col justify-center gap-8 px-8 pt-28 md:px-16 lg:px-[20%]">
      {/* Hero Section with Banner */}
      {/* <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={event.banner}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
      </div> */}

      {/* Event Header */}
      <div className="flex flex-col gap-6">
        <h1
          className={`text-4xl font-bold md:text-6xl ${oldStandardTT.className}`}
        >
          {event.name}
        </h1>

        {/* Event Metadata */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Date & Time */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-muted-foreground h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm font-medium">
                  {isMultiDay ? "Event Duration" : "Date"}
                </span>
                <span>
                  {isMultiDay
                    ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
                    : formatDate(event.startDate)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-muted-foreground h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm font-medium">
                  Time
                </span>
                <span>
                  {formatTime(event.startDate)} - {formatTime(event.endDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3">
            <MapPin className="text-muted-foreground mt-1 h-5 w-5" />
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm font-medium">
                Venue
              </span>
              <span className="leading-relaxed">{event.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Poster Section */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[3/4] max-w-md overflow-hidden rounded-lg">
          <Image
            src={event.poster}
            alt={`${event.name} poster`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium">About This Event</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed">{event.description}</p>
        </div>
      </div>

      {/* Event Status Badge */}
      <div className="flex justify-start">
        {new Date() < event.startDate ? (
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
            <Calendar className="mr-2 h-4 w-4" />
            Upcoming Event
          </div>
        ) : new Date() > event.endDate ? (
          <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800">
            <Calendar className="mr-2 h-4 w-4" />
            Past Event
          </div>
        ) : (
          <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
            <Calendar className="mr-2 h-4 w-4" />
            Live Event
          </div>
        )}
      </div>

      {/* Event Details Card */}
      <div className="bg-accent/10 border-accent/50 rounded-lg border p-6">
        <h3 className="mb-4 text-xl font-semibold">Event Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <span className="text-muted-foreground text-sm font-medium">
              Created
            </span>
            <p className="text-sm">
              {new Date(event.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground text-sm font-medium">
              Last Updated
            </span>
            <p className="text-sm">
              {new Date(event.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Back to Events */}
      <div className="flex justify-start pt-8">
        <Link href="/events">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to All Events
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default EventPage;
