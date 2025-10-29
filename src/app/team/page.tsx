/** @format */

import React from "react";
import { getTeamMembers } from "@/actions/team";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Old_Standard_TT } from "next/font/google";
import { Mail, Award, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import hodData from "@/data/hod.json";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

const TeamPage = async () => {
  const { hod, faculty, members, alumni } = await getTeamMembers();

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Color palettes for the pill backgrounds
  const getColorClasses = (index: number, isHOD: boolean = false) => {
    if (isHOD) {
      return {
        bg: "bg-gradient-to-br from-blue-100 via-purple-100 to-blue-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-blue-950/20",
        avatar:
          "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800",
      };
    }

    const colors = [
      {
        bg: "bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-50 dark:from-yellow-950/20 dark:via-amber-950/10 dark:to-yellow-950/20",
        avatar:
          "bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-800",
      },
      {
        bg: "bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50 dark:from-pink-950/20 dark:via-rose-950/10 dark:to-pink-950/20",
        avatar:
          "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800",
      },
      {
        bg: "bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 dark:from-blue-950/20 dark:via-sky-950/10 dark:to-blue-950/20",
        avatar:
          "bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-300 dark:to-slate-400",
      },
      {
        bg: "bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-orange-950/20",
        avatar:
          "bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-700 dark:to-orange-800",
      },
    ];
    return colors[index % colors.length];
  };

  const TeamMemberCard = ({
    member,
    isHOD = false,
    colorIndex = 0,
  }: {
    member: any;
    isHOD?: boolean;
    colorIndex?: number;
  }) => {
    const profileLink =
      member.isPlaceholder || isHOD ? "#" : `/u/${member.email?.split("@")[0]}`;
    const colors = getColorClasses(colorIndex, isHOD);

    const CardContent = (
      <div
        className={`group relative overflow-hidden transition-all duration-300 ${
          isHOD
            ? "rounded-[3rem] md:rounded-[4rem]"
            : "rounded-[2.5rem] hover:-translate-y-2 hover:shadow-xl"
        }`}
      >
        <div className={`${colors.bg} ${isHOD ? "p-8 md:p-12" : "p-6"}`}>
          {/* Top Section with Name and Role */}
          <div className="mb-6 text-center">
            <h3
              className={`mb-1 font-semibold ${
                isHOD ? "text-3xl md:text-4xl" : "text-xl"
              } ${!member.isPlaceholder && !isHOD ? "group-hover:text-primary transition-colors" : ""}`}
            >
              {member.name || "Anonymous"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {isHOD ? hodData.department : member.role}
            </p>
          </div>

          {/* Avatar */}
          <div className="relative mx-auto mb-6">
            <div
              className={`${colors.avatar} ${
                isHOD ? "h-64 w-64 md:h-80 md:w-80" : "h-56 w-56"
              } rounded-[2rem] p-1 transition-transform duration-300 group-hover:scale-105 md:rounded-[3rem]`}
            >
              <Avatar className="h-full w-full rounded-[2rem] md:rounded-[3rem]">
                <AvatarImage
                  src={member.image || ""}
                  alt={member.name || "User"}
                  className="object-cover"
                />
                <AvatarFallback className={isHOD ? "text-6xl" : "text-4xl"}>
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="text-center">
            <div className="text-muted-foreground mb-3 flex items-center justify-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <span className="truncate">{member.email}</span>
            </div>

            {!member.isPlaceholder && (
              <div className="mt-4 flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <FileText className="text-primary h-4 w-4" />
                  <span className="font-medium">{member._count.blogs}</span>
                  <span className="text-muted-foreground">blogs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="text-primary h-4 w-4" />
                  <span className="font-medium">
                    {member._count.researchPapers}
                  </span>
                  <span className="text-muted-foreground">papers</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    if (member.isPlaceholder || isHOD) {
      return <div>{CardContent}</div>;
    }

    return <Link href={profileLink}>{CardContent}</Link>;
  };

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
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
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

          <div className="border-primary/20 from-primary/5 via-background to-secondary/5 relative rounded-3xl border bg-gradient-to-br p-1 shadow-2xl backdrop-blur-sm">
            <div className="bg-background/95 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                {/* Avatar with decorative ring */}
                <div className="relative">
                  <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl"></div>
                  <div className="relative rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1">
                    <Avatar className="border-background h-40 w-40 border-4 shadow-2xl md:h-48 md:w-48">
                      <AvatarImage
                        src={hod.image || ""}
                        alt={hod.name || "HOD"}
                      />
                      <AvatarFallback className="text-4xl">
                        {getInitials(hod.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <h3
                      className={`mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl ${oldStandardTT.className}`}
                    >
                      {hod.name || "HOD Name"}
                    </h3>
                    <div className="text-muted-foreground mb-3 space-y-2">
                      <div className="flex items-center justify-center gap-2 md:justify-start">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <span className="text-lg">{hod.email}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base md:text-lg">
                      {hodData.department}
                    </p>
                  </div>

                  {!hod.isPlaceholder && (
                    <div className="mt-6 flex flex-wrap justify-center gap-6 md:justify-start">
                      <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div className="text-left">
                          <div className="text-2xl font-bold">
                            {hod._count.blogs}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Blogs
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-4 py-2">
                        <Award className="h-5 w-5 text-purple-500" />
                        <div className="text-left">
                          <div className="text-2xl font-bold">
                            {hod._count.researchPapers}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Papers
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {hodData.bio && (
                    <p className="text-muted-foreground mt-6 text-base italic">
                      "{hodData.bio}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Coordinators Section */}
      {faculty.length > 0 && (
        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
              Faculty Coordinators
            </h2>
            <Badge variant="secondary">{faculty.length}</Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {faculty.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* Members Section */}
      {members.length > 0 && (
        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
              Members
            </h2>
            <Badge variant="secondary">{members.length}</Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* Alumni Section */}
      {alumni.length > 0 && (
        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>
              Alumni
            </h2>
            <Badge variant="outline">{alumni.length}</Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {alumni.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
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
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/events"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-6 py-3 transition-colors"
          >
            Explore Events
          </Link>
          <Link
            href="/about"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-lg border px-6 py-3 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TeamPage;
