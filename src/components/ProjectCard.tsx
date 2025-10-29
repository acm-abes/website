import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    link: string;
    repo: string;
    techStack: string[];
    images: string[];
    createdAt: Date;
    progress: Array<{
      id: string;
      title: string;
      description: string;
      blogLink: string;
      images: string[];
      createdAt: Date;
    }>;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="group mb-8 flex flex-col gap-4">
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative">
          <Image
            src={project.images[0] || "/img.jpg"}
            alt={project.title}
            width={500}
            height={300}
            className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Overlay with date info */}
          <div className="absolute right-4 bottom-4 left-4">
            <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-sm text-white">
              <Calendar className="h-4 w-4" />
              <span>
                {project.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
              {project.progress.length > 0 && (
                <>
                  <span>•</span>
                  <span className="truncate font-medium">
                    {project.progress.length} milestones
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        <Link href={`/projects/${project.id}`}>
          <h3 className="hover:text-primary text-2xl font-medium transition-colors">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {truncateDescription(project.description, 160)}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.techStack.length - 4} more
            </Badge>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-1 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </Link>
          <Link
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-1 hover:underline"
          >
            <Github className="h-4 w-4" />
            Source Code
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
