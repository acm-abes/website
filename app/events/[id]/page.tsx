import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { events } from "@/public/data/events";
import Database from "@/appwrite/database";
import { notFound } from "next/navigation";
import { Models } from "appwrite";
import { type Event } from "@/types";
import { Metadata } from "next";

interface EventProps {
  params: {
    id: string;
  };
}

const EventPage = async ({ params: { id } }: EventProps) => {
  const database = new Database();

  const base_image_url = "/images";

  let data: Event & Models.Document;

  // const data = events.find((e) => e.id === id);
  try {
    data = events.find((e) => e.id === id)! as Event & Models.Document;
    if (!data) data = (await database.getEventById(id))!;
    if (!data) return notFound();
  } catch (e) {
    return notFound();
  }

  return (
    <main className="w-[100dvw] h-full space-y-36 md:space-y-52 lg:space-y-96 flex flex-col items-start">
      <div className="absolute top-15 left-0 -z-10">
        {/* TODO : Add Carousel*/}
        <Carousel className="w-[100vw] relative">
          <CarouselContent>
            {data.banners?.length ? (
              data.banners.map((banner, index) => (
                <CarouselItem className={``} key={index}>
                  {banner !== "/" ? (
                    <Image
                      alt="event banner"
                      className="w-[100dvw] max-h-96"
                      width={1080}
                      height={2560}
                      src={base_image_url + banner}
                    />
                  ) : (
                    <div className="w-full h-full bg-red-500"></div>
                  )}
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className={``}>
                <Image
                  alt="event banner"
                  className="w-[100dvw] max-h-96"
                  width={1080}
                  height={2560}
                  src={"/images/default_banner.jpg"}
                />
              </CarouselItem>
            )}
          </CarouselContent>
          {/* <CarouselNext className="right-3 z-50"></CarouselNext>
          <CarouselPrevious className=" left-3 z-50"></CarouselPrevious> */}
        </Carousel>
        {/* <Image
          width={1080}
          height={2560}
          src={base_image_url + data.banners[2]}
        /> */}
      </div>
      <div className="w-full h-full p-2 sm:p-5 md:p-10 lg:p-36 space-y-10 md:space-y-10 lg:space-y-16 flex flex-col items-start">
        <div className="flex justify-end rounded bg-secondary/40 backdrop-blur-lg w-full p-4 sm:py-5 md:py-7 relative items-center">
          <Image
            alt="event logo"
            width={512}
            height={512}
            className="w-28 md:w-32 lg:w-44 absolute rounded-lg left-5"
            src={data.logo}
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-end max-w-[70%]">
            {data.name}
          </h1>
        </div>

        <div className="flex flex-col space-y-5 md:space-y-0 md:items-center md:flex-row p-4 lg:p-7 md:justify-evenly rounded bg-secondary/40 drop-shadow-lg w-full">
          <div className="flex flex-col">
            <span className="text-sm text-secondary-foreground">
              Organized on
            </span>
            <span className="text-base md:text-lg">
              {/* {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "full",
                timeStyle: "short",
                hour12: true,
              }).format(data.time)} */}
              {new Date(data.date).toDateString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-secondary-foreground">Venue</span>
            <span className="text-base md:text-lg">
              {data.venue || "ABES Engineering College"}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-1 justify-between rounded w-full px-4">
          <h3 className="text-2xl text-primary/45 font-bold">
            About the event
          </h3>
          <p>{data.description}</p>
        </div>
        <div className="flex justify-between rounded bg-secondary/40 drop-shadow-lg w-full">
          <div className="flex flex-col p-4">
            <span className="text-sm text-secondary-foreground">Prizes</span>
            <span className="text-lg">{data.prizes}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export async function generateMetadata({
  params,
}: EventProps): Promise<Metadata> {
  // const base_image_url = "/images";
  let data = events.find((e) => e.id === params.id);

  if (!data) {
    const database = new Database();
    data = (await database.getEventById(params.id))!;
  }

  if (!data)
    return {
      title: "Invalid Event",
      openGraph: {
        title: "Invalid Event",
        images: [
          { url: `https://acm-abesec-1.vercel.app/public/images/abes-acm.png` },
        ],
        description: "Not a valid event",
      },
    };

  return {
    title: data.name,
    icons: {
      icon: data.logo,
    },
    openGraph: {
      title: data.name,
      images: [
        {
          url: data.logo.includes("images")
            ? `https://acm-abesec-1.vercel.app${data.logo}`
            : data.logo,
        },
      ],
      description: data.description.split(" ").slice(0, 40).join(" ") + "...",
    },
  };
}

export default EventPage;
