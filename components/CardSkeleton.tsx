import React from "react";
import Card from "@/components/Card";
import Image from "next/image";
import { parseDate } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const placeholder = {};

const CardSkeleton = () => {
  return (
    <div
      // href={`/events/${id}`}
      className={`w-full min-h-80 max-h-[440px] sm:max-w-80 lg:w-full lg:max-w-full border rounded-xl overflow-clip flex flex-col lg:flex-row`}
    >
      <Skeleton className={"w-full h-5/6 lg:h-full rounded-none"} />
      <div
        className={"w-full h-1/3 lg:h-full flex flex-col p-2 px-4 space-y-2"}
      >
        <h3
          className={
            "text-2xl font-medium after:content-[''] flex after:bg-red-600"
          }
        >
          <Skeleton className={"w-full lg:w-full h-10 lg:h-12"} />
        </h3>
        <Skeleton className={"w-full lg:w-full h-5"} />
        <Skeleton className={"w-full lg:w-full h-10 lg:h-20"} />
        {/*<p className={"opacity-90 "}>{description.slice(0, 75)}...</p>*/}
      </div>
    </div>
  );
};

export default CardSkeleton;
