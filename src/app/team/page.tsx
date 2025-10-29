/** @format */

import React from "react";
import { getTeamMembers } from "@/actions/team";
import { Badge } from "@/components/ui/badge";
import { Old_Standard_TT } from "next/font/google";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import hodData from "@/data/hod.json";
import { TeamMemberPill } from "@/components/TeamMemberPill";
import { HODCard } from "@/components/HODCard";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const TeamPage = async () => {
  const { hod, faculty, members, alumni } = await getTeamMembers();

  return (
    <main className="mb-20 flex flex-col gap-16 px-8 pt-28 md:px-16 lg:px-32">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className={`text-5xl font-bold md:text-7xl ${oldStandardTT.className} mb-6`}
        >
          Our Team
        </h1>
        <p className="text-muted-foreground text-lg">
          Meet the brilliant minds behind ABES ACM Student Chapter - a diverse
          team of innovators, researchers, and tech enthusiasts driving
          excellence in computer science.
        </p>
      </div>

      {/* HOD Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10 blur-2xl">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-xl"></div>
          <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <Badge variant="secondary" className="mb-4 text-sm">
              Leadership
            </Badge>
            <h2
              className={`text-4xl font-semibold ${oldStandardTT.className} mb-3 md:text-5xl`}
            >
              Head of Department
            </h2>
            <p className="text-muted-foreground text-lg">
              Leading our department with vision and expertise
            </p>
          </div>

          <HODCard
            name={hod.name || "HOD Name"}
            email={""}
            image={hod.image}
            department={hodData.department}
            bio={hodData.bio}
            blogCount={hod.isPlaceholder ? 0 : hod._count.blogs}
            paperCount={hod.isPlaceholder ? 0 : hod._count.researchPapers}
            isPlaceholder={hod.isPlaceholder}
          />
        </div>
      </section>

      {/* Faculty Coordinators Section */}
      {faculty.length > 0 && (
        <section className="mx-auto w-full max-w-7xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
              Faculty Coordinators
            </h2>
            <Badge variant="secondary">{faculty.length}</Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {faculty.map((member, index) => (
              <TeamMemberPill
                key={member.id}
                name={member.name || "Anonymous"}
                designation={member.designation || member.role}
                image={member.image}
                email={member.email}
                colorIndex={index}
                isPlaceholder={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* Alumni Section */}
      {alumni.length > 0 && (
        <section className="mx-auto w-full max-w-7xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
              Alumni
            </h2>
            <Badge variant="outline">{alumni.length}</Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {alumni.map((member, index) => (
              <TeamMemberPill
                key={member.id}
                name={member.name || "Anonymous"}
                designation={member.designation || member.role}
                image={member.image}
                email={member.email}
                colorIndex={index}
                isPlaceholder={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* Members Section */}
      {members.length > 0 && (
        <section className="mx-auto w-full max-w-7xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
              Members
            </h2>
            <Badge variant="secondary">{members.length}</Badge>
          </div>

          <div className="grid grid-cols-4 justify-center gap-8">
            {members.map((member, index) => (
              <TeamMemberPill
                key={member.id}
                name={member.name || "Anonymous"}
                designation={member.designation || member.role}
                image={member.image}
                email={member.email}
                colorIndex={index}
                isPlaceholder={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-br py-16 text-center">
        <BookOpen className="text-primary mx-auto mb-6 h-16 w-16" />
        <h2 className={`text-3xl font-bold ${oldStandardTT.className} mb-4`}>
          Want to Join Our Team?
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          We're always looking for passionate students and faculty members who
          want to contribute to our community. Get involved in our events,
          workshops, and research initiatives.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/events"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-60 items-center justify-center rounded-lg py-3 transition-colors"
          >
            Explore Events
          </Link>
          <Link
            href="/about"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex w-60 items-center justify-center rounded-lg border py-3 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TeamPage;
