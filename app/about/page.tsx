import Link from "next/link";
import React from "react";
import { defaultOGConfig } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    ...defaultOGConfig,
  },
  title: "ABOUT US",
  description: "Official ABES ACM Chapter",
  icons: { icon: "/images/abes-acm.png" },
};

const About = () => {
  return (
    <main className="p-5 md:px-20 lg:px-36 space-y-7">
      <div className="flex space-x-1 items-end">
        {/* <span className="opacity-75">know more</span> */}
        <h1 className="text-4xl">About Us</h1>
      </div>
      <div className="flex flex-col md:px-16 space-y-1">
        <h2 className="text-3xl">ACM</h2>
        <p className="text-sm">
          ACM, or the Association for Computing Machinery, is a professional
          organization dedicated to advancing the field of computing. With over
          100,000 members across the globe, ACM serves as a hub for researchers,
          practitioners, and educators in computing and related disciplines.
          <br />
          <br />
          Founded in 1947, ACM has a rich history of contributing to the
          development of computer science and promoting its use for the benefit
          of society. The organization publishes numerous journals and
          conference proceedings, as well as a variety of educational resources
          for students and professionals alike.
          <br />
          <br />
          ACM also sponsors a number of special interest groups (SIGs) focused
          on specific areas of computing, such as artificial intelligence,
          computer graphics, and human-computer interaction. These SIGs provide
          a forum for members with similar interests to collaborate and share
          knowledge.
          <br />
          <br />
          addition to its publications and SIGs, ACM offers a range of
          professional development opportunities, including conferences,
          workshops, and online courses. The organization also recognizes
          excellence in the field through awards and honors, such as the Turing
          Award, often referred to as the "Nobel Prize of Computing."
          <br />
          <br />
          At its core, ACM is driven by a commitment to advancing the field of
          computing and promoting its positive impact on society. Whether you
          are a student, researcher, or practitioner in the field, ACM is a
          valuable resource for connecting with others and staying up-to-date on
          the latest developments in computing.
        </p>
        <br />
        <br />
        <h1 className="text-3xl">Our Team</h1>
        <div>
          To learn more about our team refer to{" "}
          <Link href={"/team"} className="text-blue-500 underline">
            Team
          </Link>{" "}
          page
        </div>
      </div>
      <div className="flex space-x-1 items-end">
        {/* <span className="opacity-75">know more</span> */}
        <div className="flex flex-col space-y-1 w-full"></div>
      </div>
    </main>
  );
};

export default About;
