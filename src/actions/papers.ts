import { prisma } from "@/lib/prisma";

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
