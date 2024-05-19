import React from "react";
import Link from "next/link";
import Image from "next/image";
import { parseDate } from "@/lib/utils";

interface CardProps {
  name: string;
  description: string;
  image?: string;
  date: string;
  id: string;
  className?: string;
}

const Card = ({ name, description, image, date, id, className }: CardProps) => {
  return (
    <Link
      href={`/events/${id}`}
      className={`w-full sm:max-w-80 lg:w-full lg:max-w-full border rounded-xl overflow-clip flex flex-col lg:flex-row ${className}`}
    >
      <Image
        src={image!}
        alt={name}
        width={512}
        height={512}
        className={"w-full lg:w-1/2"}
      />
      <div className={"w-full h-full flex flex-col p-2 px-4 space-y-2"}>
        <h3
          className={
            "text-2xl font-medium after:content-[''] flex after:bg-red-600"
          }
        >
          {name}
        </h3>
        <span className={"opacity-75"}>{parseDate(date)}</span>
        <p className={"opacity-90"}>{description.slice(0, 75)}...</p>
      </div>
    </Link>
  );
};

export default Card;
