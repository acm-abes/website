import Image from "next/image";
import GridHeading from "@/components/utils/GridHeading";

const OnGoingEvent = () => {
  return (
    <>
      <section id="whoweare" className="bottom-border">
        <div className="container border-r-l flex flex-col items-center justify-center px-[10px] md:px-[20px] py-[120px]">
          <GridHeading>
            <h1 className="w-full font-[700] text-[24px] sm:text-[32px] text-center text-balance">
              On Going Events
            </h1>
          </GridHeading>
          <div className="mb-[80px]"></div>
          <div className="mx-[30px] flex flex-col md:flex-row gap-16">
            <div className="poster-shadow rounded-xl w-full h-56 sm:w-full sm:h-72 md:w-[320px] md:h-56 lg:w-[480px] lg:h-72 xl:w-[720px] xl:h-96 relative overflow-hidden">
              <Image
                src="/blind_coding_practice.jpg"
                alt="Example Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className=" w-full font-[400] text-[16px] md:text-[20px] text-justify">
              After the chaos of Contest 4, we’re back for more terror!
              <br />
              <br />
              Same rules. Same nightmare. No IDE. No mercy.
              <br />
              <br />
              ☠ Friday 8-10 PM on Codeforces.
              <br />
              <br />
              Can you survive the dark again? 👾 Top 3 escape.
              <br />
              <br />
              Top 20? Etched in horror on Insta 🩸
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default OnGoingEvent;
