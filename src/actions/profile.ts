"use server";

import { prisma } from "@/lib/prisma";

export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        blogs: {
          orderBy: { createdAt: "desc" },
        },
        researchPapers: {
          orderBy: { publishedAt: "desc" },
          include: {
            authors: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            blogs: true,
            researchPapers: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        blogs: {
          orderBy: { createdAt: "desc" },
        },
        researchPapers: {
          orderBy: { publishedAt: "desc" },
          include: {
            authors: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            blogs: true,
            researchPapers: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

export async function getUserByEmailPrefix(prefix: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          startsWith: prefix,
        },
      },
      include: {
        blogs: {
          orderBy: { createdAt: "desc" },
        },
        researchPapers: {
          orderBy: { publishedAt: "desc" },
          include: {
            authors: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            blogs: true,
            researchPapers: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by email prefix:", error);
    return null;
  }
}
