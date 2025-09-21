import { getPaperById } from "@/actions/papers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

interface ResearchPaperPageProps {
  params: {
    id: string;
  };
}

const ResearchPaperPage = async ({ params }: ResearchPaperPageProps) => {
  const paper = await getPaperById(params.id);

  if (!paper) {
    notFound();
  }

  return (
    <main className="mb-20 flex flex-col justify-center gap-8 px-8 pt-28 md:px-16 lg:px-[20%]">
      {/* Hero Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={paper.image}
          alt={paper.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Paper Header */}
      <div className="flex flex-col gap-6">
        <h1
          className={`text-4xl font-bold md:text-6xl ${oldStandardTT.className}`}
        >
          {paper.title}
        </h1>

        {/* Authors */}
        <div className="flex flex-col gap-3">
          {/* <h3 className="text-xl font-semibold">Authors</h3> */}
          <div className="flex flex-wrap items-center gap-4">
            {paper.authors.map((author) => (
              <div key={author.id} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <Tooltip>
                    <TooltipTrigger>
                      <AvatarImage
                        src={author.image || "/avatar.png"}
                        alt={author.name || "User Avatar"}
                      />
                      <AvatarFallback>{author.name?.[0] || "U"}</AvatarFallback>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{author.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{author.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {author.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paper Metadata */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm font-medium">
              DOI
            </span>
            <Link
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {paper.doi}
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm font-medium">
              Published
            </span>
            <span>
              {new Date(paper.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {paper.conference && (
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-sm font-medium">
                Conference
              </span>
              <span>{paper.conference}</span>
            </div>
          )}

          {paper.track && (
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-sm font-medium">
                Track
              </span>
              <span>{paper.track}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {paper.description && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Abstract</h2>
          <p className="leading-relaxed">{paper.description}</p>
        </div>
      )}

      {/* Pictures Gallery */}
      {paper.pictures && paper.pictures.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Research Images</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paper.pictures.map((picture, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-lg"
              >
                <Image
                  src={picture}
                  alt={`Research image ${index + 1}`}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to Research */}
      <div className="flex justify-center pt-8">
        <Link
          href="/research"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 transition-colors"
        >
          ← Back to All Research Papers
        </Link>
      </div>
    </main>
  );
};

export default ResearchPaperPage;
