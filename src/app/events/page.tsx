import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getEvents } from "@/actions/events";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const EventsPage = async () => {
  const dbEvents = await getEvents();
  
  // Static events with dedicated pages (just done for SAH 2k26 for now)
  const staticEvents = [
    {
      id: "sah-2k26",
      name: "SAH 2k26",
      poster: "/events/sah-2k26.jpg",
      banner: "/events/sah-2k26.jpg",
      description: "SAH is a hackathon based on theme 'ALGORYTHM'. It aims to make a rhythm between development with algorithms. ALGORYTHM aims to bridge the gap between academic brilliance and industry needs by challenging students to solve real-world problem statements using cutting-edge algorithms.",
      venue: "Aryabhatta Block, ABES ENGINEERING COLLEGE",
      startDate: new Date("2026-01-27T00:00:00.000Z"),
      endDate: new Date("2026-01-27T00:00:00.000Z"),
      slug: "sah-2k26",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Merge database and static events, merging sah (static one) with other dynamic pages
  const events = [...dbEvents, ...staticEvents];

  const ongoingEvent = events.find(
    (event) => event.startDate < new Date() && event.endDate > new Date(),
  );
  const upcomingEvents = events
    .filter((event) => event.startDate > new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const pastEvents = events
    .filter((event) => event.endDate < new Date())
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime());

  const formatDateRange = (start: Date, end: Date) => {
    const startStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${startStr} - ${endStr}`;
  };

  return (
    <main className="mb-20 flex flex-col gap-16 px-8 pt-28 md:px-16 lg:px-32">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className={`text-5xl font-bold md:text-7xl ${oldStandardTT.className} mb-6`}
        >
          Events
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover our latest events, workshops, and competitions where
          innovation meets collaboration
        </p>
      </div>

      {/* Ongoing Event Section */}
      {ongoingEvent && (
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
              Live Now
            </h2>
            <Badge variant="destructive" className="animate-pulse">
              • LIVE
            </Badge>
          </div>

          <Card className="border-destructive/20 from-destructive/5 to-background overflow-hidden border-2 bg-gradient-to-br">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative aspect-video md:aspect-square md:w-1/3">
                  <Image
                    src={ongoingEvent.poster}
                    alt={ongoingEvent.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive">Live Event</Badge>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <Link
                    href={`/events/${ongoingEvent.slug}`}
                    className="group block"
                  >
                    <h3 className="group-hover:text-primary text-3xl font-bold transition-colors">
                      {ongoingEvent.name}
                    </h3>
                  </Link>

                  <div className="mt-4 space-y-3">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDateRange(
                          ongoingEvent.startDate,
                          ongoingEvent.endDate,
                        )}
                      </span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{ongoingEvent.venue}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-4 line-clamp-3">
                    {ongoingEvent.description}
                  </p>

                  <Link
                    href={`/events/${ongoingEvent.slug}`}
                    className="text-primary mt-6 inline-flex items-center hover:underline"
                  >
                    View Event Details →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
      {/* Upcoming Events Section */}
      <section className="flex flex-col gap-8">
        <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
          Upcoming Events
        </h2>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <Link
                href={`/events/${event.slug}`}
                key={event.id}
                className="group block"
              >
                <div className="mb-8 flex flex-col gap-4">
                  <div className="relative">
                    <Image
                      src={event.poster}
                      alt={event.name}
                      width={500}
                      height={300}
                      className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Overlay with date info */}
                    <div className="absolute right-4 bottom-4 left-4">
                      <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-sm text-white">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDateRange(event.startDate, event.endDate)}
                        </span>
                        <span>•</span>
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="hover:text-primary text-2xl font-medium transition-colors">
                      {event.name}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>

                    {/* Badge */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        Upcoming Event
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p className="text-lg">No upcoming events at the moment.</p>
              <p className="text-sm">Stay tuned for exciting events!</p>
            </div>
          </Card>
        )}
      </section>

      {/* Past Events Section */}
      <section className="flex flex-col gap-8">
        <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
          Past Events
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {pastEvents.map((event) => (
            <Link
              href={`/events/${event.slug}`}
              key={event.id}
              className="group block"
            >
              <div className="mb-8 flex flex-col gap-4 opacity-75 transition-opacity duration-300 hover:opacity-100">
                <div className="relative">
                  <Image
                    src={event.poster}
                    alt={event.name}
                    width={500}
                    height={300}
                    className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Overlay with date info */}
                  <div className="absolute right-4 bottom-4 left-4">
                    <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-sm text-white">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDateRange(event.startDate, event.endDate)}
                      </span>
                      <span>•</span>
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="hover:text-primary text-2xl font-medium transition-colors">
                    {event.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>

                  {/* Badge */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Past Event
                    </Badge>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-br py-16 text-center">
        <h2 className={`text-3xl font-bold ${oldStandardTT.className} mb-4`}>
          Want to Make Future Events Even Better?
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          Join our vibrant community as a participant or help us create amazing
          experiences as a sponsor. Every event is an opportunity to learn,
          grow, and connect.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/team"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-60 items-center justify-center rounded-lg py-3 transition-colors"
          >
            Participate
          </Link>
          <Link
            href="mailto:sponsor@acm-abes.org"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex w-60 items-center justify-center rounded-lg border py-3 transition-colors"
          >
            Sponsor Events
          </Link>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
