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

export async function updateUserProfile(
  userId: string,
  data: {
    name?: string;
    image?: string;
    designation?: string | null;
    department?: string | null;
    batch?: string | null;
    bio?: string | null;
    linkedin?: string | null;
    github?: string | null;
  },
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.designation !== undefined && {
          designation: data.designation,
        }),
        ...(data.department !== undefined && { department: data.department }),
        ...(data.batch !== undefined && { batch: data.batch }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.linkedin !== undefined && { linkedin: data.linkedin }),
        ...(data.github !== undefined && { github: data.github }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        designation: true,
        department: true,
        batch: true,
        bio: true,
        linkedin: true,
        github: true,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
