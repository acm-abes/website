import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      className={`w-full md:w-80 lg:w-96 h-80 flex flex-col space-y-2 items-center bg-secondary/40 border rounded-md p-4 ${className}`}
    >
      <div className="w-full justify-between flex flex-col space-y-1 items-start">
        <h3 className="text-2xl flex items-center group space-x-1">
          <span>{name}</span>
          <span>
            <ArrowRight
              size={"1em"}
              className="group-hover:translate-x-2 duration-150"
            />
          </span>
        </h3>{" "}
        <div className="flex items-start text-sm text-primary/90">{date}</div>
      </div>
      <br />
      <hr className="h-0.5 w-full bg-red-50/30" />
      <br />
      {/* <hr className="h-[1.25px] bg-primary/25 w-full" /> */}
      <p className="w-full text-sm overflow-hidden">
        {description.split(" ").slice(0, 40).join(" ") + "..."}
      </p>
    </Link>
  );
};

export default Card;
