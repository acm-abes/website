import React from "react";
import  ProfileCard  from "./ProfileCard";
import { Alumni } from "@/public/data/alumni";

interface AlumniSectionProps {
  alumni: Alumni[];
}

const AlumniSection: React.FC<AlumniSectionProps> = ({ alumni }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-yellow-700 text-center mb-6 flex items-center justify-center gap-2">
      <span style={{fontFamily:"creepster", letterSpacing:4}} className="text-5xl">Alumni</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {alumni.map((alum, idx) => (
        <ProfileCard
          key={idx}
          image={alum.image}
          name={alum.name}
          role={alum.role}
          linkedin={alum.linkedin}
          github={alum.github}
          type="alumni"
        />
      ))}
    </div>
  </section>
);

export default AlumniSection;