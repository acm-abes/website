import React from "react";

const FooterNew = () => {
  return (
    <>
      <section id="whoweare" className="bottom-border bg-[var(--primary-color)]">
        <div className="container flex flex-col items-center justify-center py-[40px]">
          <h1 className="w-full rubik-wet-paint-regular text-center text-[48px] sm:text-[78px] md:text-[100px] lg:text-[140px] xl:text-[160px] mb-[30px]">
            ACM X ABES
          </h1>
          <p className="w-full text-center font-[400] text-[16px] md:text-[20px]">
            Copyright © 2024 ACM X ABES.
            <br />
            All Rights Reserved
          </p>
        </div>
      </section>
    </>
  );
};

export default FooterNew;
