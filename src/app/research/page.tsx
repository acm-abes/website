import { fetchPapers } from "@/actions/papers";
import { Old_Standard_TT } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const PapersPage = async () => {
  const papers = await fetchPapers();

  return (
    <main className="mb-20 flex flex-col gap-28 px-8 pt-28 md:px-16 lg:px-32">
      <div className="flex flex-col gap-4">
        <h1 className={`text-7xl font-bold ${oldStandardTT.className}`}>
          Research Papers
        </h1>
        <p className="text-lg">
          Our team at ABES ACM is dedicated to pushing the boundaries of
          knowledge through rigorous research and innovative thinking. We
          actively contribute to the academic community by publishing research
          papers that address pressing issues and explore new frontiers in
          technology and society. Whether it&apos;s through collaborative
          projects or individual efforts, our research papers reflect our
          commitment to excellence and our passion for making a meaningful
          impact in the world.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {papers.map((paper) => (
          <div key={paper.id} className="mb-8 flex flex-col gap-4 border">
            <Image
              src={paper.image}
              alt={paper.title}
              width={500}
              height={300}
              className="aspect-video w-full object-cover"
            />
            <Link
              href={`/research/${paper.id}`}
              className="text-3xl font-semibold"
            >
              {paper.title}
            </Link>
            <p className="text-sm text-gray-500">
              {paper.authors.map((author) => author.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PapersPage;
