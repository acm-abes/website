import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

//bg-[#63ADF2]

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-secondary bg-[#232426]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
