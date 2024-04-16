import React from 'react';
import Image from "next/image";
import {getRandomGradient} from "@/lib/utils";

const TeamAvatar = (member) => {
  return (
    member.image.length ? (
        <Image
          width={512}
          height={512}
          src={"/images/team/" + member.image}
          alt={member.name}
          className="rounded-full md:max-w-52 md:min-w-52 md:max-h-52 md:min-h-52 object-cover min-w-40 min-h-40 max-w-40 max-h-40"
        />
      ) : (() => {
      const colors = [
        "bg-[#00A5E0]",
        "bg-[#EF9CDA]",
        "bg-[#F67E7D]",
        "bg-[#74546A]",
        "bg-[#E54F6D]",
        "bg-[#57A773]",
        "bg-[#F46036]",
        "bg-[#372248]",
        "bg-[#571F4E]",
      ];
        const color = colors[getRandomGradient(colors)]
        return (
        <div
          className={`rounded-full text-7xl w-full h-full md:min-w-52 md:min-h-52 md:max-w-52 md:max-h-52 min-w-40 min-h-40 max-w-40 max-h-40 flex items-center justify-center ${color}`}
        >
          {member.name
            .toUpperCase()
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>
      )})()
  );
};

export default TeamAvatar;