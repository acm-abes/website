/** @format */

import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { team as teamMembers } from "@/public/data/team";
import Link from "next/link";
import TeamAvatar from "@/components/TeamAvatar";
import { Team } from "@/types";

export const metadata = {
  title: "TEAM | ABES ACM",
  description: "Official ABES ACM Chapter",
  icons: { icon: "/images/abes-acm.png" },
};

const TeamPage = () => {
  const roles = teamMembers.map((member) => member.role);
  const membersSortedByRoles: Record<string, Team[]> = {};
  roles.forEach((role) => {
    membersSortedByRoles[role] = teamMembers.filter(
      (member) => member.role === role,
    );
  });

  return (
    <main className="p-10 md:px-20 lg:px-36 space-y-5">
      <h1 className="text-4xl">Meet The Team</h1>
      <p>
        Every member of the society has always been passionate and hard working
        towards their goal, creating a positive work environment.
        <br />
        Their support and will to help each other out in every way possible is
        what makes ACM-ABES 'the Team'.
      </p>
      <br />
      {Object.keys(membersSortedByRoles).map((role, index) => {
        return (
          <div key={index} className={"w-full flex flex-col"}>
            {/*<Link href={`#${role}`}>*/}
            <div className={"w-full flex relative items-center justify-center"}>
              {/*<hr className={"w-full"} />*/}
              {/*<h2*/}
              {/*  id={role}*/}
              {/*  className={"text-3xl my-5 w-full flex justify-center"}*/}
              {/*>*/}
              {/*  <span className={"text-center"}>*/}
              {/*    {role === "Content Team" ? role : role + "s"}*/}
              {/*  </span>*/}
              {/*</h2>*/}
              <h2
                className={
                  "opacity-20 text-7xl font-bold my-5 w-full flex justify-center"
                }
              >
                <span className={"text-center"}>
                  {role.includes("Team") ? role : role + "s"}
                </span>
              </h2>
              {/*<hr className={"w-full"} />*/}
            </div>
            {/*</Link>*/}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-5 md:gap-10">
              {membersSortedByRoles[role].map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <TeamAvatar {...member} />
                  <div className="text-center mt-2">
                    <Link
                      href={
                        "/team/" +
                        member.name.toLowerCase().split(" ").join("-")
                      }
                    >
                      <h2 className="text-lg font-semibold">{member.name}</h2>
                    </Link>
                    {/*<p className="text-sm">{member.designation}</p>*/}
                    <p className="text-sm">{member.role}</p>
                    <div className="flex justify-center mt-2">
                      {member.github && (
                        <Link
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mr-2"
                        >
                          <FaGithub className="text-lg" />
                        </Link>
                      )}
                      {member.linkedin && (
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {<FaLinkedin className="text-lg" />}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default TeamPage;
