import { z } from "zod";

export const CreateBlogSchema = z.array(
  z.object({
    slug: z.string().min(1).max(100),
    title: z.string().min(1).max(200),
    tldr: z.string().min(1).max(500),
    content: z.string().min(1),
    readTime: z.number().min(1),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    poster: z.string(),
    banner: z.string(),
    authorId: z.string().min(1),
    relatedTo: z.string().optional(),
    type: z.enum(["BLOG", "RESEARCH_PAPER", "PROJECT", "EVENT"]).optional(),
  }),
);

export type CreateBlogsInput = z.infer<typeof CreateBlogSchema>;
