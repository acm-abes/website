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
import { Button } from "@/components/ui/button";
import { Old_Standard_TT } from "next/font/google";
import {
  Calendar,
  Mail,
  BookOpen,
  FileText,
  Award,
  Clock,
  Edit,
} from "lucide-react";
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
      <section className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Avatar & Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-4 h-40 w-40 shadow-lg">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-4xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <h1
                    className={`mb-2 text-3xl font-bold ${oldStandardTT.className}`}
                  >
                    {user.name || "Anonymous User"}
                  </h1>

                  <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {user.designation && (
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.designation}
                      </Badge>
                    )}
                  </div>

                  {isOwnProfile && (
                    <Link href={`/u/${user.id}/edit`} className="w-full">
                      <Button className="w-full" variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </Link>
                  )}

                  {/* Stats */}
                  <div className="mt-6 w-full space-y-4">
                    <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="text-primary h-5 w-5" />
                        <span className="text-sm font-medium">Blogs</span>
                      </div>
                      <span className="text-xl font-bold">
                        {user._count.blogs}
                      </span>
                    </div>
                    <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Award className="text-primary h-5 w-5" />
                        <span className="text-sm font-medium">Papers</span>
                      </div>
                      <span className="text-xl font-bold">
                        {user._count.researchPapers}
                      </span>
                    </div>
                    <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="text-primary h-5 w-5" />
                        <span className="text-sm font-medium">Views</span>
                      </div>
                      <span className="text-xl font-bold">
                        {user.blogs.reduce((acc, blog) => acc + blog.views, 0)}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-6 w-full space-y-3 border-t pt-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground truncate">
                        {user.email}
                      </span>
                    </div>
                    {user.department && (
                      <div className="text-sm">
                        <span className="font-medium">Department:</span>{" "}
                        <span className="text-muted-foreground">
                          {user.department}
                        </span>
                      </div>
                    )}
                    {user.batch && (
                      <div className="text-sm">
                        <span className="font-medium">Batch:</span>{" "}
                        <span className="text-muted-foreground">
                          {user.batch}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">
                        Joined{" "}
                        {user.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  {user.bio && (
                    <div className="mt-6 w-full border-t pt-6 text-left">
                      <h3 className="mb-2 text-sm font-semibold">About</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {user.bio}
                      </p>
                    </div>
                  )}

                  {/* Social Links */}
                  {(user.linkedin || user.github) && (
                    <div className="mt-6 flex w-full gap-2 border-t pt-6">
                      {user.linkedin && (
                        <a
                          href={user.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            LinkedIn
                          </Button>
                        </a>
                      )}
                      {user.github && (
                        <a
                          href={user.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            GitHub
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Blogs Section */}
            {user.blogs.length > 0 && (
              <section>
                <div className="mb-6 flex items-center gap-3">
                  <h2
                    className={`text-3xl font-semibold ${oldStandardTT.className}`}
                  >
                    Published Blogs
                  </h2>
                  <Badge variant="secondary">{user.blogs.length}</Badge>
                </div>

                <div className="space-y-4">
                  {user.blogs.map((blog) => (
                    <Link
                      href={`/blogs/${blog.slug}`}
                      key={blog.id}
                      className="group block"
                    >
                      <div className="hover:bg-muted/50 flex gap-4 rounded-lg p-3 transition-colors md:flex-row">
                        <div className="relative md:w-1/3">
                          <Image
                            src={blog.poster}
                            alt={blog.title}
                            width={400}
                            height={225}
                            className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                          <h3 className="group-hover:text-primary text-xl font-medium transition-colors">
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

                          <div className="text-muted-foreground mt-auto flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {blog.createdAt.toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{blog.readTime} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              <span>{blog.views} views</span>
                            </div>
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
              <section>
                <div className="mb-6 flex items-center gap-3">
                  <h2
                    className={`text-3xl font-semibold ${oldStandardTT.className}`}
                  >
                    Research Contributions
                  </h2>
                  <Badge variant="secondary">
                    {user.researchPapers.length}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {user.researchPapers.map((paper) => (
                    <Link
                      href={`/research/${paper.id}`}
                      key={paper.id}
                      className="group block"
                    >
                      <div className="hover:bg-muted/50 flex gap-2 rounded-lg p-3 transition-colors md:flex-row">
                        <div className="relative md:w-1/3">
                          <Image
                            src={paper.image}
                            alt={paper.title}
                            width={400}
                            height={225}
                            className="aspect-video w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                          <h3 className="group-hover:text-primary text-xl font-medium transition-colors">
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

                          <div className="text-muted-foreground mt-auto flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {paper.publishedAt.toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                })}
                              </span>
                            </div>
                            {paper.conference && (
                              <div className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                <span className="truncate">
                                  {paper.conference}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <span>
                                {paper.authors.length} author
                                {paper.authors.length !== 1 ? "s" : ""}
                              </span>
                            </div>
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
              <section className="text-center">
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserProfilePage;
