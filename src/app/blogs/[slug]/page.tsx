/** @format */

import { BlogCardData } from "@/types/blog";
import { Big_Shoulders_Inline } from "next/font/google";
import Image from "next/image";
import React from "react";

const bigShoulders = Big_Shoulders_Inline({ subsets: ["latin"] });

const blog: BlogCardData = {
  id: "1",
  title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo doloremque unde consectetur obcaecati rerum! Labore minima aliquam earum hic sequi saepe dolorum placeat sunt magni tempora. Eligendi laudantium quis facere.",
  authors: "Author Name",
  date: "2023-01-01",
  image: "/img.jpg",
  readTime: "5 min read",
};

const BlogPage = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-18 px-8 pt-28 md:px-16 lg:px-32">
      <section className="flex w-2/3 flex-col gap-6">
        <Image
          src={blog.image}
          alt="Blog Image"
          width={480}
          height={240}
          className="h-105 w-full object-cover"
        />
        <h1 className={`text-6xl ${bigShoulders.className}`}>{blog.title}</h1>
        <hr />
        <article className="text-lg">{blog.content}</article>
      </section>
      <section className="w-2/3">
        <div className="flex w-full">
          <h2 className={"text-2xl"}>Related Material</h2>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
