import { ChapterInfo } from "@/public/data/chapter-info";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Card from "@/components/Card";
import Image from "next/image";
import { events } from "@/public/data/events";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center p-5 md:px-20 lg:px-36 space-y-10 md:space-y-20">
      {/* Our chapters */}
      <section className="w-full h-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end space-x-1">
          <h2 className="text-3xl md:text-4xl">Our Chapters</h2>
        </div>
        <Carousel className="pt-7">
          <CarouselContent>
            {/* <div className="md:flex-row flex-col space-y-4 md:space-y-0 flex justify-between"> */}
            <CarouselItem>
              <div className="w-full flex md:flex-row flex-col items-center justify-between space-y-3 md:space-y-0 md:space-x-20">
                <Image
                  alt={""}
                  width={250}
                  height={250}
                  src={"/images/abesec.png"}
                  className="md:w-1/3 w-72"
                />
                <div className="md:w-2/3 flex flex-col space-y-1">
                  <Link
                    href={"/"}
                    className="text-xl flex items-center space-x-1 w-full group cursor-pointer"
                  >
                    <h3>Student Chapter</h3>
                    <span>
                      <ArrowRight
                        size={"1em"}
                        className="group-hover:translate-x-2 duration-150"
                      />
                    </span>
                  </Link>
                  <p className="opacity-60">{ChapterInfo.studentChapter}</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-full flex flex-col space-y-1">
                <Link
                  href={"/"}
                  className="text-xl flex items-center space-x-1 w-full group cursor-pointer"
                >
                  <h3 className="text-xl">Women's Chapter</h3>

                  <span>
                    <ArrowRight
                      size={"1em"}
                      className="group-hover:translate-x-2 duration-150"
                    />
                  </span>
                </Link>
                <p className="opacity-60">{ChapterInfo.wChapter}</p>
              </div>
            </CarouselItem>
            {/* </div> */}
          </CarouselContent>
          <CarouselNext className="absolute -right-3"></CarouselNext>
          <CarouselPrevious className="absolute -left-3"></CarouselPrevious>
        </Carousel>
      </section>

      {/* Ongoing Events */}
      <section className="w-full h-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end space-x-1">
          <h2 className="text-3xl">Ongoing Events</h2>
          {/* <span className="opacity-75">in our chapter</span> */}
        </div>
        <div className="w-full h-full grid grid-cols-1 gap-7 md:grid-cols-2 2xl:grid-cols-3 ">
          {events
            .filter((event) => new Date(event.date).getTime() - Date.now() > 0)
            .map((event, index) => (
              <Card key={index} {...event} />
            ))}
        </div>
      </section>

      {/* Scheduled Events */}
      <section></section>
    </main>
  );
}
