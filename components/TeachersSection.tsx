import React from "react";
import  ProfileCard  from "./ProfileCard";
import { Teacher } from "@/public/data/teachers";

interface TeachersSectionProps {
  teachers: Teacher[];
}

const TeachersSection: React.FC<TeachersSectionProps> = ({ teachers }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-blue-700 text-center mb-6 flex items-center justify-center gap-2">
      <span style={{fontFamily:"creepster", letterSpacing:4}} className="text-5xl ">Faculty</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {teachers.map((teacher, idx) => (
        <ProfileCard
          key={idx}
          image={teacher.image}
          name={teacher.name}
          role={teacher.role}
          linkedin={teacher.linkedin}
          github={teacher.github}
          type="teacher"
        />
      ))}
    </div>
  </section>
);

export default TeachersSection;