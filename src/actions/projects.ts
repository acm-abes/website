import { prisma } from "@/lib/prisma";

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        progress: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const getProjectById = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        progress: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    return project;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
};

export const createProject = async (data: {
  title: string;
  description: string;
  link: string;
  repo: string;
  techStack: string[];
  images: string[];
}) => {
  try {
    const project = await prisma.project.create({
      data,
      include: {
        progress: true,
      },
    });
    return project;
  } catch (error) {
    console.error("Failed to create project:", error);
    throw error;
  }
};

export const createProjects = async (
  projects: Array<{
    title: string;
    description: string;
    link: string;
    repo: string;
    techStack: string[];
    images: string[];
    progress?: Array<{
      title: string;
      description: string;
      blogLink: string;
      images: string[];
    }>;
  }>,
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const createdProjects = [];

      for (const projectData of projects) {
        const { progress, ...projectInfo } = projectData;

        const project = await tx.project.create({
          data: projectInfo,
        });

        if (progress && progress.length > 0) {
          await tx.projectProgress.createMany({
            data: progress.map((p) => ({
              ...p,
              projectId: project.id,
            })),
          });
        }

        createdProjects.push(project);
      }

      return createdProjects;
    });

    return result;
  } catch (error) {
    console.error("Failed to create projects:", error);
    throw error;
  }
};

export const addProjectProgress = async (
  projectId: string,
  data: {
    title: string;
    description: string;
    blogLink: string;
    images: string[];
  },
) => {
  try {
    const progress = await prisma.projectProgress.create({
      data: {
        ...data,
        projectId,
      },
    });
    return progress;
  } catch (error) {
    console.error("Failed to add project progress:", error);
    throw error;
  }
};
