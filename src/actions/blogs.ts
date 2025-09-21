import { prisma } from "@/lib/prisma";
import { Prisma } from "../../generated/prisma";

export const getBlogs = async () => {
  return prisma.blogs.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getBlogBySlug = async (slug: string) => {
  return prisma.blogs.findUnique({
    where: { slug },
    include: {
      author: true,
    },
  });
};

export const getBlogById = async (id: string) => {
  return prisma.blogs.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });
};

export const createBlog = async (
  data: Omit<Prisma.BlogsCreateInput, "author"> & {
    authorId: string;
  },
) => {
  // Validate that the author exists
  const existingUser = await prisma.user.findUnique({
    where: { id: data.authorId },
    select: { id: true },
  });

  if (!existingUser) {
    throw new Error(`Author with ID ${data.authorId} not found`);
  }

  return prisma.blogs.create({
    data: {
      slug: data.slug,
      title: data.title,
      tldr: data.tldr,
      content: data.content,
      readTime: data.readTime,
      tags: data.tags,
      categories: data.categories,
      poster: data.poster,
      banner: data.banner,
      relatedTo: data.relatedTo,
      type: data.type,
      author: {
        connect: { id: data.authorId },
      },
    },
    include: {
      author: true,
    },
  });
};

export const createBlogs = async (
  blogs: (Omit<Prisma.BlogsCreateInput, "author"> & {
    authorId: string;
  })[],
) => {
  // Use transactions to create multiple blogs with their author relationships
  return prisma.$transaction(
    blogs.map((blog) =>
      prisma.blogs.create({
        data: {
          slug: blog.slug,
          title: blog.title,
          tldr: blog.tldr,
          content: blog.content,
          readTime: blog.readTime,
          tags: blog.tags,
          categories: blog.categories,
          poster: blog.poster,
          banner: blog.banner,
          relatedTo: blog.relatedTo,
          type: blog.type,
          author: {
            connect: { id: blog.authorId },
          },
        },
        include: {
          author: true,
        },
      }),
    ),
  );
};

export const incrementBlogViews = async (id: string) => {
  return prisma.blogs.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });
};
