import React from "react";
import { getProjectById } from "@/actions/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProjectTimeline from "@/components/ProjectTimeline";
import {
  ChevronLeft,
  Github,
  Calendar,
  Code,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="mb-20 flex flex-col justify-center gap-8 px-8 pt-28 md:px-16 lg:px-60">
      {/* Hero Section */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={project.images[0] || "/public/img.jpg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute right-6 bottom-6 left-6 text-white">
          <div className="mb-2 flex items-center gap-2">
            {/* <Badge
              variant="secondary"
              className="border-white/30 bg-white/20 text-white"
            >
              Open Source Project
            </Badge> */}
          </div>
          <h1
            className={`text-4xl font-semibold md:text-6xl ${oldStandardTT.className}`}
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* Project Info */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              <Button className="group">
                Live Demo
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={project.repo} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="group">
                <Github className="ml-2 h-4 w-4" />
                View Source
              </Button>
            </Link>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span className="font-medium">Created</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {project.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="mb-2 flex items-center gap-2">
              <Code className="text-primary h-4 w-4" />
              <span className="font-medium">Progress Steps</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {project.progress.length} milestones completed
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users className="text-primary h-4 w-4" />
              <span className="font-medium">Status</span>
            </div>
            <p className="text-muted-foreground text-sm">Active Development</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-xl font-semibold">Technology Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      {project.progress.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h2
              className={`text-3xl font-semibold ${oldStandardTT.className} mb-4`}
            >
              Development Timeline
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Follow the journey of this project from conception to completion.
              Each milestone represents a significant step forward in
              development.
            </p>
          </div>

          <ProjectTimeline items={project.progress} />
        </div>
      )}

      {/* Project Gallery */}
      {project.images.length > 1 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold">Project Gallery</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="group relative aspect-video overflow-hidden rounded-lg"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="flex justify-start pt-8">
        <Link href="/projects">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default ProjectPage;
