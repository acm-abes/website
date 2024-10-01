import { Vortex } from "@/components/ui/vortex";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        particleCount={1000}
        rangeY={120}
        className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
      >
        <h1 className="text-7xl md:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          ACM
        </h1>
        <p className="text-white text-lg md:text-2xl max-w-xl mt-6 text-center">
          Computer Science Excellence with the Association for Computing
          Machinery at ABESEC.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            <Link href={"/events"}>Upcoming Events</Link>
          </button>
          <button className="px-4 py-2  text-white ">
            <Link href={"/team"}>Meet the Team</Link>
          </button>
        </div>
      </Vortex>
    </div>
  );
}
