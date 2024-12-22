import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className={"w-full min-h-90 flex flex-col space-y-5"}>
      <Skeleton className={"h-14"} />
      <hr />
      <Skeleton className={"h-52"} />
      <hr />
      <Skeleton className={"h-16"} />
    </div>
  );
};

export default Loading;
