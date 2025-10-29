import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, FileText, Award } from "lucide-react";

interface HODCardProps {
  name: string;
  email: string;
  image?: string | null;
  department: string;
  bio?: string;
  blogCount?: number;
  paperCount?: number;
  isPlaceholder?: boolean;
}

export function HODCard({
  name,
  email,
  image,
  department,
  bio,
  blogCount = 0,
  paperCount = 0,
  isPlaceholder = false,
}: HODCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="border-primary/20 from-primary/5 via-background to-secondary/5 relative rounded-3xl border bg-gradient-to-br p-1 shadow-2xl backdrop-blur-sm">
      <div className="bg-background/95 rounded-3xl p-8 md:p-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Avatar with decorative ring */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl"></div>
            <div className="relative rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1">
              <Avatar className="border-background h-40 w-40 border-4 shadow-2xl md:h-48 md:w-48">
                <AvatarImage src={image || ""} alt={name} />
                <AvatarFallback className="text-4xl">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <h3 className="mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                {name}
              </h3>
              <div className="text-muted-foreground mb-3 space-y-2">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  {/* <Mail className="h-5 w-5 text-blue-500" /> */}
                  <span className="text-lg">{email}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-base md:text-lg">
                {department}
              </p>
            </div>

            {!isPlaceholder && (
              <div className="mt-6 flex flex-wrap justify-center gap-6 md:justify-start">
                <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div className="text-left">
                    <div className="text-2xl font-bold">{blogCount}</div>
                    <div className="text-muted-foreground text-xs">Blogs</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-4 py-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  <div className="text-left">
                    <div className="text-2xl font-bold">{paperCount}</div>
                    <div className="text-muted-foreground text-xs">Papers</div>
                  </div>
                </div>
              </div>
            )}

            {bio && (
              <p className="text-muted-foreground mt-6 text-base italic">
                "{bio}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
