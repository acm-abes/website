import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { events } from "@/public/data/events";

const Event = ({ params: { id } }) => {
  const base_image_url = "/images";

  const data = events.find((e) => e.id === id);

  if (!data) return <main>Event not found</main>;

  return (
    <main className="w-[100dvw] relative h-full space-y-36 md:space-y-52 lg:space-y-96 flex flex-col items-start">
      <div className={"w-full h-fit"}>
        <Image
          src={"/images" + data.banners[0]}
          alt={data.name}
          width={1280}
          height={358}
          className={"w-full"}
          sizes="100vw"
        />
        <div
          className={
            "absolute bg-gradient-to-t from-background z-10 top-60 flex items-center px-36 md:space-x-10 w-full"
          }
        >
          <Image
            src={data.logo}
            alt={data.name}
            width={512}
            height={512}
            className={"rounded-full w-52"}
          />
          <div className={"w-full"}>
            <h1 className="text-4xl">{data.name}</h1>
          </div>
        </div>
        <div className={"py-96"}>Hello</div>
      </div>
    </main>
  );
};

export async function _generateMetadata({ params }) {
  const base_image_url = "/images";
  const data = events.find((e) => e.id === params.id);
  return {
    title: data.name,
    openGraph: {
      title: data.name,
      images: [{ url: `https://acm-abesec-1.vercel.app${data.logo}` }],
      description: data.description.split(" ").slice(0, 40).join(" ") + "...",
    },
  };
}

export default Event;
