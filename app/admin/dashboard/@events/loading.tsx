import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className={"flex flex-col space-y-3"}>
      <div className={"flex justify-between w-full"}>
        <Skeleton className={"w-44 h-10"} />
        <Skeleton className={"w-44 h-10"} />
      </div>
      <hr />
      <div className={"w-full h-full flex flex-col space-y-3"}>
        {Array.from({ length: 5 }).map(() => (
          <Skeleton className={"w-full h-10"} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
