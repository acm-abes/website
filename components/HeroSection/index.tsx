import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section id="hero" className="bottom-border">
        <div className="grid_background container flex flex-col items-center justify-center px-[10px] md:px-[20px] py-[114px]">
          <div className="logo-shadow rounded-xl w-56 h-56 relative overflow-hidden transition ease-in-out delay-100 hover:scale-90">
            <Image
              src="/abes-acm-student-chapter.png"
              alt="Example Image"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <h1 className="bg-shadow doto-01 w-full mb-[30px] font-[900] text-[36px] md:text-[44px] lg:text-[56px] xl:text-[64px] text-center text-balance cursor-pointer">
            Igniting Algorithmic Minds
          </h1>
          <p className="w-full font-normal text-center text-[14px] md:text-[16px] text-balance">
            Master the fundamentals, ace the contests, and shape your future.
          </p>
          {/*<button className="bg-shadow mt-[80px] w-[160px] h-[40px] text-center cursor-pointer rounded-[8px] bg-[var(--primary-color)] text-[var(--text-color)] text-[18px] font-medium">*/}
          {/*  <Link href={"/auth/register"}>Join us</Link>*/}
          {/*</button>*/}
        </div>
      </section>
    </>
  );
};

export default HeroSection;

/* Fueling the Next Generation of Problem-Solving Wizards. */

/* Cracking the Code, One Algorithm at a Time. */

/* Fueling Problem Solving Wizards. */
