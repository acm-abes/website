import { Timeline } from "@/components/ui/timeline";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import React from "react";
import { Old_Standard_TT } from "next/font/google";
import Link from "next/link";
import { Rocket, Target, History } from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const AboutPage = () => {
  const timelineData = [
    {
      id: 1,
      title: "1947",
      content: (
        <div key="content-1947">
          <p
            key="1947-title"
            className="mb-4 text-sm font-normal text-neutral-800 md:text-base dark:text-neutral-400"
          >
            Founded
          </p>
          <p
            key="1947-desc"
            className="mb-8 text-sm font-normal text-neutral-800 md:text-lg dark:text-neutral-400"
          >
            The institution was founded in 1947 with a bold vision for the newly
            independent nation: to cultivate a generation of thinkers,
            innovators, and leaders who would drive social and technological
            transformation. Beginning with only a small faculty and limited
            resources, the founders built an environment centered on curiosity,
            academic rigor, and inclusivity. Over the years, the institution
            established its reputation for pioneering research and a strong
            commitment to nurturing young talent through quality education.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "1966",
      content: (
        <div key="content-1966">
          <p
            key="1966-title"
            className="mb-4 text-sm font-normal text-neutral-800 md:text-base dark:text-neutral-400"
          >
            Turing Award
          </p>
          <p
            key="1966-desc"
            className="mb-8 text-sm font-normal text-neutral-800 md:text-lg dark:text-neutral-400"
          >
            A historic moment unfolded in 1966 when one of our distinguished
            faculty members was honored with the prestigious Turing Award. This
            achievement not only brought global recognition to the institution
            but also marked a turning point in its academic journey. The award
            celebrated groundbreaking contributions to foundational computer
            science, elevating the institution's global standing and inspiring a
            culture where innovation, research excellence, and fearless
            experimentation became defining traits of our identity.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "2000",
      content: (
        <div key="content-2000">
          <p
            key="2000-title"
            className="mb-4 text-sm font-normal text-neutral-800 md:text-base dark:text-neutral-400"
          >
            Digital Library
          </p>
          <p
            key="2000-desc"
            className="mb-8 text-sm font-normal text-neutral-800 md:text-lg dark:text-neutral-400"
          >
            With the dawn of a digital era, the year 2000 marked a major
            milestone through the launch of the Digital Knowledge Library — one
            of the most transformative initiatives in our history. This
            ambitious project digitized thousands of rare manuscripts, academic
            papers, archival materials, and learning resources previously
            accessible only within physical premises. By embracing modern
            technology, the initiative democratized knowledge, enabling global
            researchers, students, and historians to access invaluable content
            from anywhere in the world. The Digital Library later expanded into
            an interactive platform offering multimedia resources, e-learning
            modules, and collaborative virtual tools.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "2024",
      content: (
        <div key="content-2024">
          <p
            key="2024-title"
            className="mb-4 text-sm font-normal text-neutral-800 md:text-base dark:text-neutral-400"
          >
            Diversity Commitment
          </p>
          <p
            key="2024-desc"
            className="mb-8 text-sm font-normal text-neutral-800 md:text-lg dark:text-neutral-400"
          >
            In 2024, the institution reaffirmed its dedication to building an
            inclusive, equitable, and progressive learning ecosystem by
            introducing a comprehensive Diversity, Equity, and Inclusion (DEI)
            Commitment. This initiative introduced new scholarships for
            underrepresented groups, mentorship programs, accessible learning
            spaces, workshops for cultural sensitivity, and policies supporting
            equal participation in academic and leadership roles. The DEI
            Commitment not only strengthened community values but also ensured
            that every member — irrespective of background, identity, or ability
            — felt heard, supported, and empowered to excel.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="relative h-screen w-full overflow-hidden bg-black">
        <BackgroundGradientAnimation>
          <div className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl">
            <p
              className={`bg-gradient-to-b from-white/80 to-white/20 bg-clip-text text-transparent drop-shadow-2xl ${oldStandardTT.className}`}
            >
              About ACM
            </p>
            Innovation Beyond Boundaries
          </div>
        </BackgroundGradientAnimation>
      </div>

      <div className="px-8 py-20 md:px-16 lg:px-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-muted/50 hover:bg-muted flex flex-col items-center rounded-2xl border border-neutral-200 p-8 text-center transition-colors dark:border-neutral-800">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <Rocket className="text-primary h-8 w-8" />
            </div>
            <p
              className={`mb-3 text-2xl font-bold text-neutral-800 dark:text-neutral-100 ${oldStandardTT.className}`}
            >
              Our Mission
            </p>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
              Promote research innovation and collaboration in computer science
              and engineering.
            </p>
          </div>
          <div className="bg-muted/50 hover:bg-muted flex flex-col items-center rounded-2xl border border-neutral-200 p-8 text-center transition-colors dark:border-neutral-800">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <Target className="text-primary h-8 w-8" />
            </div>
            <p
              className={`mb-3 text-2xl font-bold text-neutral-800 dark:text-neutral-100 ${oldStandardTT.className}`}
            >
              Our Goals
            </p>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
              Enhance education recognition and opportunities for individuals in
              computing fields.
            </p>
          </div>
          <div className="bg-muted/50 hover:bg-muted flex flex-col items-center rounded-2xl border border-neutral-200 p-8 text-center transition-colors dark:border-neutral-800">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <History className="text-primary h-8 w-8" />
            </div>
            <p
              className={`mb-3 text-2xl font-bold text-neutral-800 dark:text-neutral-100 ${oldStandardTT.className}`}
            >
              Our Story
            </p>
            <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
              Founded in 1947, ACM is the world's largest computing society,
              with members in over 100 countries.
            </p>
          </div>
        </div>
      </div>

      <Timeline data={timelineData} title="Our Journey" />

      {/* Call to Action */}
      <footer className="px-8 pb-20 md:px-16 lg:px-32">
        <div className="from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-br py-16 text-center">
          <h2 className={`text-3xl font-bold ${oldStandardTT.className} mb-4`}>
            Join Our Community
          </h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl px-4">
            Be part of a global network of innovators, researchers, and
            professionals. Together, we shape the future of computing.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/team"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-60 items-center justify-center rounded-lg py-3 font-medium transition-colors"
            >
              Meet the Team
            </Link>
            <Link
              href="/projects"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex w-60 items-center justify-center rounded-lg border py-3 font-medium transition-colors"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
