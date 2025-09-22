import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  blogLink: string;
  images: string[];
  createdAt: Date;
}

interface ProjectTimelineProps {
  items: TimelineItem[];
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="from-primary/50 via-primary to-primary/50 absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex items-start gap-8">
            {/* Timeline dot */}
            <div className="bg-background border-primary relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-lg">
              <div className="bg-primary h-6 w-6 animate-pulse rounded-full" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Text content */}
                    <div className="flex-1">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="group-hover:text-primary text-xl font-bold transition-colors">
                            {item.title}
                          </h3>
                          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {item.createdAt.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          Step {index + 1}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <Link
                        href={item.blogLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="group/btn"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Read Blog Post
                          <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Button>
                      </Link>
                    </div>

                    {/* Images */}
                    {item.images && item.images.length > 0 && (
                      <div className="lg:w-1/3">
                        <div className="grid grid-cols-1 gap-2">
                          {item.images.slice(0, 2).map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="relative aspect-video overflow-hidden rounded-lg"
                            >
                              <Image
                                src={image}
                                alt={`${item.title} - Image ${imgIndex + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          ))}
                          {item.images.length > 2 && (
                            <div className="bg-muted relative flex aspect-video items-center justify-center overflow-hidden rounded-lg">
                              <span className="text-muted-foreground text-sm font-medium">
                                +{item.images.length - 2} more
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;
