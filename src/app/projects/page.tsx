import { Old_Standard_TT } from "next/font/google";
import React from "react";
import { getProjects } from "@/actions/projects";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Code, Rocket, Users } from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <main className="mb-20 flex flex-col gap-16 px-8 pt-28 md:px-16 lg:px-32">
      {/* Header Section */}
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className={`text-5xl font-bold md:text-7xl ${oldStandardTT.className} mb-6`}
        >
          Our Projects
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          At ABES ACM, we&apos;re not just coding, we&apos;re creating. Our
          open-source projects tackle real problems we face every day, turning
          ideas into tools that make life easier for students and the community.
          Built by passionate minds, shared with the world, and open for anyone
          to use, learn from, and improve.
        </p>

        {/* Stats */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Rocket className="text-primary h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">{projects.length}</span>
            <span className="text-muted-foreground text-sm">
              Active Projects
            </span>
          </div>
          <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Code className="text-primary h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">
              {projects.reduce((acc, p) => acc + p.progress.length, 0)}
            </span>
            <span className="text-muted-foreground text-sm">Milestones</span>
          </div>
          <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Users className="text-primary h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">Open Source</span>
            <span className="text-muted-foreground text-sm">
              Community Driven
            </span>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <section className="space-y-8">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <h2
                className={`text-3xl font-semibold ${oldStandardTT.className}`}
              >
                Featured Projects
              </h2>
              <Badge variant="secondary">New</Badge>
            </div>
            <p className="text-muted-foreground">
              Explore our latest innovations and see the development journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-br py-16 text-center">
        <h2 className={`text-3xl font-bold ${oldStandardTT.className} mb-4`}>
          Want to Contribute?
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          All our projects are open source and welcome contributions from the
          community. Whether you&apos;re a beginner or an expert, there&apos;s a
          place for you in our projects.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="https://github.com/acm-abes"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-6 py-3 transition-colors"
          >
            View on GitHub
          </a>
          <a
            href="/team"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-lg border px-6 py-3 transition-colors"
          >
            Join Our Team
          </a>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
