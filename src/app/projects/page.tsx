import { Old_Standard_TT } from "next/font/google";
import React from "react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const ProjectsPage = () => {
  return (
    <main className="mb-20 flex flex-col gap-28 px-8 pt-28 md:px-16 lg:px-32">
      <div className="flex flex-col gap-4">
        <h1 className={`text-7xl font-bold ${oldStandardTT.className}`}>
          Projects
        </h1>
        <p className="text-lg">
          At ABES ACM, we’re not just coding, we’re creating. Our open-source
          projects tackle real problems we face every day, turning ideas into
          tools that make life easier for students and the community. Built by
          passionate minds, shared with the world, and open for anyone to use,
          learn from, and improve.
        </p>
      </div>
    </main>
  );
};

export default ProjectsPage;
