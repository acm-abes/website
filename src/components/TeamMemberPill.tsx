import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getTeamMemberColor, getTeamMemberColorDark } from "@/lib/color-utils";
import { toTitleCase } from "@/lib/utils";

interface TeamMemberPillProps {
  name: string;
  designation: string;
  image?: string | null;
  email?: string | null;
  colorIndex: number;
  isPlaceholder?: boolean;
}

export function TeamMemberPill({
  name,
  designation,
  image,
  email,
  colorIndex,
  isPlaceholder = false,
}: TeamMemberPillProps) {
  const bgColor = getTeamMemberColor(colorIndex);
  const bgColorDark = getTeamMemberColorDark(colorIndex);
  const profileLink = isPlaceholder ? "#" : `/u/${email?.split("@")[0]}`;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const PillContent = (
    <div
      className={`group relative h-[420px] w-[200px] overflow-hidden rounded-[100px] ${bgColor} ${bgColorDark} transition-all duration-300 ${
        !isPlaceholder ? "hover:-translate-y-2 hover:shadow-2xl" : ""
      }`}
    >
      {/* Top Section - Name & Designation */}
      <div className="absolute top-0 right-0 left-0 z-10 px-6 pt-12 text-center">
        <h3
          className={`mb-1 text-lg text-gray-900 dark:text-gray-100 ${
            !isPlaceholder ? "transition-colors group-hover:text-blue-600" : ""
          }`}
        >
          {name.split(" ")[0]}
          <br />
          {name.split(" ")[1]}
        </h3>
        <p className="text-secondary-foreground/60 text-sm">
          {toTitleCase(designation)}
        </p>
      </div>

      {/* Bottom Section - Image (curved top) */}
      <div className="absolute right-0 bottom-0 left-0 h-[60%]">
        {image ? (
          <div className="relative h-full w-full overflow-hidden rounded-t-[100px]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-t-[100px] bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
            <span className="text-5xl font-bold text-gray-400 dark:text-gray-500">
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (isPlaceholder) {
    return <div>{PillContent}</div>;
  }

  return (
    <Link href={profileLink} className="block">
      {PillContent}
    </Link>
  );
}
