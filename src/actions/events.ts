"use server";

import { Prisma } from "./../../generated/prisma/index.d";

import { prisma } from "@/lib/prisma";

export const getEvents = async () => {
  return prisma.event.findMany();
};

export const getEventDetails = async (id: string) => {
  return prisma.event.findUnique({
    where: { id },
  });
};

export const addEvent = async (eventData: Prisma.EventCreateInput) => {
  return prisma.event.create({
    data: eventData,
  });
};

export const addBulkEvents = async (eventsData: Prisma.EventCreateInput[]) => {
  return prisma.event.createMany({
    data: eventsData,
  });
};
