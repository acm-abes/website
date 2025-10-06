import { z } from "zod";

// Schema for single blog creation
export const CreateSingleBlogSchema = z.object({
  slug: z.string().min(1, "Slug is required").max(100, "Slug is too long").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase letters, numbers, and hyphens only",
  }),
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  tldr: z.string().min(1, "TL;DR is required").max(500, "TL;DR is too long"),
  content: z.string().min(1, "Content is required"),
  readTime: z.number().min(1, "Read time must be at least 1 minute"),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  poster: z.string().url("Poster must be a valid URL"),
  banner: z.string().url("Banner must be a valid URL"),
  authorId: z.string().min(1, "Author is required"),
  relatedTo: z.string().optional(),
  type: z.enum(["BLOG", "RESEARCH_PAPER", "PROJECT", "EVENT"]).optional(),
});

// Schema for bulk blog creation (API route)
export const CreateBlogSchema = z.array(CreateSingleBlogSchema);

export type CreateBlogInput = z.infer<typeof CreateSingleBlogSchema>;
export type CreateBlogsInput = z.infer<typeof CreateBlogSchema>;
