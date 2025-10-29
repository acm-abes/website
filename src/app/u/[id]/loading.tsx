import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mb-20 flex flex-col gap-12 px-8 pt-28 md:px-16 lg:px-32">
      {/* Profile Header Skeleton */}
      <section className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
          <Skeleton className="h-32 w-32 rounded-full md:h-40 md:w-40" />
          <div className="flex-1 space-y-4">
            <Skeleton className="mx-auto h-12 w-64 md:mx-0" />
            <Skeleton className="mx-auto h-4 w-48 md:mx-0" />
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="mx-auto w-full max-w-6xl">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
