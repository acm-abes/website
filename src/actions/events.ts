"use server";

import { Prisma } from "../../generated/prisma";

import { prisma } from "@/lib/prisma";

export const getEvents = async () => {
  return prisma.event.findMany();
};

export const getEventById = async (id: string) => {
  return prisma.event.findUnique({
    where: { id },
  });
};

export const getEventBySlug = async (slug: string) => {
  return prisma.event.findUnique({
    where: { slug },
  });
};

export const addEvent = async (eventData: Prisma.EventCreateInput) => {
  return prisma.event.create({
    data: eventData,
  });
};

export const addBulkEvents = async (
  eventsData: Omit<Prisma.EventCreateInput, "slug">[],
) => {
  const eventsDataWithSlugs = eventsData.map((event) => ({
    ...event,
    slug: event.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .concat("-event-")
      .concat(Math.random().toString(36).substring(2, 7)),
  }));

  return prisma.event.createMany({
    data: eventsDataWithSlugs,
  });
};
