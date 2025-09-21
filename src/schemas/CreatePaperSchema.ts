import { z } from "zod";

export const CreatePaperSchema = z.array(
  z.object({
    title: z.string().min(1).max(200),
    image: z.string().url(),
    pictures: z.array(z.string().url()),
    doi: z.string().min(1),
    publishedAt: z.string().datetime(),
    conference: z.string().optional(),
    track: z.string().optional(),
    description: z.string().optional(),
    authorIds: z
      .array(z.string().min(1))
      .min(1, "At least one author is required"),
  }),
);

export type CreatePapersInput = z.infer<typeof CreatePaperSchema>;
