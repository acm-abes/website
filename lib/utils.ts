import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInSeconds, format, parse } from "date-fns";
import database from "@/appwrite/database";
import { EventDocument } from "@/types";
import { events, events as oldEvents } from "@/public/data/events";
import { NextRequest, NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getRandomGradient = (arr: string[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const getAllEvents = async () => {
  const { documents } = await database.events?.list<EventDocument>()!;

  return [...documents, ...oldEvents];
};

export const getEvent = async (id: string): Promise<EventDocument | null> => {
  // const URL = baseURL + "/api/event?id=" + id;

  let event: EventDocument | null | undefined;

  event = events.find((e) => e.id === id)! as EventDocument;

  if (!event) event = await database.events?.search<EventDocument>(id);

  if (!event) return null;

  return event;
};

export const parseDate = (date: string) => {
  let parsedDate = parse(
    date,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    new Date(),
  ).toString();

  if (parsedDate === "Invalid Date") {
    parsedDate = parse(date, "d MMM yyyy", new Date()).toString();
  }

  if (parsedDate === "Invalid Date") {
    parsedDate = parse(date, "d MMM yyyy", new Date()).toString();
  }

  if (parsedDate === "Invalid Date" || parsedDate === "Invalid Time") {
    parsedDate = parse(date, "d MMMM yyyy", new Date()).toString();
  }

  if (parsedDate === "Invalid Date") {
    parsedDate = parse(date, "d-MM-yyyy", new Date()).toString();
  }

  if (parsedDate === "Invalid Date") {
    parsedDate = parse(date, "do MMM yyyy", new Date()).toString();
  }

  if (parsedDate === "Invalid Date") {
    console.log("Invalid Date", date);
    return date;
  }

  return format(parsedDate, "do MMM yyyy");
};

export const formatDifference = (
  start: string | Date | number,
  end: string | Date | number,
) => {
  const difference = differenceInSeconds(end, start);

  const hours = Math.floor(difference / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((difference % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (difference % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
