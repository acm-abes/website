import { z } from "zod";

export const CreateProjectProgressSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  blogLink: z.string(),
  images: z.array(z.string()),
});

export const CreateProjectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  link: z.string(),
  repo: z.string(),
  techStack: z.array(z.string()),
  images: z.array(z.string()),
  progress: z.array(CreateProjectProgressSchema).optional(),
});

export const CreateProjectsSchema = z.array(CreateProjectSchema);

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type CreateProjectsInput = z.infer<typeof CreateProjectsSchema>;
export type CreateProjectProgressInput = z.infer<
  typeof CreateProjectProgressSchema
>;
