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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Link href={`/events/${event.slug}`} key={event.id}>
                <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={event.poster}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">Upcoming</Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="group-hover:text-primary line-clamp-2 text-xl font-bold transition-colors">
                        {event.name}
                      </h3>

                      <div className="mt-3 space-y-2">
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDateRange(event.startDate, event.endDate)}
                          </span>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{event.venue}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mt-3 line-clamp-3 text-sm">
                        {event.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <Link href={`/events/${event.slug}`} key={event.id}>
              <Card className="group h-full overflow-hidden p-0 opacity-75 transition-all duration-300 hover:-translate-y-1 hover:opacity-100 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={event.poster}
                      alt={event.name}
                      fill
                      className="object-cover grayscale transition-transform duration-300 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline">Past Event</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="group-hover:text-primary line-clamp-2 text-xl transition-colors">
                      {event.name}
                    </h3>

                    <div className="mt-3 space-y-2">
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDateRange(event.startDate, event.endDate)}
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mt-3 line-clamp-3 text-sm">
                      {event.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
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
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/team"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-6 py-3 transition-colors"
          >
            Participate
          </a>
          <a
            href="mailto:sponsor@acm-abes.org"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-lg border px-6 py-3 transition-colors"
          >
            Sponsor Events
          </a>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
