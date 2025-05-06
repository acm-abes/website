import Image from "next/image";
import GridHeading from "@/components/utils/GridHeading";
import style from "./index.module.css";
import clsx from "clsx";
import Link from "next/link";
import GridTitle from "./GridTitle";
import ListBullet from "./ListBullet";
import PosterImage from "./PosterImage";



const OnGoingEvent = () => {
  return (
    <>
      <section id="dawntech" className="bottom-border overflow-hidden">
        <div className="container border-r-l flex flex-col items-center justify-center px-[10px] md:px-[20px] py-[120px]">
          <GridHeading>
            <h1 style={{fontFamily:'Nosifer', wordSpacing:4, letterSpacing:2}} className="w-full font-[700] text-[24px] sm:text-[32px] text-center text-balance">
              On Going Events
            </h1>
          </GridHeading>
          {/* for bottom margin */}
          <div className="mb-[80px]"></div>
          <div style={{fontFamily:'Eater,cursive',letterSpacing:6}} className=" font-bold text-[18px] md:text-[24px] lg:text-[27px] text-center">
            🤝NAVROHAN: ACM AWAITS NEXT VISIONARIES🔥
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
                <ListBullet /> Creators, Coders, Designers
                <br />
                <ListBullet /> All brilliant minds welcome !
                <br />
                <ListBullet /> Let’s short-circuit the ordinary. 🔄
              </code>
              <br />
              <br />
              <code>Join ACM & ACM-W ABESEC !!</code>
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
                  1️⃣ Round 1 (09 May):
                  <br />
                  <ListBullet />  Tell us who you are !!

                  <br />
                  {/* <ListBullet /> Second-Year Students: Virtual Escape Room */}
                  <br />
                  <br />
                  2️⃣ Round 2:
                  <br />
                  <ListBullet/> Show us what makes you different.

                  <br />
                </div>
                <br />
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex justify-center items-center">
                  <GridTitle>
                    <span className="font-medium text-[13px] md:text-[16px] lg:text-[20px] text-[var(--dawn-poster-bg)]">
                    📍 Venue:
                    </span>
                  </GridTitle>
                  </div>
                  <br />
                  <div className="flex justify-center items-center">
                  <ListBullet/> Online 💻
                  </div>
                  <br />
                </div>
              </div>
              <br />
              {/* main conatiner 2 */}
              <div className="flex flex-col md:flex-row">
                {/* <div className="flex-1">
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
                </div> */}
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
                  <div className="flex items-center flex-col">

                   Ishita Banshiwal
                  <Link href={"tel:6396779088"}>6396779088</Link>
                  <br />
                  Kshitiz:
                  <Link href={"tel:9170076267"}>9170076267
                  </Link>
                  <br />
                  </div>
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
                  <Link href={"https://shorturl.at/3HH8I"}>
                    <span style={{color:'#ffffff'}}>Register Now</span>
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
