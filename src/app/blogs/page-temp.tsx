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

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const featuredBlog = blogs?.[0];
  const otherBlogs = blogs?.slice(1) || [];

  return (
    <main className="mb-20 flex flex-col gap-8 px-8 pt-28 md:px-16 lg:px-32">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-5xl font-bold ${oldStandardTT.className} mb-4`}>
              Blogs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Share your insights, tutorials, and thoughts on technology, research, and innovation.
            </p>
          </div>
          <Link 
            href="/blogs/create" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 h-fit shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Write a Blog
          </Link>
        </div>

        {/* Content Section */}
        {!blogs || blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to share your knowledge and insights with the community.
              </p>
              <Link 
                href="/blogs/create" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
              >
                <span>Start Writing</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Blog */}
            {featuredBlog && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Link href={`/blogs/${featuredBlog.slug}`} className="w-full h-[400px] relative overflow-hidden rounded-xl">
                  <Image
                    src={featuredBlog.poster || "/img.jpg"}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={featuredBlog.author?.image || "/avatar.png"}
                        alt={featuredBlog.author?.name || "Author"}
                      />
                      <AvatarFallback>
                        {featuredBlog.author?.name?.[0] || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{featuredBlog.author?.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredBlog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <Link href={`/blogs/${featuredBlog.slug}`} className="group">
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {featuredBlog.tldr}
                    </p>
                  </Link>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {featuredBlog.readTime} min read
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {featuredBlog.views || 0} views
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherBlogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  href={`/blogs/${blog.slug}`}
                  className="group"
                >
                  <div className="w-full h-48 relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={blog.poster || "/img.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={blog.author?.image || "/avatar.png"}
                          alt={blog.author?.name || "Author"}
                        />
                        <AvatarFallback>
                          {blog.author?.name?.[0] || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {blog.author?.name}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {blog.tldr}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <Clock className="h-3 w-3" />
                        {blog.readTime}m
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}