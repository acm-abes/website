import GridHeading from "@/components/utils/GridHeading";

const WhoWeAre = () => {
  return (
    <>
      <section id="whoweare" className="bottom-border">
        <div className="container border-r-l flex flex-col items-center justify-center py-[120px]">
          <GridHeading>
            <h1 className=" w-full font-[700] text-[24px] sm:text-[32px] text-center text-balance">
              Who We Are
            </h1>
          </GridHeading>

          <div className="mx-[30px]">
            <p className="w-full font-[400] text-[16px] md:text-[20px] text-justify leading-[150%]">
              <span className="text-[48px]">W</span>
              elcome to ACM X ABES, a community for those who are passionate
              about coding, technology, and innovation. We are the ABES
              Engineering College chapter of the Association for Computing
              Machinery (ACM), one of the world’s largest organizations of
              computing professionals. Our mission is to create a collaborative
              environment where students can learn, innovate, and grow as future
              tech leaders. At ACM X ABES, we encourage curiosity, foster
              teamwork, and provide hands-on experience in various tech fields.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoWeAre;
