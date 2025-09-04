import { BlogCardData } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

const BlogCard = () => {
  return (
    <div className="flex h-96 w-full flex-col gap-4">
      <Image
        src={blog.image}
        alt="Blog Image"
        width={720}
        height={300}
        className="h-52 object-cover"
      />
      <div className="flex flex-col gap-2">
        <Link href={`/blogs/${blog.id}`}>
          <h3 className="w-full text-lg">
            {blog.title.split(" ").slice(0, 10).join(" ")}...
          </h3>
        </Link>
        <span className="text-muted-foreground">{blog.authors}</span>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">{blog.date}</span>
          <div className="bg-muted-foreground h-1 w-1 rounded-full" />
          <span className="text-muted-foreground">{blog.readTime}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
