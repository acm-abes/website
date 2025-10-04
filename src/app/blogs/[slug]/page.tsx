import React from "react";
import { getBlogBySlug, incrementBlogViews } from "@/actions/blogs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Clock, Eye, Tag } from "lucide-react";
import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementBlogViews(blog.id).catch(console.error);

  return (
    <main className="mb-20 flex flex-col justify-center gap-8 px-8 pt-28 md:px-16 lg:px-[20%]">
      {/* Hero Banner */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={blog.banner}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Header */}
      <div className="flex flex-col gap-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {blog.categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="border-accent/20 bg-accent/10"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1
          className={`text-4xl font-bold md:text-6xl ${oldStandardTT.className}`}
        >
          {blog.title}
        </h1>

        {/* TLDR */}
        <div className="bg-accent/10 rounded-lg p-4">
          <h2 className="mb-2 font-semibold">TL;DR</h2>
          <p className="text-muted-foreground">{blog.tldr}</p>
        </div>

        {/* Author and Metadata */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={blog.author.image || "/avatar.png"}
                alt={blog.author.name || "Author"}
              />
              <AvatarFallback>{blog.author.name?.[0] || "A"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{blog.author.name}</span>
              <span className="text-muted-foreground text-sm">
                {blog.author.role || "Author"}
              </span>
            </div>
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {blog.readTime} min read
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {blog.views + 1} views
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="flex flex-col gap-6">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              img: ({ ...props }) => (
                <Image
                  src={(props.src as string) || ""}
                  alt={props.alt || ""}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover"
                />
              ),
              h1: ({ ...props }) => (
                <h1 className="mb-4 text-3xl font-semibold" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="mb-3 text-2xl font-semibold" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="mb-2 text-xl font-medium" {...props} />
              ),
              p: ({ ...props }) => (
                <p className="mb-4 leading-relaxed" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-primary my-4 border-l-4 pl-4 italic"
                  {...props}
                />
              ),
              code: ({ ...props }) => (
                <code
                  className="bg-muted rounded px-1 py-0.5 text-sm"
                  {...props}
                />
              ),
              pre: ({ ...props }) => (
                <pre
                  className="bg-muted overflow-x-auto rounded-lg p-4"
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <ul
                  className="mb-4 list-inside list-disc space-y-1"
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <ol
                  className="mb-4 list-inside list-decimal space-y-1"
                  {...props}
                />
              ),
              a: ({ ...props }) => (
                <a
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span className="font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-normal"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Article Info Card */}
      <div className="bg-accent/10 border-accent/50 rounded-lg border p-6">
        <h3 className="mb-4 text-xl font-semibold">Article Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <span className="text-muted-foreground text-sm font-medium">
              Published
            </span>
            <p className="text-sm">
              {Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(blog.createdAt))}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground text-sm font-medium">
              Last Updated
            </span>
            <p className="text-sm">
              {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Related Content */}
      {blog.relatedTo && (
        <div className="bg-card rounded-lg border p-6">
          <h3 className="mb-4 text-xl font-semibold">Related Content</h3>
          <p className="text-muted-foreground">{blog.relatedTo}</p>
        </div>
      )}

      {/* Back to Blogs */}
      <div className="flex justify-start pt-8">
        <Link href="/blogs">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to All Blogs
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default BlogPage;
