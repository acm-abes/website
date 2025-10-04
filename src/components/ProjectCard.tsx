import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Calendar,
  Code,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
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
    <Card className="h-full overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-0">
        {/* Project Image */}
        <div className="relative aspect-video">
          <Image
            src={project.images[0] || "/public/img.jpg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute right-4 bottom-4 left-4">
            <div className="flex items-center gap-2 text-sm text-white">
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
                  <span>{project.progress.length} milestones</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {/* Title */}
          <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-medium transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
            {truncateDescription(project.description, 150)}
          </p>

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <Code className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{project.techStack.length - 4}
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex gap-2">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="default" size="sm" className="group/btn w-full">
                Live Demo
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </Link>
            <Link href={project.repo} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="group/btn">
                <Github className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/projects/${project.id}`}>
              <Button variant="ghost" size="sm" className="group/btn">
                Timeline <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
