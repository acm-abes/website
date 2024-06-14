import { z } from "zod";

const env = z.object({
  NEXT_PUBLIC_PROJECT_ID: z.string(),
  NEXT_PUBLIC_DATABASE_ID: z.string(),
  NEXT_PUBLIC_EVENTS_COLLECTION: z.string(),
  NEXT_PUBLIC_BUCKET_ID: z.string(),

  TOKEN_SECRET: z.string(),
});

try {
  env.parse(process.env);
} catch (e) {
  console.log("ENV NOT FOUND");
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
