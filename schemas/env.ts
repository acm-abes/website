import { z } from "zod";

const env = z.object({
  PROJECT_ID: z.string(),
  DATABASE_ID: z.string(),
  EVENTS_COLLECTION: z.string(),
  BUCKET_ID: z.string(),
});

env.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
