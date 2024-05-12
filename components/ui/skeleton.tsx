import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#63ADF2] bg-opacity-45",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
