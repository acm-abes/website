import React from "react";
import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "@/actions/blogs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Calendar } from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const BlogsPage = async () => {
  const blogs = await getBlogs();
  const featuredBlog = blogs[0]; // First blog as featured
  const otherBlogs = blogs.slice(1);

  if (!blogs || blogs.length === 0) {
    return (
      <main className="mb-20 flex flex-col gap-8 px-8 pt-28 md:px-16 lg:px-32">
        <div className="flex flex-col gap-4">
          <h1 className={`text-7xl font-bold ${oldStandardTT.className}`}>
            Blogs
          </h1>
          <p className="text-lg">
            Welcome to our blog! We share insights, tutorials, and thoughts on
            technology, research, and innovation.
          </p>
        </div>
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-lg">
            No blogs available yet. Check back soon!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mb-20 flex flex-col gap-12 px-8 pt-28 md:px-16 lg:px-32">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className={`text-7xl font-bold ${oldStandardTT.className}`}>
          Blogs
        </h1>
        <p className="text-muted-foreground text-lg">
          Insights, tutorials, and thoughts from our team on technology,
          research, and innovation.
        </p>
      </div>

      {/* Featured Blog */}
      {featuredBlog && (
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Featured Article</h2>
          <Link href={`/blogs/${featuredBlog.slug}`} className="group">
            <div className="flex flex-col gap-8 rounded-lg transition-shadow hover:shadow-lg lg:flex-row">
              <div className="relative aspect-video overflow-hidden rounded-lg lg:aspect-[4/3] lg:w-1/2">
                <Image
                  src={featuredBlog.banner}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-4 lg:w-1/2">
                <div className="flex flex-wrap gap-2">
                  {featuredBlog.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="border-accent/50 bg-accent/10"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <h3 className="group-hover:text-primary text-3xl transition-colors">
                  {featuredBlog.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 text-lg">
                  {featuredBlog.tldr}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={featuredBlog.author.image || "/avatar.png"}
                        alt={featuredBlog.author.name || "Author"}
                      />
                      <AvatarFallback>
                        {featuredBlog.author.name?.[0] || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {featuredBlog.author.name}
                      </span>
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(
                            featuredBlog.createdAt,
                          ).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featuredBlog.readTime} min read
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {featuredBlog.views} views
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Other Blogs Grid */}
      {otherBlogs.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">All Articles</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group"
              >
                <article className="flex flex-col gap-4 rounded-lg transition-shadow hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={blog.poster}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1">
                      {blog.categories.slice(0, 2).map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="group-hover:text-primary line-clamp-2 text-xl transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {blog.tldr}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={blog.author.image || "/avatar.png"}
                            alt={blog.author.name || "Author"}
                          />
                          <AvatarFallback className="text-xs">
                            {blog.author.name?.[0] || "A"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground text-xs">
                          {blog.author.name}
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <Clock className="h-3 w-3" />
                        {blog.readTime}m
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogsPage;
