import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavItems } from "./Navbar";

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-lg h-full bg-background/20 flex flex-col space-y-7 p-4 md:py-10 md:px-20 lg:px-36">
      <div className="w-full flex items-start">
        <h2 className="text-3xl">
          <Link
            href={"/"}
            className="flex items-center justify-center space-x-2"
          >
            <Image
              alt={"ABES-ACM"}
              src={"/images/abes-acm.png"}
              width={128}
              height={128}
              className="h-10 w-10"
            />
            <span>ABES-EC</span>
          </Link>
        </h2>
      </div>
      <p className="opacity-70">
        We at the Association of Computing Machinery, ABES EC aim to instill
        spirit of technology and computing among the students, through various
        fields of modern technology.
      </p>
      <div className="grid grid-cols-4 justify-evenly w-full underline opacity-90 text-sm text-center">
        {NavItems.map((item) => (
          <Link href={"/" + item.href}>{item.name}</Link>
        ))}
      </div>
      <div className="text-sm text-center">
        © Designed and Developed by Office Bearers of ABES ACM Student chapter
      </div>
    </footer>
  );
};

export default Footer;
