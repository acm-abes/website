import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GalleryLoading = () => {
  return (
    <main
      className={"w-full h-full flex flex-col p-5 md:px-20 lg:px-36 space-y-7"}
    >
      <h1 className="text-4xl">Gallery</h1>
      <hr className={"border-b border-cyan-900 "} />
      <div className={"w-full h-full grid grid-cols-1 gap-5 sm:grid-cols-2"}>
        <Skeleton className={"w-full h-72"} />
        <Skeleton className={"w-full h-72"} />
        <Skeleton className={"w-full h-72"} />
        <Skeleton className={"w-full h-72"} />
        <Skeleton className={"w-full h-72"} />
        <Skeleton className={"w-full h-72"} />
        <Skeleton className={"w-full h-72"} />
      </div>
    </main>
  );
};

export default GalleryLoading;
