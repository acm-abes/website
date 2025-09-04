import React from "react";
import { Big_Shoulders_Inline } from "next/font/google";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import { BlogCardData } from "@/types/blog";

const blog: BlogCardData = {
  id: "1",
  title:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo doloremque unde consectetur obcaecati rerum! Labore minima aliquam earum hic sequi saepe dolorum placeat sunt magni tempora. Eligendi laudantium quis facere.",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo doloremque unde consectetur obcaecati rerum! Labore minima aliquam earum hic sequi saepe dolorum placeat sunt magni tempora. Eligendi laudantium quis facere.",
  authors: "Author Name",
  date: "2023-01-01",
  image: "/img.jpg",
  readTime: "5 min read",
};

const bigShoulders = Big_Shoulders_Inline({ subsets: ["latin"] });

const BlogsPage = () => {
  return (
    <main className="flex flex-col gap-18 px-8 pt-28 md:px-16 lg:px-32">
      <div className={bigShoulders.className}>
        <h1 className={"text-8xl"}>Blogs</h1>{" "}
        {/* <span className="text-2xl">by our team</span> */}
      </div>
      <div className="flex w-full gap-4">
        <Image
          src={blog.image}
          alt="Blog Image"
          width={480}
          height={240}
          className="h-96 w-140 object-cover"
        />
        <div className="flex flex-col gap-2">
          <h3 className="w-full text-3xl">
            {blog.title.split(" ").slice(0, 10).join(" ")}...
          </h3>
          <span className="text-muted-foreground text-lg">{blog.authors}</span>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{blog.date}</span>
            <div className="bg-muted-foreground h-1 w-1 rounded-full" />
            <span className="text-muted-foreground">{blog.readTime}</span>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <BlogCard key={index} />
        ))}
      </ul>
    </main>
  );
};

export default BlogsPage;
