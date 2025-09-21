import { prisma } from "@/lib/prisma";

// Helper function to get all user IDs for testing purposes
export const getAllUserIds = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return users;
};

// Helper function to get sample user IDs (first 4 users)
export const getSampleUserIds = async () => {
  const users = await getAllUserIds();
  return users.slice(0, 4).map((user) => user.id);
};
