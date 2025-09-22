import { fetchPapers } from "@/actions/papers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Calendar, Users, BookOpen, Award } from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const PapersPage = async () => {
  const papers = await fetchPapers();

  return (
    <main className="mb-20 flex flex-col gap-16 px-8 pt-28 md:px-16 lg:px-32">
      {/* Header Section */}
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className={`text-5xl font-bold md:text-7xl ${oldStandardTT.className} mb-6`}
        >
          Research Papers
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Our team at ABES ACM is dedicated to pushing the boundaries of
          knowledge through rigorous research and innovative thinking. We
          actively contribute to the academic community by publishing research
          papers that address pressing issues and explore new frontiers in
          technology and society.
        </p>

        {/* Stats */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4">
            <div className="bg-primary/10 rounded-full p-3">
              <BookOpen className="text-primary h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">{papers.length}</span>
            <span className="text-muted-foreground text-sm">
              Published Papers
            </span>
          </div>
          <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Users className="text-primary h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">
              {papers.reduce((acc, p) => acc + p.authors.length, 0)}
            </span>
            <span className="text-muted-foreground text-sm">Authors</span>
          </div>
          <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Award className="text-primary h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">Research</span>
            <span className="text-muted-foreground text-sm">Excellence</span>
          </div>
        </div>
      </div>

      {/* Research Papers Section */}
      {papers.length > 0 && (
        <section className="space-y-8">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <h2
                className={`text-3xl font-semibold ${oldStandardTT.className}`}
              >
                Published Research
              </h2>
              <Badge variant="secondary">Latest</Badge>
            </div>
            <p className="text-muted-foreground">
              Explore our cutting-edge research contributions and academic
              publications
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {papers.map((paper) => (
              <div key={paper.id} className="mb-8 flex flex-col gap-4">
                <div className="relative">
                  <Image
                    src={paper.image}
                    alt={paper.title}
                    width={500}
                    height={300}
                    className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Overlay with publication info */}
                  <div className="absolute right-4 bottom-4 left-4">
                    <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-sm text-white">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {paper.publishedAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                      {paper.conference && (
                        <>
                          <span>•</span>
                          <span className="truncate font-medium">
                            {paper.conference}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href={`/research/${paper.id}`}
                    className="hover:text-primary text-2xl font-medium transition-colors"
                  >
                    {paper.title}
                  </Link>

                  {/* Description */}
                  {paper.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {paper.description}
                    </p>
                  )}

                  {/* Conference & Track Badges */}
                  <div className="flex flex-wrap gap-2">
                    {paper.track && (
                      <Badge variant="outline" className="text-xs">
                        {paper.track}
                      </Badge>
                    )}
                  </div>

                  {/* Authors with enhanced display */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Users className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm font-medium">Authors:</span>
                    </div>
                    <div className="flex -space-x-2">
                      {paper.authors.slice(0, 5).map((author) => (
                        <Avatar
                          key={author.id}
                          className="ring-background h-8 w-8 ring-2"
                        >
                          <Tooltip>
                            <TooltipTrigger>
                              <AvatarImage
                                className="cursor-pointer grayscale duration-200 hover:grayscale-0"
                                src={author.image || "/avatar.png"}
                                alt={author.name || "User Avatar"}
                              />
                              <AvatarFallback className="text-xs">
                                {author.name?.[0] || "U"}
                              </AvatarFallback>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{author.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </Avatar>
                      ))}
                      {paper.authors.length > 5 && (
                        <div className="bg-muted ring-background flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ring-2">
                          +{paper.authors.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-br py-16 text-center">
        <h2 className={`text-3xl font-bold ${oldStandardTT.className} mb-4`}>
          Collaborate with Us
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          Interested in research collaboration or have ideas for innovative
          projects? We welcome partnerships with fellow researchers and
          institutions.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/team"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-6 py-3 transition-colors"
          >
            Meet Our Researchers
          </a>
          <a
            href="mailto:research@acm-abes.org"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-lg border px-6 py-3 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
};

export default PapersPage;
