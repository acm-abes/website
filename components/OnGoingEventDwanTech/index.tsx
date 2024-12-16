import Image from "next/image";
import GridHeading from "@/components/utils/GridHeading";
import GridTitle from "@/components/OnGoingEventDwanTech/GridTitle";
import ListBullet from "@/components/OnGoingEventDwanTech/ListBullet";
import PosterImage from "@/components/OnGoingEventDwanTech/PosterImage";
import style from "./index.module.css";
import clsx from "clsx";
import Link from "next/link";

const OnGoingEvent = () => {
  return (
    <>
      <section id="dawntech" className="bottom-border overflow-hidden">
        <div className="container border-r-l flex flex-col items-center justify-center px-[10px] md:px-[20px] py-[120px]">
          <GridHeading>
            <h1 className="w-full font-[700] text-[24px] sm:text-[32px] text-center text-balance">
              On Going Events
            </h1>
          </GridHeading>
          {/* for bottom margin */}
          <div className="mb-[80px]"></div>
          <div className=" font-bold text-[18px] md:text-[24px] lg:text-[28px] text-center">
            🌄 DAWN : TECH UNPLUGGED 🌄
          </div>
          <div className="mb-[80px]"></div>

          {/* main content */}
          <div className="mx-[30px]">
            {/* image container */}
            <div className="w-full flex justify-center items-center">
              <PosterImage />
            </div>

            {/* text container */}
            <div className="w-full font-[400] text-[14px] md:text-[20px]">
              <br />
              <br />
              <code>
                <ListBullet /> Sweaty palms , chills in the spine;
                <br />
                <ListBullet /> Afraid to stand out ? It's high time !
                <br />
                <ListBullet /> Buckle up , get your energies aligned ;
              </code>
              <br />
              <br />
              <code>DAWN - The New Beginning , Let's break the ice !!</code>
              <br />
              <br />
              {/* main conatiner 1 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                  <div className=" flex justify-center items-center">
                    <GridTitle>
                      <span className="font-medium text-[13px] md:text-[16px] lg:text-[20px] text-[var(--dawn-poster-bg)]">
                        📅 Event Details:
                      </span>
                    </GridTitle>
                  </div>
                  <br />
                  1️⃣ Day 1:
                  <br />
                  <ListBullet /> 24 DEC First-Year Students: Quiz
                  <br />
                  <ListBullet /> Second-Year Students: Virtual Escape Room
                  <br />
                  <br />
                  2️⃣ Day 2 (Team Round):
                  <br />
                  26 DEC Bingo-style problem-solving
                  <br />
                </div>
                <br />
                <div className="flex-1">
                  <div className=" flex justify-center items-center">
                    <GridTitle>
                      <span className="font-medium text-[13px] md:text-[16px] lg:text-[20px] text-[var(--dawn-poster-bg)]">
                        📍 Venue:
                      </span>
                    </GridTitle>
                  </div>
                  <br />
                  <ListBullet /> Day 1: Aryabhatta block
                  <br />
                  <ListBullet /> Day 2: Seminar hall-2 Bhabha block
                  <br />
                </div>
              </div>
              <br />
              {/* main conatiner 2 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                  <div className=" flex justify-center items-center">
                    <GridTitle>
                      <span className="font-medium text-[13px] md:text-[16px] lg:text-[20px] text-[var(--dawn-poster-bg)]">
                        🎁 Perks:
                      </span>
                    </GridTitle>
                  </div>
                  <br />
                  <ListBullet /> E-certificates 📄 | Cool Giveaways
                  <br />
                </div>
                <br />
                <div className="flex-1">
                  <div className=" flex justify-center items-center">
                    <GridTitle>
                      <span className="font-medium text-[13px] md:text-[16px] lg:text-[20px] text-[var(--dawn-poster-bg)]">
                        📞 Contacts:
                      </span>
                    </GridTitle>
                  </div>
                  <br />
                  <ListBullet /> Ishita Banshiwal
                  <Link href={"tel:6396779088"}> : 6396779088</Link>
                  <br />
                  <ListBullet /> Kartik Mittal
                  <Link href={"tel:9027435209"}> : 9027435209</Link>
                  <br />
                </div>
              </div>
              <br />
              {/* containing registration buttons */}
              <div className="mt-16 font-medium text-[14px] md:text-[18px] lg:text-[24px] flex justify-center gap-8">
                <button
                  className={clsx(
                    style.btn_register_now,
                    "w-[220px] h-[40px] text-center cursor-pointer rounded-[8px] bg-[var(--dawn-poster-bg)] text-[var(--border-color)] text-[18px] font-medium transition ease-in-out delay-100 hover:scale-[0.98]"
                  )}
                >
                  <Link href={"https://forms.gle/4Hjy9nkMcMgdcJHn7"}>
                    Register Now
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OnGoingEvent;
