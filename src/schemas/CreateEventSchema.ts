import { z } from "zod";

export const CreateEventSchema = z.array(
  z.object({
    description: z.string().max(500),
    banner: z.string().default(""),
    endDate: z.string().default(new Date().toISOString()),
    startDate: z.string().default(new Date().toISOString()),
    name: z.string().min(2).max(100),
    poster: z.string(),
    venue: z.string().max(100),
    updatedAt: z.string().default(new Date().toISOString()),
  }),
);
