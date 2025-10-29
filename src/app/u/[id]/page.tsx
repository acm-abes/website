import React from "react";
import { notFound } from "next/navigation";
import {
  getUserByEmail,
  getUserProfile,
  getUserByEmailPrefix,
} from "@/actions/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Old_Standard_TT } from "next/font/google";
import { Calendar, Mail, BookOpen, FileText, Award, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const UserProfilePage = async ({ params }: PageProps) => {
  const session = await auth();
  const { id } = await params;

  // Try to fetch user by email pattern (username@domain format)
  // If id doesn't contain @, try to find user by matching email prefix
  let user;
  if (id.includes("@")) {
    user = await getUserByEmail(id);
  } else {
    // Search for user where email starts with the id
    user = await getUserByEmailPrefix(id);
    if (!user) {
      // Try finding by ID
      user = await getUserProfile(id);
    }
  }

  if (!user) {
    notFound();
  }

  const isOwnProfile = session?.user?.id === user.id;

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "MEMBER":
        return "default";
      case "ALUMINI":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <main className="mb-20 flex flex-col gap-12 px-8 pt-28 md:px-16 lg:px-32">
      {/* Profile Header */}
      <section className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:gap-8 md:text-left">
          {/* Avatar */}
          <Avatar className="h-32 w-32 border-4 shadow-lg md:h-40 md:w-40">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="text-4xl">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1">
            <div className="mb-3 flex flex-col items-center gap-3 md:flex-row md:items-center">
              <h1
                className={`text-4xl font-bold md:text-5xl ${oldStandardTT.className}`}
              >
                {user.name || "Anonymous User"}
              </h1>
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {user.role}
              </Badge>
              {isOwnProfile && (
                <Badge variant="outline" className="bg-primary/10">
                  Your Profile
                </Badge>
              )}
            </div>

            <div className="text-muted-foreground mb-4 flex flex-col items-center gap-2 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined{" "}
                  {user.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <FileText className="text-primary h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{user._count.blogs}</div>
                  <div className="text-muted-foreground text-xs">Blogs</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Award className="text-primary h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {user._count.researchPapers}
                  </div>
                  <div className="text-muted-foreground text-xs">Papers</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <BookOpen className="text-primary h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {user.blogs.reduce((acc, blog) => acc + blog.views, 0)}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Total Views
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      {user.blogs.length > 0 && (
        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <h2 className={`text-3xl font-semibold ${oldStandardTT.className}`}>
              Published Blogs
            </h2>
            <Badge variant="secondary">{user.blogs.length}</Badge>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {user.blogs.map((blog) => (
              <Link
                href={`/blogs/${blog.slug}`}
                key={blog.id}
                className="group block"
              >
                <div className="mb-8 flex flex-col gap-4">
                  <div className="relative">
                    <Image
                      src={blog.poster}
                      alt={blog.title}
                      width={500}
                      height={300}
                      className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute right-4 bottom-4 left-4">
                      <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-sm text-white">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {blog.createdAt.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime} min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="hover:text-primary text-xl font-medium transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                      {blog.tldr}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {blog.categories.slice(0, 3).map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                      {blog.categories.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{blog.categories.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4" />
                      <span>{blog.views} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Research Papers Section */}
      {user.researchPapers.length > 0 && (
        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <h2 className={`text-3xl font-semibold ${oldStandardTT.className}`}>
              Research Contributions
            </h2>
            <Badge variant="secondary">{user.researchPapers.length}</Badge>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {user.researchPapers.map((paper) => (
              <Link
                href={`/research/${paper.id}`}
                key={paper.id}
                className="group block"
              >
                <div className="mb-8 flex flex-col gap-4">
                  <div className="relative">
                    <Image
                      src={paper.image}
                      alt={paper.title}
                      width={500}
                      height={300}
                      className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                    />
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
                            <span className="truncate">{paper.conference}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="hover:text-primary text-xl font-medium transition-colors">
                      {paper.title}
                    </h3>

                    {paper.description && (
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {paper.description}
                      </p>
                    )}

                    {paper.track && (
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {paper.track}
                        </Badge>
                      </div>
                    )}

                    <div className="text-muted-foreground text-sm">
                      Co-authored with {paper.authors.length - 1} other
                      {paper.authors.length - 1 === 1
                        ? " researcher"
                        : " researchers"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user.blogs.length === 0 && user.researchPapers.length === 0 && (
        <section className="mx-auto w-full max-w-2xl text-center">
          <div className="bg-muted/50 rounded-lg p-12">
            <BookOpen className="text-muted-foreground mx-auto mb-4 h-16 w-16 opacity-50" />
            <h3 className="text-muted-foreground mb-2 text-xl font-semibold">
              No Content Yet
            </h3>
            <p className="text-muted-foreground">
              {isOwnProfile
                ? "You haven't published any blogs or research papers yet. Start creating to showcase your work!"
                : `${user.name?.split(" ")[0]} hasn't published any content yet.`}
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default UserProfilePage;
