import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className={"flex flex-col space-y-10"}>
      <Skeleton className={"w-full h-16 rounded"} />
      <Skeleton className={"w-full h-72 rounded"} />
    </main>
  );
};

export default Loading;
