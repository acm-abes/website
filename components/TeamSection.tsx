import React from "react";
import  ProfileCard  from "./ProfileCard";
import { Team } from "@/public/data/team";

interface TeamSectionProps {
  members: Team[];
  title: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ members, title }) => (
  <section className="mb-12">
    <h2 style={{fontFamily:"creepster", letterSpacing:4}} className="text-5xl font-bold text-center mb-6">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {members.map((member, idx) => (
        <ProfileCard
          key={idx}
          image={member.image}
          name={member.name}
          role={member.role}
          linkedin={member.linkedin}
          github={member.github}
          type="student"
        />
      ))}
    </div>
  </section>
);

export default TeamSection;