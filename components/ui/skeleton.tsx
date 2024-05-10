import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
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
