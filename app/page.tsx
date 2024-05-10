import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Image from "next/image";

// const alumniSans = Alumni_Sans({
//   subsets: ["latin"],
//   style: "normal",
//   weight: ["200", "400", "600", "700"],
//   preload: true,
// });

export default function Home() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart={"#000"}
      gradientBackgroundEnd={"#000"}
      // thirdColor={"#000"}
      interactive={false}
      className={"min-h-screen w-screen overflow-hidden absolute top-0 left-0"}
    >
      <main
        className={
          "w-full h-full overflow-hidden flex flex-col items-center main-container space-y-10 md:space-y-20"
        }
      >
        <div
          className={
            "z-[1] w-full h-[calc(100dvh-7.5rem)] flex items-center md:justify-between"
          }
        >
          <div
            className={"flex hero space-y-1 w-fit h-fit flex-col items-start"}
          >
            {/*<span className={"text-lg drop-shadow-2xl"}>Welcome to</span>*/}
            <h1 className={"text-5xl text-cyan-600 font-bold drop-shadow-2xl"}>
              ABES-ACM
            </h1>
            <p className={"accent-neutral-400"}>
              Welcome to Official ACM chapter by ABES EC
            </p>
          </div>

          <Image
            className={" h-screen w-fit absolute right-0 object-cover"}
            src={"/images/hero.svg"}
            width={256}
            height={256}
            alt={"Hero"}
          />
        </div>
      </main>
    </BackgroundGradientAnimation>
  );
}

const MotionLayer = () => {
  return (
    <div className={"absolute top-0 left-0 w-full h-full bg-black"}>
      <div
        className={"w-full h-full backdrop-blur-3xl absolute top-0 left-0"}
      ></div>
      <div
        className={
          "rounded-full w-10 h-10 bg-red-600 top-1/2 blur-3xl absolute"
        }
      ></div>
    </div>
  );
};
