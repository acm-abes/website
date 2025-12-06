import { prisma } from "@/lib/prisma";
import { Prisma } from "../../generated/prisma/client";

export const fetchPapers = async () => {
  return prisma.researchPaper.findMany({
    include: {
      authors: true,
    },
  });
};

export const getPaperById = async (id: string) => {
  return prisma.researchPaper.findUnique({
    where: { id },
    include: {
      authors: true,
    },
  });
};

export const createPaper = async (
  data: Omit<Prisma.ResearchPaperCreateInput, "authors"> & {
    authorIds: string[];
  },
) => {
  // Validate that all author IDs exist
  const existingUsers = await prisma.user.findMany({
    where: { id: { in: data.authorIds } },
    select: { id: true },
  });

  const foundUserIds = existingUsers.map((user) => user.id);
  const missingUserIds = data.authorIds.filter(
    (id) => !foundUserIds.includes(id),
  );

  if (missingUserIds.length > 0) {
    throw new Error(`User IDs not found: ${missingUserIds.join(", ")}`);
  }

  return prisma.researchPaper.create({
    data: {
      title: data.title,
      image: data.image,
      pictures: data.pictures,
      doi: data.doi,
      publishedAt: new Date(data.publishedAt),
      conference: data.conference,
      track: data.track,
      description: data.description,
      authors: {
        connect: data.authorIds.map((id) => ({ id })),
      },
    },
    include: {
      authors: true,
    },
  });
};

export const createPapers = async (
  papers: (Omit<Prisma.ResearchPaperCreateInput, "authors"> & {
    authorIds: string[];
  })[],
) => {
  // Use transactions to create multiple papers with their author relationships
  return prisma.$transaction(
    papers.map((paper) =>
      prisma.researchPaper.create({
        data: {
          title: paper.title,
          image: paper.image,
          pictures: paper.pictures,
          doi: paper.doi,
          publishedAt: new Date(paper.publishedAt),
          conference: paper.conference,
          track: paper.track,
          description: paper.description,
          authors: {
            connect: paper.authorIds.map((id) => ({ id })),
          },
        },
        include: {
          authors: true,
        },
      }),
    ),
  );
};
