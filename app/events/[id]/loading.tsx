import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EventPageLoading = () => {
  return (
    <main className="w-[100dvw] h-full space-y-36 md:space-y-52 lg:space-y-96 flex flex-col items-start">
      <div className="absolute top-15 left-0 -z-10">
        {/* TODO : Add Carousel*/}
        <Skeleton className="w-[100dvw] max-h-96 h-96 " />
        {/* <Image
          width={1080}
          height={2560}
          src={base_image_url + data.banners[2]}
        /> */}
      </div>
      <div className="w-full h-full p-2 sm:p-5 md:p-10 lg:p-36 space-y-10 md:space-y-10 lg:space-y-16 flex flex-col items-start">
        <div className="flex justify-end rounded bg-secondary/40 backdrop-blur-lg w-full p-4 sm:py-5 md:py-7 relative items-center">
          <Skeleton className="w-28 md:w-32 lg:w-44 absolute rounded-lg left-5" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-end max-w-[70%]">
            <Skeleton className="w-full h-10 lg:h-12" />
          </h1>
        </div>

        <div className="flex flex-col space-y-5 md:space-y-0 md:items-center md:flex-row p-4 lg:p-7 md:justify-evenly rounded bg-secondary/40 drop-shadow-lg w-full">
          <div className="flex flex-col">
            <span className="text-sm text-secondary-foreground">
              Organized on
            </span>
            <span className="text-base md:text-lg"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-secondary-foreground">Venue</span>
            <span className="text-base md:text-lg"></span>
          </div>
        </div>
        <div className="flex flex-col space-y-1 justify-between rounded w-full px-4">
          <h3 className="text-2xl text-primary/45 font-bold">
            About the event
          </h3>
          <p></p>
        </div>
        <div className="flex justify-between rounded bg-secondary/40 drop-shadow-lg w-full">
          <div className="flex flex-col p-4">
            <span className="text-sm text-secondary-foreground">Prizes</span>
            <span className="text-lg"></span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventPageLoading;
