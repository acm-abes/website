import { z } from "zod";

export const gameTokenSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  gameId: z.string(),
  currentRoom: z.number(),
  score: z.number(),
  updatedAt: z.string(),
});
