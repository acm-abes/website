"use server";

import { prisma } from "@/lib/prisma";
import hodData from "@/data/hod.json";

export async function getTeamMembers() {
  try {
    // Fetch HOD from database
    const hodFromDb = await prisma.user.findFirst({
      where: { role: "HOD" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        designation: true,
        _count: {
          select: {
            blogs: true,
            researchPapers: true,
          },
        },
      },
    });

    // Fetch Faculty coordinators
    const faculty = await prisma.user.findMany({
      where: { role: "FACULTY" },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        designation: true,
        _count: {
          select: {
            blogs: true,
            researchPapers: true,
          },
        },
      },
    });

    // Fetch Members
    const members = await prisma.user.findMany({
      where: { role: "MEMBER" },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        designation: true,
        _count: {
          select: {
            blogs: true,
            researchPapers: true,
          },
        },
      },
    });

    // Fetch Alumni
    const alumni = await prisma.user.findMany({
      where: { role: "ALUMNI" },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        designation: true,
        _count: {
          select: {
            blogs: true,
            researchPapers: true,
          },
        },
      },
    });

    return {
      hod: hodFromDb
        ? { ...hodFromDb, isPlaceholder: false }
        : {
            id: "temp-hod",
            name: hodData.name,
            email: hodData.email,
            image: hodData.image,
            role: "HOD" as const,
            createdAt: new Date(),
            _count: { blogs: 0, researchPapers: 0 },
            isPlaceholder: true,
          },
      faculty,
      members,
      alumni,
    };
  } catch (error) {
    console.error("Error fetching team members:", error);
    return {
      hod: {
        id: "temp-hod",
        name: hodData.name,
        email: hodData.email,
        image: hodData.image,
        role: "HOD" as const,
        createdAt: new Date(),
        _count: { blogs: 0, researchPapers: 0 },
        isPlaceholder: true,
      },
      faculty: [],
      members: [],
      alumni: [],
    };
  }
}
